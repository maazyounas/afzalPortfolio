"use client";

import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent } from "react";
import { Move, RotateCcw, Upload, ZoomIn } from "lucide-react";

type UploadFolder = "team" | "blogs" | "testimonials";
type UploadResult = { success?: boolean; url?: string; error?: string };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image"));
    image.src = source;
  });
}

function blobToFile(blob: Blob, fileName: string) {
  return new File([blob], fileName, { type: blob.type || "image/png" });
}

interface ImageUploadFieldProps {
  label: string;
  helperText?: string;
  value?: string;
  onChange: (value: string) => void;
  folder: UploadFolder;
  aspectRatio: number;
}

export function ImageUploadField({
  label,
  helperText,
  value,
  onChange,
  folder,
  aspectRatio,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const objectUrlRef = useRef<string | null>(null);

  const [pendingSource, setPendingSource] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setFrameSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [pendingSource, value, aspectRatio]);

  useEffect(() => {
    if (!pendingSource) {
      return;
    }

    const image = new window.Image();
    image.onload = () => {
      setImageSize({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.src = pendingSource;
  }, [pendingSource]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current?.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const baseScale =
    imageSize && frameSize.width > 0 && frameSize.height > 0
      ? Math.max(frameSize.width / imageSize.width, frameSize.height / imageSize.height)
      : 1;

  const renderedWidth = imageSize ? imageSize.width * baseScale * zoom : 0;
  const renderedHeight = imageSize ? imageSize.height * baseScale * zoom : 0;
  const maxOffsetX = imageSize ? Math.max(0, (renderedWidth - frameSize.width) / 2) : 0;
  const maxOffsetY = imageSize ? Math.max(0, (renderedHeight - frameSize.height) / 2) : 0;

  const safeOffset = {
    x: clamp(offset.x, -maxOffsetX, maxOffsetX),
    y: clamp(offset.y, -maxOffsetY, maxOffsetY),
  };

  function clearPendingImage() {
    if (objectUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    objectUrlRef.current = null;
    setPendingSource(null);
    setImageSize(null);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    setError(null);
  }

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    clearPendingImage();
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPendingSource(objectUrl);
    setError(null);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    event.target.value = "";
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!pendingSource) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
      dragStateRef.current = {
        x: event.clientX,
        y: event.clientY,
        offsetX: safeOffset.x,
        offsetY: safeOffset.y,
      };
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging || !pendingSource) {
      return;
    }

    const nextX = dragStateRef.current.offsetX + (event.clientX - dragStateRef.current.x);
    const nextY = dragStateRef.current.offsetY + (event.clientY - dragStateRef.current.y);
    setOffset({
      x: clamp(nextX, -maxOffsetX, maxOffsetX),
      y: clamp(nextY, -maxOffsetY, maxOffsetY),
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragging) {
      return;
    }

    setDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // no-op
    }
  }

  async function handleUpload() {
    if (!pendingSource || !imageSize || frameSize.width === 0 || frameSize.height === 0) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const image = await loadImage(pendingSource);
      const canvas = document.createElement("canvas");
      const outputWidth = 1600;
      const outputHeight = Math.round(outputWidth / aspectRatio);
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Unable to prepare image");
      }

      const scale = Math.max(frameSize.width / imageSize.width, frameSize.height / imageSize.height) * zoom;
      const sourceWidth = frameSize.width / scale;
      const sourceHeight = frameSize.height / scale;
      const sourceX = (imageSize.width - sourceWidth) / 2 - safeOffset.x / scale;
      const sourceY = (imageSize.height - sourceHeight) / 2 - safeOffset.y / scale;

      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, outputWidth, outputHeight);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (!result) {
            reject(new Error("Failed to crop image"));
            return;
          }
          resolve(result);
        }, "image/png", 0.95);
      });

      const file = blobToFile(blob, `${folder}-${Date.now()}.png`);
      const formData = new FormData();
      formData.append("file", file);

      formData.append("folder", folder);

      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as UploadResult;

      if (!response.ok || !result.success || !result.url) {
        throw new Error(result.error || "Upload failed");
      }

      onChange(result.url);
      clearPendingImage();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  const hasImage = !!value;

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <label className="text-sm font-medium text-neutral-200">{label}</label>
          {helperText && <p className="mt-1 text-xs text-neutral-400">{helperText}</p>}
        </div>
        {hasImage && !pendingSource && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-neutral-400 transition hover:bg-white/5 hover:text-white"
          >
            Remove
          </button>
        )}
      </div>

      {!pendingSource && hasImage ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <div className="relative w-full" style={{ aspectRatio: String(aspectRatio) }}>
            <img src={value} alt={label} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
            <p className="text-xs text-neutral-400">Drag, zoom, and upload a new version anytime.</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
            >
              <Upload className="h-4 w-4" />
              Replace
            </button>
          </div>
        </div>
      ) : !pendingSource ? (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] px-6 py-10 text-center transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5"
        >
          <Upload className="h-7 w-7 text-[var(--color-accent)]" />
          <span className="mt-3 text-sm font-medium text-white">Upload an image</span>
          <span className="mt-1 text-xs text-neutral-400">Click or drop a file, then crop it before saving.</span>
        </button>
      ) : (
        <div className="space-y-4">
          <div
            ref={frameRef}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-inner"
            style={{ aspectRatio: String(aspectRatio) }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {pendingSource && imageSize && (
              <img
                src={pendingSource}
                alt="Crop preview"
                draggable={false}
                className="absolute left-1/2 top-1/2 select-none"
                style={{
                  width: `${renderedWidth}px`,
                  height: `${renderedHeight}px`,
                  transform: `translate(calc(-50% + ${safeOffset.x}px), calc(-50% + ${safeOffset.y}px))`,
                  cursor: dragging ? "grabbing" : "grab",
                }}
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.28)_100%)]" />

            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
              <Move className="h-3.5 w-3.5" />
              Drag to reposition
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex items-center gap-3">
              <ZoomIn className="h-4 w-4 text-neutral-400" />
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.01"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-full accent-[var(--color-accent)]"
              />
              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/5 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs text-neutral-400">Crop preview is applied before the image is uploaded.</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearPendingImage}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/5 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || frameSize.width === 0 || frameSize.height === 0}
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Use image"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

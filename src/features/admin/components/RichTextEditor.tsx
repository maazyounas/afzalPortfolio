"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered, Eraser, Underline } from "lucide-react";
import { sanitizeRichText } from "@/lib/utils/richText";

interface RichTextEditorProps {
  label: string;
  helperText?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function applyCommand(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export function RichTextEditor({
  label,
  helperText,
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(value || "<p><br /></p>");

  useEffect(() => {
    const nextContent = value || "<p><br /></p>";
    contentRef.current = nextContent;
    if (editorRef.current && editorRef.current.innerHTML !== nextContent) {
      editorRef.current.innerHTML = nextContent;
    }
  }, [value]);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = contentRef.current;
    }
  }, []);

  function updateContent(nextHtml?: string) {
    const rawHtml = nextHtml ?? editorRef.current?.innerHTML ?? "";
    const sanitizedHtml = sanitizeRichText(rawHtml);
    const nextContent = sanitizedHtml || "<p><br /></p>";
    contentRef.current = nextContent;
    if (editorRef.current && editorRef.current.innerHTML !== nextContent) {
      editorRef.current.innerHTML = nextContent;
    }
    onChange(sanitizedHtml);
  }

  function handleAction(command: string) {
    editorRef.current?.focus();
    applyCommand(command);
    updateContent();
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-neutral-200">{label}</label>
        {helperText && <p className="text-xs text-neutral-400">{helperText}</p>}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex flex-wrap gap-1 border-b border-white/10 bg-black/10 p-2">
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleAction("bold")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <Bold className="h-3.5 w-3.5" />
            Bold
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleAction("italic")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <Italic className="h-3.5 w-3.5" />
            Italic
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleAction("underline")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <Underline className="h-3.5 w-3.5" />
            Underline
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleAction("insertUnorderedList")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <List className="h-3.5 w-3.5" />
            Bullet
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleAction("insertOrderedList")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <ListOrdered className="h-3.5 w-3.5" />
            Numbered
          </button>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              editorRef.current?.focus();
              applyCommand("removeFormat");
              updateContent();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-300 transition hover:bg-white/10 hover:text-white"
          >
            <Eraser className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={() => updateContent()}
          onBlur={() => updateContent()}
          className="min-h-[220px] px-4 py-4 text-sm leading-7 text-white outline-none"
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
}

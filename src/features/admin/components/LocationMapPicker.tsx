"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search } from "lucide-react";

type LocationMapPickerProps = {
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  onAddressChange: (value: string) => void;
  onLatitudeChange: (value: number | null) => void;
  onLongitudeChange: (value: number | null) => void;
};

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
};

const pinIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:38px;
      height:38px;
      border-radius:9999px;
      background:rgba(20,184,166,0.14);
      box-shadow:0 10px 24px rgba(15,23,42,0.18);
      border:1px solid rgba(20,184,166,0.3);
    ">
      <div style="
        width:16px;
        height:16px;
        border-radius:9999px;
        background:#14b8a6;
        border:3px solid #fff;
      "></div>
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

async function reverseGeocode(latitude: number, longitude: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { display_name?: string };
    return data.display_name || null;
  } catch {
    return null;
  }
}

async function geocodeAddress(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&limit=1`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const results = (await response.json()) as SearchResult[];
  return results[0] || null;
}

export function LocationMapPicker({
  address,
  latitude,
  longitude,
  onAddressChange,
  onLatitudeChange,
  onLongitudeChange,
}: LocationMapPickerProps) {
  const [searchValue, setSearchValue] = useState(address);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    setSearchValue(address);
  }, [address]);

  const center = useMemo<[number, number]>(() => {
    if (latitude !== null && longitude !== null && latitude !== undefined && longitude !== undefined) {
      return [latitude, longitude];
    }
    return [33.6844, 73.0479];
  }, [latitude, longitude]);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapNodeRef.current, {
      center,
      zoom: 12,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on("click", async (event) => {
      const nextLatitude = event.latlng.lat;
      const nextLongitude = event.latlng.lng;
      onLatitudeChange(nextLatitude);
      onLongitudeChange(nextLongitude);

      if (markerRef.current) {
        markerRef.current.setLatLng([nextLatitude, nextLongitude]);
      } else {
        markerRef.current = L.marker([nextLatitude, nextLongitude], { icon: pinIcon }).addTo(map);
      }

      const result = await reverseGeocode(nextLatitude, nextLongitude);
      if (result) {
        onAddressChange(result);
        setSearchValue(result);
      }
    });

    mapRef.current = map;

    return () => {
      map.off();
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [center, onAddressChange, onLatitudeChange, onLongitudeChange]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (latitude !== null && longitude !== null && latitude !== undefined && longitude !== undefined) {
      mapRef.current.setView([latitude, longitude], Math.max(mapRef.current.getZoom(), 12), { animate: true });
      if (markerRef.current) {
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        markerRef.current = L.marker([latitude, longitude], { icon: pinIcon }).addTo(mapRef.current);
      }
    }
  }, [latitude, longitude]);

  async function handleSearch() {
    const query = searchValue.trim();
    if (!query) {
      setError("Enter an address or place name.");
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const result = await geocodeAddress(query);
      if (!result) {
        setError("No matching location found.");
        return;
      }

      const nextLatitude = Number(result.lat);
      const nextLongitude = Number(result.lon);

      onLatitudeChange(nextLatitude);
      onLongitudeChange(nextLongitude);
      onAddressChange(result.display_name);
      setSearchValue(result.display_name);
    } catch {
      setError("Failed to search location.");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void handleSearch();
            }
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
          placeholder="Search an address or place name"
        />
        <button
          type="button"
          onClick={() => void handleSearch()}
          disabled={searching}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div ref={mapNodeRef} className="h-[360px] w-full" />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Address</p>
          <p className="mt-1 text-sm text-white">{address || "Select a location"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Latitude</p>
          <p className="mt-1 text-sm text-white">
            {latitude !== null && latitude !== undefined ? latitude.toFixed(6) : "Not set"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Longitude</p>
          <p className="mt-1 text-sm text-white">
            {longitude !== null && longitude !== undefined ? longitude.toFixed(6) : "Not set"}
          </p>
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        Click anywhere on the map or search for an address to set the office location.
      </p>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

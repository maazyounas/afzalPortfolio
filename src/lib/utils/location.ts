type MapLocationInput = {
  address?: string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
};

function normalizeCoordinate(value?: number | string | null) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(numericValue) ? numericValue : null;
}

export function buildMapEmbedUrl({ address, latitude, longitude }: MapLocationInput) {
  const lat = normalizeCoordinate(latitude);
  const lng = normalizeCoordinate(longitude);

  if (lat !== null && lng !== null) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }

  const safeAddress = address?.trim();
  if (safeAddress) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(safeAddress)}&z=15&output=embed`;
  }

  return "https://www.openstreetmap.org/export/embed.html?bbox=0.0%2C51.5%2C0.1%2C51.52&layer=mapnik";
}

export function normalizeLocationString(address?: string | null, latitude?: number | string | null, longitude?: number | string | null) {
  const lat = normalizeCoordinate(latitude);
  const lng = normalizeCoordinate(longitude);

  if (address?.trim() && lat !== null && lng !== null) {
    return `${address.trim()} (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
  }

  if (address?.trim()) {
    return address.trim();
  }

  if (lat !== null && lng !== null) {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  return "";
}

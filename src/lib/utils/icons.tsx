import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Briefcase,
  Calculator,
  CheckCircle,
  Clock,
  FileText,
  Layers,
  PieChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { createElement } from "react";
import { isEmojiLike } from "./richText";

const DEFAULT_SERVICE_ICON = Sparkles;

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Briefcase,
  ShieldCheck,
  Calculator,
  TrendingUp,
  Sparkles,
  PieChart,
  BarChart3,
  Clock,
  CheckCircle,
  FileText,
  Layers,
  Zap,
};

export function getServiceIcon(iconName?: string): LucideIcon {
  if (!iconName) {
    return DEFAULT_SERVICE_ICON;
  }

  const icon = SERVICE_ICONS[iconName as keyof typeof SERVICE_ICONS];
  return icon || DEFAULT_SERVICE_ICON;
}

export function ServiceIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  if (name && isEmojiLike(name)) {
    return <span className={`inline-flex select-none items-center justify-center leading-none ${className || ""}`.trim()}>{name}</span>;
  }

  const Icon = getServiceIcon(name);
  return createElement(Icon, { className });
}

export const serviceIconSuggestions = [
  "Briefcase",
  "ShieldCheck",
  "Calculator",
  "TrendingUp",
  "Sparkles",
  "PieChart",
  "BarChart3",
  "Clock",
  "CheckCircle",
  "FileText",
  "Layers",
  "Zap",
];

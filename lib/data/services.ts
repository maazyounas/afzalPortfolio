import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "fractional-cfo",
    name: "Fractional CFO Advisory",
    summary: "Strategic finance support for forecasting, planning, and leadership reporting.",
    description:
      "Embedded CFO support for companies that need better planning discipline, more reliable monthly reporting, and clearer capital decisions.",
    audience: "founders and leadership teams preparing for growth or restructuring",
    outcomes: [
      "Clear forecasting cadence",
      "Improved management reporting packs",
      "Better finance leadership coverage without full-time overhead",
    ],
    updatedAt: "2026-05-01",
  },
  {
    slug: "tax-planning",
    name: "Tax Planning & Compliance",
    summary: "Forward-looking tax support that reduces surprises and improves planning confidence.",
    description:
      "A practical tax workstream that combines compliance discipline with scenario planning and proactive advisory.",
    audience: "companies managing cross-period tax risk and planning",
    outcomes: [
      "Predictable compliance calendar",
      "Planning support before major decisions",
      "Cleaner coordination across finance and tax stakeholders",
    ],
    updatedAt: "2026-05-01",
  },
  {
    slug: "audit-readiness",
    name: "Audit Readiness",
    summary: "Control design, documentation, and evidence preparation ahead of assurance work.",
    description:
      "We help teams strengthen process documentation, evidence hygiene, and ownership before external reviews begin.",
    audience: "teams approaching audit, diligence, or lender review cycles",
    outcomes: [
      "Stronger evidence preparation",
      "Less last-minute scramble",
      "More reliable internal control ownership",
    ],
    updatedAt: "2026-05-01",
  },
];

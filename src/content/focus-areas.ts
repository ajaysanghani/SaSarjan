import type { LucideIcon } from "lucide-react";
import {
  Coins,
  Factory,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Building2,
  Scale,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";

export type FocusArea = {
  id: string;
  title: string;
  description: string;
  examples: string[];
  icon: LucideIcon;
  /** Index into the `--area-*` tint palette in globals.css. */
  tint: number;
};

/**
 * Ten broad, permanent areas of collective responsibility.
 * These are interconnected working areas, not ministries or silos.
 */
export const focusAreas: FocusArea[] = [
  {
    id: "human-development",
    title: "Human Development and Wellbeing",
    description: "Helping every person learn, stay healthy and grow to their full potential.",
    examples: ["Education", "Lifelong learning", "Health", "Nutrition", "Youth development", "Care"],
    icon: HeartHandshake,
    tint: 1,
  },
  {
    id: "nature",
    title: "Nature and Ecological Regeneration",
    description: "Restoring the natural systems that all life and livelihoods depend on.",
    examples: ["Water", "Soil", "Forests", "Biodiversity", "Climate", "Waste", "Energy transition"],
    icon: Sprout,
    tint: 2,
  },
  {
    id: "production",
    title: "Production, Livelihoods and Enterprise",
    description: "Creating dignified, meaningful work and enterprise across sectors.",
    examples: ["Agriculture", "Manufacturing", "Services", "Entrepreneurship", "Labour", "Crafts"],
    icon: Factory,
    tint: 3,
  },
  {
    id: "economy",
    title: "Distribution, Economy and Shared Prosperity",
    description: "Making economic opportunity and access to resources fairer and wider.",
    examples: ["Markets", "Finance", "Taxation", "Trade", "Logistics", "Reducing inequalities"],
    icon: Coins,
    tint: 4,
  },
  {
    id: "governance",
    title: "Governance and Public Institutions",
    description: "Strengthening how public decisions are made, delivered and reviewed.",
    examples: ["Public administration", "Policy design", "Citizen participation", "Decentralisation", "Accountability"],
    icon: Landmark,
    tint: 5,
  },
  {
    id: "justice",
    title: "Justice, Rights and Social Trust",
    description: "Upholding constitutional values, equal treatment and access to justice.",
    examples: ["Human rights", "Access to justice", "Equal treatment", "Conflict resolution", "Social harmony"],
    icon: Scale,
    tint: 6,
  },
  {
    id: "infrastructure",
    title: "Infrastructure, Habitats and Essential Services",
    description: "Building places and services people can rely on, in cities and villages alike.",
    examples: ["Housing", "Sanitation", "Water supply", "Transport", "Digital connectivity", "Disaster resilience"],
    icon: Building2,
    tint: 7,
  },
  {
    id: "knowledge",
    title: "Knowledge, Science and Innovation",
    description: "Generating and sharing knowledge, and learning continuously from evidence.",
    examples: ["Research", "Technology", "AI and data", "Indigenous knowledge", "Experimentation"],
    icon: Lightbulb,
    tint: 8,
  },
  {
    id: "culture",
    title: "Culture, Community and Collective Life",
    description: "Nurturing the languages, relationships and traditions that hold communities together.",
    examples: ["Languages", "Arts", "Heritage", "Families", "Volunteering", "Intergenerational cooperation"],
    icon: UsersRound,
    tint: 9,
  },
  {
    id: "security",
    title: "Security, Resilience and Global Cooperation",
    description: "Keeping people safe and preparing society for long-term change.",
    examples: ["Public safety", "Defence", "Cybersecurity", "Emergency preparedness", "International relations"],
    icon: ShieldCheck,
    tint: 10,
  },
];

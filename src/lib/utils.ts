import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de Tailwind de forma inteligente
 * Resuelve conflictos y elimina duplicados
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Tokens de diseño de Constructora Carpio
 */
export const designTokens = {
  colors: {
    primary: "#2d862d",
    primaryHover: "#256f25", 
    secondary: "#dad9d8",
    accent: "#0c0801",
    neutral: "#f2f2f2",
    background: "#ffffff",
    text: "#0c0801"
  },
  spacing: {
    sectionPadding: "px-5 py-16 lg:px-16 lg:py-28",
    containerMax: "max-w-[1280px]",
    contentGap: "gap-12 lg:gap-20"
  },
  radius: {
    sm: "rounded-[12px]",
    md: "rounded-[20px]", 
    lg: "rounded-[40px]",
    full: "rounded-full"
  },
  typography: {
    fontFamily: {
      heading: "font-['Urbanist:Medium',_sans-serif]",
      body: "font-['Heebo:Regular',_sans-serif]",
      semibold: "font-['Heebo:SemiBold',_sans-serif]"
    }
  }
} as const;

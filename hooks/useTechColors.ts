"use client";

import { useContext } from "react";
import { TechColorsContext } from "@/context/tech-colors-provider";

export function useTechColors() {
  const colors = useContext(TechColorsContext);

  if (!colors) {
    throw new Error(
      "useTechColors must be used within TechColorsProvider",
    );
  }

  return colors;
}
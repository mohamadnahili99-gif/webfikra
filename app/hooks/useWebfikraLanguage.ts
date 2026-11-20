"use client";

import { useSyncExternalStore } from "react";

type Language = "ar" | "en";
const STORAGE_KEY = "webfikra-language";
const CHANGE_EVENT = "webfikra:language-changed";

// Keeps language switching functional in private browsing when storage is blocked.
let fallbackLanguage: Language = "ar";

function readLanguage(): Language {
  if (typeof window === "undefined") return "ar";
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "ar";
  } catch {
    return fallbackLanguage;
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function useWebfikraLanguage() {
  const language = useSyncExternalStore(subscribe, readLanguage, () => "ar");

  function toggleLanguage() {
    const next: Language = language === "ar" ? "en" : "ar";
    fallbackLanguage = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // No persistent storage is required to use the language toggle.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return { arabic: language === "ar", toggleLanguage };
}

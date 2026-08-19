import { notFound } from "next/navigation";

/**
 * Catch-all per URL non matched sotto [locale].
 * Chiamando notFound() viene renderizzato [locale]/not-found.tsx
 * (con layout e localizzazione intatti) e restituito HTTP 404.
 */
export default function LocaleCatchAllPage() {
  notFound();
}
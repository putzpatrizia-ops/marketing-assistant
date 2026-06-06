/** =============================================
    api.js  –  Abstraktionsschicht für Daten

    Aktuell: Dummy-Daten
    Zukünftig: Hier den fetch()-Call zu einem LLM
    (z.B. OpenAI, Claude, Continue-API) einbauen.
   ============================================= */

import { getDummyData } from "./data.js";

/**
 * Simuliert einen API-Aufruf und gibt Ideen zurück.
 * @param {object} params
 * @param {string} params.product        – Benutzer-Eingabe: Produkt/Service
 * @param {string} params.targetGroup      – Benutzer-Eingabe: Zielgruppe
 * @param {string[]} params.categories     – Ausgewählte Kategorien
 * @returns {Promise<object[]>}          – Array mit Ergebnis-Objekten
 */
export async function fetchIdeas({ product, targetGroup, categories }) {
    // Künstliche Verzögerung, damit es sich "echt" anfühlt
    await delay(600 + Math.random() * 800);

    const results = [];

    for (const category of categories) {
        const data = getDummyData(category, product);
        if (data) {
            results.push({
                id: `${category}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                category,
                ...data,
                timestamp: new Date().toISOString(),
                confidence: Math.round(85 + Math.random() * 14) // 85–99 %
            });
        }
    }

    return results;
}

/**
 * Hilfsfunktion: Promise-basierte Verzögerung.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * TODO für LLM-Anbindung:
 *
 * 1.   API-Key via Umgebungsvariable oder Input-Feld holen.
 * 2.   Prompt aus product + targetGroup + category zusammenbauen.
 * 3.   fetch('https://api.anthropic.com/v1/messages', { … }) aufrufen.
 * 4.   Antwort parsen und in das hier verwendete Objekt-Format
 *      { id, category, title, icon, badgeClass, content, confidence }
 *      umwandeln.
 * 5.   Fehlerbehandlung (Rate-Limits, Timeouts) einbauen.
 */

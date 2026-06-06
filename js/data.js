/** =============================================
    data.js  –  Dummy-Daten für alle Kategorien
    Später durch echte API-Antworten ersetzbar.
   ============================================= */

const dummyData = {
    heroCopy: {
        title: "Hero Copy",
        icon: "📝",
        badgeClass: "badge-heroCopy",
        content: [
            "**Headline:** \"Verwalte deine Zeit wie ein Profi – automatisch.\"",
            "**Subheadline:** \"Endlich eine Zeiterfassung, die mitdenkt. Keine manuellen Einträge, keine vergessenen Stunden.\"",
            "**Value Prop:** Sparst du 5 Stunden pro Woche auf Verwaltung – Zeit, die du in deine Projekte investieren kannst."
        ]
    },
    ctaSuggestions: {
        title: "CTA-Vorschläge",
        icon: "🎯",
        badgeClass: "badge-ctaSuggestions",
        content: [
            "1. \"14 Tage kostenlos testen\" – Soft Commit, geringe Reibung",
            "2. \"Jetzt Demo buchen\" – Für Nutzer, die vor dem Kauf das UI sehen wollen",
            "3. \"Zeit sparen – loslegen\" – Benefit-fokussiert, emotional",
            "4. Sekundär-CTA: \"Preise ansehen\" – Für preis-sensitive Besucher"
        ]
    },
    landingStructure: {
        title: "Landingpage-Struktur",
        icon: "🏗️",
        badgeClass: "badge-landingStructure",
        content: [
            "1. **Hero:** Headline + Sub + Haupt-CTA + Produkt-Screenshot/Video",
            "2. **Social Proof:** 3 Kundenlogos oder ein kurzes Testimonial",
            "3. **Problem/Agitation:** Was kostet dich schlechte Zeiterfassung?",
            "4. **Lösung:** 3 Feature-Highlights mit Symbolen (max. 3 Sätze pro Punkt)",
            "5. **Nutzerberichte:** 2–3 ausführliche Testimonials mit Foto",
            "6. **Preise / FAQ:** Transparenz schafft Vertrauen",
            "7. **Final CTA + Footer:** Wiederhole Haupt-CTA, minimiere Ablenkung"
        ]
    },
    uxAudit: {
        title: "UX-Audit",
        icon: "🔍",
        badgeClass: "badge-uxAudit",
        content: [
            "**Formular-Länge:** Anmeldeformular auf 3 Felder reduzieren (Name, E-Mail, Passwort). Aktuell 6 Felder = zu viel Reibung.",
            "**Navigation:** Die \"Features\"-Seite ist zu lang. Inhalt in 3 Tabs aufsplitten (Automatisierung, Reporting, Team).",
            "**CTA-Kontrast:** Der Sekundär-Button \"Mehr erfahren\" sieht aus wie disabled-Status. Farbe anpassen oder als Link darstellen.",
            "**Mobile:** Auf ≤390 px überlappt der Pricing-Table. Horizontal scrollen oder Card-Layout statt Tabelle.",
            "**Ladezustände:** Kein Feedback beim Speichern eines Timers. Mikro-Animation oder Toast einbauen."
        ]
    },
    abTestIdeas: {
        title: "A/B-Test-Ideen",
        icon: "🧪",
        badgeClass: "badge-abTestIdeas",
        content: [
            "**Test A:** Hero-Headline – Feature-fokussiert vs. Outcome-fokussiert",
            "**Test B:** CTA-Button-Farbe – Primary-Blau vs. Auffälliges Orange/Grün",
            "**Test C:** Social Proof Placement – Über vs. unter dem Hero-Bereich",
            "**Test D:** Preisgestaltung – Monatlich vs. Jährlich als Default (mit Ersparnis-Highlight)",
            "**Test E:** Exit-Intent-Popup – 10 % Rabatt vs. kostenloser Audit/Checkliste"
        ]
    }
};

/**
 * Liefert Dummy-Daten für eine Kategorie zurück.
 * @param {string} category – z.B. 'heroCopy', 'ctaSuggestions', …
 * @param {string} userInput – optional, aktuell nicht genutzt (Platzhalter)
 * @returns {object|null}
 */
export function getDummyData(category, userInput = "") {
    if (!dummyData[category]) return null;
    // Deep-Clone, damit jeder Aufruf unabhängig modifizierbar ist
    const clone = JSON.parse(JSON.stringify(dummyData[category]));
    // Optional: Input dynamisch einbauen (z.B. als Platzhalter ersetzen)
    if (userInput) {
        clone._meta = { userInput };
    }
    return clone;
}

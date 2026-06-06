/** =============================================
    data.js  –  Dummy-Daten mit dynamischem Input
    Ersetzt Platzhalter durch den eingegebenen
    Produkt- / Servicenamen für mehr Kontext.
   ============================================= */

function generateHeroCopy(product) {
    return {
        title: "Hero Copy",
        icon: "📝",
        content: [
            `**Headline:** „${product} – endlich, wie es sein sollte.“`,
            `**Subheadline:** Erlebe ${product} ohne den üblichen Frust. Weniger Verwaltung, mehr Ergebnisse.`,
            `**Value Prop:** Nutzer von ${product} sparen durchschnittlich 5 Stunden pro Woche ein. Zeit, die du in Wachstum investieren kannst.`
        ]
    };
}

function generateCTA(product) {
    return {
        title: "CTA-Vorschläge",
        icon: "🎯",
        content: [
            `1. „${product} kostenlos testen“ – Soft Commit, geringe Reibung`,
            `2. „Jetzt Demo für ${product} buchen“ – Für Nutzer, die vor dem Kauf das UI sehen wollen`,
            `3. „Mit ${product} starten“ – Benefit-fokussiert, emotional`,
            `4. Sekundär-CTA: „Preise für ${product} ansehen“ – Für preis-sensitive Besucher`
        ]
    };
}

function generateLandingStructure(product) {
    return {
        title: "Landingpage-Struktur",
        icon: "🏗️",
        content: [
            `1. **Hero:** Headline + Sub + Haupt-CTA + ${product}-Screenshot/Video`,
            `2. **Social Proof:** 3 Kundenlogos oder ein kurzes Testimonial zu ${product}`,
            `3. **Problem/Agitation:** Was kostet dich das Fehlen von ${product}?`,
            `4. **Lösung:** 3 Feature-Highlights mit Symbolen (max. 3 Sätze pro Punkt)`,
            `5. **Nutzerberichte:** 2–3 ausführliche Testimonials zu ${product}`,
            `6. **Preise / FAQ:** Transparenz schafft Vertrauen bei ${product}-Interessenten`,
            `7. **Final CTA + Footer:** Wiederhole Haupt-CTA, minimiere Ablenkung`
        ]
    };
}

function generateUXAudit(product) {
    return {
        title: "UX-Audit",
        icon: "🔍",
        content: [
            `**Formular-Länge:** Das Anmeldeformular für ${product} auf 3 Felder reduzieren (Name, E-Mail, Passwort). Aktuell 6 Felder = zu viel Reibung.`,
            `**Navigation:** Die „Features“-Seite von ${product} ist zu lang. Inhalt in 3 Tabs aufsplitten (Core, Advanced, Team).`,
            `**CTA-Kontrast:** Der Sekundär-Button „Mehr erfahren“ bei ${product} sieht aus wie disabled-Status. Farbe anpassen oder als Link darstellen.`,
            `**Mobile:** Auf ≤390 px überlappt der Pricing-Table von ${product}. Horizontal scrollen oder Card-Layout statt Tabelle.`,
            `**Ladezustände:** Kein Feedback beim Speichern in ${product}. Mikro-Animation oder Toast einbauen.`
        ]
    };
}

function generateABTests(product) {
    return {
        title: "A/B-Test-Ideen",
        icon: "🧪",
        content: [
            `**Test A:** Hero-Headline für ${product} – Feature-fokussiert vs. Outcome-fokussiert`,
            `**Test B:** CTA-Button-Farbe auf der ${product}-Seite – Primary-Blau vs. Auffälliges Orange/Grün`,
            `**Test C:** Social Proof Placement im ${product}-Onboarding – Über vs. unter dem Hero-Bereich`,
            `**Test D:** Preisgestaltung für ${product} – Monatlich vs. Jährlich als Default (mit Ersparnis-Highlight)`,
            `**Test E:** Exit-Intent-Popup für ${product} – 10 % Rabatt vs. kostenloser Audit/Checkliste`
        ]
    };
}

const generators = {
    heroCopy: generateHeroCopy,
    ctaSuggestions: generateCTA,
    landingStructure: generateLandingStructure,
    uxAudit: generateUXAudit,
    abTestIdeas: generateABTests,
};

/**
 * Liefert Dummy-Daten für eine Kategorie zurück.
 * Der Produktname wird dynamisch in die Texte eingesetzt.
 * @param {string} category
 * @param {string} userInput – Produkt / Service
 * @returns {object|null}
 */
export function getDummyData(category, userInput = "") {
    const generator = generators[category];
    if (!generator) return null;

    const product = userInput.trim() || "dein Produkt";
    const data = generator(product);

    return {
        ...data,
        _meta: { userInput },
    };
}

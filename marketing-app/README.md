# ✨ Marketing & UI/UX Assistent

Eine responsive, modulare Web-App für strategische Marketing- und UI/UX-Ideen. Links das Formular, rechts die Ergebnis-Karten – aufgebaut wie ein Assistent. Bereit für die Anbindung eines LLMs.

> **Status:** V1 mit Dummy-Daten. Die Architektur trennt Eingabe, Ausgabe und Logik sauber, damit ein LLM-Backend (Continue, Claude, OpenAI etc.) später nahtlos eingehängt werden kann.

---

## 🖼️ Vorschau

Die App nutzt ein zweispaltiges Layout:

- **Links:** Interaktives Formular mit Projekt-Eingabe, Zielgruppe und Bereichsauswahl.
- **Rechts:** Staggered-Animation-Karten mit generierten Ideen (Hero Copy, CTA, Landingpage, UX-Audit, A/B-Tests).

Optimiert für Desktop, Tablet und Mobile.

---

## 🚀 Features

| Bereich | Beschreibung |
|---------|--------------|
| **📝 Hero Copy** | Headline, Subheadline und Value Proposition |
| **🎯 CTA-Vorschläge** | Primäre und sekundäre Call-to-Actions mit Strategie-Kontext |
| **🏗️ Landingpage-Struktur** | Best-Practice-Aufbau einer LP in 7 Schritten |
| **🔍 UX-Audit** | Konkrete, priorisierte UX-Feedback-Punkte |
| **🧪 A/B-Test-Ideen** | Testbare Hypothesen für Experimente |

- ✅ **Responsive Grid:** Sidebar + Content nebeneinander auf Desktop, gestapelt auf Mobile.
- ✅ **Kategorien-Toggles:** Einzelne Bereiche lassen sich ein- und ausblenden.
- ✅ **Staggered-Animation:** Karten erscheinen nacheinander mit sanftem Slide-In.
- ✅ **Tailwind CSS:** Utility-First, kein Build-Step nötig.
- ✅ **ES Modules:** Moderne, kapselte JavaScript-Architektur.

---

## 🛠 Tech Stack

- **HTML5** – semantisches Markup
- **Tailwind CSS** (via CDN) – Utility-First Styling
- **Vanilla JavaScript (ES Modules)** – keine Framework-Abhängigkeit
- **Lokaler Webserver** empfohlen (z.B. `python3 -m http.server`)

---

## 📁 Projektstruktur

```
marketing-app/
├── index.html              # Einstiegspunkt, UI-Markup
├── css/
│   └── styles.css          # Karten-Animationen, Scrollbar-Styling
├── js/
│   ├── app.js              # Einstiegspunkt, Initialisierung
│   ├── api.js              # 🔌 Daten-Schnittstelle (aktuell Dummy, später LLM)
│   ├── data.js             # Statische Dummy-Daten für alle 5 Bereiche
│   ├── form.js             # Formular-Handling, Validation, Status-Meldungen
│   └── renderer.js         # DOM-Ausgabe, Tailwind-basierte Karten-Generierung
└── README.md               # Diese Datei
```

### Architektur-Prinzip: Saubere Trennung

| Schicht | Datei(en) | Verantwortung |
|---------|-----------|---------------|
| **Eingabe** | `form.js` | Sammelt User-Input, validiert, triggert API-Aufruf |
| **Logik** | `api.js`, `data.js` | Beschafft Daten (Dummy oder echter API-Call) |
| **Ausgabe** | `renderer.js` | Rendert Karten ins DOM, kennt keine Business-Logik |

Dadurch lässt sich `api.js` später austauschen, ohne `form.js` oder `renderer.js` anzufassen.

---

## 💻 Lokale Entwicklung

### 1. Repository klonen oder Ordner öffnen

```bash
cd marketing-app
```

### 2. Lokalen Server starten

Da ES Modules verwendet werden, empfiehlt sich ein lokaler Server:

```bash
# Python 3
python3 -m http.server 8765

# Node.js (falls npx verfügbar)
npx serve .

# Oder mit den Live Server Extension in VS Code
```

### 3. Im Browser öffnen

[http://localhost:8765](http://localhost:8765)

---

## 🌐 Deployment

### GitHub Pages (Empfohlen)

Da die App rein statisch ist, reicht GitHub Pages völlig aus:

```bash
# Im marketing-app/ Ordner:
git init
git add .
git commit -m "feat: init marketing assistant"

# Auf GitHub pushen (zuvor leeres Repo erstellen)
git remote add origin https://github.com/DEIN_USERNAME/marketing-assistant.git
git push -u origin main
```

Dann in den **Repository-Einstellungen** → **Pages** → Branch `main`, Folder `/ (root)` auswählen.

Live-URL: `https://dein-username.github.io/marketing-assistant/`

### Alternative: Netlify Drop

1. [app.netlify.com/drop](https://app.netlify.com/drop) öffnen
2. Den `marketing-app`-Ordner per **Drag & Drop** hochladen
3. Sofort live – keine Konfiguration nötig

---

## 🔌 LLM-Anbindung

Die App ist vorbereitet für die Integration eines Sprachmodells. Austauschpunkt: `js/api.js`.

### Aktueller Ablauf (Dummy)

```js
// js/api.js
export async function fetchIdeas({ product, targetGroup, categories }) {
    await delay(800); // Simulierte Netzwerk-Latenz
    return categories.map(cat => getDummyData(cat, product));
}
```

### Zukünftiger Ablauf (z.B. Claude, OpenAI, Continue)

1. **In `js/api.js`** den `fetchIdeas`-Body austauschen:

```js
export async function fetchIdeas({ product, targetGroup, categories }) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": DEIN_API_KEY,
            "Content-Type": "application/json",
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-3-sonnet-20240229",
            max_tokens: 2048,
            messages: [{
                role: "user",
                content: buildPrompt(product, targetGroup, categories)
            }]
        })
    });
    const json = await response.json();
    return parseLLMResponse(json); // Muss gleiche Struktur wie Dummy liefern
}
```

2. **Rückgabeformat beibehalten:**

```js
{
    id: "heroCopy-1686123456789-abc12",
    category: "heroCopy",
    title: "Hero Copy",
    icon: "📝",
    content: ["**Headline:** ...", "**Subheadline:** ..."],
    timestamp: "2026-06-06T14:30:00.000Z",
    confidence: 94 // 0–100
}
```

`renderer.js` und `form.js` bleiben unverändert, solange das Format passt.

### Sicherheitshinweis

API-Keys sollten **niemals** client-seitig im Klartext liegen. Für Produktion empfiehlt sich ein kleines Backend (z.B. Vercel Edge Function, Cloudflare Worker), das als Proxy dient und den Key serverseitig hält.

---

## 🎨 Design-Entscheidungen

- **Tailwind CDN:** Kein Build-Step nötig, sofort einsatzbereit.
- **Keine generischen AI-Layouts:** Statt Farbverläufe und abstrakte Illustrationen setzen wir auf klare Typografie, funktionale Farben (Slate/Indigo) und viel Weißraum.
- **Visuelle Hierarchie:** Kleine, uppercase Labels (`text-[11px] tracking-wider`) für Formular-Felder; große, fette Karten-Titel; `tabular-nums` für Zeitstempel und Prozentzahlen.
- **Micro-Interaktionen:** Category-Toggles färben sich bei Auswahl ein; Karten heben sich bei Hover leicht ab.

---

## 📝 To-Do / Roadmap

- [ ] Tatsächliche LLM-Anbindung über Proxy-Backend
- [ ] Prompt-Template je Kategorie optimieren
- [ ] Export-Funktion für Ergebnisse (Markdown / PDF)
- [ ] Persistenz: Letzte 10 Anfragen im `localStorage`
- [ ] Dark Mode Toggle

---

## 📄 Lizenz

MIT – frei nutzbar, veränderbar und erweiterbar.

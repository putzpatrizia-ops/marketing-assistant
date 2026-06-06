/** =============================================
    renderer.js  –  Tailwind-basierte DOM-Ausgabe
   ============================================= */

const container = document.getElementById("cards-container");
const emptyState = document.getElementById("empty-state");

/**
 * Entfernt alle vorhandenen Karten und zeigt Empty-State.
 */
export function clearOutput() {
    container.innerHTML = "";
    container.appendChild(emptyState);
    emptyState.classList.remove("hidden");
}

/**
 * Rendert eine einzelne Idee als Karte.
 * @param {object} idea – Ergebnisobjekt aus api.js
 */
export function renderCard(idea) {
    emptyState.classList.add("hidden");

    const card = document.createElement("article");
    card.className =
        "bg-white border border-ink-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 animate-card-in";
    card.setAttribute("data-category", idea.category);

    card.innerHTML = `
        <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-8 h-8 flex items-center justify-center rounded-md bg-ink-100 text-base flex-shrink-0">${escapeHtml(idea.icon)}</span>
                <h3 class="text-sm font-bold text-ink-900 truncate">${escapeHtml(idea.title)}</h3>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${badgeBgClass(idea.category)} ${badgeTextClass(idea.category)} flex-shrink-0">
                ${CategoryLabel(idea.category)}
            </span>
        </div>

        <div class="text-sm text-ink-700 leading-relaxed space-y-2">
            ${renderContent(idea.content)}
        </div>

        <footer class="mt-4 pt-3 border-t border-ink-100 flex items-center justify-between">
            <span class="text-[11px] tabular-nums text-ink-400 font-mono">${formatTime(idea.timestamp)}</span>
            ${renderConfidence(idea.confidence)}
        </footer>
    `;

    container.appendChild(card);
}

/* ---- Hilfsfunktionen --------------------------------------------- */

function badgeBgClass(cat) {
    const map = {
        heroCopy: "bg-blue-50",
        ctaSuggestions: "bg-emerald-50",
        landingStructure: "bg-amber-50",
        uxAudit: "bg-rose-50",
        abTestIdeas: "bg-indigo-50",
    };
    return map[cat] || "bg-ink-100";
}

function badgeTextClass(cat) {
    const map = {
        heroCopy: "text-blue-700",
        ctaSuggestions: "text-emerald-700",
        landingStructure: "text-amber-800",
        uxAudit: "text-rose-700",
        abTestIdeas: "text-indigo-700",
    };
    return map[cat] || "text-ink-600";
}

function CategoryLabel(cat) {
    const map = {
        heroCopy: "Hero Copy",
        ctaSuggestions: "CTA",
        landingStructure: "LP-Struktur",
        uxAudit: "UX-Audit",
        abTestIdeas: "A/B-Tests",
    };
    return map[cat] || cat;
}

function renderContent(content) {
    if (!Array.isArray(content)) {
        return `<p>${escapeHtml(String(content))}</p>`;
    }

    const items = content.map((line) => {
        const html = escapeHtml(line).replace(
            /\*\*(.+?)\*\*/g,
            "<strong>$1</strong>"
        );
        return `<li class='flex gap-2'><span class='text-ink-400 select-none'>→</span><span>${html}</span></li>`;
    });

    return `<ul class="space-y-1.5">${items.join("")}</ul>`;
}

function renderConfidence(confidence) {
    const pct = Math.max(0, Math.min(100, confidence));
    return `
        <div class="flex items-center gap-2" title="Relevanz: ${pct}%">
            <span class="text-[11px] font-semibold text-ink-500 tabular-nums">${pct}%</span>
            <div class="w-16 h-1.5 bg-ink-200 rounded-full overflow-hidden">
                <div class="h-full bg-ink-800 rounded-full" style="width: ${pct}%"></div>
            </div>
        </div>
    `;
}

function formatTime(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "";
    }
}

function escapeHtml(text) {
    if (typeof text !== "string") return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

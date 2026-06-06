/** =============================================
    form.js  –  Formular-Handling mit Tailwind-Klassen
   ============================================= */

import { fetchIdeas } from "./api.js";
import { renderCard, clearOutput } from "./renderer.js";

const form = document.getElementById("idea-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = submitBtn.querySelector(".btn-text");
const btnLoader = submitBtn.querySelector(".btn-loader");
const statusBar = document.getElementById("status-bar");
const clearBtn = document.getElementById("clear-btn");
const productInput = document.getElementById("product-input");
const targetGroupInput = document.getElementById("target-group");

/**
 * Initialisiert alle Interaktionen.
 */
export function initForm() {
    form.addEventListener("submit", handleSubmit);

    clearBtn.addEventListener("click", () => {
        clearOutput();
        setStatus("Alle Ergebnisse gelöscht.", "info");
    });

    productInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            form.requestSubmit();
        }
    });

    // Category-Toggle-Buttons: Klick auf Button toggelt Checkbox
    document.querySelectorAll(".category-toggle").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (e.target.tagName === "INPUT") return; // Checkbox selbst geklickt
            const checkbox = btn.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            styleToggle(btn, checkbox.checked);
        });

        const checkbox = btn.querySelector('input[type="checkbox"]');
        styleToggle(btn, checkbox.checked);
    });
}

function styleToggle(btn, isChecked) {
    if (isChecked) {
        btn.classList.add("border-indigo-550", "bg-indigo-50/60");
        btn.classList.remove("border-ink-200", "bg-ink-50/50");
    } else {
        btn.classList.remove("border-indigo-550", "bg-indigo-50/60");
        btn.classList.add("border-ink-200", "bg-ink-50/50");
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const product = productInput.value.trim();
    const targetGroup = targetGroupInput.value.trim();
    const checkedBoxes = form.querySelectorAll('input[name="category"]:checked');
    const categories = Array.from(checkedBoxes).map((cb) => cb.value);

    if (!product) {
        setStatus("Bitte gib ein Produkt oder Service ein.", "error");
        productInput.focus();
        return;
    }
    if (categories.length === 0) {
        setStatus("Wähle mindestens einen Bereich aus.", "error");
        return;
    }

    setLoading(true);
    setStatus(`Generiere ${categories.length} Bereich(e) für „${product}“…`, "info");

    try {
        const results = await fetchIdeas({ product, targetGroup, categories });

        if (results.length === 0) {
            setStatus("Keine Ergebnisse gefunden.", "error");
        } else {
            results.forEach(renderCard);
            setStatus(
                `${results.length} Bereich(e) erfolgreich generiert.`,
                "success"
            );
        }
    } catch (err) {
        console.error(err);
        setStatus("Fehler beim Abrufen der Daten. Siehe Konsole.", "error");
    } finally {
        setLoading(false);
    }
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.classList.toggle("hidden", isLoading);
    if (isLoading) {
        btnLoader.classList.remove("hidden");
        btnLoader.classList.add("flex");
    } else {
        btnLoader.classList.add("hidden");
        btnLoader.classList.remove("flex");
    }
}

/**
 * @param {"info"|"success"|"error"} type
 */
function setStatus(message, type = "info") {
    statusBar.classList.remove("hidden");
    statusBar.textContent = message;

    const base = "text-xs font-medium rounded-md px-3 py-2 mt-2 ";
    const themes = {
        info:    "bg-blue-50 text-blue-700 border border-blue-200",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        error:   "bg-rose-50 text-rose-700 border border-rose-200",
    };

    statusBar.className = `status-bar ${base} ${themes[type]}`;
}

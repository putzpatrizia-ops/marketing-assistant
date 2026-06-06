/** =============================================
    app.js  –  Einstiegspunkt der Anwendung
   ============================================= */

import { initForm } from "./form.js";

function main() {
    initForm();
    console.log("[Marketing Assistent] Bereit. LLM-Integration via js/api.js möglich.");
}

document.addEventListener("DOMContentLoaded", main);

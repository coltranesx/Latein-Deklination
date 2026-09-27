# 🏛️ Latein Deklinationstrainer (v2.0)
*Interaktiver Deklinations-Coach für das bayerische & deutsche Gymnasium (Klasse 6-8)*

[![Gymnasium Klasse 8](https://img.shields.io/badge/Gymnasium-Klasse%208-blue.svg)](https://de.wikipedia.org/wiki/Gymnasium)
[![Latein](https://img.shields.io/badge/Latein-Deklinationen-red.svg)](https://de.wikipedia.org/wiki/Lateinische_Grammatik)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ein modernes, mobilfreundliches und didaktisch fundiertes Web-Trainingsprogramm zur sicheren Beherrschung der lateinischen Substantiv-Deklinationen. Entwickelt nach den Lehrplänen gängiger Schulbücher (*Adeamus!*, *Campus*, *Felix Neu*, *Prima*).

---

## ✨ Features & Didaktik

1. **Vollständige Deklinationsabdeckung:**
   - **a-Deklination** (z.B. *amica, puella, rosa* / *nauta m.*)
   - **o-Deklination Maskulina** auf *-us* & *-er* (z.B. *dominus, servus* / *puer, ager, magister*)
   - **o-Deklination Neutra** auf *-um* (z.B. *templum, oppidum, donum, bellum*)
   - **3. Deklination (Konsonantisch):** Maskulina/Feminina & Neutra (z.B. *rex, miles, consul* / *corpus, tempus*)
   - **3. Deklination (i-Stamm & Mischstamm):** Maskulina/Feminina & Neutra (z.B. *civis, urbs, mors* / *mare, animal*)
   - **4. (u-) Deklination:** Maskulina & Neutra (z.B. *senatus, exercitus* / *cornu*)
   - **5. (e-) Deklination:** (z.B. *res, dies, spes, fides*)
2. **Kategori-Auswahl vor Rundenstart:** Du entscheidest selbst, welche Deklinationsklassen du in der 10-Fragen-Runde üben möchtest.
3. **15-Sekunden-Timer & Joker:** Dynamischer Countdown pro Frage mit 1 strategischen **Passen-Recht** (ohne Punktabzug).
4. **Lehrer-Feedback & didaktische Analyse:**
   - Sofortige Begründung mit Merksätzen (*Neutrum-Gesetz*, *i-Stamm Besonderheiten*, *Genitiv als Stammform*).
   - Detaillierte Auswertung am Rundenende mit Erkennung von Wissenslücken.
5. **Modernes Audio- & Theme-System:**
   - Dark / Light Theme Umschalter mit Speicherung im Browser.
   - Dezente Hintergrundmusik & Soundeffekte (abschaltbar).
   - Festliche Konfetti-Animation bei Meisterleistung.

---

## 🚀 Live Demo / GitHub Pages

Die Anwendung ist online live verfügbar unter:  
👉 **[https://coltranesx.github.io/Latein-Deklination/](https://coltranesx.github.io/Latein-Deklination/)**

GitHub Pages ist für dieses Repository bereits eingerichtet und einsatzbereit.

---

## 🛠️ Lokale Ausführung

Einfach die Datei `index.html` in einem beliebigen modernen Webbrowser öffnen oder mit einem lokalen HTTP-Server starten:

```bash
# Mit Python:
python3 -m http.server 8080

# Mit Node.js npx:
npx serve .
```

---

## 🧪 Automatische Grammatikprüfung

Das Projekt enthält eine integrierte Testsuite zur mathematischen Verifizierung aller Formen:

```bash
node scratch/verify_declensions.js
```
Ergebnis: Über **570 Formen** werden auf Konsistenz (u.a. `civium`, `urbium`, `corpora`, `maria`, `agri`, `cornua`) geprüft.

---

## 📜 Lizenz

Open-Source unter der [MIT-Lizenz](LICENSE).

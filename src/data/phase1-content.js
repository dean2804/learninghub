// ============================================================
// VOLLSTÄNDIGE LERNINHALTE - Phase 1: Fundament
// Jedes Modul hat detaillierte Lektionen im Layer-1-Stil
// ============================================================

export const PHASE1_CONTENT = {

  "llm-basics": {
    title: "LLMs, Modelle & Token",
    layerLevel: 1,
    estimatedMinutes: 45,
    steps: [
      {
        title: "Was ist ein LLM überhaupt?",
        content: `LLM steht für **Large Language Model** — ein großes Sprachmodell. Der Name verrät schon viel:

**Large** = riesig. Milliarden von Parametern (dazu gleich mehr).
**Language** = es arbeitet mit Sprache. Text rein, Text raus.
**Model** = ein mathematisches Modell. Keine Datenbank, kein Regelwerk — ein Wahrscheinlichkeitsrechner.

**Die Kernidee ist verblüffend einfach:** Ein LLM macht nichts anderes als das nächste Wort vorherzusagen. Immer und immer wieder. Wort für Wort.

Wenn du eingibst: *"Der Lieferant hat die Ware zu spät..."* — berechnet das Modell: Was kommt am wahrscheinlichsten als nächstes? → *"...geliefert."* Dann: Was kommt danach? → *"Dies führte zu..."* Und so weiter.`,
        analogy: `Stell dir einen Mitarbeiter vor, der 10 Jahre lang alle E-Mails, Berichte, Verträge und Protokolle in deinem Unternehmen gelesen hat. Er hat kein Fach *verstanden* — aber er hat gelernt, wie Sprache in bestimmten Kontexten funktioniert. Wenn du ihn bittest, eine Reklamation zu formulieren, klingt es perfekt — weil er tausende davon gelesen hat. Genau so funktioniert ein LLM, nur mit dem gesamten Internet als "Posteingang".`,
        consultingRelevance: `Wenn ein Kunde fragt "Versteht die KI unsere Prozesse?" — dann ist die ehrliche Antwort: Nein, sie versteht nichts. Sie erkennt Muster und erzeugt statistisch plausible Antworten. Das ist gleichzeitig ihre Stärke (extrem flexibel) und ihre Schwäche (kann überzeugend falsch liegen).`
      },
      {
        title: "Token — die Währung der KI",
        content: `LLMs lesen keine Wörter. Sie lesen **Token**. Das ist die kleinste Einheit, in der ein Modell "denkt".

**Faustregel:** 1 Token ≈ ¾ eines deutschen Wortes. Oder andersrum: 100 Wörter ≈ 130 Token.

Warum nicht einfach ganze Wörter? Weil das Modell effizienter arbeitet, wenn es Wörter in Bausteine zerlegt. Das Wort "Lieferantenmanagement" wird zum Beispiel in mehrere Token zerlegt: "Liefer" + "anten" + "management". So kann das Modell auch Wörter verarbeiten, die es noch nie gesehen hat — weil es die Bausteine kennt.

**Warum dich Token interessieren müssen — drei Gründe:**

**1. Kosten:** Du zahlst pro Token. Bei der Claude API zahlst du für Input-Token (was du reinschickst) UND Output-Token (was zurückkommt). Wenn du für einen Kunden eine Lösung baust, die 10.000 Anfragen pro Monat verarbeitet, bestimmt die Token-Menge deine laufenden Kosten.

**2. Context Window:** Jedes Modell hat ein begrenztes "Arbeitsfenster" — das Context Window. Bei Claude sind das aktuell rund 200.000 Token. Das ist wie der Schreibtisch des Modells: Alles was drauf passt, kann es sehen und verarbeiten. Was nicht drauf passt, existiert für das Modell nicht. 200.000 Token klingt viel — das sind ungefähr 150.000 Wörter, also ein dickes Buch. Aber wenn du 500 Lieferantenverträge gleichzeitig analysieren willst, reicht das nicht. Genau dafür gibt es dann RAG.

**3. Qualität:** Je mehr relevanter Kontext du in das Context Window packst, desto bessere Antworten bekommst du. Aber Achtung: Irrelevanter Kontext verschlechtert die Ergebnisse. Es ist wie bei einem Briefing — präzise ist besser als umfangreich.`,
        analogy: `Token sind wie Legosteine: Das Wort "Lieferantenmanagement" ist kein einzelner Stein, sondern drei zusammengesteckte Teile. Das Modell kennt die einzelnen Teile und kann sie in neuen Kombinationen zusammensetzen — auch für Wörter, die es noch nie gesehen hat.`,
        consultingRelevance: `Bei der Kalkulation einer KI-Lösung für einen Kunden brauchst du eine Token-Schätzung: Wie viele Anfragen pro Tag? Wie lang ist jede Anfrage? Wie lang die Antwort? Daraus ergeben sich die monatlichen API-Kosten — und die müssen in den Business Case.`
      },
      {
        title: "Modelle — nicht alle 'Praktikanten' sind gleich",
        content: `Es gibt nicht "die eine KI". Es gibt verschiedene **Modelle** von verschiedenen Anbietern, und sie unterscheiden sich erheblich:

**Claude (Anthropic):** Kommerziell, API-basiert. Stark in Analyse, Schreiben, Coding. Sehr großes Context Window. Sehr gut für Beratungslösungen.

**GPT-4 (OpenAI):** Kommerziell, API-basiert. Breites Angebot, starkes Plugin-Ökosystem. Gut im Microsoft-Ökosystem (Azure OpenAI).

**Llama (Meta):** Open Source. Kann selbst gehostet werden — wichtig für DSGVO, weil Daten das Unternehmen nicht verlassen. Ideal für On-Premise-Szenarien.

**Gemini (Google):** Kommerziell, multimodal (Text, Bild, Video). Großes Context Window. Gut im Google-Ökosystem.

**Parameter** sind die "Synapsen" des Modells — je mehr, desto leistungsfähiger, aber auch teurer und langsamer. Größer ist nicht immer besser — für einfache Aufgaben (E-Mail klassifizieren) reicht ein kleines, schnelles Modell. Für komplexe Analyse brauchst du ein großes.`,
        analogy: `Wie verschiedene Beratungshäuser: McKinsey (GPT-4) ist der Platzhirsch mit dem breitesten Angebot. Anthropic (Claude) ist der Spezialist für tiefgehende Analyse. Ein freier Berater (Llama) ist flexibler und günstiger, braucht aber mehr Eigenleistung bei der Einarbeitung.`,
        consultingRelevance: `Die Modellwahl ist eine Architektur-Entscheidung mit vier Faktoren: Kosten pro Token, Qualität der Antworten, Geschwindigkeit, und Datenschutz. Ein SAP-Kunde mit Microsoft-Landschaft? GPT/Azure liegt nahe. Ein Mittelständler mit strengen DSGVO-Anforderungen? Llama on-premise oder Claude mit EU-Hosting.`
      },
      {
        title: "Training vs. Inference — der teure und der günstige Teil",
        content: `Zwei Phasen, die du auseinanderhalten musst:

**Training** = Das Modell lernt. Es verarbeitet Milliarden von Texten und passt seine Milliarden Parameter an. Das dauert Wochen, kostet Millionen Dollar und braucht tausende Spezial-Chips (GPUs). Das machen Anthropic, OpenAI und Co. — nicht du und nicht dein Kunde.

**Inference** = Das Modell arbeitet. Bei jeder Anfrage, die du an die API schickst, nutzt das Modell seine gelernten Parameter, um eine Antwort zu berechnen. Das dauert Sekunden und kostet Cent-Bruchteile.

Manchmal sagt ein Kunde: "Können wir nicht unser eigenes Modell trainieren?" Die Antwort ist fast immer: Nein, das brauchen Sie nicht. Was Sie brauchen ist **Fine-Tuning** (ein bestehendes Modell mit eigenen Daten nachschärfen) oder — noch wahrscheinlicher — **RAG** (dem Modell bei jeder Anfrage die relevanten Firmendaten mitgeben). Beides ist um Größenordnungen günstiger als eigenes Training.`,
        analogy: `Training ist wie die Ausbildung eines Arztes — 10 Jahre, extrem teuer. Inference ist der Arztbesuch — 15 Minuten, bezahlbar. Du zahlst nicht die Ausbildung, du zahlst die Konsultation.`,
        consultingRelevance: `Wenn ein Kunde "eigenes KI-Modell" sagt, meint er fast nie eigenes Training. Er meint: "Die KI soll mit unseren Daten arbeiten." Das ist RAG, nicht Training. Diese Klarstellung spart deinem Kunden potenziell hunderttausende Euro an falsch investiertem Budget.`
      },
      {
        title: "Temperatur und Halluzination — die zwei Stolperfallen",
        content: `**Temperatur** ist ein Parameter, den du bei API-Aufrufen einstellen kannst. Er steuert, wie "kreativ" vs. "vorhersagbar" das Modell antwortet:

**Temperatur 0** = Das Modell wählt immer das wahrscheinlichste nächste Wort. Sehr konsistent, aber manchmal monoton. Gut für Datenanalyse, Klassifizierung, Faktenextraktion.

**Temperatur 1** = Das Modell wählt auch weniger wahrscheinliche Wörter. Kreativere Antworten, aber auch mehr Varianz. Gut für Texterstellung, Brainstorming.

Für Unternehmenslösungen willst du meistens eine **niedrige Temperatur** (0 bis 0.3) — weil Konsistenz und Zuverlässigkeit wichtiger sind als Kreativität.

**Halluzination** ist das Hauptrisiko im Unternehmenseinsatz: Das Modell erfindet etwas, das plausibel klingt, aber falsch ist. Es sagt dir mit voller Überzeugung, dass Lieferant X eine ISO-Zertifizierung hat — obwohl das nicht stimmt.

**Gegenmaßnahmen:**
- **RAG:** Das Modell antwortet nur basierend auf mitgelieferten Dokumenten
- **Quellenangaben:** Das Modell muss angeben, woher seine Information kommt
- **Human-in-the-Loop:** Kritische Entscheidungen werden immer von einem Menschen geprüft
- **Guardrails im Prompt:** "Wenn du dir nicht sicher bist, sage 'Ich kann das nicht verifizieren'"`,
        analogy: `Temperatur ist wie der Regler zwischen einem Buchhalter (Temperatur 0 — immer korrekt, nie kreativ) und einem Brainstorming-Moderator (Temperatur 1 — viele Ideen, nicht alle realistisch). Für Buchhaltung willst du den Buchhalter, für Ideenfindung den Moderator.`,
        consultingRelevance: `Halluzinationen sind der häufigste Einwand gegen KI im Mittelstand. Dein Job ist nicht zu sagen "Das passiert nicht", sondern "So gehen wir damit um". Die Kombination aus RAG + Quellenangaben + Human-in-the-Loop reduziert das Risiko auf ein beherrschbares Maß.`
      }
    ],
    gfSummary: `"KI-Sprachmodelle wie Claude sind im Grunde extrem leistungsfähige Textverarbeitungsmaschinen. Sie haben aus Milliarden von Texten gelernt, Muster zu erkennen und plausible Antworten zu erzeugen. Sie verstehen nicht wirklich — aber sie können analysieren, zusammenfassen, klassifizieren und formulieren auf einem Niveau, das für viele Geschäftsprozesse enorm wertvoll ist. Die Kunst liegt darin, sie richtig einzusetzen: mit den richtigen Daten füttern, klare Anweisungen geben, und immer eine menschliche Kontrolle einbauen."`
  },

  "api-basics": {
    title: "API-Grundlogik",
    layerLevel: 1,
    estimatedMinutes: 40,
    steps: [
      {
        title: "Was ist eine API?",
        content: `API steht für **Application Programming Interface**. Klingt sperrig, ist aber ein simples Konzept:

**Eine API ist eine standardisierte Tür zwischen zwei Systemen.**

Als du beim Setup \`git push\` gemacht hast, hat dein Terminal über die **GitHub-API** mit Githubs Servern gesprochen. Als Vercel danach automatisch deployed hat, hat Vercel über eine **Webhook-API** den Anstoß bekommen. Und wenn dein LearningHub Notizen speichert, spricht die App über die **Supabase-API** mit der Datenbank.

**Das Grundprinzip ist immer dasselbe:**
System A will etwas von System B → A schickt eine **Anfrage** (Request) in einem definierten Format → B verarbeitet sie und schickt eine **Antwort** (Response) zurück.`,
        analogy: `Stell dir vor, du bist in einem fremden Land und sprichst die Sprache nicht. Aber am Flughafen gibt es einen standardisierten Schalter mit klaren Schildern: "Taxi bestellen", "Hotel buchen", "Information". Du musst nicht die Sprache sprechen — du musst nur wissen, an welchen Schalter du gehst und welches Formular du ausfüllst. Die API ist dieser Schalter.`,
        consultingRelevance: `Wenn ein Kunde sagt "Wir wollen KI in unsere Prozesse integrieren", meint er technisch: "Wir brauchen API-Verbindungen zwischen unseren Systemen und einem KI-Modell." Das Verständnis von APIs ist die Grundlage für jede Integrations-Beratung.`
      },
      {
        title: "HTTP — die Sprache der APIs",
        content: `Fast alle APIs im Web sprechen **HTTP** (Hypertext Transfer Protocol). Das ist die gleiche Sprache, die dein Browser nutzt, wenn du eine Website öffnest.

HTTP hat **vier wichtige Methoden** — denk an sie wie vier verschiedene Formulartypen am Flughafenschalter:

**GET** = "Gib mir etwas." Du fragst nach Daten, änderst nichts.
*Beispiel: "Zeig mir den Fortschritt von Modul 1."*

**POST** = "Hier, nimm etwas Neues." Du schickst neue Daten hin.
*Beispiel: "Speichere diese neue Notiz zu Modul 2."*

**PUT** = "Ändere etwas Bestehendes." Du aktualisierst vorhandene Daten.
*Beispiel: "Ändere den Status von Modul 1 auf 'abgeschlossen'."*

**DELETE** = "Lösch das."
*Beispiel: "Lösche meine Notiz zu Modul 3."*`,
        analogy: `Die vier Methoden sind wie vier Aktionen in einem Aktenschrank: GET = Akte rausnehmen und lesen. POST = neue Akte anlegen. PUT = bestehende Akte aktualisieren. DELETE = Akte schreddern.`,
        consultingRelevance: `Wenn du später eine KI-Lösung für einen Kunden baust, die Daten aus SAP holt und an ein LLM schickt, machst du genau das — GET-Requests an SAP (Daten holen), POST-Requests an die Claude-API (Daten zur Analyse schicken), PUT-Requests an die Datenbank (Ergebnis speichern).`
      },
      {
        title: "Request und Response — was geht hin, was kommt zurück?",
        content: `Jeder API-Aufruf hat zwei Seiten. Am Beispiel eines Claude-API-Aufrufs:

**Der Request (was du schickst) hat drei Teile:**

**1. Die URL** (wohin?): \`https://api.anthropic.com/v1/messages\`
Das ist die Adresse des Schalters. Wie eine Postanschrift mit genauer Abteilung.

**2. Die Headers** (wer bist du?):
Content-Type sagt: "Ich schicke dir JSON." Der API-Key ist dein Ausweis.

**3. Der Body** (was genau?):
Enthält das Modell, deine Nachricht, und weitere Einstellungen.

**Die Response (was zurückkommt) hat auch drei Teile:**

**1. Status-Code** (hat es geklappt?):
- 200 OK = Alles gut
- 401 Unauthorized = Falscher API-Key
- 404 Not Found = Falsche URL
- 429 Too Many Requests = Zu viele Anfragen
- 500 Internal Server Error = Serverproblem

**Merkregel: 2xx = gut, 4xx = dein Fehler, 5xx = deren Fehler.**

**2. Response Headers** (Metadaten): Z.B. Token-Verbrauch.

**3. Response Body** (die eigentliche Antwort): Die Daten die du wolltest.`,
        analogy: `Wie ein Einschreiben bei der Post: Der Umschlag (Headers) sagt wer schickt und wer empfängt. Der Brief (Body) ist der eigentliche Inhalt. Die Empfangsbestätigung (Status-Code) sagt dir ob angekommen oder nicht.`,
        consultingRelevance: `Wenn ein Kunde sagt "Die KI-Anbindung funktioniert nicht", ist das erste was du fragst: "Welchen Status-Code bekommt ihr?" 401 = API-Key falsch. 429 = Rate Limit erreicht. 500 = Problem beim Anbieter. Der Status-Code ist dein Diagnosewerkzeug.`
      },
      {
        title: "JSON — die gemeinsame Sprache",
        content: `**JSON** (JavaScript Object Notation) ist das Standard-Datenformat der API-Welt. Fast jede moderne API spricht JSON.

Es ist einfach aufgebaut — Schlüssel-Wert-Paare:

\`\`\`json
{
  "name": "Dean Dukic",
  "rolle": "SCM-Berater",
  "erfahrung_jahre": 26,
  "sprachen": ["Deutsch", "Englisch"],
  "aktiv": true
}
\`\`\`

Die Regeln sind simpel: Text in Anführungszeichen, Zahlen ohne. Listen in eckigen Klammern. Verschachtelung möglich.

**Warum JSON und nicht normaler Text?** Weil Maschinen strukturierte Daten brauchen. Wenn die Claude API antwortet "Das Projekt passt zu 85%", muss dein Code die 85 als Zahl erkennen können — nicht als Teil eines Satzes. JSON macht das eindeutig:

\`\`\`json
{
  "match_score": 85,
  "empfehlung": "Bewerben",
  "begründung": "Hohe Übereinstimmung bei SAP und SCM"
}
\`\`\``,
        analogy: `JSON ist wie ein standardisiertes Bestellformular: Jedes Feld hat einen Namen (Schlüssel) und einen Wert. Jeder kann es lesen, jeder kann es ausfüllen, und die Maschine weiß genau wo welche Information steht.`,
        consultingRelevance: `Wenn du einen Kunden berätst, der KI-Ergebnisse in sein ERP zurückspielen will, ist JSON das Transportformat. SAP versteht JSON (via OData), die KI-API liefert JSON, die Datenbank speichert JSON. Alles spricht dieselbe Sprache.`
      },
      {
        title: "API-Keys und REST — Sicherheit und Designprinzip",
        content: `**API-Keys** sind wie ein Personalausweis mit eingebauter Kreditkarte:

- **Identifikation:** Der Server weiß, wer du bist.
- **Autorisierung:** Der Server weiß, was du darfst.
- **Abrechnung:** Der Server zählt deine Anfragen.

**Die goldene Regel:** API-Keys gehören **niemals** in den Code, der nach GitHub gepusht wird. Deshalb haben wir die Keys in \`.env.local\` gesteckt. Du hast das selbst erlebt, als versehentlich die Supabase-Key-Datei auf GitHub landete — sofort gelöscht!

**REST** (Representational State Transfer) ist das Designprinzip hinter den meisten APIs:

Jede Ressource hat eine eigene Adresse (URL), die HTTP-Methode sagt was damit passiert:
- GET /module_progress → Alle Fortschritte abrufen
- POST /module_progress → Neuen Fortschritt anlegen
- PUT /module_progress/llm-basics → Fortschritt aktualisieren
- DELETE /module_progress/llm-basics → Fortschritt löschen

Deine Supabase-Datenbank stellt automatisch eine REST API bereit. Wenn dein LearningHub den Status eines Moduls speichert, macht er genau solche Aufrufe im Hintergrund.`,
        analogy: `REST ist wie die Logik in einer Bibliothek: Jedes Buch hat eine eindeutige Signatur (URL). "Ausleihen" (GET), "Zurückgeben" (PUT), "Neues Buch anschaffen" (POST), "Aussortieren" (DELETE) — die Aktionen sind standardisiert, die Signatur sagt welches Buch.`,
        consultingRelevance: `Eines der ersten Dinge, die du bei einem Kunden prüfst: "Wie verwaltet ihr eure API-Keys?" Wenn die Antwort "steht im Code" oder "per E-Mail verschickt" ist, hast du direkt den ersten Quick Win: Sauberes Secrets Management einführen.`
      }
    ],
    gfSummary: `"APIs sind standardisierte Schnittstellen zwischen Systemen. Wenn wir eine KI-Lösung bauen, reden wir im Kern über API-Aufrufe: Daten aus dem ERP holen, an das KI-Modell schicken, Ergebnis zurückspeichern — drei API-Calls, das ist die ganze Magie. Die Technik ist ausgereift und standardisiert, das Risiko liegt nicht in der Technologie, sondern in der sauberen Umsetzung."`
  },

  "three-layers": {
    title: "Frontend / Backend / Datenbank",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Die drei Schichten — das Grundmodell",
        content: `Jede Software — egal ob SAP, eine iPhone-App oder dein LearningHub — besteht aus **drei Schichten**:

**Frontend** = Was der Nutzer sieht und bedient. Im Browser ist das HTML (Struktur), CSS (Design) und JavaScript (Interaktion). Technologien wie React (das du jetzt nutzt) machen den Bau von Frontends effizienter.

**Backend** = Die Logik dahinter. Hier werden Anfragen verarbeitet, Regeln angewandt, Berechnungen durchgeführt und mit Datenbanken gesprochen. Technologien: Node.js, Python, Java.

**Datenbank** = Das Langzeitgedächtnis. Speichert alle Daten dauerhaft und strukturiert. Technologien: PostgreSQL (dein Supabase), MySQL, MongoDB.

Diese Trennung ist **kein Zufall**, sondern ein bewährtes Designprinzip: Jede Schicht kann unabhängig geändert werden. Du kannst das Frontend komplett neu gestalten, ohne das Backend anzufassen. Du kannst die Datenbank wechseln, ohne das Frontend zu ändern.`,
        analogy: `Denk an ein Autohaus: Das Showroom (Frontend) ist was der Kunde sieht — schick, einladend, mit klaren Wegen. Das Büro dahinter (Backend) verarbeitet Bestellungen, prüft Lagerbestände, berechnet Preise. Der Aktenschrank (Datenbank) speichert alle Kundendaten, Fahrzeugbestände und Verträge. Jeder Bereich hat spezialisiertes Personal und eigene Werkzeuge.`,
        consultingRelevance: `Wenn ein Kunde sagt "Wir brauchen eine KI-App", fragst du: Wer nutzt sie (Frontend-Anforderungen)? Was soll sie tun (Backend-Logik)? Welche Daten braucht sie (Datenbank-Anbindung)? Diese drei Fragen strukturieren jedes Projekt.`
      },
      {
        title: "Frontend im Detail — was der Nutzer erlebt",
        content: `Das Frontend ist die Schicht, mit der Menschen interagieren. Drei Technologien spielen zusammen:

**HTML** = Die Struktur. Definiert *was* auf der Seite steht: Überschriften, Texte, Buttons, Eingabefelder. Wie der Rohbau eines Hauses.

**CSS** = Das Design. Definiert *wie* es aussieht: Farben, Abstände, Schriftarten, Animationen. Wie die Inneneinrichtung.

**JavaScript** = Die Interaktion. Definiert *was passiert* wenn der Nutzer klickt, tippt oder scrollt. Wie die Elektrik und Mechanik.

**React** (das du im LearningHub nutzt) ist ein Framework, das diese drei kombiniert und in wiederverwendbare **Komponenten** aufteilt. Stell dir vor, du baust ein Dashboard: Statt alles von Grund auf zu bauen, hast du fertige Bausteine — eine Fortschrittsanzeige-Komponente, eine Modul-Karte-Komponente, eine Navigations-Komponente. Die steckst du zusammen wie Lego.

Für KI-Anwendungen ist das Frontend oft ein **Chat-Interface**, ein **Dashboard** oder ein **Formular mit KI-gestützter Auswertung**.`,
        analogy: `React-Komponenten sind wie IKEA-Module: Du kaufst ein Billy-Regal (Komponente), stellst es hin, und es funktioniert. Du kannst mehrere nebeneinander stellen, sie umstellen, oder durch ein Kallax ersetzen — ohne die Wand (Backend) neu zu streichen.`,
        consultingRelevance: `Für den Mittelstand ist das Frontend entscheidend für die Akzeptanz. Die beste KI nutzt nichts, wenn die Oberfläche schlecht ist. "Muss aussehen wie SAP" ist eine häufige Anforderung — oder genau das Gegenteil: "Bitte NICHT wie SAP."`
      },
      {
        title: "Backend im Detail — die unsichtbare Logik",
        content: `Das Backend ist der Maschinenraum. Hier passiert alles, was der Nutzer nicht sieht:

**Geschäftslogik:** Regeln und Berechnungen. "Wenn die Bestellmenge über 1000 liegt, wende Rabatt X an."

**Authentifizierung:** Wer darf was? "Dieser Nutzer ist Einkäufer, er darf Bestellungen anlegen aber keine Verträge ändern."

**API-Koordination:** Das Backend ist oft der Vermittler. Es nimmt eine Anfrage vom Frontend, holt Daten aus der Datenbank, schickt sie an die KI-API, nimmt die Antwort entgegen und gibt das Ergebnis ans Frontend zurück.

**Für KI-Lösungen** ist das Backend besonders wichtig: Hier läuft die RAG-Pipeline (Dokumente suchen, an das LLM schicken), hier werden API-Keys sicher gespeichert, und hier werden die KI-Antworten nachbearbeitet bevor sie den Nutzer erreichen.

Bei deinem LearningHub übernimmt **Supabase** einen Großteil der Backend-Arbeit: Datenbankzugriff, Authentifizierung und API-Bereitstellung — ohne dass du einen eigenen Server betreiben musst.`,
        analogy: `Das Backend ist wie die Küche im Restaurant: Der Gast (Frontend) bestellt, die Küche (Backend) kocht, der Kühlschrank (Datenbank) liefert die Zutaten. Der Gast sieht die Küche nie — aber ohne sie gibt es kein Essen.`,
        consultingRelevance: `Im Mittelstand ist das Backend oft das größte Hindernis: Kein eigenes Entwicklerteam, komplexe IT-Landschaft, Legacy-Systeme. Backend-as-a-Service (Supabase, Firebase) löst vieles davon — aber für SAP-Integration brauchst du oft maßgeschneiderte Middleware.`
      },
      {
        title: "Datenbank — das Langzeitgedächtnis",
        content: `Die Datenbank speichert alles dauerhaft. Ohne sie vergisst die App bei jedem Neuladen alles.

**SQL-Datenbanken** (PostgreSQL, MySQL) speichern Daten in **Tabellen** mit festen Spalten — wie ein perfekt organisierter Aktenschrank. Ideal für strukturierte Geschäftsdaten (Bestellungen, Kunden, Materialstämme). Dein Supabase nutzt PostgreSQL.

**NoSQL-Datenbanken** (MongoDB) speichern Daten als flexible **Dokumente** — wie Mappen, in die du alles werfen kannst. Gut für unstrukturierte Daten (Log-Dateien, Social-Media-Posts).

**Vektor-Datenbanken** (Pinecone, Weaviate, pgvector) sind speziell für KI: Sie speichern **Embeddings** (mathematische Repräsentationen von Text) und können blitzschnell ähnliche Inhalte finden. Das ist die Basis für RAG.

**Wichtig zu verstehen:** Supabase ≠ Vercel. Supabase = Datenbank + Auth + Storage (das Hinterzimmer). Vercel = Hosting (das Schaufenster). Zwei verschiedene Dinge, die zusammenarbeiten.`,
        analogy: `SQL = ein Aktenschrank mit festen Fächern und Registern. Du findest alles sofort, aber neue Fächer einzubauen ist aufwändig. NoSQL = flexible Ordner, in die du alles werfen kannst. Schnell erweitert, aber weniger geordnet. Vektor-DB = ein Bibliothekar, der Bücher nicht nach Alphabet sortiert, sondern nach inhaltlicher Ähnlichkeit gruppiert.`,
        consultingRelevance: `Beim Kunden die richtige Datenbank-Strategie zu empfehlen ist ein wesentlicher Teil der Architektur-Beratung. Faustformel: Geschäftsdaten → SQL. KI-Wissenssuche → Vektor-DB. Oft braucht man beides kombiniert.`
      },
      {
        title: "Edge und die vierte Schicht",
        content: `Neben den klassischen drei Schichten gibt es einen neueren Trend: **Edge Computing**.

Edge bedeutet: Code wird nicht auf einem zentralen Server ausgeführt, sondern **nah am Nutzer** — auf Servern die geographisch verteilt sind. Vercel Edge Functions machen genau das: Wenn jemand in München deine App aufruft, antwortet ein Server in Frankfurt — nicht einer in den USA.

**Warum ist das relevant?**
- **Geschwindigkeit:** Kürzerer Weg = schnellere Antwort.
- **Kosten:** Edge Functions sind oft günstiger als klassische Server.
- **Skalierung:** Verteilt sich automatisch weltweit.

Für KI-Anwendungen kann Edge interessant sein für schnelle Vor-Verarbeitung: Bevor eine Anfrage an die teure KI-API geht, prüft eine Edge Function ob die Anfrage valide ist, ob der Nutzer berechtigt ist, und ob die Antwort vielleicht schon im Cache liegt.

**Diese Drei-plus-eins-Architektur** (Frontend + Backend + Datenbank + Edge) gilt überall — auch für SAP, auch für KI-Lösungen. Wenn du ein System analysierst, ordne die Komponenten immer in diese Schichten ein. Dann wird jedes noch so komplexe System übersichtlich.`,
        analogy: `Edge ist wie regionale Auslieferungslager: Statt dass jede Bestellung aus dem Zentrallager in Hamburg kommt, gibt es kleinere Lager in München, Berlin und Köln. Die Ware ist schneller beim Kunden, und das Zentrallager wird entlastet.`,
        consultingRelevance: `Für den Mittelstand ist Edge selten ein Entscheidungskriterium — aber gut zu wissen wenn ein technischer Ansprechpartner den Begriff erwähnt. Wichtiger ist das Grundverständnis der drei Schichten, weil es jede Architektur-Diskussion strukturiert.`
      }
    ],
    gfSummary: `"Jede Software besteht aus drei Schichten: Was der Nutzer sieht (Frontend), die Logik dahinter (Backend), und die Datenspeicherung (Datenbank). Eine KI-Lösung fügt sich in diese bestehende Struktur ein — sie ersetzt nichts, sie ergänzt. Ihr ERP liefert die Daten, die KI verarbeitet sie, und das Ergebnis wird über eine vertraute Oberfläche angezeigt."`
  },

  "cloud-basics": {
    title: "Cloud-Grundlagen",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Cloud vs. On-Premise — die Grundsatzfrage",
        content: `Jede Software muss irgendwo laufen — auf einem Computer, der rund um die Uhr an ist. Die Frage ist: **Wo steht dieser Computer?**

**On-Premise** = Im eigenen Rechenzentrum des Unternehmens. Der Kunde besitzt die Hardware, betreibt sie selbst, ist für alles verantwortlich — von der Klimaanlage bis zum Backup.

**Cloud** = Auf gemieteter Infrastruktur eines Anbieters (Microsoft, Amazon, Google). Der Anbieter kümmert sich um Hardware, Strom, Sicherheit, Updates. Der Kunde mietet nur die Kapazität die er braucht.

**Hybrid** = Die Kombination: Sensible Daten bleiben on-premise, weniger kritische Anwendungen laufen in der Cloud. Das ist das häufigste Modell im Mittelstand.

Die meisten Mittelständler haben ihr SAP on-premise oder bei einem Hosting-Anbieter. KI-APIs wie Claude laufen in der Cloud. Die Herausforderung ist die sichere Verbindung zwischen beiden Welten.`,
        analogy: `Cloud vs. On-Premise ist wie Mietwohnung vs. Eigenheim: In der Cloud (Miete) kümmert sich der Vermieter um Heizung, Dach und Wasserleitungen — du ziehst einfach ein. On-Premise (Eigenheim) gehört dir alles, aber du musst auch alles selbst warten. Hybrid = du wohnst im Eigenheim, mietest aber ein Büro in der Stadt.`,
        consultingRelevance: `Die Cloud-Strategie ist oft politisch aufgeladen: IT-Leiter wollen Kontrolle behalten (on-premise), GF will Kosten senken (Cloud), Datenschutzbeauftragter hat Bedenken (DSGVO). Dein Job: Die technische Realität aufzeigen und eine pragmatische Lösung vorschlagen.`
      },
      {
        title: "IaaS, PaaS, SaaS — drei Abstraktionsebenen",
        content: `Cloud-Dienste gibt es auf drei Ebenen — je höher, desto weniger musst du selbst machen:

**IaaS (Infrastructure as a Service):** Du mietest nackte Server. Betriebssystem, Software, Updates — alles dein Job. Beispiel: Azure Virtual Machines, AWS EC2.
*Wie eine leere Bürofläche: Strom und Internet sind da, aber Möbel, Einrichtung und Organisation sind deine Sache.*

**PaaS (Platform as a Service):** Du bekommst eine fertige Plattform. Betriebssystem und Grundinfrastruktur sind vorkonfiguriert, du lädst nur deinen Code hoch. Beispiel: Vercel, Heroku, Azure App Service.
*Wie ein Co-Working-Space: Schreibtisch, WLAN, Kaffee sind da. Du bringst nur deinen Laptop mit.*

**SaaS (Software as a Service):** Fertige Software, du nutzt sie nur. Keine Installation, kein Betrieb. Beispiel: Salesforce, Microsoft 365, Google Workspace.
*Wie ein Catering-Service: Du sagst was du willst, es wird geliefert. Du musst nicht kochen.*

**Dein LearningHub nutzt PaaS:** Vercel (Frontend-Hosting) und Supabase (Backend-Plattform) — beides PaaS. Du lädst deinen Code hoch, die Plattform kümmert sich um den Rest.`,
        analogy: `Drei Stufen des Pizzaessens: IaaS = du kaufst Mehl, Tomaten und Käse und machst alles selbst. PaaS = du kaufst fertigen Teig und belegst selbst. SaaS = du bestellst bei Lieferando. Jede Stufe spart Zeit, kostet aber Flexibilität.`,
        consultingRelevance: `Für einen Kunden musst du die richtige Ebene empfehlen: Ein Unternehmen mit eigener IT-Abteilung kann IaaS nutzen. Ein Mittelständler ohne Entwickler braucht SaaS oder PaaS. Die meisten KI-Projekte im Mittelstand landen bei PaaS + SaaS-Kombination.`
      },
      {
        title: "Die großen drei: Azure, AWS, Google Cloud",
        content: `**Microsoft Azure** ist für den deutschen Mittelstand oft die erste Wahl, aus zwei Gründen: Fast jedes Unternehmen nutzt Microsoft 365, und SAP läuft sehr gut auf Azure (offizielle Partnerschaft). Azure hat Rechenzentren in Frankfurt und Berlin.

**Amazon Web Services (AWS)** ist der globale Marktführer mit dem breitesten Angebot. Mehr als 200 Dienste, von einfachem Storage bis zu Machine-Learning-Plattformen. Oft die Wahl für technisch versierte Teams.

**Google Cloud Platform (GCP)** glänzt bei KI und Datenanalyse (BigQuery, Vertex AI). Weniger verbreitet im deutschen Mittelstand, aber stark bei Unternehmen die auf Google Workspace setzen.

**Für deine KI-Beratung gilt:** Die Cloud-Wahl hängt weniger von technischen Features ab (die sind ähnlich) und mehr vom **Ökosystem des Kunden**: Microsoft-Landschaft → Azure. Bereits auf AWS → dort bleiben. Google Workspace → GCP.`,
        analogy: `Wie Automobilhersteller: Azure ist Mercedes (beliebt im deutschen Business, solide, guter Service). AWS ist Toyota (weltweiter Marktführer, riesiges Modellprogramm). GCP ist Tesla (innovativ, stark bei Zukunftstechnologien, aber Nische).`,
        consultingRelevance: `Frag den Kunden nicht "Welche Cloud wollen Sie?" sondern "Was nutzen Sie heute schon?" Die Antwort bestimmt zu 80% die Cloud-Empfehlung. Migration von einer Cloud zur anderen ist teuer und riskant — bleib im bestehenden Ökosystem.`
      },
      {
        title: "DSGVO und Cloud — die Datenschutz-Frage",
        content: `Die wichtigste Frage beim Cloud-Einsatz im Mittelstand: **Wo werden personenbezogene Daten verarbeitet?**

**Die Grundregel:** Personenbezogene Daten müssen in der EU verarbeitet werden, oder es muss eine rechtliche Grundlage für den Transfer geben (z.B. Standardvertragsklauseln).

**In der Praxis heißt das:**
- **EU-Rechenzentren wählen:** Azure Frankfurt, AWS Frankfurt, Supabase EU — immer explizit die EU-Region auswählen.
- **AVV abschließen:** Mit jedem Cloud-Anbieter einen Auftragsverarbeitungsvertrag (AVV) unterzeichnen. Die großen Anbieter haben Standard-AVVs.
- **Datenminimierung:** Nur die Daten in die Cloud schicken, die wirklich gebraucht werden. Wenn möglich anonymisiert.
- **Personenbezogene Daten identifizieren:** In einem ERP stecken überall personenbezogene Daten — Lieferantenkontakte, Mitarbeiternamen, Kundendaten. Die müssen sauber kartiert werden.

**Der Sonderfall KI:** Wenn du Unternehmensdaten an die Claude API schickst, fließen sie zu Anthropics Servern. Das braucht eine rechtliche Grundlage. Anthropic bietet EU-Hosting und einen Standard-AVV an — aber der Kunde muss das explizit einrichten.`,
        analogy: `DSGVO in der Cloud ist wie Zollbestimmungen: Du darfst Waren (Daten) exportieren, aber nur unter bestimmten Bedingungen und mit der richtigen Dokumentation. Innerhalb der EU (EU-Rechenzentren) ist es wie der Binnenmarkt — frei, solange du die Grundregeln einhältst.`,
        consultingRelevance: `DSGVO ist dein Beratungs-Asset: Du kennst das Thema bereits aus der ERP-Welt. Für KI kommt eine Schicht dazu (KI-Anbieter-AVV), aber die Grundlogik ist identisch. Kunden haben oft mehr Angst vor DSGVO als nötig — du kannst sie mit einem strukturierten Vorgehen beruhigen.`
      },
      {
        title: "Serverless und der Trend zur Vereinfachung",
        content: `Ein wichtiger Trend: **Serverless Computing**. Du schreibst eine Funktion, lädst sie hoch, und die Cloud führt sie nur dann aus, wenn sie gebraucht wird. Kein Server-Betrieb, keine Wartung, du zahlst nur für die tatsächliche Nutzung.

Beispiele: Vercel Edge Functions, AWS Lambda, Supabase Edge Functions.

**Für KI-Projekte ideal:** Eine Serverless-Funktion, die eingehende E-Mails entgegennimmt, an die Claude API weiterleitet, und das Ergebnis in die Datenbank schreibt. Kein Server, kein Betriebssystem, keine Updates. Kostet nur wenn sie tatsächlich aufgerufen wird.

**Die Entwicklung der letzten 20 Jahre:**
Eigener Server im Keller → Gemieteter Server im Rechenzentrum → Virtuelle Maschine in der Cloud → Container (Docker) → Serverless Functions.

Jede Stufe bedeutet: Weniger Infrastruktur-Verantwortung, mehr Fokus auf den eigentlichen Geschäftswert. Für den Mittelstand ohne große IT-Abteilung ist Serverless oft die beste Wahl.`,
        analogy: `Serverless ist wie ein Taxi statt einem eigenen Dienstwagen: Du zahlst nur wenn du fährst, musst dich nicht um TÜV, Versicherung oder Parken kümmern. Für jemanden der nur gelegentlich fährt, ist das wesentlich günstiger als ein eigenes Auto zu unterhalten.`,
        consultingRelevance: `Wenn du eine KI-Lösung für einen Mittelständler baust, empfiehl Serverless: Geringere Kosten (Pay-per-Use), kein Betriebsaufwand, automatische Skalierung. Die Kombination Vercel + Supabase + Claude API ist komplett serverless — kein einziger Server zu betreiben.`
      }
    ],
    gfSummary: `"Cloud-Dienste bedeuten: Sie mieten Rechenkapazität statt sie selbst zu betreiben — wie Leasing statt Kauf. Für KI-Projekte ist das ideal, weil Sie keine große IT-Investition vorab brauchen, sondern nur für die tatsächliche Nutzung zahlen. Mit EU-Rechenzentren und sauberen Verträgen ist das DSGVO-konform. Ihre sensiblen Daten können dabei on-premise bleiben."`
  },

  "agents-workflows": {
    title: "Agents & Workflows",
    layerLevel: 1,
    estimatedMinutes: 40,
    steps: [
      {
        title: "Drei Stufen der KI-Automation",
        content: `Es gibt nicht nur "KI an" oder "KI aus". Es gibt drei deutlich verschiedene Stufen, wie KI in Prozesse eingebaut werden kann:

**Stufe 1 — Einfacher Prompt:** Eine einzelne Anfrage, eine Antwort. Kein Gedächtnis, keine Werkzeuge. "Fasse diesen Text zusammen." Rein, raus, fertig.

**Stufe 2 — Workflow:** Eine fest definierte Kette von Schritten, die immer gleich abläuft. Jeder Schritt kann ein KI-Aufruf, eine Datenbankabfrage oder eine Aktion sein. Vorhersagbar und zuverlässig.

**Stufe 3 — Agent:** Ein autonomes System, das ein Ziel bekommt und selbst entscheidet, welche Schritte nötig sind. Es nutzt Werkzeuge, prüft Ergebnisse und passt sein Vorgehen an. Flexibel, aber weniger vorhersagbar.

**Die Faustregel für den Mittelstand:** Starte mit Stufe 1 (Quick Wins), automatisiere mit Stufe 2 (80% der Fälle), und nutze Stufe 3 nur wo echte Flexibilität nötig ist. Die meisten Unternehmen überspringen Stufe 2 und wollen direkt Agents — das ist fast immer ein Fehler.`,
        analogy: `Stufe 1 = Du fragst einen Kollegen etwas und bekommst eine Antwort. Stufe 2 = Du hast eine Checkliste, die jeden Morgen abgearbeitet wird — immer die gleichen Schritte in der gleichen Reihenfolge. Stufe 3 = Du gibst einem Mitarbeiter ein Ziel ("Senke unsere Materialkosten um 10%") und er findet selbst heraus, wie er das erreicht.`,
        consultingRelevance: `Die Stufenlogik ist dein Beratungsframework: Im Discovery-Workshop identifizierst du Use Cases und ordnest sie sofort ein. "E-Mail-Klassifizierung? Stufe 2, Workflow." "Autonome Lieferantenverhandlung? Stufe 3, Agent — aber dafür sind wir noch nicht reif." Das schafft Klarheit und verhindert Overengineering.`
      },
      {
        title: "Workflows im Detail — die 80%-Lösung",
        content: `Ein KI-Workflow ist eine **fest definierte Kette von Schritten**. Jeder Schritt weiß genau, was er tun soll und wohin das Ergebnis geht.

**Typischer KI-Workflow:**
1. **Trigger:** Neue E-Mail kommt rein
2. **Extraktion:** Text aus E-Mail lesen
3. **KI-Verarbeitung:** Claude API klassifiziert (Anfrage? Reklamation? Bestellung?)
4. **Routing:** Je nach Kategorie an die richtige Abteilung
5. **Aktion:** Antwort-Draft erstellen, in CRM eintragen

Jeder Schritt ist klar definiert. Es gibt keine Entscheidung der KI über den nächsten Schritt — der Ablauf steht fest. Nur innerhalb einzelner Schritte (z.B. Klassifizierung) arbeitet die KI.

**Tools für Workflows:**
- **Make.com** — No-Code, visuell, perfekt für Einsteiger. Du kennst es bereits.
- **n8n** — Open Source, selbst hostbar (DSGVO!), technisch flexibler.
- **Langchain/LlamaIndex** — Code-basiert, für komplexere KI-Pipelines.

**Workflows sind die Arbeitspferde** der KI-Automation: Zuverlässig, vorhersagbar, leicht zu debuggen, und sie decken die meisten Anwendungsfälle ab.`,
        analogy: `Ein Workflow ist wie ein Fließband in der Fabrik: Jede Station macht genau eine Sache, das Werkstück bewegt sich immer in die gleiche Richtung. Wenn eine Station ausfällt, weißt du genau wo das Problem ist. Effizient, aber nur für definierte Produkte.`,
        consultingRelevance: `Dein Make.com-Blueprint für den Projektmatcher ist ein perfektes Beispiel: Outlook-Webhook → E-Mail parsen → Claude API → Bewertung → Draft. Genau dieses Pattern (Trigger → KI → Aktion) kannst du für jeden Kunden adaptieren. Die Implementierung ist oft in Tagen möglich, nicht Wochen.`
      },
      {
        title: "Agents — der selbstständige Mitarbeiter",
        content: `Ein Agent ist fundamental anders als ein Workflow: Er bekommt ein **Ziel**, nicht eine Schrittfolge. Er entscheidet selbst, welche Werkzeuge er nutzt und in welcher Reihenfolge.

**Die Kernkomponenten eines Agents:**
1. **LLM** = Das "Gehirn". Denkt nach, plant, entscheidet.
2. **Tools** = Die "Werkzeuge". Datenbank abfragen, E-Mail senden, Web durchsuchen.
3. **Loop** = Die "Arbeitsschleife". Denken → Tool nutzen → Ergebnis prüfen → weiterdenken.
4. **Memory** = Das "Gedächtnis". Was wurde bisher in dieser Aufgabe gemacht?

**Beispiel:** Agent bekommt: "Finde den günstigsten Lieferanten für 1000 Stück Bauteil X."
- Agent denkt: "Ich brauche erst die aktuellen Preise."
- Agent nutzt Tool: Lieferantendatenbank abfragen → 5 Anbieter gefunden.
- Agent denkt: "Ich sollte auch die Lieferzeiten prüfen."
- Agent nutzt Tool: Lieferzeitdaten abrufen.
- Agent denkt: "Lieferant 3 ist am günstigsten, aber Lieferzeit ist 8 Wochen. Lieferant 1 ist 5% teurer aber liefert in 2 Wochen."
- Agent erstellt Empfehlung mit Abwägung.

Der Agent hat **selbst entschieden**, welche Informationen er braucht. Ein Workflow hätte das nicht gekonnt — der hätte nur die vordefinierte Abfrage ausgeführt.`,
        analogy: `Ein Workflow ist wie ein Koch mit einem festen Rezept — er folgt den Schritten und liefert immer das gleiche Gericht. Ein Agent ist wie ein erfahrener Küchenchef: Du sagst "Mach was Schönes mit dem was im Kühlschrank ist" — und er improvisiert, probiert, und liefert etwas Überraschendes. Manchmal brillant, manchmal daneben.`,
        consultingRelevance: `Agents klingen sexy, aber sie sind teurer (viele API-Calls pro Aufgabe), weniger vorhersagbar, und schwerer zu debuggen. Empfehle Agents nur wenn der Use Case echte Flexibilität erfordert — z.B. Recherche-Aufgaben, wo der Pfad nicht vorhersehbar ist.`
      },
      {
        title: "MCP — der USB-Standard für KI-Werkzeuge",
        content: `Damit ein Agent Werkzeuge nutzen kann, braucht er eine standardisierte Schnittstelle. Das ist **MCP (Model Context Protocol)** — ein offener Standard von Anthropic.

**MCP funktioniert so:**
- **MCP Server** = Ein Dienst, der Werkzeuge bereitstellt. "Ich kann E-Mails lesen, Kalendereinträge erstellen, und in SAP Bestellungen anlegen."
- **MCP Client** = Das KI-Modell (z.B. Claude), das die Werkzeuge nutzen will.
- **Tool-Deklaration** = Jedes Werkzeug hat einen Namen, eine Beschreibung und ein Schema: Was geht rein, was kommt raus.

Du hast MCP bereits konfiguriert: Filesystem-MCP gibt Claude Code Zugriff auf dein Dateisystem, n8n-MCP verbindet mit deinen Automatisierungen.

**Warum MCP wichtig ist:** Ohne Standard müsste jede KI-Integration einzeln gebaut werden. Mit MCP baut man einmal einen MCP-Server für SAP, und jedes KI-Modell das MCP spricht kann ihn sofort nutzen — Claude, GPT, Llama, egal.`,
        analogy: `Vor USB hatte jedes Gerät einen eigenen Stecker — Drucker, Scanner, Kamera, alle anders. USB hat das vereinheitlicht: Ein Stecker, jedes Gerät. MCP ist USB für KI: Ein Standard, jedes Werkzeug. Statt für jeden LLM-Anbieter eine eigene SAP-Integration zu bauen, baust du einen MCP-Server, und alle können ihn nutzen.`,
        consultingRelevance: `MCP ist noch jung, aber wichtig für deine Beratung: Wenn ein Kunde mehrere KI-Modelle nutzen will (Claude für Analyse, GPT für Zusammenfassungen), ist MCP der Weg, die Tool-Integration nur einmal zu bauen statt pro Modell. Das spart erheblich Entwicklungszeit.`
      },
      {
        title: "Die richtige Stufe wählen — Entscheidungsframework",
        content: `Die wichtigste Frage in der Beratung: **Welche Stufe braucht dieser Use Case?**

**Nutze einen einfachen Prompt wenn:**
- Die Aufgabe klar definiert und einmalig ist
- Keine Werkzeuge nötig sind
- Kein Kontext über mehrere Anfragen nötig ist
- *Beispiel: "Fasse diesen Vertrag zusammen"*

**Nutze einen Workflow wenn:**
- Der Ablauf vorhersagbar ist
- Die Schritte immer gleich sind
- Zuverlässigkeit wichtiger als Flexibilität ist
- *Beispiel: "Klassifiziere jede eingehende E-Mail und leite sie weiter"*

**Nutze einen Agent wenn:**
- Das Ziel klar ist, aber der Weg dahin nicht
- Flexibilität und Recherche gefragt sind
- Mehrere Werkzeuge situationsabhängig gebraucht werden
- *Beispiel: "Analysiere unsere Beschaffungsdaten und finde Einsparpotenziale"*

**Der häufigste Fehler:** Agents dort einsetzen, wo ein Workflow reicht. Das ist wie einen Unternehmensberater (teuer, flexibel) zu engagieren, um jeden Tag die gleiche Standardauswertung zu fahren — ein Sachbearbeiter (Workflow) erledigt das zuverlässiger und günstiger.`,
        analogy: `Die Ampel-Regel: 🟢 Einfacher Prompt = Grün, immer als erstes probieren. 🟡 Workflow = Gelb, wenn es mehr als einen Schritt braucht. 🔴 Agent = Rot, nur wenn echte Autonomie nötig ist. Starte immer bei Grün und geh nur auf Rot wenn nötig.`,
        consultingRelevance: `Dieses Framework nutzt du im Assessment: Jeden identifizierten Use Case einer Stufe zuordnen. Das bestimmt den Aufwand, die Kosten und die Timeline. Ein Workflow ist in Tagen implementiert, ein Agent braucht Wochen. Die Stufen-Zuordnung gehört in deinen Assessment-Report.`
      }
    ],
    gfSummary: `"KI-Automation gibt es in drei Stufen: Einzelne Anfragen, automatische Abläufe (Workflows), und selbstständige KI-Assistenten (Agents). Für den Mittelstand empfehle ich den Einstieg über Workflows — die sind zuverlässig, schnell implementiert und liefern sofort messbaren Nutzen. Agents kommen dann ins Spiel, wenn die Aufgaben komplexer und offener werden."`
  },

  "vocabulary-map": {
    title: "Begriffslandkarte KI",
    layerLevel: 1,
    estimatedMinutes: 30,
    steps: [
      {
        title: "RAG — Retrieval Augmented Generation",
        content: `RAG ist das wichtigste Konzept für Enterprise-KI. Es löst das Problem, dass ein LLM zwar klug ist, aber deine Firmendaten nicht kennt.

**RAG in einem Satz:** "Bevor die KI antwortet, sucht sie erst in deinen Dokumenten nach relevanten Informationen."

**Der Ablauf:**
1. Nutzer stellt eine Frage
2. System sucht in der Wissensdatenbank nach relevanten Dokumenten
3. Die gefundenen Dokumente + die Frage werden zusammen an das LLM geschickt
4. LLM antwortet basierend auf den Dokumenten — nicht aus dem "Bauchgefühl"

**Warum nicht einfach alle Dokumente ins Context Window?** Weil 5.000 technische Handbücher nicht reinpassen. RAG ist der Filter, der aus diesen 5.000 Dokumenten die 3 relevantesten heraussucht.

**Warum nicht Fine-Tuning?** Fine-Tuning verändert das Modell selbst — teuer, aufwändig, muss bei neuen Daten wiederholt werden. RAG füttert das unveränderte Modell mit aktuellen Daten — flexibel, günstig, sofort aktualisierbar.`,
        analogy: `RAG ist wie ein Berater, der vor jedem Meeting erst die relevanten Akten durchgeht: Er weiß nicht alles auswendig, aber er kann blitzschnell die richtigen Dokumente finden und dann kompetent antworten. Fine-Tuning wäre wie den Berater jahrelang nachzuschulen — teurer und die Schulung veraltet schnell.`,
        consultingRelevance: `90% der Enterprise-KI-Use-Cases lassen sich mit RAG lösen. Wenn ein Kunde sagt "Wir wollen, dass die KI unsere Daten kennt", ist die Antwort fast immer RAG. Das ist dein Standardlösungsansatz.`
      },
      {
        title: "Embeddings und Vektor-Datenbanken",
        content: `**Embeddings** sind der technische Trick hinter RAG: Text wird in Zahlen umgewandelt (Vektoren), damit der Computer "Ähnlichkeit" berechnen kann.

Der Satz "Der Lieferant liefert zu spät" und "Die Ware kommt mit Verzögerung" sind für einen Computer völlig verschiedene Zeichenketten. Aber als Embeddings (Zahlenreihen) liegen sie mathematisch nah beieinander — weil sie inhaltlich ähnlich sind.

**Vektor-Datenbanken** speichern diese Embeddings und können blitzschnell die ähnlichsten finden. Du fragst: "Probleme mit Lieferzeiten" — und die Vektor-DB findet alle Dokumente die inhaltlich damit zu tun haben, auch wenn sie das Wort "Lieferzeit" gar nicht enthalten.

**Populäre Vektor-DBs:** Pinecone (Cloud), Weaviate (Open Source), Chroma (leichtgewichtig), oder pgvector (Extension für PostgreSQL/Supabase — das hast du bereits!).`,
        analogy: `Stell dir eine Bibliothek vor, die Bücher nicht nach Alphabet sortiert, sondern nach inhaltlicher Ähnlichkeit. Alle Bücher über Lieferkettenprobleme stehen zusammen — egal ob der Titel "Supply Chain Disruption", "Logistikengpässe" oder "Materialknappheit 2024" heißt. So funktioniert eine Vektor-Datenbank.`,
        consultingRelevance: `Du musst Embeddings nicht selbst erzeugen — das macht die API. Aber du musst verstehen, dass die Qualität der Suche von der Qualität des Embeddings abhängt. Deutsche Fachbegriffe aus dem SCM-Bereich funktionieren besser mit Modellen die auf Deutsch trainiert wurden.`
      },
      {
        title: "Webhooks, Middleware und Integration",
        content: `**Webhook** = Ein automatischer Alarm. "Wenn Event X passiert, rufe URL Y auf." Wie ein Bewegungsmelder, der das Licht einschaltet.

Beispiel: Neue E-Mail kommt an → Webhook informiert Make.com → Make.com startet den KI-Workflow. Ohne Webhook müsste Make.com ständig nachfragen "Gibt es neue E-Mails?" (Polling) — das ist verschwenderisch.

**Middleware** = Software die zwischen zwei Systemen vermittelt. Make.com und n8n sind Middleware: Sie nehmen Daten von System A, transformieren sie, und schieben sie an System B.

**API Gateway** = Ein zentraler Eingangspunkt für alle API-Aufrufe. Kümmert sich um Authentifizierung, Rate Limiting, Logging. Wie ein Empfangstresen im Büro: Jeder Besucher muss hier durch, wird registriert und zur richtigen Abteilung geschickt.

**ETL (Extract, Transform, Load)** = Der Standard-Prozess für Datenpipelines: Daten extrahieren (aus SAP), transformieren (Format anpassen, bereinigen), und laden (in die Ziel-Datenbank).`,
        analogy: `Webhooks sind wie ein Anrufbeantworter der sofort handelt: "Wenn jemand anruft, schick mir eine SMS." Middleware ist wie ein Übersetzer und Paketdienst in einem: Nimmt ein Paket aus Japan entgegen, übersetzt die Beschriftung ins Deutsche, und liefert es an die richtige Adresse.`,
        consultingRelevance: `Integration ist oft 70% des Aufwands in einem KI-Projekt. Hier liegt dein Beratungswert: Du verstehst die Prozesse beim Kunden und weißt, welche Daten wo fließen müssen. Das ist weniger eine technische Kompetenz als eine Prozess-Kompetenz — und genau das ist dein Hintergrund.`
      },
      {
        title: "Fine-Tuning, Prompt Engineering, Grounding",
        content: `Drei Begriffe die oft durcheinandergewürfelt werden:

**Fine-Tuning** = Ein bestehendes Modell wird mit eigenen Daten nachtrainiert. Das Modell selbst verändert sich. Teuer, aufwändig, macht nur Sinn für sehr spezialisierte Anwendungen. Selten im Mittelstand.

**Prompt Engineering** = Die Kunst, dem Modell die richtige Anweisung zu geben. Das Modell bleibt unverändert, du optimierst nur die Eingabe. Günstig, flexibel, sofort wirksam. Das ist dein Hauptwerkzeug.

**Grounding** = Das Modell an Fakten "erden". Statt aus dem "Bauchgefühl" zu antworten, muss es auf mitgelieferte Dokumente verweisen. RAG ist eine Form von Grounding. Das Ziel: Weniger Halluzination, mehr Verlässlichkeit.

Dazu kommen:
**Guardrails** = Regeln die definieren, was die KI nicht tun darf. "Gib keine Rechtsberatung." "Erfinde keine Zahlen."
**Human-in-the-Loop** = Ein Mensch prüft kritische KI-Entscheidungen bevor sie wirksam werden.`,
        analogy: `Fine-Tuning = Umschulung eines Mitarbeiters (teuer, dauerhaft). Prompt Engineering = ein gutes Briefing (günstig, sofort wirksam). Grounding = dem Mitarbeiter die relevanten Akten auf den Tisch legen statt ihn aus dem Gedächtnis antworten zu lassen.`,
        consultingRelevance: `Wenn der IT-Leiter "Fine-Tuning" vorschlägt, ist die richtige Frage: "Haben Sie RAG + gutes Prompt Engineering schon ausgereizt?" Die Antwort ist fast immer nein. Fine-Tuning ist der letzte Schritt, nicht der erste — und für 95% der Mittelstands-Use-Cases unnötig.`
      },
      {
        title: "Das Gesamtbild — wie alles zusammenhängt",
        content: `Jetzt setzen wir die Puzzle-Teile zusammen. Eine typische KI-Lösung für den Mittelstand:

1. **Datenquellen:** SAP, SharePoint, E-Mail (über APIs und Webhooks zugänglich)
2. **Ingestion:** Dokumente werden in Chunks zerlegt und als Embeddings in einer Vektor-DB gespeichert (ETL-Prozess)
3. **Anfrage:** Nutzer stellt eine Frage im Frontend (React-App)
4. **Retrieval:** Vektor-DB findet relevante Chunks (Embedding-Suche)
5. **Generation:** Chunks + Frage gehen an das LLM (Claude API via REST), das eine Antwort generiert
6. **Guardrails:** Antwort wird auf Halluzinationen geprüft, Quellen werden angehängt
7. **Ausgabe:** Antwort wird im Frontend angezeigt, Interaktion wird in der SQL-Datenbank geloggt

Das ist kein Hexenwerk — es sind bekannte Bausteine (APIs, Datenbanken, Middleware) in einer neuen Kombination. Und genau das ist dein Beratungsansatz: Die Bausteine verstehen, die richtige Kombination für den Kunden finden, und die Implementierung steuern.`,
        analogy: `Wie eine Fertigungslinie: Rohmaterial (Daten) kommt rein, wird in mehreren Stationen verarbeitet (Chunking, Embedding, Retrieval, Generation), Qualitätskontrolle prüft das Ergebnis (Guardrails), und das fertige Produkt (Antwort) wird ausgeliefert. Jede Station ist für sich simpel — die Kunst liegt in der Orchestrierung.`,
        consultingRelevance: `Dieses Gesamtbild ist dein "Big Picture" für Kundengespräche. Wenn du es auf ein Whiteboard zeichnen und jeden Baustein in einem Satz erklären kannst, bist du weiter als 90% der KI-Berater, die nur über Buzzwords reden. Dein Vorteil: Du verstehst die Geschäftsprozesse, die hinter den Datenflüssen stehen.`
      }
    ],
    gfSummary: `"All diese Begriffe — RAG, Embeddings, Agents — beschreiben im Kern eine einfache Sache: Wir nehmen Ihre vorhandenen Unternehmensdaten, machen sie für eine KI durchsuchbar, und nutzen die KI um daraus Mehrwert zu erzeugen — Analysen, Empfehlungen, automatisierte Prozesse. Die Technologie dafür existiert und ist erprobt. Es geht nicht um Raketenwissenschaft, sondern um strukturierte Integration."`
  }
};

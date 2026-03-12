// ============================================================
// VOLLSTÄNDIGE LERNINHALTE - Phase 4: Beratungspraxis
// ============================================================

export const PHASE4_CONTENT = {

  "consulting-framework": {
    title: "Dein Beratungsframework",
    layerLevel: 1,
    estimatedMinutes: 45,
    steps: [
      {
        title: "Die fünf Phasen deines KI-Beratungsansatzes",
        content: `Dein Framework folgt der Logik, die du aus Turnaround-Projekten kennst — angepasst auf KI:

**Phase 1 — Discovery (1-2 Tage):**
Kundenproblem verstehen, Datenlandschaft aufnehmen, Quick-Win-Potenziale identifizieren. Interviews mit GF, IT, 2-3 Fachabteilungen. Ergebnis: Problemverständnis + erste Use-Case-Hypothesen.

**Phase 2 — Assessment (2-3 Tage):**
Use Cases priorisieren, Datenreife bewerten, Build-vs-Buy entscheiden. Impact-Matrix erstellen, Daten-Audit durchführen. Ergebnis: Assessment-Report mit Top-3-Use-Cases und Empfehlung.

**Phase 3 — Design (2-3 Tage):**
Architektur skizzieren, Techstack auswählen, Projektplan erstellen. Sicherheits-Architektur definieren, Kosten kalkulieren. Ergebnis: Architektur-Dokument + Projektplan + Kostenvoranschlag.

**Phase 4 — PoC (1-2 Wochen):**
Prototyp bauen, mit echten Daten testen, Ergebnisse quantifizieren. Demo beim Kunden, Feedback einarbeiten. Ergebnis: Funktionierender Prototyp + Qualitätsmetriken + Go/No-Go-Empfehlung.

**Phase 5 — Scale (laufend):**
Produktion, Training, Change Management, Monitoring. Rollout auf alle Nutzer, kontinuierliche Optimierung. Ergebnis: Produktive KI-Lösung + geschulte Nutzer + Monitoring-Dashboard.

**Nicht jeder Kunde durchläuft alle Phasen.** Manche brauchen nur Discovery + Assessment (um zu verstehen was möglich ist). Manche springen direkt zum PoC (weil der Use Case offensichtlich ist). Das Framework ist flexibel — aber die Reihenfolge macht Sinn.`,
        analogy: `Wie dein bewährtes Vorgehen bei Turnaround-Projekten: Erst Diagnose (Discovery), dann Befund (Assessment), dann Therapieplan (Design), dann Probetherapie (PoC), dann Behandlung (Scale). Kein Arzt operiert ohne Diagnose — kein Berater baut ohne Assessment.`,
        consultingRelevance: `Dieses Framework ist dein Standard-Pitch: "So gehen wir vor." Es gibt dem Kunden Struktur und Vertrauen. Und es erlaubt dir flexible Angebote: Discovery alleine (2 Tage), Discovery + Assessment (5 Tage), oder das Gesamtpaket bis zum PoC (3-4 Wochen).`
      },
      {
        title: "Discovery — der Einstieg beim Kunden",
        content: `Die Discovery-Phase ist dein wichtigstes Verkaufsinstrument. Hier zeigst du Kompetenz und baust Vertrauen auf.

**Vorbereitung (vor dem Termin):**
- Branche und Unternehmen recherchieren (Jahresbericht, Website, News)
- Typische KI-Use-Cases der Branche vorbereiten (3-5 Beispiele)
- Interview-Leitfaden mit offenen Fragen erstellen
- Eigene Referenz-Cases vorbereiten (auch aus anderen Branchen)

**Tag 1: Stakeholder-Interviews**
- GF (30-60 Min): Strategie, Schmerzpunkte, Budget-Rahmen, Vision
- IT-Leitung (60 Min): Systemlandschaft, Schnittstellen, Kapazitäten, Bedenken
- 2-3 Fachabteilungen (je 45 Min): Tagesgeschäft, Zeitfresser, Wünsche

**Tag 2: Analyse + Quick Assessment**
- Interview-Ergebnisse konsolidieren
- Systemlandschaft skizzieren (welche Systeme, wie verbunden)
- Erste Use-Case-Hypothesen formulieren
- Quick-Wins identifizieren (was bringt schnell sichtbaren Nutzen?)

**Ergebnis-Dokument (5-10 Seiten):**
1. Zusammenfassung der Ausgangssituation
2. Identifizierte Chancen und Herausforderungen
3. Erste Use-Case-Hypothesen (5-10 Stück)
4. Empfehlung für nächste Schritte
5. Grobe Aufwandsschätzung

**Der Trick:** Die Discovery ist schon ein Deliverable mit Wert. Selbst wenn der Kunde danach nicht weitermacht, hat er ein Dokument das er vorher nicht hatte: Eine strukturierte Übersicht seiner KI-Potenziale.`,
        analogy: `Die Discovery ist wie ein Immobiliengutachten: In 1-2 Tagen begehst du das Gebäude, prüfst den Zustand, und lieferst einen Bericht. Der Eigentümer kann dann entscheiden ob er renoviert (Projekt starten) oder nicht — aber er hat auf jeden Fall Klarheit über den Zustand.`,
        consultingRelevance: `Preise die Discovery als eigenständiges Produkt: "KI-Readiness-Check für den Mittelstand, 2 Tage, Festpreis." Das senkt die Einstiegshürde für den Kunden und gibt dir die Chance zu zeigen was du kannst. Die Folgebeauftragung kommt dann von allein.`
      },
      {
        title: "Assessment — vom Überblick zur Empfehlung",
        content: `Das Assessment vertieft die Discovery-Ergebnisse und liefert eine fundierte Entscheidungsgrundlage.

**Daten-Audit (1 Tag):**
- Systemzugang organisieren (Lesezugriff auf Testdaten)
- Stichproben aus relevanten Datenquellen ziehen
- Datenqualität bewerten (Vollständigkeit, Konsistenz, Aktualität)
- Schnittstellen-Verfügbarkeit prüfen (APIs, Export-Möglichkeiten)

**Use-Case-Priorisierung (1 Tag):**
- Impact-Machbarkeits-Matrix erstellen
- Für jeden Use Case: Nutzen quantifizieren, Aufwand schätzen, Risiken identifizieren
- Top-3 auswählen und detailliert beschreiben
- Build-vs-Buy für jeden Top-Use-Case bewerten

**Assessment-Report (Deliverable, 15-25 Seiten):**
1. Executive Summary (1 Seite — für die GF)
2. Datenlandschaft und -reife (mit Score pro Dimension)
3. Use-Case-Katalog mit Priorisierung (Impact-Matrix visuell)
4. Detailbeschreibung Top-3 Use Cases
5. Build-vs-Buy-Empfehlung pro Use Case
6. Architektur-Skizze für den Top-Use-Case
7. Grober Projektplan und Budget-Rahmen
8. Risiken und Mitigationsmaßnahmen

**Tipp:** Der Assessment-Report muss von zwei Zielgruppen gelesen werden können: GF (Executive Summary + Empfehlung) und IT (Technische Details + Architektur). Schreibe für beide.`,
        analogy: `Das Assessment ist wie ein Businessplan: Es zeigt klar auf, was investiert werden muss (Aufwand), was zurückkommt (Nutzen), und welche Risiken es gibt. Die GF entscheidet auf dieser Basis — nicht auf Basis von Versprechen.`,
        consultingRelevance: `Der Assessment-Report ist dein hochwertigstes Dokument. Er ist die Grundlage für das Projektbudget und die Beauftragung. Investiere Zeit in die Qualität — ein überzeugender Report zahlt sich in Folgeaufträgen aus. Nutze dein Supply Consult Corporate Design.`
      },
      {
        title: "PoC und Scale — Umsetzung steuern",
        content: `**PoC-Phase: Beweisen dass es funktioniert**

Du baust nicht selbst (obwohl du es könntest) — du steuerst und qualitätssicherst:
- Scope definieren: Was genau wird im PoC gezeigt? (Kritisch: NICHT zu viel!)
- Daten bereitstellen: Echte, anonymisierte Kundendaten organisieren
- Qualität prüfen: Ergebnisse der KI gegen Experten-Urteil validieren
- Demo organisieren: Den Stakeholdern das Ergebnis präsentieren
- Go/No-Go moderieren: Fakten-basierte Entscheidung herbeiführen

**Go/No-Go-Kriterien (vorab definieren!):**
- Accuracy über X% (z.B. 85% korrekte Klassifizierung)
- Zeitersparnis pro Vorgang messbar (z.B. 15 Min statt 45 Min)
- Nutzer-Feedback positiv (5 Testnutzer bestätigen Mehrwert)
- Technische Machbarkeit bestätigt (Integration funktioniert)

**Scale-Phase: In Produktion bringen**

Hier kommt dein Transformations-Know-how voll zum Tragen:
- **Rollout-Plan:** Pilotgruppe → Abteilung → Unternehmen
- **Training:** Nicht nur "Knöpfe drücken" sondern "wie verändert sich mein Job"
- **Change Management:** Ängste adressieren, Champions aufbauen
- **Monitoring:** KPIs definieren und messen (Nutzung, Qualität, Zufriedenheit)
- **Kontinuierliche Verbesserung:** Prompt-Optimierung, neue Use Cases, Daten-Updates

**Die größte Falle der Scale-Phase:** Der PoC funktioniert super — aber niemand nutzt das Produktivsystem. Warum? Weil Change Management vergessen wurde. Die Technik ist 30% des Projekts, der Mensch ist 70%.`,
        analogy: `PoC ist der Probelauf in der Werkstatt — alles unter kontrollierten Bedingungen. Scale ist die Serienproduktion — alles muss unter realen Bedingungen funktionieren, mit echten Menschen, echten Problemen und echtem Zeitdruck. Der Sprung dazwischen ist der kritischste Moment.`,
        consultingRelevance: `Die Scale-Phase ist wo dein Transformations-Hintergrund zum Tragen kommt. Tech-Berater können den PoC — aber den Rollout, das Training, das Change Management, das Stakeholder-Management? Das ist dein Terrain. Hier bist du unersetzlich.`
      }
    ],
    gfSummary: `"Unser Vorgehen ist erprobt: Wir starten mit einem 2-tägigen Quick Check, liefern Ihnen einen fundierten Assessment-Report mit konkreten Empfehlungen, und bauen dann einen Prototyp der beweist dass es funktioniert. Erst wenn Sie überzeugt sind, skalieren wir. Sie behalten jederzeit die Kontrolle, jeder Schritt hat ein klares Ergebnis."`
  },

  "dsgvo-euai": {
    title: "DSGVO & EU AI Act",
    layerLevel: 1,
    estimatedMinutes: 40,
    steps: [
      {
        title: "DSGVO für KI-Projekte — was du wissen musst",
        content: `Die DSGVO kennst du bereits aus deiner Beratungspraxis. Für KI-Projekte kommen spezifische Aspekte dazu:

**Wann ist DSGVO relevant?** Immer wenn personenbezogene Daten verarbeitet werden. In ERP-Systemen stecken ÜBERALL personenbezogene Daten: Lieferantenkontakte (Name, E-Mail, Telefon), Mitarbeiterdaten (Bestellanforderer, Genehmiger), Kundendaten.

**Die Kernpflichten:**
1. **Rechtsgrundlage:** Warum dürfen wir diese Daten verarbeiten? Für KI typisch: Berechtigtes Interesse (Art. 6 Abs. 1 lit. f) oder Vertragserfüllung (Art. 6 Abs. 1 lit. b).
2. **AVV (Auftragsverarbeitungsvertrag):** Mit jedem Anbieter der personenbezogene Daten verarbeitet — Claude API (Anthropic), Supabase, Vercel.
3. **Verarbeitungsverzeichnis:** Dokumentation welche Daten wo und warum verarbeitet werden.
4. **Datenschutz-Folgenabschätzung (DSFA):** Bei hohem Risiko für Betroffene. Für die meisten Mittelstands-KI-Projekte nicht nötig, aber prüfen.

**Praktische Maßnahmen:**
- EU-Hosting für alle Cloud-Dienste wählen
- Personenbezogene Daten anonymisieren bevor sie an die KI-API gehen
- Daten-Minimierung: Nur was wirklich nötig ist an externe Dienste senden
- Löschfristen einhalten: KI-Interaktionslogs nicht ewig aufbewahren
- Transparenz: Nutzer informieren dass KI eingesetzt wird`,
        analogy: `DSGVO in der Cloud ist wie Zollbestimmungen: Du darfst Waren (Daten) exportieren, aber nur unter bestimmten Bedingungen und mit der richtigen Dokumentation. Innerhalb der EU (EU-Rechenzentren) ist es wie der Binnenmarkt — frei, solange du die Grundregeln einhältst.`,
        consultingRelevance: `DSGVO ist dein Beratungs-Asset, nicht dein Hindernis. Du kennst das Thema, du kannst den Kunden beruhigen ("Es ist machbar, hier ist der Plan"), und du lieferst die Dokumentation (AVV-Checkliste, Verarbeitungsverzeichnis-Template) gleich mit. Das spart dem Kunden einen separaten Datenschutz-Berater.`
      },
      {
        title: "EU AI Act — das neue Regelwerk",
        content: `Der EU AI Act ist seit Februar 2025 in Kraft und wird stufenweise wirksam. Er folgt derselben risikobasierten Logik wie die DSGVO.

**Die vier Risikoklassen:**

**Unzulässig (verboten):**
Social Scoring, manipulative KI, Emotionserkennung am Arbeitsplatz, biometrische Massenüberwachung. Für den Mittelstand irrelevant — keiner macht das.

**Hochrisiko:**
KI in Personalentscheidungen (Bewerberauswahl, Leistungsbewertung), Kreditvergabe, kritische Infrastruktur. Erfordert umfangreiche Dokumentation, Risikomanagement, menschliche Aufsicht, und Konformitätsbewertung.

**Limitiertes Risiko (Transparenzpflicht):**
Chatbots, Empfehlungssysteme, Zusammenfassungstools. Die meisten Enterprise-KI-Anwendungen fallen hier rein. Pflicht: Nutzer müssen wissen dass sie mit KI interagieren.

**Minimales Risiko:**
Spam-Filter, Textanalyse, interne Datenauswertung. Keine besonderen Pflichten über die DSGVO hinaus.

**Timeline:**
- Feb 2025: Verbotene Praktiken gelten
- Aug 2025: Transparenzpflichten für General Purpose AI
- Aug 2026: Hochrisiko-Systeme müssen compliant sein
- Aug 2027: Vollständige Durchsetzung

**Für den Mittelstand heißt das:** Die meisten KI-Anwendungen (Dokumentenanalyse, Chatbots, E-Mail-Klassifizierung) fallen in "Limitiert" oder "Minimal". Keine Panik — aber Transparenz und Dokumentation sind Pflicht.`,
        analogy: `Der EU AI Act ist die neue DSGVO für KI — dieselbe Logik (risikobasiert), dieselbe Struktur (Pflichten nach Risikostufe), und derselbe Effekt: Am Anfang Verunsicherung, dann werden es Routine-Prozesse. Wer sich früh vorbereitet, hat den Wettbewerbsvorteil.`,
        consultingRelevance: `Der EU AI Act ist eine Beratungs-Chance: Kunden haben davon gehört und sind verunsichert. Du kannst Klarheit schaffen: "Ihre geplante Lösung fällt in Risikoklasse Limitiert. Hier sind die drei Dinge die Sie beachten müssen." Das ist konkreter und hilfreicher als das was sie von ihrem Anwalt hören.`
      },
      {
        title: "Compliance-Checkliste für KI-Projekte",
        content: `Eine pragmatische Checkliste die du bei jedem Projekt durchgehst:

**DSGVO-Checkliste:**
☐ Personenbezogene Daten im Datenfluss identifiziert
☐ Rechtsgrundlage für Verarbeitung dokumentiert
☐ AVV mit allen Cloud-Anbietern abgeschlossen (Anthropic, Supabase, Vercel)
☐ EU-Hosting für alle Dienste aktiviert
☐ Anonymisierung/Pseudonymisierung wo möglich
☐ Verarbeitungsverzeichnis-Eintrag erstellt
☐ Löschkonzept für KI-Interaktionsdaten definiert
☐ Informationspflicht gegenüber Betroffenen erfüllt

**EU AI Act-Checkliste:**
☐ Risikoklasse der KI-Anwendung bestimmt
☐ Bei Hochrisiko: Risikomanagement-System eingerichtet
☐ Bei Limitiert: Transparenzhinweis implementiert ("Diese Antwort wurde von KI erstellt")
☐ Menschliche Aufsicht sichergestellt (Human-in-the-Loop für kritische Entscheidungen)
☐ Technische Dokumentation der KI-Lösung erstellt
☐ Bias-Check: Diskriminiert die KI bestimmte Gruppen?

**Zusätzlich empfohlen:**
☐ KI-Nutzungsrichtlinie für Mitarbeiter erstellt
☐ Verantwortlichkeiten definiert (Wer überwacht die KI-Qualität?)
☐ Notfallplan: Was passiert wenn die KI falsche Ergebnisse liefert?
☐ Regelmäßiger Review-Zyklus (quartalsweise)

Diese Checkliste ist kein Rechtsrat — für die formale Compliance empfehle dem Kunden immer auch den Datenschutzbeauftragten einzubinden. Aber als strukturierte Grundlage für die Projektplanung ist sie Gold wert.`,
        analogy: `Wie eine Checkliste vor einem Flug: Nicht jeder Punkt ist gleich kritisch, aber alle müssen abgehakt werden bevor man startet. Manche sind offensichtlich (Triebwerke funktionieren = AVV abgeschlossen), manche werden leicht vergessen (Notausgangsbeleuchtung = Löschkonzept definiert).`,
        consultingRelevance: `Diese Checkliste ist ein Deliverable das du jedem Kunden als Teil des Assessment-Reports lieferst. Es zeigt Professionalität, gibt dem Datenschutzbeauftragten Sicherheit, und beschleunigt die interne Freigabe des Projekts. Erstelle sie als Word-Dokument im Supply Consult Design — das wirkt.`
      }
    ],
    gfSummary: `"DSGVO und EU AI Act sind keine Showstopper, sondern ein Qualitätsmerkmal. Wir stellen von Anfang an sicher, dass Ihre KI-Lösung rechtskonform ist: EU-Hosting, saubere Verträge mit allen Anbietern, transparente Kennzeichnung, und menschliche Kontrolle bei kritischen Entscheidungen. Das schützt Ihr Unternehmen und schafft Vertrauen bei Mitarbeitern und Kunden."`
  },

  "change-management": {
    title: "Change Management für KI",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Warum scheitern KI-Projekte? — Der menschliche Faktor",
        content: `Die Technik funktioniert fast immer. Woran KI-Projekte wirklich scheitern:

**1. Angst:** "Die KI ersetzt meinen Job." Die Nummer-1-Angst, die Mitarbeiter haben. Und sie wird selten adressiert.

**2. Widerstand:** "Das brauchen wir nicht, wir machen das seit 20 Jahren so." Gewohnheit ist die stärkste Kraft — stärker als jede Technologie.

**3. Enttäuschung:** "Die KI macht auch Fehler." Unrealistische Erwartungen führen zu Ernüchterung beim ersten Fehler.

**4. Ignoranz:** "Ich habe keine Zeit mich damit zu beschäftigen." Die Lösung existiert, aber niemand nutzt sie.

**Die Lösung ist nicht mehr Technologie, sondern mehr Kommunikation, Einbindung und sichtbare Erfolge.**

Dein Narrativ als Berater: **"KI ersetzt niemanden. KI gibt Ihren Mitarbeitern Superkräfte."** Statt 45 Minuten Recherche in SAP → 30 Sekunden Frage an den KI-Assistenten. Der Mitarbeiter wird nicht überflüssig — er wird produktiver und kann sich auf wertvolle Aufgaben konzentrieren.`,
        analogy: `KI-Einführung ist wie die Einführung von SAP vor 20 Jahren: Dieselben Ängste ("Werden wir ersetzt?"), dieselben Widerstände ("Das brauchen wir nicht"), dieselbe Lösung: Früh einbinden, sichtbare Erfolge liefern, Nutzen konkret zeigen. Du hast diesen Film schon einmal gesehen — mit einem anderen Technologie-Protagonisten.`,
        consultingRelevance: `Change Management ist dein Kernkompetenz als Transformationsberater. Tech-Berater können KI implementieren — aber den organisatorischen Wandel begleiten? Da bist du im Vorteil. Positioniere dich: "Ich bringe nicht nur die Technologie, ich bringe auch die Menschen mit."`
      },
      {
        title: "Das Change-Playbook — Schritt für Schritt",
        content: `**Phase 1: Awareness (vor dem Projekt)**
- GF als Sponsor gewinnen (ohne Rückendeckung von oben stirbt jedes Change-Projekt)
- Betriebsrat früh einbinden (Transparenz, keine Überraschungen)
- Kick-off mit allen Betroffenen: Warum machen wir das? Was bedeutet es für euch?

**Phase 2: Champions aufbauen (während des PoC)**
- 2-3 begeisterte Mitarbeiter pro Abteilung identifizieren
- Sie in den PoC einbinden (sie testen, sie geben Feedback)
- Sie werden später die "Botschafter" die andere überzeugen

**Phase 3: Quick Wins zeigen (nach dem PoC)**
- Den ersten Erfolg intern kommunizieren: "Wir sparen 3 Stunden pro Woche in der Angebotsbearbeitung."
- Champions berichten lassen, nicht das Management
- Konkrete Beispiele statt abstrakte Versprechen

**Phase 4: Training (beim Rollout)**
- Nicht nur "Knöpfe drücken" (welches Tool wie bedienen)
- Sondern "Mindset" (wie verändert sich mein Arbeitsalltag)
- Raum für Fragen und Bedenken schaffen
- Buddy-System: Jeder neue Nutzer hat einen Champion als Ansprechpartner

**Phase 5: Kontinuierlich kommunizieren (nach dem Rollout)**
- Monatliches Reporting: Wie wird die KI genutzt? Was sind die Ergebnisse?
- Feedback-Kanal: Wie können Mitarbeiter Verbesserungsvorschläge einbringen?
- Erfolge feiern: "Diesen Monat haben wir 120 Stunden durch KI-Unterstützung gespart."`,
        analogy: `Wie das Onboarding eines neuen Teammitglieds: Erst vorstellen ("Das ist die KI, sie hilft euch bei X"), dann gemeinsam arbeiten ("Probiert mal zusammen"), dann Feedback holen ("Wie läuft's?"), und regelmäßig nachfragen ("Alles gut? Was können wir verbessern?").`,
        consultingRelevance: `Das Change-Playbook ist ein Beratungsprodukt das du mitverkaufen kannst: "Zum KI-Projekt gehört auch ein Change-Management-Plan — das kostet 2 zusätzliche Beratertage, verhindert aber dass die Lösung in der Schublade verschwindet." Die meisten Tech-Berater bieten das nicht an. Du schon.`
      },
      {
        title: "Widerstandsmuster erkennen und adressieren",
        content: `Verschiedene Stakeholder-Gruppen haben verschiedene Widerstände. Erkenne das Muster und adressiere es gezielt:

**IT-Abteilung — "Kontrollverlust"**
Angst: "Wir verlieren die Kontrolle über unsere Systeme. Die Cloud ist unsicher."
Adressierung: Zeige die Architektur im Detail. EU-Hosting, AVV, Zero Data Retention. Binde sie in technische Entscheidungen ein. Sie müssen das System später betreiben — mach sie zu Mitgestaltern.

**Betriebsrat — "Überwachung und Arbeitsplatzabbau"**
Angst: "Die KI überwacht Mitarbeiter. Arbeitsplätze werden abgebaut."
Adressierung: Transparenz von Tag 1. Keine Leistungsüberwachung, keine automatisierten Personalentscheidungen. Die KI unterstützt, sie entscheidet nicht. Betriebsvereinbarung anbieten.

**Fachabteilung — "Veränderung und Mehraufwand"**
Angst: "Noch ein neues System das ich lernen muss. Mein Job wird komplizierter."
Adressierung: Zeige den direkten Nutzen: "Statt 30 Minuten in SAP suchen, stellst du eine Frage." Mach die UI so einfach wie möglich. Champions aus der Abteilung schulen und vorangehen lassen.

**Geschäftsführung — "ROI und Risiko"**
Angst: "Was wenn es nicht funktioniert? Was kostet das? Wann sehen wir Ergebnisse?"
Adressierung: Klarer Business Case mit Zahlen. Stufenweises Vorgehen mit Go/No-Go-Gates. PoC als risikoarmer Einstieg. Regelmäßiges Reporting über Ergebnisse.

**Die universelle Wahrheit:** Jeder Widerstand hat einen rationalen Kern. Nimm die Bedenken ernst, entkräfte sie mit Fakten, und zeige den individuellen Nutzen für jeden Stakeholder.`,
        analogy: `Wie bei einer Reorganisation: Der Controller fürchtet um seine Daten, der Werksleiter um seine Autonomie, der Betriebsrat um die Mitarbeiter. Jeder hat berechtigte Bedenken — und jeder braucht eine maßgeschneiderte Antwort. One-size-fits-all funktioniert nicht beim Change.`,
        consultingRelevance: `Du kennst diese Dynamiken aus Turnaround-Projekten. IT vs. Fachabteilung, GF vs. Betriebsrat, Innovation vs. Bewahrung — das sind die gleichen Konflikte wie bei jeder großen Veränderung. Deine Erfahrung in der Moderation dieser Konflikte ist ein enormer Wertbeitrag.`
      }
    ],
    gfSummary: `"Technologie allein ändert nichts — Menschen müssen sie annehmen und nutzen. Unser Change-Management-Ansatz sorgt dafür: Frühe Einbindung aller Beteiligten, sichtbare Quick Wins die Begeisterung schaffen, und gezielte Schulung die Ängste nimmt. Ergebnis: Die KI-Lösung wird tatsächlich genutzt — nicht nur installiert."`
  },

  "stakeholder-mgmt": {
    title: "Stakeholder-Management",
    layerLevel: 1,
    estimatedMinutes: 30,
    steps: [
      {
        title: "Drei Sprachen — ein Projekt",
        content: `In jedem KI-Projekt gibt es mindestens drei Stakeholder-Gruppen, und jede spricht eine andere Sprache:

**Geschäftsführung spricht ROI:**
- "Was bringt uns das?"
- "Wie schnell amortisiert sich die Investition?"
- "Welchen Wettbewerbsvorteil haben wir dadurch?"
- Antwort immer in: Euro, Prozent, Monaten

**IT-Leitung spricht Technik und Sicherheit:**
- "Wo werden die Daten verarbeitet?"
- "Wie integriert sich das in unsere Landschaft?"
- "Wer betreibt das? Wer updated?"
- Antwort immer in: Architektur, Standards, Compliance

**Fachabteilung spricht Alltag:**
- "Wird mein Job einfacher oder komplizierter?"
- "Kann ich dem System vertrauen?"
- "Was mache ich wenn es nicht funktioniert?"
- Antwort immer in: Konkrete Beispiele, Demo, Anleitung

**Dein Job als Berater:** Zwischen allen drei Sprachen übersetzen. Derselbe Sachverhalt — drei verschiedene Präsentationen.`,
        analogy: `Wie ein Übersetzer bei der UN: Der amerikanische Delegierte sagt "We need to maximize shareholder value", der französische hört "Il faut maximiser la valeur pour les actionnaires", und der japanische versteht es in seinem kulturellen Kontext. Selbe Botschaft, andere Sprache, anderes Framing.`,
        consultingRelevance: `Diese Dreisprachigkeit ist dein USP gegenüber reinen Tech-Beratern: Die können mit der IT reden, aber nicht mit der GF. Und sie können der Fachabteilung keine Angst nehmen. Du kannst alle drei — weil du seit 26 Jahren zwischen Business und IT übersetzt.`
      },
      {
        title: "Der Business Case — GF überzeugen",
        content: `Die Geschäftsführung entscheidet über Budget. Sie braucht einen Business Case — keine Technologie-Erklärung.

**Struktur eines KI-Business-Case:**

**1. Problem (1 Satz):** "Die manuelle Rechnungsprüfung kostet uns 2 FTE und dauert durchschnittlich 45 Minuten pro Rechnung."

**2. Lösung (1 Satz):** "Ein KI-gestütztes System reduziert den manuellen Aufwand um 70% durch automatische Vorprüfung und Klassifizierung."

**3. Investition:**
- Einmalig: PoC (X €) + Produktivstellung (Y €)
- Laufend: API-Kosten (Z €/Monat) + Wartung (W €/Monat)

**4. Return:**
- Zeitersparnis: 70% × 2 FTE = 1,4 FTE-Äquivalent
- Fehlerreduktion: Von 5% auf 0,5% Fehlquote
- Monetarisiert: Ersparnis von X €/Jahr

**5. Payback:** Investment amortisiert sich in Y Monaten.

**6. Risiken und Mitigierung:**
- Risiko: KI-Qualität nicht ausreichend → Mitigierung: PoC mit Go/No-Go
- Risiko: Nutzer-Akzeptanz gering → Mitigierung: Change-Management-Plan
- Risiko: DSGVO-Bedenken → Mitigierung: EU-Hosting, AVV, Anonymisierung

**Tipp:** Halte den Business Case auf maximal 2 Seiten. GF hat keine Zeit für 20 Seiten. Executive Summary + eine Tabelle mit Zahlen + eine klare Empfehlung.`,
        analogy: `Wie ein Investment-Pitch: In 5 Minuten musst du klar machen warum sich die Investition lohnt. Problem, Lösung, Zahlen, Risiken, Empfehlung. Kein Technologie-Deep-Dive, sondern Business-Logik.`,
        consultingRelevance: `Den Business Case zu schreiben ist eine deiner Kern-Beratungsleistungen. Er bestimmt ob das Projekt freigegeben wird oder nicht. Investiere Zeit in saubere Zahlen — und sei konservativ. Lieber unter-versprechen und über-liefern als umgekehrt.`
      },
      {
        title: "IT-Leitung und Betriebsrat — Vertrauen aufbauen",
        content: `**IT-Leitung gewinnen:**

Die IT-Abteilung kann dein stärkster Verbündeter oder dein größter Gegner sein. Der Schlüssel:

- **Respektiere ihre Expertise:** Sie kennen die Systemlandschaft besser als du.
- **Beziehe sie in Architektur-Entscheidungen ein:** "Was denken Sie — passt Azure hier besser als AWS?"
- **Adressiere ihre Bedenken proaktiv:** Sicherheit, Wartung, Betrieb.
- **Kein Schatten-IT:** Das KI-Projekt läuft transparent, nicht an der IT vorbei.
- **Übergabe planen:** Wer betreibt das System nach dem Projekt?

**Betriebsrat einbinden:**

In Unternehmen ab 200+ Mitarbeitern ist der Betriebsrat ein relevanter Stakeholder:

- **Frühzeitig informieren:** Nicht erst wenn alles fertig ist.
- **Transparenz:** Was kann die KI sehen? Was nicht? Keine Leistungsüberwachung.
- **Betriebsvereinbarung:** Anbieten, Regeln gemeinsam definieren.
- **Schulungs-Recht:** Mitarbeiter haben Anspruch auf Schulung bei neuen Systemen.

**Der häufigste Fehler:** Den Betriebsrat als Hindernis sehen statt als Verbündeten. Ein Betriebsrat der das KI-Projekt unterstützt, beschleunigt die Mitarbeiter-Akzeptanz enorm.`,
        analogy: `IT und Betriebsrat sind wie der TÜV bei einem Neuwagen: Sie prüfen und sie können blockieren. Aber wenn du sie von Anfang an einbindest und ihre Bedenken ernst nimmst, wird die Prüfung zum Qualitätssiegel statt zum Hindernis.`,
        consultingRelevance: `Die Fähigkeit, IT-Leitung und Betriebsrat ins Boot zu holen, unterscheidet erfolgreiche von gescheiterten KI-Projekten. Plane im Projektplan explizit Zeit für "Stakeholder-Alignment" ein — mindestens 1-2 Termine pro Woche in der Anfangsphase.`
      }
    ],
    gfSummary: `"Wir sorgen dafür, dass alle an einem Strang ziehen: Die Geschäftsführung sieht den ROI, die IT ist in die technischen Entscheidungen eingebunden, die Fachabteilung erlebt den direkten Nutzen, und der Betriebsrat hat Transparenz. Kein Widerstand, kein Schatten-IT — ein gemeinsames Projekt."`
  },

  "project-structure": {
    title: "KI-Projektstruktur",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Agil statt Wasserfall — warum KI anders tickt",
        content: `KI-Projekte funktionieren nicht wie klassische IT-Projekte. Der Grund: **Du weißt am Anfang nicht genau, wie gut die KI funktionieren wird.**

Bei einem ERP-Projekt kannst du sagen: "In Woche 8 ist die Bestellerfassung fertig." Bei einem KI-Projekt nicht: Ob die KI-Antworten gut genug sind, zeigt sich erst beim Testen mit echten Daten. Deshalb: **Agil statt Wasserfall.**

**Agiles Vorgehen für KI:**
- **Kurze Zyklen:** 2-Wochen-Sprints mit Demo am Ende
- **Frühes Testen:** Lieber ein unvollständiger Prototyp der getestet wird als ein perfekter Plan der nie getestet wurde
- **Feedback-Loops:** Nach jedem Sprint: Was haben wir gelernt? Was ändern wir?
- **Scope-Flexibilität:** Der Scope darf sich ändern — basierend auf Erkenntnissen

**Was gleich bleibt:**
- Klare Ziele und Erfolgskriterien
- Regelmäßiges Reporting an Stakeholder
- Budget-Kontrolle
- Go/No-Go-Gates an definierten Meilensteinen`,
        analogy: `Wie eine Expedition statt einer Bahnfahrt: Bei der Bahn kennst du die Route und die Ankunftszeit. Bei der Expedition kennst du das Ziel, aber der Weg ergibt sich unterwegs — du musst auf Wetter, Gelände und neue Erkenntnisse reagieren. Ein guter Expeditionsleiter hat einen Plan, ist aber bereit ihn anzupassen.`,
        consultingRelevance: `Kommuniziere dem Kunden klar: "KI-Projekte sind erkundend, nicht planbar wie ein SAP-Rollout. Deshalb arbeiten wir in kurzen Zyklen mit regelmäßigen Demos. Sie sehen alle 2 Wochen den Fortschritt und können Richtung anpassen." Das verhindert Frustration bei Unvorhergesehenem.`
      },
      {
        title: "Der Projektplan — Sprint für Sprint",
        content: `**Sprint 0 (1 Woche): Setup**
- Entwicklungsumgebung aufsetzen
- Datenzugang sicherstellen
- Architektur-Entscheidungen finalisieren
- Team-Setup und Kommunikationskanäle
- Definition of Done festlegen

**Sprint 1-2 (2 Wochen): Kern-PoC**
- Basisfunktionalität implementieren
- Erste Integration mit Datenquellen
- System Prompt + Few-Shot-Beispiele erstellen
- Erste Tests mit echten Daten
- **Demo: "Es funktioniert grundsätzlich"**

**Sprint 3-4 (2 Wochen): Qualität**
- Prompt Engineering optimieren
- Retrieval-Qualität verbessern (bei RAG)
- Edge Cases identifizieren und behandeln
- Qualitätsmetriken erheben
- **Demo: "Die Ergebnisse sind zuverlässig"**

**Sprint 5-6 (2 Wochen): Integration + UI**
- ERP-Anbindung produktionsreif machen
- Frontend polieren für Endnutzer
- Authentifizierung und Berechtigungen
- **Demo: "Es sieht gut aus und ist sicher"**

**Sprint 7-8 (2 Wochen): Rollout-Vorbereitung**
- Performance-Tests
- Nutzerschulung vorbereiten
- Monitoring einrichten
- Dokumentation finalisieren
- **Go-Live mit Pilotgruppe**

**Gesamtdauer: ~4 Monate** für eine vollständige KI-Lösung. PoC allein: 2-4 Wochen.`,
        analogy: `Wie ein Staffellauf: Jeder Sprint hat einen klaren Startpunkt, eine definierte Strecke, und eine Übergabe am Ende (Demo). Wenn ein Läufer stolpert (Sprint liefert nicht wie geplant), können die nächsten Läufer den Kurs anpassen. Das Ziel bleibt dasselbe, der Weg ist flexibel.`,
        consultingRelevance: `Dieser Sprintplan ist eine Vorlage die du für jeden Kunden adaptierst. Einfachere Projekte brauchen weniger Sprints, komplexere mehr. Aber die Struktur (Setup → Kern → Qualität → Integration → Rollout) bleibt immer gleich. Präsentiere den Plan im Assessment-Report.`
      },
      {
        title: "Rollen im KI-Projekt",
        content: `Wer macht was in einem KI-Projekt für den Mittelstand?

**Du (KI-Berater/Projektleiter):**
- Use-Case-Analyse und Priorisierung
- Architektur-Design
- Prompt Engineering und Qualitätssicherung
- Stakeholder-Management und Change
- Projektsteuerung und Reporting

**Entwickler (intern oder extern, 1-2 Personen):**
- Frontend-Entwicklung
- Backend-Logik und Integration
- Daten-Pipeline aufbauen
- Deployment und Monitoring

**Kunde — IT-Ansprechpartner:**
- Systemzugang bereitstellen
- Technische Fragen klären
- Infrastruktur-Entscheidungen mittragen
- Späterer Betrieb

**Kunde — Fachexperte:**
- Domänenwissen einbringen
- Testdaten bereitstellen und bewerten
- KI-Ergebnisse qualitätssichern
- Anforderungen formulieren

**Kunde — Management-Sponsor:**
- Budget freigeben
- Politische Unterstützung sichern
- Eskalationspfad bei Problemen
- Go/No-Go-Entscheidungen treffen

**Für den PoC reichen oft:** Du + 1 Entwickler + 1 Fachexperte beim Kunden. Für den Rollout kommen IT-Ansprechpartner und Management-Sponsor dazu.

**Wo findest du Entwickler?** Freelancer-Plattformen (Freelancermap, Upwork), Entwickler-Agenturen, oder — dein Claude Code + Cursor Setup für Prototypen. Für den PoC kannst du vieles selbst bauen, für die Produktionsversion brauchst du Unterstützung.`,
        analogy: `Wie ein Hausbau: Du bist der Architekt (Design, Planung, Qualität). Der Entwickler ist der Bauunternehmer (baut nach Plan). Der Fachexperte ist der Bauherr (weiß was er braucht). Der IT-Ansprechpartner ist der Statiker (prüft ob es hält). Der Sponsor ist der Investor (gibt das Geld frei).`,
        consultingRelevance: `In deinem Angebot definierst du klar: Was machst du, was macht der Kunde, was macht ein Entwickler? Transparente Rollenverteilung verhindert falsche Erwartungen. Und sie zeigt dem Kunden: Du brauchst keine 10-Personen-Armee — ein kleines, fokussiertes Team reicht.`
      }
    ],
    gfSummary: `"KI-Projekte leben von kurzen Zyklen und schnellem Feedback. Wir arbeiten in 2-Wochen-Sprints: Alle 14 Tage sehen Sie den Fortschritt, können Richtung anpassen, und behalten die volle Kontrolle. Das Team ist schlank — ein erfahrener Berater, ein Entwickler, und Ihre internen Experten. Kein Overhead, maximale Effizienz."`
  },

  "positioning": {
    title: "Dein Angebot & Positionierung",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Dein Sweet Spot — Brückenbauer zwischen Business und KI",
        content: `Du bist nicht der günstigste Entwickler und nicht der teuerste Technologie-Guru. Du bist etwas Wertvolleres: **Der Berater der beide Welten versteht.**

**Dein einzigartiger Wertbeitrag:**
- 26 Jahre SCM, Procurement und Produktionsplanung
- Tiefes Verständnis für Geschäftsprozesse im industriellen Mittelstand
- Erfahrung mit SAP, ERP-Systemen und Organisationsentwicklung
- Turnaround- und Transformationskompetenz
- Change Management und Stakeholder-Kommunikation
- PLUS: Wachsende KI-Kompetenz (Architektur, Prototyping, Prompt Engineering)

**Was dich von anderen unterscheidet:**
- **Vs. Tech-Berater:** Du verstehst die Geschäftsprozesse. Du weißt warum der Einkäufer frustriert ist — nicht nur dass er es ist.
- **Vs. Management-Berater:** Du kannst einen funktionierenden Prototyp bauen. Kein Powerpoint, sondern echte Software.
- **Vs. Entwickler-Agenturen:** Du steuerst das Projekt, definierst die Anforderungen, und sicherst die Qualität. Du brauchst keinen separaten Product Owner.

**Dein Zielprofil als Positionierung:**
"KI-Transformationsberater für den industriellen Mittelstand — Brücke zwischen Geschäftsprozessen und Technologie. Pragmatisch, DSGVO-konform, mit messbarem ROI."`,
        analogy: `Du bist nicht der Handwerker (Entwickler) und nicht der Bauherr (Kunde). Du bist der Architekt: Du verstehst was der Bauherr will, was der Handwerker kann, und du bringst beides zusammen in einem Plan der funktioniert. Architekten werden nicht nach Stunden bezahlt — sondern nach dem Wert den sie schaffen.`,
        consultingRelevance: `Diese Positionierung bestimmt dein Marketing, deine Preise und deine Angebote. Schreib sie auf deine Website, in dein LinkedIn-Profil und in jede Angebots-Einleitung. "26 Jahre Prozesserfahrung + KI-Kompetenz = Ihr Vorteil."`
      },
      {
        title: "Angebotsstruktur — vom Quick Check zum Retainer",
        content: `Vier Angebotsbausteine die aufeinander aufbauen:

**1. KI-Readiness-Check (1-2 Tage, Festpreis)**
- Discovery-Workshop: Interviews, Systemanalyse, Use-Case-Identifikation
- Deliverable: Report mit Top-5-Use-Cases und Datenreife-Bewertung
- Ziel: Kunde versteht sein KI-Potenzial
- Pricing: 2.000-4.000€

**2. Assessment + Design (3-5 Tage, Festpreis)**
- Daten-Audit, Impact-Matrix, Build-vs-Buy-Analyse
- Architektur-Entwurf für Top-Use-Case
- Deliverable: Assessment-Report + Architektur-Dokument + Projektplan
- Ziel: Entscheidungsgrundlage für Budget-Freigabe
- Pricing: 5.000-10.000€

**3. PoC-Projekt (2-4 Wochen, Festpreis)**
- Funktionierender Prototyp mit echten Kundendaten
- Qualitätsmetriken und Business-Case-Validierung
- Deliverable: Funktionierender PoC + Ergebnis-Report + Go/No-Go-Empfehlung
- Ziel: Beweis dass die Lösung funktioniert
- Pricing: 10.000-25.000€ (je nach Komplexität)

**4. Implementierungsbegleitung (Retainer, Tagessatz)**
- Projektsteuerung, Qualitätssicherung, Change Management
- Prompt Engineering-Optimierung, Stakeholder-Kommunikation
- Rollout-Begleitung und Training
- Pricing: Tagessatz × Anzahl Tage/Monat

**Die Treppe:** Jede Stufe senkt das Risiko für den Kunden und baut Vertrauen auf. Vom Quick Check zum Retainer — ohne den Kunden zu überfordern.`,
        analogy: `Wie ein Restaurant: Vorspeise (Quick Check — reinschmecken), Hauptgang (Assessment + PoC — die volle Portion), Nachspeise (Implementierung — der süße Abschluss). Der Gast entscheidet nach jedem Gang ob er weitermacht. Kein Zwang, kein Abo — aber das Menü ist so lecker dass er bleibt.`,
        consultingRelevance: `Starte jeden Kundenkontakt mit dem Quick Check — niedrige Hürde, hoher Wert. Wenn der Quick Check überzeugt, folgt der Rest von allein. Nie direkt ein Retainer-Angebot machen — erst Vertrauen aufbauen, dann Engagement vertiefen.`
      },
      {
        title: "Thought Leadership und Sichtbarkeit",
        content: `Um Kunden zu gewinnen, musst du sichtbar sein. Drei Kanäle:

**LinkedIn:**
- Regelmäßig posten (2-3x pro Woche)
- Themen: KI-Praxisbeispiele aus dem Mittelstand, Use-Case-Ideen, DSGVO-Tipps, Tool-Reviews
- Tonalität: Pragmatisch, nicht hype-ig. "So funktioniert das in der Praxis" statt "KI revolutioniert alles."
- Engagement: In relevanten Gruppen kommentieren, Fragen beantworten

**Vorträge/Webinare:**
- IHK-Veranstaltungen: "KI für den Mittelstand — pragmatisch statt hype"
- Branchenverbände: Automotive-Zulieferer, MedTech, Maschinenbau
- Eigene Webinare: "In 60 Minuten: Wie KI Ihre Angebotsbearbeitung beschleunigt"

**Referenz-Cases:**
- Erste 2-3 Projekte dokumentieren (mit Kundenerlaubnis)
- Konkreter Nutzen in Zahlen: "40% schnellere Angebotsbearbeitung"
- Case Study auf Website und LinkedIn
- Tipp: Ersten Kunden ggf. Rabatt geben gegen Referenz-Erlaubnis

**Content-Strategie:**
Starte mit dem was du hast — dein LearningHub-Wissen! Die Module die du hier lernst, kannst du in LinkedIn-Posts, Vorträge und Blog-Artikel umwandeln. "5 Dinge die ich über RAG gelernt habe" — authentisch, lehrreich, positionierend.`,
        analogy: `Thought Leadership ist wie ein Schaufenster: Du zeigst was du kannst, ohne zu verkaufen. Der Passant (potenzielle Kunde) bleibt stehen, findet es interessant, und kommt rein um mehr zu erfahren. Das Schaufenster verkauft nicht — es zieht an.`,
        consultingRelevance: `LinkedIn ist dein wichtigster Vertriebskanal. Ein Post der 5.000 Views bekommt, ersetzt 50 Kalt-Akquise-Anrufe. Plane 30 Minuten pro Tag für Content — das ist eine Investition die sich multipliziert.`
      }
    ],
    gfSummary: `"Ich bringe 26 Jahre SCM- und Transformationserfahrung mit. Ich verstehe Ihre Prozesse, Ihre ERP-Systeme und Ihre Organisation. Und ich weiß, wie KI diese drei Dinge verbessern kann — pragmatisch, DSGVO-konform und mit messbarem ROI. In 2 Wochen haben Sie einen funktionierenden Prototyp. Kein Risiko, konkreter Nutzen."`
  }
};

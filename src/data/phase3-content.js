// ============================================================
// VOLLSTÄNDIGE LERNINHALTE - Phase 3: Lösungsdesign
// ============================================================

export const PHASE3_CONTENT = {

  "usecase-analysis": {
    title: "Use-Case-Analyse",
    layerLevel: 1,
    estimatedMinutes: 45,
    steps: [
      {
        title: "Problem-First, nicht Technology-First",
        content: `Der häufigste Fehler bei KI-Projekten: Man startet mit der Technologie statt mit dem Problem. "Wir wollen KI einsetzen" ist kein Use Case — es ist ein Wunsch ohne Richtung.

**Der richtige Einstieg:** "Unsere Angebotsbearbeitung dauert durchschnittlich 4 Stunden, weil der Mitarbeiter in 3 verschiedenen Systemen nach technischen Spezifikationen suchen muss." DAS ist ein Problem, das man lösen kann.

**Die drei Fragen zum Start:**
1. **Was ist das konkrete Problem?** Nicht "Effizienz steigern", sondern "Die manuelle Prüfung eingehender Rechnungen dauert 45 Minuten pro Rechnung."
2. **Was kostet das Problem?** In Euro, in Stunden, in Fehlerquoten. Quantifizierung schafft Entscheidungsgrundlagen.
3. **Wer leidet darunter?** Welche Abteilung, welche Rollen, welche Prozesse? Das bestimmt die Stakeholder.

**Erst wenn das Problem klar ist**, fragst du: Kann KI hier helfen? Und wenn ja: Welche Art von KI-Lösung (Prompt, Workflow, Agent, RAG)?`,
        analogy: `Wie ein Arzt: Erst Symptome aufnehmen ("Wo tut es weh?"), dann Diagnose stellen ("Das Problem ist X"), dann Therapie vorschlagen ("Ich empfehle Y"). Nicht sofort operieren, nur weil der Patient "KI" gehört hat und das jetzt will.`,
        consultingRelevance: `Problem-First ist dein Differenzierungsmerkmal gegenüber Tech-Beratern, die mit Lösungen ankommen bevor sie das Problem verstanden haben. Dein Turnaround-Hintergrund hilft: Du bist gewohnt, erst die Ist-Situation sauber aufzunehmen bevor du Maßnahmen vorschlägst.`
      },
      {
        title: "Use Cases identifizieren — der Discovery-Workshop",
        content: `Der Discovery-Workshop ist dein Einstiegsinstrument beim Kunden. In 1-2 Tagen sammelst du systematisch potenzielle KI-Use-Cases.

**Vorbereitung:**
- Organigramm und Prozesslandkarte anfordern
- Interviews mit 3-5 Schlüsselpersonen planen (GF, IT, 2-3 Fachabteilungen)
- Fragebogen vorbereiten (nicht technisch, sondern prozessorientiert)

**Die Kernfragen im Interview:**
- "Welche Aufgabe frisst am meisten Zeit in Ihrer Abteilung?"
- "Wo passieren die meisten Fehler?"
- "Welche Informationen suchen Sie regelmäßig und brauchen lange dafür?"
- "Welche Entscheidungen treffen Sie täglich, die immer dem gleichen Muster folgen?"
- "Gibt es Aufgaben, die so langweilig sind, dass keiner sie gerne macht?"

**Typische KI-Use-Cases im Mittelstand:**
- **Dokumentenanalyse:** Verträge, Rechnungen, technische Datenblätter durchsuchen und auswerten
- **E-Mail-Klassifizierung:** Eingehende Anfragen kategorisieren und routen
- **Wissens-Chatbot:** Interne Wissensdatenbank durchsuchbar machen (RAG)
- **Berichterstellung:** Regelmäßige Reports aus Daten automatisch generieren
- **Qualitätsprüfung:** Eingangsdaten auf Anomalien und Fehler prüfen
- **Angebotsunterstützung:** Kalkulation und Textbausteine für Angebote vorschlagen

**Ergebnis:** Eine Liste von 5-15 potenziellen Use Cases, grob beschrieben mit Problem, betroffener Abteilung und geschätztem Nutzen.`,
        analogy: `Der Discovery-Workshop ist wie eine Inventur: Du gehst durch alle Abteilungen, schaust in jeden Schrank, und notierst was da ist und was fehlt. Am Ende hast du eine vollständige Übersicht — die Basis für jede Entscheidung.`,
        consultingRelevance: `Der Discovery-Workshop ist dein ideales Einstiegsprodukt: 1-2 Tage, überschaubarer Preis, sofortiger Mehrwert (der Kunde bekommt eine Use-Case-Liste die er so nie erstellt hätte), und für dich die Basis für ein konkretes Projektangebot.`
      },
      {
        title: "Use Cases priorisieren — die Impact-Matrix",
        content: `Aus 10 identifizierten Use Cases werden 2-3 priorisierte. Das Werkzeug dafür ist eine **Impact-Machbarkeits-Matrix**.

**Dimension 1 — Business Impact (hoch/mittel/niedrig):**
- Zeitersparnis in Stunden pro Woche
- Fehlerreduktion in Prozent
- Umsatzwirkung oder Kostensenkung in Euro
- Strategische Bedeutung (Wettbewerbsvorteil, Kundenzufriedenheit)

**Dimension 2 — Machbarkeit (hoch/mittel/niedrig):**
- Daten verfügbar und qualitativ ausreichend?
- Technische Komplexität (Prompt vs. Workflow vs. Agent)?
- Schnittstellen vorhanden oder baubar?
- Akzeptanz der Nutzer erwartbar?

**Dimension 3 — Datenreife (hoch/mittel/niedrig):**
- Existieren die benötigten Daten digital?
- Sind sie strukturiert und zugänglich?
- Ist die Qualität ausreichend (Vollständigkeit, Konsistenz)?
- Gibt es genug historische Daten für aussagekräftige Ergebnisse?

**Die Priorisierungsregel:** Starte mit dem Use Case der **hohen Impact UND hohe Machbarkeit** hat — das ist dein Quick Win. Finger weg von "hoher Impact aber niedrige Machbarkeit" als erstes Projekt — das Risiko des Scheiterns ist zu hoch.

**Ergebnis:** Ein priorisiertes Ranking mit dem Top-3-Use-Cases, jeweils mit Begründung, geschätztem Aufwand und erwartetem Nutzen.`,
        analogy: `Wie bei einer Triage in der Notaufnahme: Nicht der lauteste Patient wird zuerst behandelt, sondern der, bei dem du mit geringem Aufwand den größten Effekt erzielst. Der komplizierte Spezialfall kommt danach — wenn das Team eingespielt ist und die einfachen Fälle Vertrauen geschaffen haben.`,
        consultingRelevance: `Die Impact-Matrix ist ein Deliverable das du dem Kunden präsentierst. Visuell, nachvollziehbar, datenbasiert. Der GF sieht sofort: "Use Case A bringt am meisten bei geringstem Risiko." Das ist Entscheidungsgrundlage, nicht Bauchgefühl.`
      },
      {
        title: "Datenreife-Assessment — ist der Kunde bereit?",
        content: `Viele KI-Projekte scheitern nicht an der KI, sondern an den Daten. Das Datenreife-Assessment prüft, ob die Voraussetzungen gegeben sind.

**5 Dimensionen der Datenreife:**

**1. Existenz:** Gibt es die benötigten Daten überhaupt digital? Oder stecken sie in Papierakten, in den Köpfen der Mitarbeiter, oder in nicht-exportierbaren Legacy-Systemen?

**2. Zugänglichkeit:** Kommt man an die Daten ran? Gibt es APIs? Datenbankzugang? Oder nur manuellen Export per CSV?

**3. Qualität:** Sind die Daten vollständig, konsistent und aktuell? Gibt es Duplikate, fehlende Felder, veraltete Einträge?

**4. Volumen:** Gibt es genug Daten für aussagekräftige Ergebnisse? 50 Reklamationen sind zu wenig für eine Musteranalyse. 5.000 sind ein guter Start.

**5. Governance:** Wer ist für die Daten verantwortlich? Gibt es Prozesse zur Datenpflege? Ist klar, wer was ändern darf?

**Datenreife-Score:** Jede Dimension wird von 1-5 bewertet. Ein Gesamtscore unter 3 heißt: Erst Daten aufräumen, dann KI. Das ist unbequem zu hören, aber ehrlich — und spart dem Kunden viel Geld und Frust.

**Typische Findings im Mittelstand:**
- Lieferantenstamm 3x vorhanden (verschiedene Schreibweisen)
- Qualitätsdaten teilweise in Excel, teilweise in SAP, teilweise nur per E-Mail
- Keine klare Datenverantwortlichkeit ("Das macht jeder irgendwie")
- Historische Daten vor dem letzten ERP-Wechsel nicht migriert`,
        analogy: `Wie ein Bodentest vor dem Hausbau: Bevor du das Fundament gießt, prüfst du ob der Boden tragfähig ist. Wenn nicht, musst du erst den Boden stabilisieren — das ist nicht sexy, aber ohne tragfähigen Boden steht kein Haus.`,
        consultingRelevance: `Das Datenreife-Assessment hat eigenständigen Beratungswert: Auch wenn kein KI-Projekt daraus wird, profitiert der Kunde von der Übersicht über seine Datenlandschaft und die identifizierten Qualitätsprobleme. Es ist nie verschwendete Zeit.`
      },
      {
        title: "Build vs. Buy — die Architektur-Entscheidung",
        content: `Für jeden Use Case die Frage: Selbst bauen oder fertige Lösung kaufen?

**Buy — fertige Lösung nutzen, wenn:**
- Der Use Case standard ist (E-Mail-Zusammenfassung, Übersetzung, einfacher Chatbot)
- Es etablierte Produkte gibt (Microsoft Copilot, SAP Joule, Salesforce Einstein)
- Der Kunde bereits im Ökosystem des Anbieters ist
- Keine besonderen Anpassungen nötig sind

**Build — eigene Lösung bauen, wenn:**
- Der Use Case kundenspezifisch ist (branchenspezifische Analyse, proprietäre Prozesse)
- Tiefe Integration in bestehende Systeme nötig ist
- Volle Kontrolle über Daten und Logik erforderlich ist
- Kein passendes Produkt am Markt existiert

**Hybrid — häufig die beste Antwort:**
- Fertige Plattform als Basis (Supabase, Vercel)
- KI-API als Gehirn (Claude, GPT)
- Eigene Integration und Anpassung drumherum

**SAP-Kunden Sonderfall:** SAP Joule wird immer tiefer in S/4HANA integriert. Für einfache Use Cases innerhalb der SAP-Welt (Bestellvorschläge, Stammdatensuche) kann Joule die richtige Antwort sein. Für alles was über SAP hinausgeht (systemübergreifende Analyse, Dokumenten-RAG, E-Mail-Automation) brauchst du eine eigene Lösung.

**Microsoft-Kunden Sonderfall:** Microsoft 365 Copilot ist für viele Büro-Aufgaben bereits da (Zusammenfassung in Teams, E-Mail-Drafts in Outlook). Frag immer: "Haben Sie Copilot-Lizenzen?" Wenn ja, starte dort bevor du etwas Eigenes baust.`,
        analogy: `Wie die Entscheidung zwischen Konfektionsanzug und Maßanzug: Der Konfektionsanzug (Buy) ist schnell verfügbar und günstig, passt aber vielleicht nicht perfekt. Der Maßanzug (Build) sitzt exakt, kostet aber mehr und braucht länger. Oft reicht der Konfektionsanzug — aber für den wichtigen Anlass brauchst du Maß.`,
        consultingRelevance: `Die Build-vs-Buy-Empfehlung ist ein Kernstück deines Assessment-Reports. Sie bestimmt Budget, Timeline und Projektstruktur. Ein ehrliches "Kaufen Sie einfach Copilot-Lizenzen" baut mehr Vertrauen auf als ein unnötiges Custom-Projekt — und führt zu Folgeaufträgen für die Use Cases, wo Custom wirklich nötig ist.`
      }
    ],
    gfSummary: `"Wir beginnen nicht mit Technologie, sondern mit Ihren Geschäftsproblemen. In einem 1-2 tägigen Workshop identifizieren wir die vielversprechendsten Anwendungsfälle, bewerten sie nach Nutzen und Machbarkeit, und prüfen ob Ihre Daten bereit sind. Das Ergebnis: Eine klare Empfehlung, welcher Use Case den schnellsten ROI liefert — und ob Sie dafür etwas Eigenes bauen oder eine fertige Lösung nutzen sollten."`
  },

  "architecture-design": {
    title: "Architektur-Design",
    layerLevel: 1,
    estimatedMinutes: 50,
    steps: [
      {
        title: "Was ist Architektur-Design?",
        content: `Architektur-Design bedeutet: **Die Lösung auf Papier planen, bevor gebaut wird.** Du definierst welche Komponenten es gibt, wie sie zusammenspielen, und wo die Daten fließen.

Das Ergebnis ist ein **Architektur-Diagramm** — typischerweise Kästchen (Komponenten) verbunden durch Pfeile (Datenflüsse). Es ist die Landkarte für das gesamte Projekt.

**Warum ist das wichtig?**
- **Kommunikation:** Das Diagramm ist die gemeinsame Sprache zwischen dir, dem IT-Leiter und den Entwicklern.
- **Entscheidungsgrundlage:** GF sieht auf einen Blick was gebaut wird und wo die Kosten liegen.
- **Risikominimierung:** Architektur-Fehler früh zu erkennen spart Wochen Entwicklungszeit.
- **Dokumentation:** Auch nach dem Projekt weiß jeder, wie das System aufgebaut ist.

**Du musst nicht mauern können, aber du musst den Bauplan lesen und erstellen können.** Als KI-Berater bist du der Architekt — du zeichnest den Plan, der Entwickler setzt ihn um.`,
        analogy: `Wie ein Bauplan für ein Haus: Du zeichnest nicht jeden Nagel ein, aber du zeigst klar wo die Wände sind, wo Wasser und Strom laufen, wo die Eingänge sind. Der Architekt muss nicht mauern können — aber er muss wissen, was möglich ist und was die Statik hergibt.`,
        consultingRelevance: `Architektur-Diagramme sind dein wichtigstes Deliverable im Design-Phase. Sie werden im Steering Committee präsentiert, vom IT-Leiter geprüft, und vom Entwickler-Team als Bauanleitung genutzt. Ein gutes Diagramm ersetzt zehn Meetings.`
      },
      {
        title: "Die Schichten einer KI-Lösung",
        content: `Jede KI-Lösung für den Mittelstand hat typischerweise vier Schichten:

**Schicht 1 — Präsentation (Frontend):**
Was der Nutzer sieht. Chat-Interface, Dashboard, Formular. Typisch: React-App auf Vercel.

**Schicht 2 — Logik (Backend/Orchestrierung):**
Hier passiert die Verarbeitung. Anfragen entgegennehmen, an die richtigen Dienste weiterleiten, Ergebnisse zusammenführen. Typisch: Supabase Edge Functions oder Make.com/n8n.

**Schicht 3 — KI (LLM + RAG):**
Das "Gehirn". LLM-API-Aufrufe, RAG-Pipeline, Prompt Engineering. Typisch: Claude API + Vektor-Suche.

**Schicht 4 — Daten (Datenbanken + ERP):**
Die Datenquellen. PostgreSQL für Anwendungsdaten, Vektor-DB für Dokumente, ERP für Geschäftsdaten. Typisch: Supabase + SAP OData.

**Querschnittsthemen:**
- **Authentifizierung:** Wer darf was? (Supabase Auth)
- **Monitoring:** Funktioniert alles? (Vercel Analytics, Supabase Logs)
- **Sicherheit:** DSGVO, API-Key-Management, Datenverschlüsselung

**Das Standard-Setup für 80% der Projekte:**
Vercel (Frontend) → Supabase Edge (Logik) → Claude API (KI) → Supabase PostgreSQL + pgvector (Daten)

Dieses Setup ist in 1-2 Tagen aufgebaut, kostet unter 100€/Monat und skaliert bis zu tausend Nutzer.`,
        analogy: `Wie die Etagen eines Bürogebäudes: Erdgeschoss ist der Empfang (Frontend — hier kommen die Besucher an). Erste Etage ist die Verwaltung (Backend — hier wird koordiniert). Zweite Etage ist die Fachabteilung (KI — hier wird die eigentliche Arbeit gemacht). Keller ist das Archiv (Daten — hier liegt alles gespeichert). Jede Etage hat ihre Aufgabe, der Aufzug (APIs) verbindet sie.`,
        consultingRelevance: `Dieses Vier-Schichten-Modell nutzt du bei jedem Kunden als Grundstruktur. Im Architektur-Diagramm zeichnest du die vier Schichten und füllst die konkreten Technologien ein. Das gibt dem Kunden Orientierung und dir eine Checkliste: Ist jede Schicht abgedeckt?`
      },
      {
        title: "Architektur-Diagramm erstellen — Schritt für Schritt",
        content: `So erstellst du ein Architektur-Diagramm für einen Kunden:

**Schritt 1 — Akteure identifizieren:**
Wer nutzt das System? Einkäufer, Service-Techniker, Geschäftsführung? Jeder Akteur wird als Figur/Icon links im Diagramm platziert.

**Schritt 2 — Komponenten einzeichnen:**
Jedes System wird als Kästchen dargestellt. Farbe nach Schicht:
- Blau = Frontend
- Grün = Backend/Logik
- Orange = KI-Dienste
- Grau = Datenquellen

**Schritt 3 — Datenflüsse einzeichnen:**
Pfeile zwischen den Kästchen. Beschriftet mit WAS fließt:
- "Nutzer-Frage" → vom Frontend zum Backend
- "Relevante Chunks" → von der Vektor-DB zur KI
- "KI-Antwort" → zurück zum Frontend
- "Bestelldaten" → von SAP zur Analyse

**Schritt 4 — Entscheidungen dokumentieren:**
Unter dem Diagramm: WARUM diese Technologie? Alternativen?
- "Vercel statt Azure: Geringere Kosten, schnelleres Setup. Wechsel zu Azure möglich wenn nötig."
- "Claude statt GPT: Größeres Context Window, bessere Analyse-Qualität in Tests."

**Schritt 5 — Sicherheit einzeichnen:**
Wo fließen personenbezogene Daten? Wo ist Verschlüsselung nötig? Wo sind die Systemgrenzen (intern/extern)?

**Tools für Architektur-Diagramme:**
- Mermaid (textbasiert, gut für Dokumentation)
- draw.io/diagrams.net (kostenlos, visuell)
- Excalidraw (informell, gut fürs Whiteboard)
- Miro (kollaborativ, gut für Workshops)`,
        analogy: `Wie eine Stadtplanung: Du zeichnest Straßen (Datenflüsse), Gebäude (Komponenten), Ampeln (Sicherheit) und Parkplätze (Speicher) ein. Jeder der die Karte liest, versteht sofort wie die Stadt aufgebaut ist — ohne jeden Stein einzeln sehen zu müssen.`,
        consultingRelevance: `Das Architektur-Diagramm ist das Herzstück deines Design-Dokuments. Tipp: Erstelle immer zwei Versionen — eine vereinfachte für die GF (5 Kästchen, große Pfeile, Business-Sprache) und eine detaillierte für die IT (alle Komponenten, Protokolle, Sicherheit). Selbe Architektur, unterschiedliche Zielgruppe.`
      },
      {
        title: "Sicherheits-Architektur — wo fließen sensible Daten?",
        content: `In jedem KI-Projekt fließen Unternehmensdaten an externe Dienste. Die Sicherheits-Architektur dokumentiert, wo das passiert und wie es abgesichert wird.

**Die drei Zonen:**
1. **Intern (grün):** Systeme unter voller Kontrolle des Kunden. On-Premise-Server, internes Netzwerk.
2. **Trusted Cloud (gelb):** Cloud-Dienste mit AVV und EU-Hosting. Supabase EU, Azure Frankfurt.
3. **Extern (rot):** Dienste außerhalb der direkten Kontrolle. KI-APIs, externe Datenquellen.

**Für jeden Datenfluss dokumentieren:**
- Welche Daten fließen? (Personenbezogen? Geschäftsgeheim?)
- Von wo nach wo?
- Über welchen Kanal? (HTTPS, VPN?)
- Gibt es eine vertragliche Grundlage? (AVV?)

**Typische Maßnahmen:**
- **Anonymisierung:** Personenbezogene Daten vor dem Senden an die KI-API entfernen oder pseudonymisieren.
- **Minimierung:** Nur die Daten senden die wirklich nötig sind. Nicht den ganzen Vertrag, wenn nur die Lieferbedingungen relevant sind.
- **Verschlüsselung:** HTTPS für Transport, Encryption at Rest für Speicherung.
- **Logging:** Welche Daten wurden wann an welchen Dienst gesendet? Für Audit-Trail.

**Zero Data Retention:** Prüfe ob der KI-Anbieter die gesendeten Daten speichert oder nur verarbeitet und verwirft. Anthropic bietet Zero Data Retention für API-Kunden — ein wichtiges DSGVO-Argument.`,
        analogy: `Wie ein Sicherheitskonzept für ein Gebäude: Wer darf durch welche Tür (Authentifizierung)? Wo sind die Kameras (Logging)? Was passiert bei einem Einbruch (Incident Response)? Welche Bereiche sind Hochsicherheit (personenbezogene Daten)?`,
        consultingRelevance: `Die Sicherheits-Architektur ist oft das Dokument das der Datenschutzbeauftragte und der Betriebsrat sehen wollen. Erstelle es proaktiv — bevor danach gefragt wird. Das zeigt Professionalität und beschleunigt die Freigabe.`
      },
      {
        title: "Skalierbarkeit und Evolution",
        content: `Eine gute Architektur denkt nicht nur an heute, sondern an morgen. Zwei Prinzipien:

**Skalierbarkeit:** Die Lösung muss von 5 Nutzern auf 500 wachsen können ohne Neudesign.
- Serverless-Dienste (Vercel, Supabase) skalieren automatisch.
- KI-API-Kosten skalieren linear mit der Nutzung — das muss im Business Case stehen.
- Vektor-DB muss bei wachsender Dokumentenmenge performant bleiben.

**Evolutionsfähigkeit:** Komponenten sollen austauschbar sein.
- **LLM austauschbar:** Heute Claude, morgen vielleicht GPT oder Llama. Die Prompt-Logik in einer Schicht kapseln, nicht überall verteilen.
- **Datenbank austauschbar:** Supabase pgvector heute, Pinecone morgen wenn die Datenmenge zu groß wird.
- **Frontend austauschbar:** Die UI kann sich komplett ändern, ohne die Backend-Logik anzufassen.

**Lose Kopplung** ist das Designprinzip: Jede Komponente kommuniziert nur über definierte APIs mit den anderen. Wie Legosteine — einzeln austauschbar, aber zusammen ein stabiles Gebäude.

**Für den Kunden heißt das:** Kein Vendor Lock-in. Wenn Anthropic die Preise verdoppelt, wechselst du zu OpenAI — ohne das ganze System neu zu bauen. Das ist ein starkes Argument im Verkaufsgespräch.`,
        analogy: `Wie ein Hausbau mit Standardmaßen: Türen und Fenster haben Norm-Maße. Wenn du eine Tür austauschen willst, kaufst du eine neue im Standardmaß und setzt sie ein — du musst nicht die Wand einreißen. Lose Kopplung = Standardmaße für Software-Komponenten.`,
        consultingRelevance: `Skalierbarkeit und Lock-in-Freiheit sind Argumente die den IT-Leiter überzeugen. Zeige im Diagramm: "Hier ist die Schnittstelle. Wenn wir den LLM-Anbieter wechseln, ändern wir nur diesen einen Baustein." Das gibt Sicherheit für eine Investitionsentscheidung.`
      }
    ],
    gfSummary: `"Wir erstellen einen klaren Architektur-Plan bevor wir bauen — wie bei jedem guten Bauprojekt. Sie sehen genau welche Komponenten es gibt, wie sie zusammenspielen, wo Ihre Daten fließen, und wie die Sicherheit gewährleistet ist. Die Architektur ist so gestaltet, dass einzelne Bausteine ausgetauscht werden können — kein Vendor Lock-in, volle Flexibilität."`
  },

  "prompt-engineering": {
    title: "Prompt Engineering für Unternehmen",
    layerLevel: 1,
    estimatedMinutes: 45,
    steps: [
      {
        title: "Was ist Prompt Engineering?",
        content: `Prompt Engineering ist die Kunst, dem KI-Modell die **richtige Anweisung** zu geben. Das Modell selbst bleibt unverändert — du optimierst nur die Eingabe, um bessere Ausgaben zu bekommen.

**Warum ist das so wichtig?** Weil derselbe Sachverhalt, unterschiedlich formuliert, zu dramatisch verschiedenen Ergebnissen führt:

**Schlecht:** "Analysiere diese Daten."
**Besser:** "Du bist ein erfahrener Einkaufsleiter. Analysiere die folgenden Bestelldaten der letzten 12 Monate. Identifiziere die Top-3-Lieferanten nach Bestellvolumen und bewerte ihre Liefertreue. Antworte in einer Tabelle mit den Spalten: Lieferant, Bestellvolumen, Liefertreue-Quote, Empfehlung."

Der Unterschied ist wie ein vages Briefing vs. ein präziser Arbeitsauftrag. Je klarer dein Prompt, desto besser das Ergebnis.

**Prompt Engineering ist KEINE Programmierung.** Es ist strukturiertes Schreiben — eine Kompetenz die du als Berater bereits hast. Du bist gewohnt, klare Arbeitsanweisungen, Stellenbeschreibungen und Projektaufträge zu formulieren. Prompt Engineering ist exakt dasselbe — nur für eine KI statt für einen Mitarbeiter.`,
        analogy: `Prompt Engineering ist wie die Einarbeitung eines neuen Mitarbeiters: Je klarer du ihm sagst, wer er ist (Rolle), was er tun soll (Aufgabe), wie er es tun soll (Format), und welche Regeln gelten (Constraints) — desto besser arbeitet er. Ein Tag gute Einarbeitung spart Wochen schlechter Ergebnisse.`,
        consultingRelevance: `Prompt Engineering ist eine Kernkompetenz für KI-Berater. Und es ist die Kompetenz die am wenigsten technisch ist — es geht um Klarheit, Struktur und Domänenwissen. Genau dein Sweet Spot als SCM-Berater: Du weißt welche Fragen gestellt und welche Ergebnisse geliefert werden müssen.`
      },
      {
        title: "System Prompts — die Stellenbeschreibung der KI",
        content: `Der System Prompt wird einmal definiert und gilt für alle Interaktionen. Er ist die "Persönlichkeit" und das "Regelwerk" der KI in deiner Anwendung.

**Die fünf Elemente eines guten System Prompts:**

**1. Rolle:** "Du bist ein erfahrener Qualitätsmanagement-Experte in der Automotive-Zulieferindustrie."
→ Gibt dem Modell den richtigen Kontext und die passende "Sprache".

**2. Aufgabe:** "Deine Aufgabe ist es, eingehende Qualitätsmeldungen zu analysieren und zu klassifizieren."
→ Definiert klar was erwartet wird.

**3. Format:** "Antworte immer im folgenden JSON-Format: {kategorie, schweregrad, ursache, massnahme}"
→ Macht die Ausgabe maschinell verarbeitbar und konsistent.

**4. Constraints:** "Klassifiziere nur in die vordefinierten Kategorien: Maßabweichung, Oberflächenfehler, Materialfehler, Verpackungsschaden, Sonstiges. Erfinde keine neuen Kategorien."
→ Begrenzt den Spielraum und verhindert unerwartete Ergebnisse.

**5. Verhalten bei Unsicherheit:** "Wenn du dir bei der Klassifizierung nicht sicher bist, setze den Schweregrad auf 'Prüfung erforderlich' und erkläre warum."
→ Definiert den Umgang mit Grenzfällen — kritisch für Unternehmensanwendungen.

**Tipp:** Der System Prompt ist kein statisches Dokument. Er wird iterativ verbessert — basierend auf realen Ergebnissen. Wenn die KI eine bestimmte Kategorie regelmäßig falsch zuordnet, passt du den Prompt an.`,
        analogy: `Ein System Prompt ist wie eine Stellenbeschreibung + Arbeitsanweisung in einem: Wer bist du (Rolle)? Was sollst du tun (Aufgabe)? Wie soll das Ergebnis aussehen (Format)? Was darfst du nicht (Constraints)? Was machst du wenn du nicht weiterweißt (Eskalation)?`,
        consultingRelevance: `System Prompts für Unternehmenslösungen zu schreiben ist eine Beratungsleistung die du anbieten kannst. Der Prompt ist das "Gehirn" der Lösung — er bestimmt Qualität, Konsistenz und Zuverlässigkeit. Und er enthält das Domänenwissen das du einbringst: Welche Kategorien gibt es? Welche Schweregrade? Welche Maßnahmen?`
      },
      {
        title: "Few-Shot Prompting — Lernen durch Beispiele",
        content: `Few-Shot bedeutet: Du gibst dem Modell **Beispiele** für die gewünschte Ein- und Ausgabe. Das ist eine der effektivsten Prompt-Techniken.

**Ohne Beispiel (Zero-Shot):**
"Klassifiziere diese E-Mail."
→ Ergebnis: Unvorhersagbar. Welche Kategorien? Welches Format?

**Mit Beispielen (Few-Shot):**
"Klassifiziere die folgende E-Mail. Hier sind Beispiele:

Beispiel 1:
E-Mail: 'Die Lieferung vom 15.03. enthielt 50 statt 100 Stück. Bitte korrigieren.'
Klassifizierung: {kategorie: 'Mengenabweichung', priorität: 'mittel', aktion: 'Nachlieferung anfordern'}

Beispiel 2:
E-Mail: 'Wir möchten 500 Stück Artikel 4711 bestellen. Lieferung bitte bis KW 20.'
Klassifizierung: {kategorie: 'Bestellung', priorität: 'normal', aktion: 'Bestellbestätigung senden'}

Beispiel 3:
E-Mail: 'Die gelieferten Teile weisen Korrosionsspuren auf. Anbei Fotos.'
Klassifizierung: {kategorie: 'Qualitätsreklamation', priorität: 'hoch', aktion: 'Qualitätsmeldung erstellen'}

Jetzt klassifiziere:
E-Mail: 'Können Sie mir ein Angebot für 1000 Dichtungen Typ C senden?'"

Das Modell lernt aus den Beispielen: Format, Kategorien, Tonalität, Detailgrad. **3-5 Beispiele** reichen in der Regel für konsistente Ergebnisse.

**Tipp:** Wähle Beispiele die verschiedene Kategorien und Grenzfälle abdecken. Nicht 3x denselben Typ, sondern die Bandbreite zeigen.`,
        analogy: `Wie wenn du einem neuen Mitarbeiter sagst: "Hier sind drei Reklamationen die letzte Woche reinkamen. So haben wir sie bearbeitet. Siehst du das Muster? Jetzt mach die nächsten genauso." Der Mitarbeiter versteht nicht nur die Theorie, sondern sieht die Praxis.`,
        consultingRelevance: `Few-Shot-Beispiele erstellst du aus echten Kundendaten (anonymisiert). Im PoC sammelst du 10-20 reale Beispiele, lässt die KI klassifizieren, und misst die Trefferquote. Wenn die Quote nicht stimmt, änderst du die Beispiele oder fügst Grenzfälle hinzu. Das ist systematische Optimierung, kein Raten.`
      },
      {
        title: "Chain-of-Thought und Structured Output",
        content: `Zwei fortgeschrittene Techniken die für Unternehmenslösungen besonders wertvoll sind:

**Chain-of-Thought (CoT):** Du forderst das Modell auf, Schritt für Schritt zu denken bevor es antwortet. Das verbessert die Qualität bei komplexen Aufgaben massiv.

"Analysiere diesen Lieferantenvertrag:
1. Lies den Vertrag vollständig
2. Identifiziere die wichtigsten Konditionen (Preise, Lieferzeiten, Gewährleistung)
3. Vergleiche mit unseren Standard-Konditionen
4. Bewerte Abweichungen und Risiken
5. Erstelle eine Zusammenfassung mit Empfehlung"

Das Modell folgt der Schrittfolge und liefert durchdachtere Ergebnisse als bei "Analysiere diesen Vertrag."

**Structured Output:** Du definierst exakt das Ausgabeformat — typischerweise JSON. Damit wird die KI-Antwort maschinell verarbeitbar.

"Antworte ausschließlich im folgenden JSON-Format:
{
  'vertragsnummer': '',
  'lieferant': '',
  'laufzeit_monate': 0,
  'konditionen': [{'typ': '', 'wert': '', 'abweichung_standard': ''}],
  'risikobewertung': 'niedrig|mittel|hoch',
  'empfehlung': ''
}"

Die Kombination aus beiden: CoT für die Denkqualität, Structured Output für die Verarbeitbarkeit. Das Modell denkt gründlich nach und liefert ein sauber formatiertes Ergebnis.`,
        analogy: `Chain-of-Thought ist wie die Anweisung "Zeig deinen Rechenweg": Das Ergebnis wird besser weil das Modell jeden Zwischenschritt explizit durchdenkt statt zum Ergebnis zu springen. Structured Output ist wie ein vorgedrucktes Formular: Alle Felder sind definiert, die KI füllt sie aus.`,
        consultingRelevance: `Structured Output ist der Schlüssel für Integration: Wenn die KI immer im gleichen JSON-Format antwortet, kann der nachfolgende Workflow die Daten automatisch verarbeiten — in die Datenbank schreiben, ans ERP senden, in ein Dashboard einspeisen. Ohne Structured Output braucht es immer einen Menschen der die Antwort interpretiert.`
      },
      {
        title: "Guardrails und Evaluation",
        content: `Guardrails definieren die Grenzen der KI — was sie tun darf und was nicht. Für Unternehmensanwendungen unverzichtbar.

**Typische Guardrails:**
- "Gib keine Rechtsberatung und keine medizinischen Empfehlungen."
- "Wenn die bereitgestellten Dokumente keine Antwort enthalten, sage 'Diese Information liegt mir nicht vor' statt zu spekulieren."
- "Erfinde keine Zahlen, Daten oder Fakten."
- "Verwende nur die vordefinierten Kategorien. Wenn keine passt, wähle 'Sonstiges'."
- "Bei Fragen die Personalentscheidungen betreffen, verweise immer auf die HR-Abteilung."

**Evaluation — wie misst du die Prompt-Qualität?**

Erstelle einen **Testdatensatz:** 30-50 reale Anfragen mit der "richtigen" Antwort (von einem Experten erstellt).

Lass die KI alle Anfragen beantworten und miss:
- **Accuracy:** Wie oft ist die Klassifizierung korrekt?
- **Consistency:** Liefert dieselbe Anfrage immer dasselbe Ergebnis?
- **Halluzinationsrate:** Wie oft erfindet die KI Informationen?
- **Format-Compliance:** Hält sich die KI an das vorgegebene Format?

**Iterativer Prozess:** Prompt anpassen → testen → messen → verbessern. Typisch 3-5 Iterationen bis die Qualität für den Produktionseinsatz reicht.

**A/B-Testing:** Zwei Prompt-Varianten mit denselben Testdaten vergleichen. "Welcher Prompt liefert bessere Ergebnisse?" Datengetriebene Entscheidung statt Bauchgefühl.`,
        analogy: `Guardrails sind wie Leitplanken auf der Autobahn: Sie schränken die Bewegungsfreiheit ein, verhindern aber dass das Auto von der Straße abkommt. Evaluation ist wie die TÜV-Prüfung: Systematisch testen ob alles funktioniert, bevor es auf die Straße darf.`,
        consultingRelevance: `Prompt-Evaluation ist ein Beratungsprodukt: "Wir testen Ihre KI-Lösung mit 50 realen Anfragen und liefern einen Qualitätsbericht mit konkreten Verbesserungsvorschlägen." Das ist messbar, nachvollziehbar und überzeugend — keine Blackbox.`
      }
    ],
    gfSummary: `"Die Qualität einer KI-Lösung hängt zu 50% davon ab, wie präzise wir sie anweisen. Wir definieren klare Regeln, geben Beispiele aus Ihrem Tagesgeschäft, und testen systematisch mit echten Daten. Das Ergebnis: Eine KI die konsistent, zuverlässig und nachvollziehbar arbeitet — mit eingebauten Sicherheitsgrenzen."`
  },

  "agent-design": {
    title: "Agent-Design",
    layerLevel: 1,
    estimatedMinutes: 40,
    steps: [
      {
        title: "Wann brauche ich wirklich einen Agent?",
        content: `Agents sind mächtig, aber nicht immer die richtige Lösung. Die Entscheidungsregel:

**Nutze KEINEN Agent wenn:**
- Der Ablauf fest definiert ist und sich nicht ändert → Workflow
- Es nur einen einzelnen KI-Aufruf braucht → Prompt
- Vorhersagbarkeit wichtiger ist als Flexibilität → Workflow
- Das Budget knapp ist (Agents = viele API-Calls = höhere Kosten)

**Nutze einen Agent wenn:**
- Das Ziel klar ist, aber der Weg dahin variiert
- Mehrere Werkzeuge situationsabhängig genutzt werden müssen
- Recherche und Analyse über mehrere Quellen nötig ist
- Der Nutzer interaktiv mit dem System arbeitet (Conversational Agent)

**Typische Agent-Use-Cases im Mittelstand:**
- Beschaffungsrecherche: "Finde alternative Lieferanten für Bauteil X und vergleiche Preise"
- Due Diligence: "Analysiere diesen potenziellen Lieferanten aus mehreren Datenquellen"
- Fehleranalyse: "Untersuche warum die Ausschussrate in Linie 3 gestiegen ist"
- Report-Generierung: "Erstelle den monatlichen Einkaufsbericht aus SAP-Daten und Marktdaten"`,
        analogy: `Die Ampel-Regel: 🟢 Prompt = Grünes Licht, immer als erstes probieren. 🟡 Workflow = Gelbes Licht, wenn es mehrere feste Schritte braucht. 🔴 Agent = Rotes Licht, nur bei echtem Bedarf an Autonomie. Die meisten Projekte brauchen Grün und Gelb.`,
        consultingRelevance: `Dein Job ist es, den Kunden vor Overengineering zu schützen. "Wir brauchen einen KI-Agenten" ist oft ein Wunsch getrieben von Marketing-Hype. Deine Empfehlung: "Lassen Sie uns mit einem Workflow starten und zum Agent erweitern wenn nötig."`
      },
      {
        title: "Anatomie eines Agents",
        content: `Ein Agent besteht aus vier Kernkomponenten:

**1. LLM (das Gehirn):**
Das Sprachmodell das denkt, plant und entscheidet. Wähle das Modell nach der Aufgabe: Opus/GPT-4 für komplexe Analyse, Sonnet/GPT-4o-mini für schnelle Aufgaben.

**2. Tools (die Werkzeuge):**
Funktionen die der Agent aufrufen kann. Jedes Tool hat:
- Einen Namen: "search_supplier_database"
- Eine Beschreibung: "Sucht Lieferanten in der SAP-Datenbank nach Materialgruppe und Region"
- Ein Schema: Welche Parameter rein (Materialgruppe, Region), was kommt raus (Liste von Lieferanten)

**3. Orchestrierungs-Loop (die Arbeitsschleife):**
Der Agent arbeitet in einer Schleife:
1. Aufgabe lesen / Situation bewerten
2. Nächsten Schritt planen
3. Tool auswählen und aufrufen
4. Ergebnis prüfen
5. Entscheiden: Fertig oder weitermachen?

**4. Memory (das Gedächtnis):**
Was wurde bisher in dieser Aufgabe getan? Welche Tools wurden aufgerufen? Welche Zwischenergebnisse gibt es? Ohne Memory wiederholt der Agent sich oder vergisst Zwischenschritte.

**Wichtig: Tool-Design ist kritischer als man denkt.**
Zu viele Tools = Agent ist verwirrt und wählt oft das falsche.
Zu wenige = Agent ist hilflos.
Klare Beschreibungen = Agent wählt das richtige Tool.
Vage Beschreibungen = Agent rät.

**Faustregel:** Starte mit 3-5 klar definierten Tools. Erweitere nur wenn nötig.`,
        analogy: `Ein Agent ist wie ein Projektmanager: Er hat ein Ziel (das Projekt), Werkzeuge (Telefon, E-Mail, Datenbank), arbeitet in Iterationen (tägliche To-Do-Liste), und hat ein Notizbuch (Memory). Die Qualität hängt davon ab, wie klar sein Auftrag ist und wie gut seine Werkzeuge sind.`,
        consultingRelevance: `Beim Agent-Design bringst du dein Domänenwissen ein: Welche Tools braucht ein Agent für Beschaffungsoptimierung? Du weißt das: SAP-Abfrage für Bestellhistorie, Lieferantenstammdaten, Marktpreise, Vertragskonditionen. Ein Tech-Berater ohne SCM-Hintergrund muss das erst erfragen.`
      },
      {
        title: "Sub-Agents und Orchestrierung",
        content: `Für komplexe Aufgaben reicht oft ein einzelner Agent nicht aus. Stattdessen orchestriert ein **Haupt-Agent** spezialisierte **Sub-Agents**.

**Warum Sub-Agents?**
- Jeder Sub-Agent ist auf eine Teilaufgabe spezialisiert = bessere Ergebnisse
- Jeder Sub-Agent hat nur die Tools die er braucht = weniger Verwirrung
- Bei Fehlern ist klar, welcher Sub-Agent das Problem hat = einfacheres Debugging

**Beispiel: Agent für Lieferantenbewertung**
- **Haupt-Agent:** Koordiniert, sammelt Ergebnisse, erstellt Gesamtbewertung
- **Sub-Agent 1 (Daten):** Holt Bestellhistorie und Lieferdaten aus SAP
- **Sub-Agent 2 (Qualität):** Analysiert Qualitätsmeldungen und Reklamationen
- **Sub-Agent 3 (Markt):** Recherchiert Marktpreise und Alternative
- **Sub-Agent 4 (Report):** Erstellt den finalen Bewertungsbericht

**Kommunikation zwischen Agents:** Der Haupt-Agent gibt jedem Sub-Agent seinen Auftrag und sammelt die Ergebnisse. Die Sub-Agents sprechen nicht direkt miteinander — alles läuft über den Haupt-Agent. Das hält das System kontrollierbar.

**Kosten beachten:** Jeder Sub-Agent-Aufruf = mindestens ein LLM-Call. Ein Haupt-Agent mit 4 Sub-Agents die jeweils 3-5 Tool-Aufrufe machen = 15-25 API-Calls pro Anfrage. Bei Claude Sonnet ca. 0,05-0,15€ pro Anfrage. Bei 1000 Anfragen/Monat = 50-150€ nur für API-Kosten. Das muss in die Kalkulation.`,
        analogy: `Wie ein Projektteam: Der Projektleiter (Haupt-Agent) delegiert an Spezialisten — einen für Finanzen, einen für Technik, einen für Recht. Jeder arbeitet in seinem Fachgebiet und liefert sein Ergebnis. Der Projektleiter fügt alles zusammen. Niemand macht alles allein.`,
        consultingRelevance: `Sub-Agent-Architektur ist dein Werkzeug für komplexe Use Cases. Im Architektur-Diagramm zeigst du: "Haupt-Agent koordiniert, Sub-Agent 1 spricht mit SAP, Sub-Agent 2 mit dem Qualitätssystem." Das macht die Lösung verständlich und das Budget planbar.`
      },
      {
        title: "Fehlerbehandlung und Human-in-the-Loop",
        content: `Agents machen Fehler. Der Unterschied zwischen einem guten und einem schlechten Agent-Design: **Wie geht man mit Fehlern um?**

**Typische Agent-Fehler:**
- **Endlosschleife:** Agent ruft immer wieder dasselbe Tool auf ohne Fortschritt
- **Falsches Tool:** Agent wählt ein unpassendes Werkzeug
- **Halluzination:** Agent erfindet Zwischenergebnisse statt ein Tool zu nutzen
- **Scope Creep:** Agent macht mehr als gewünscht
- **Timeout:** Externe Dienste antworten nicht

**Schutzmaßnahmen:**
- **Max Iterations:** Maximale Anzahl Schleifendurchläufe (z.B. 10). Danach Abbruch mit Fehlermeldung.
- **Max Token Budget:** Maximale Kosten pro Anfrage. Verhindert Kostenexplosion bei Fehlern.
- **Fallback-Logik:** Wenn der Agent nach 3 Versuchen kein Ergebnis hat → Aufgabe an einen Menschen eskalieren.
- **Logging:** Jeden Schritt des Agents mitprotokollieren. Unverzichtbar für Debugging und Audit.

**Human-in-the-Loop (HITL):**
Für kritische Entscheidungen wird ein Mensch eingebunden:
- Agent erstellt Analyse → Mensch genehmigt → Aktion wird ausgeführt
- Agent klassifiziert Reklamation → bei "hoch" wird ein Mensch benachrichtigt
- Agent erstellt Bestellvorschlag → Einkäufer prüft und gibt frei

HITL ist kein Zeichen von Schwäche, sondern von reifem Design. Die KI macht 90% der Arbeit, der Mensch kontrolliert die kritischen 10%.`,
        analogy: `Wie ein Autopilot im Flugzeug: Er fliegt 95% der Strecke selbstständig. Aber bei Start, Landung und Turbulenzen übernimmt der Pilot. Und wenn der Autopilot etwas Ungewöhnliches macht, gibt es Alarme und der Pilot kann sofort eingreifen. Niemand würde ein Flugzeug ohne diese Sicherheitsmechanismen akzeptieren.`,
        consultingRelevance: `Human-in-the-Loop ist dein bestes Argument gegen den Einwand "Was wenn die KI falsch entscheidet?". Die Antwort: "Der Mensch hat das letzte Wort — die KI bereitet vor und empfiehlt, der Mensch entscheidet." Das funktioniert in jedem Stakeholder-Gespräch.`
      }
    ],
    gfSummary: `"KI-Agents sind selbstständige Assistenten die komplexe Aufgaben eigenständig bearbeiten — Daten sammeln, analysieren, Empfehlungen erstellen. Wir designen sie mit klaren Grenzen und Sicherheitsmechanismen: Maximale Kosten pro Anfrage, Logging jedes Schritts, und bei kritischen Entscheidungen hat immer ein Mensch das letzte Wort."`
  },

  "prototyping": {
    title: "Rapid Prototyping",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Warum Prototypen? — Die Kraft des Erlebens",
        content: `Ein Prototyp (Proof of Concept / PoC) ist ein **funktionierendes Minimum**, das eine Idee beweist. Nicht perfekt, nicht skalierbar, nicht produktionsreif — aber echt.

**Warum PoCs statt Powerpoints?**
- **Sehen statt glauben:** Der Einkaufsleiter kann selbst eine Frage an den Chatbot stellen und sieht die Antwort. Kein Slide der Welt hat denselben Effekt.
- **Realitätscheck:** Funktioniert die Idee mit echten Daten? Oft zeigt der PoC Probleme, die in der Theorie unsichtbar waren.
- **Entscheidungsgrundlage:** Go/No-Go basierend auf Fakten statt Vermutungen.
- **Momentum:** Ein funktionierender PoC erzeugt Begeisterung und Budget-Freigabe.

**Was ein PoC NICHT sein sollte:**
- Kein fertiges Produkt (keine Nutzer-Verwaltung, keine Edge Cases)
- Keine Powerpoint-Simulation (muss mit echten Daten funktionieren)
- Kein Monats-Projekt (max. 1-2 Wochen, idealerweise Tage)

**Die goldene Regel:** Ein PoC der in 2 Wochen nicht steht, hat den falschen Scope. Verkleinern statt verlängern.`,
        analogy: `Ein Prototyp ist wie ein Holzmodell eines Autos: Es fährt nicht wirklich, aber der Kunde kann Form, Größe und Sitzposition erleben. Die Frage "Gefällt Ihnen die Richtung?" lässt sich mit einem Modell in 10 Sekunden klären — statt nach 6 Monaten Serienentwicklung.`,
        consultingRelevance: `PoCs sind dein stärkstes Vertriebsinstrument. "Ich baue Ihnen in einer Woche einen funktionierenden Prototyp mit Ihren echten Daten. Wenn Sie überzeugt sind, machen wir weiter. Wenn nicht, kostet es Sie nur 5 Beratertage." Kein Risiko für den Kunden — enormer Wert für dich.`
      },
      {
        title: "PoC-Aufbau — Schritt für Schritt",
        content: `**Tag 1: Setup + Daten**
- Entwicklungsumgebung aufsetzen (Vite + React + Supabase — kennst du schon)
- Kundendaten beschaffen (anonymisiert!)
- Daten in die Vektor-DB laden (bei RAG-Projekten)
- Basis-System Prompt schreiben

**Tag 2-3: Kernfunktion bauen**
- Claude Code oder Cursor für die Entwicklung
- Einfaches UI: Chat-Interface oder Formular mit Ergebnis-Anzeige
- KI-Integration: Claude API anbinden
- Erste Tests mit echten Anfragen

**Tag 4: Feintuning + Demo-Vorbereitung**
- Prompt Engineering optimieren (Few-Shot-Beispiele hinzufügen)
- Ergebnisqualität messen und verbessern
- Demo-Szenario vorbereiten (3-5 typische Anfragen)
- Auf Vercel deployen

**Tag 5: Demo beim Kunden**
- System live zeigen — der Kunde stellt selbst Fragen
- Ergebnisse besprechen: Was funktioniert? Was nicht?
- Metriken präsentieren (Accuracy, Zeitersparnis)
- Go/No-Go-Diskussion

**Wichtig: Immer echte Daten verwenden.** Synthetische Testdaten überzeugen niemanden. 50-100 anonymisierte echte Dokumente oder Datensätze reichen für einen überzeugenden PoC.`,
        analogy: `Wie ein Koch der ein neues Gericht fürs Menü testet: Tag 1 = Zutaten besorgen und Rezept planen. Tag 2-3 = Kochen und Abschmecken. Tag 4 = Feinschliff und Anrichten. Tag 5 = Dem Restaurantbesitzer servieren und Feedback holen.`,
        consultingRelevance: `Dieser 5-Tage-Plan ist dein Standard-PoC-Angebot. Du kannst ihn jedem Kunden zeigen: "In einer Woche haben Sie einen funktionierenden Prototyp." Kalkuliere: 5 Tage × dein Tagessatz + API-Kosten (~50€) + Supabase/Vercel (~20€). Das ist ein überschaubares Investment für den Kunden.`
      },
      {
        title: "Tools für Prototyping",
        content: `Dein Prototyping-Stack:

**Claude Code** = Dein Haupt-Prototyping-Tool. Du beschreibst in natürlicher Sprache was du brauchst, Claude Code baut es. Ideal für den schnellen ersten Wurf.

**Cursor** = Für iterative Verbesserungen am bestehenden Code. Die KI in Cursor versteht den Projektkontext und kann gezielte Änderungen vorschlagen.

**v0.dev (Vercel)** = Generiert React-UIs aus Text-Beschreibungen. Gut für schnelle Frontend-Prototypen: "Erstelle ein Dashboard mit einer Suchleiste oben und einer Ergebnisliste darunter."

**Supabase** = Backend in Minuten: Datenbank + Auth + API + Vektor-Suche. Kein Server-Setup nötig.

**Make.com** = Für Workflow-Prototypen ohne Code: E-Mail-Trigger → KI-Analyse → Ergebnis-Speicherung.

**Die Kombination:**
- Schnelle UI → v0.dev oder Claude Code
- Backend-Logik → Supabase Edge Functions
- KI-Integration → Claude API direkt oder via Make.com
- Deployment → Vercel (git push = live)

**Zeitschätzung nach Komplexität:**
- Einfacher KI-Chatbot über Dokumente: 2-3 Tage
- E-Mail-Klassifizierungs-Workflow: 1-2 Tage
- Dashboard mit KI-Analyse: 3-5 Tage
- Multi-Source-Agent: 5-10 Tage`,
        analogy: `Wie ein Schnellbau-System für Messestände: Fertige Module (Wände, Theken, Screens) werden in Stunden zusammengesteckt. Der Stand ist nicht für die Ewigkeit, aber er funktioniert perfekt für die Messe. Danach entscheidet man: Dauerhaft bauen oder modifizieren?`,
        consultingRelevance: `Die Werkzeugwahl bestimmt deine Geschwindigkeit. Mit Claude Code + Supabase + Vercel kannst du alleine einen überzeugenden PoC bauen — ohne Entwickler-Team. Das ist dein Hebel: Du bist unabhängig und schnell. Für die Produktionsversion holst du dann Entwickler dazu.`
      }
    ],
    gfSummary: `"Statt monatelang zu planen, bauen wir in einer Woche einen funktionierenden Prototyp mit Ihren echten Daten. Sie können ihn selbst testen, sehen die Ergebnisse, und entscheiden dann ob es sich lohnt weiterzumachen. Kein Risiko, maximale Transparenz."`
  },

  "data-strategy": {
    title: "Datenstrategie",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Daten — das Fundament jeder KI-Lösung",
        content: `Ohne Daten keine KI — das ist die einfachste Wahrheit. Aber "mehr Daten" ist nicht automatisch "bessere KI". Die Datenstrategie beantwortet drei Fragen:

**1. Welche Daten brauchen wir?**
Abgeleitet vom Use Case: Für Lieferantenbewertung brauchst du Bestellhistorie, Lieferperformance, Qualitätsmeldungen. Für einen Wissens-Chatbot brauchst du technische Dokumentation, FAQs, Arbeitsanweisungen.

**2. Wie kommen wir an die Daten?**
APIs, Datenbankzugriff, Dateiexport, Web Scraping, manuelle Eingabe. Jede Quelle hat ihren eigenen Aufwand und ihre eigenen Tücken.

**3. Wie sichern wir die Datenqualität langfristig?**
Nicht nur einmal laden, sondern dauerhaft pflegen. Neue Dokumente automatisch indizieren, veraltete entfernen, Qualitätschecks einbauen.

**Die unbequeme Wahrheit:** In den meisten Mittelständlern ist die Datenlage nicht ideal. Das ist normal und kein Showstopper. Aber man muss es wissen und einplanen: Oft ist 30-50% des Projektaufwands Datenbereinigung und -aufbereitung.`,
        analogy: `Daten sind das Rohöl der KI — aber genauso wie Rohöl ist es wertlos, wenn es verschmutzt ist (schlechte Qualität), im falschen Tank liegt (falsche Struktur), oder nicht durch die Pipeline passt (keine Schnittstelle). Raffinierung ist der Schlüssel.`,
        consultingRelevance: `"Ihre Daten sind der Schlüssel" ist eine Botschaft die den Kunden manchmal überrascht. Sie denken KI ist Magie — du zeigst ihnen, dass es Handwerk ist. Und dass du dieses Handwerk beherrschst: Daten finden, bewerten, aufbereiten, nutzbar machen.`
      },
      {
        title: "Daten-Pipeline: ETL für KI-Projekte",
        content: `Eine Daten-Pipeline automatisiert den Weg von der Rohdatenquelle zur KI-bereiten Datenbank. Das klassische Muster: **ETL (Extract, Transform, Load).**

**Extract (Extrahieren):**
Daten aus den Quellsystemen holen:
- SAP: OData API oder RFC
- SharePoint: Graph API
- E-Mail: IMAP oder Exchange API
- Dateien: Dateisystem-Zugriff oder Upload
- Excel: Datei lesen und parsen

**Transform (Transformieren):**
Daten bereinigen und aufbereiten:
- Duplikate erkennen und zusammenführen
- Fehlende Felder auffüllen oder markieren
- Formate vereinheitlichen (Datumsformate, Währungen)
- Personenbezogene Daten anonymisieren
- Für RAG: Dokumente in Chunks zerlegen und Embeddings erzeugen

**Load (Laden):**
Aufbereitete Daten in die Zieldatenbank schreiben:
- Strukturierte Daten → PostgreSQL
- Embeddings → Vektor-DB (pgvector)
- Dateien → Object Storage (Supabase Storage)

**Automatisierung:** Die Pipeline sollte regelmäßig laufen — täglich, stündlich oder event-basiert (Webhook). Make.com oder n8n eignen sich hervorragend als Pipeline-Orchestrierer.

**Monitoring:** Die Pipeline muss überwacht werden: Lief sie erfolgreich? Wie viele Datensätze verarbeitet? Fehler aufgetreten? Ein einfaches Log pro Lauf reicht für den Anfang.`,
        analogy: `Eine Daten-Pipeline ist wie eine Wasseraufbereitungsanlage: Rohwasser (Rohdaten) kommt rein, wird gefiltert (bereinigt), aufbereitet (transformiert), und als Trinkwasser (KI-bereite Daten) in den Tank (Datenbank) geleitet. Der Prozess läuft automatisch, aber jemand muss regelmäßig die Filter prüfen.`,
        consultingRelevance: `Die Daten-Pipeline ist oft der aufwändigste Teil des Projekts — und der wertvollste über das KI-Projekt hinaus. Ein Kunde der seine Daten sauber aufbereitet hat, profitiert auch für BI, Reporting und Prozessoptimierung. Verkaufe die Pipeline als eigenständigen Wert.`
      },
      {
        title: "Daten-Governance: Wer darf was?",
        content: `Daten-Governance definiert die Spielregeln für den Umgang mit Daten im Unternehmen. Für KI-Projekte besonders relevant:

**Rollen definieren:**
- **Data Owner:** Wer ist fachlich verantwortlich für welche Daten? (Einkaufsleiter für Bestelldaten, QM-Leiter für Qualitätsdaten)
- **Data Steward:** Wer pflegt die Daten operativ? (Stammdatenpfleger, System-Admin)
- **Data Consumer:** Wer nutzt die Daten? (KI-System, Analysten, Management)

**Regeln festlegen:**
- Wer darf welche Daten an die KI-API senden?
- Welche Daten müssen anonymisiert werden?
- Wie lange werden KI-Interaktionen gespeichert?
- Wer genehmigt neue Datenquellen für die KI?

**Für den Mittelstand reicht ein pragmatischer Ansatz:**
1. Eine Seite "Datenrichtlinie für KI-Nutzung"
2. Klare Benennung der Datenverantwortlichen
3. Regel: Personenbezogene Daten nur anonymisiert an externe APIs
4. Quartalsweiser Qualitätscheck der Daten

Kein 100-Seiten-Governance-Handbuch nötig. Start simple, erweitere bei Bedarf.`,
        analogy: `Daten-Governance ist wie die Hausordnung in einem Mehrfamilienhaus: Wer hat den Schlüssel zum Keller (Datenzugang)? Wann darf man Musik machen (wann dürfen Daten gesendet werden)? Wer kümmert sich um den Garten (Datenpflege)? Die Regeln müssen existieren, aber nicht übertrieben kompliziert sein.`,
        consultingRelevance: `Daten-Governance aufzusetzen ist ein eigenständiges Beratungsangebot — oft im Rahmen des KI-Projekts, aber mit Wert darüber hinaus. Ein Mittelständler der erstmals seine Datenverantwortlichkeiten klar definiert, hat schon gewonnen — unabhängig von der KI.`
      }
    ],
    gfSummary: `"Gute KI braucht gute Daten. Wir erstellen eine Bestandsaufnahme Ihrer Datenlandschaft, bauen automatisierte Pipelines die Ihre Daten KI-bereit machen, und definieren klare Spielregeln wer was mit welchen Daten tun darf. Das ist kein einmaliger Aufwand — sondern eine Investition in die Datenkompetenz Ihres Unternehmens."`
  },

  "mcp-tools": {
    title: "MCP & Tool-Integration",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "MCP — der Standard für KI-Tool-Integration",
        content: `Model Context Protocol (MCP) ist ein offener Standard von Anthropic der definiert, wie KI-Modelle auf externe Werkzeuge zugreifen. Du hast es bereits konfiguriert — Filesystem-MCP und n8n-MCP in deinem Claude Code Setup.

**Das Problem das MCP löst:**
Ohne Standard muss jede KI-Integration einzeln gebaut werden: Claude-SAP-Connector, GPT-SAP-Connector, Llama-SAP-Connector. Drei verschiedene Integrationen für ein System. Multipliziert mit der Anzahl der Systeme = Wartungs-Albtraum.

**Mit MCP:** Du baust EINEN MCP-Server für SAP. Jedes KI-Modell das MCP spricht (Claude, GPT, Llama) kann ihn sofort nutzen. Ein Connector, alle Modelle.

**Die Architektur:**
- **MCP Server** = Stellt Tools bereit. "Ich biete: Bestellung lesen, Lieferant suchen, Material anlegen."
- **MCP Client** = Das KI-Modell. Ruft Tools auf wenn es sie braucht.
- **Tool Declaration** = Beschreibung jedes Tools: Name, was es tut, welche Parameter es braucht, was es zurückgibt.

**Verfügbare MCP-Server (wachsende Liste):**
- Filesystem (Dateien lesen/schreiben)
- GitHub (Code-Repositories)
- Slack (Nachrichten)
- Google Drive (Dokumente)
- Brave Search (Web-Suche)
- n8n (Workflows als Tools)
- PostgreSQL (Datenbankabfragen)
- Und viele mehr — die Community wächst schnell.`,
        analogy: `MCP ist wie USB für KI: Vor USB hatte jedes Gerät einen eigenen Stecker. Drucker, Scanner, Kamera — alle anders. USB hat das vereinheitlicht: Ein Standard, jedes Gerät. MCP macht dasselbe für KI-Werkzeuge: Ein Standard, jedes Tool anschließbar.`,
        consultingRelevance: `MCP ist noch jung (2024 veröffentlicht), aber strategisch wichtig. Wenn du heute einen MCP-Server für SAP baust, kann ihn jeder KI-Anbieter nutzen. Das schützt die Investition des Kunden und vermeidet Lock-in. Ein starkes Argument in der Architektur-Diskussion.`
      },
      {
        title: "Eigene MCP-Server für Unternehmenssysteme",
        content: `Für Kundenprojekte wirst du eigene MCP-Server brauchen — speziell für die Systeme des Kunden:

**MCP-Server für SAP:**
Tools die der Server bereitstellt:
- "read_purchase_orders" — Bestellungen aus SAP lesen
- "get_supplier_details" — Lieferantenstamm abfragen
- "get_material_master" — Materialstamm lesen
- "search_quality_notifications" — Qualitätsmeldungen suchen

Jedes Tool = ein OData- oder BAPI-Aufruf hinter den Kulissen. Der KI-Agent sieht nur das Tool, nicht die SAP-Komplexität.

**MCP-Server für Dokumenten-Management:**
- "search_documents" — Dokumente per Vektor-Suche finden
- "read_document" — Dokumentinhalt abrufen
- "list_recent_documents" — Neueste Dokumente auflisten

**MCP-Server für E-Mail:**
- "search_emails" — E-Mails durchsuchen
- "read_email" — E-Mail-Inhalt lesen
- "draft_email" — E-Mail-Entwurf erstellen

**Sicherheit ist kritisch:**
- Jeder MCP-Server braucht Authentifizierung (API-Key, OAuth)
- Berechtigungen pro Tool: "Agent X darf lesen aber nicht schreiben"
- Logging: Welcher Agent hat wann welches Tool aufgerufen
- Rate Limiting: Maximale Aufrufe pro Zeiteinheit`,
        analogy: `Eigene MCP-Server bauen ist wie eigene Werkzeuge für eine Werkstatt anfertigen: Standard-Werkzeuge (Hammer, Schraubenzieher) gibt es fertig. Aber für spezielle Maschinen brauchst du Spezialwerkzeug. Der MCP-Server für SAP ist das Spezialwerkzeug, das genau auf die Maschine des Kunden passt.`,
        consultingRelevance: `MCP-Server-Entwicklung ist eine hochwertige Beratungsleistung: Du definierst welche Tools ein Agent für den Kunden braucht (Domänenwissen), ein Entwickler implementiert sie (technische Umsetzung). Die Tool-Definition — WAS soll der Agent können — ist dein Beitrag.`
      },
      {
        title: "MCP in der Praxis — Deployment und Betrieb",
        content: `Ein MCP-Server in Produktion braucht mehr als nur die Tool-Definition:

**Deployment-Optionen:**
- **Lokal (für Entwicklung):** MCP-Server läuft auf deinem Mac. So hast du es mit Filesystem-MCP gemacht.
- **Cloud (für Produktion):** MCP-Server läuft als Service in der Cloud. Docker-Container auf Azure/AWS, oder als Supabase Edge Function.
- **On-Premise (für DSGVO):** MCP-Server läuft im Netzwerk des Kunden. Sensible Daten verlassen nie das Unternehmen.

**Monitoring und Wartung:**
- Health Checks: Läuft der Server? Antwortet er?
- Performance: Wie lange dauern Tool-Aufrufe? Gibt es Bottlenecks?
- Error Tracking: Welche Tools schlagen fehl? Warum?
- Usage Analytics: Welche Tools werden am häufigsten genutzt?

**Versionierung:**
MCP-Server entwickeln sich weiter. Neue Tools kommen dazu, bestehende werden verbessert. Wichtig: Versionierung der API, damit bestehende Agents nicht plötzlich brechen wenn sich ein Tool ändert.

**Der Weg in die Zukunft:**
MCP wird sich als Standard etablieren. Immer mehr Softwareanbieter werden eigene MCP-Server anbieten — ähnlich wie heute jede Software eine REST-API hat. SAP, Salesforce, ServiceNow — alle werden MCP-Server bereitstellen. Wer heute MCP versteht und implementiert, ist für diese Zukunft vorbereitet.`,
        analogy: `Wie ein Telefonanschluss: Einmal eingerichtet, immer erreichbar. Aber man muss ab und zu prüfen ob die Leitung noch funktioniert (Monitoring), die Telefonbuch-Einträge aktuell halten (Versionierung), und sicherstellen dass nicht jeder anrufen darf der will (Sicherheit).`,
        consultingRelevance: `MCP-Expertise ist ein Differenzierungsmerkmal: Wenige Berater verstehen das Protokoll schon, weil es so neu ist. Wenn du einem Kunden erklären kannst warum MCP seine KI-Investition zukunftssicher macht, hebst du dich von der Konkurrenz ab.`
      }
    ],
    gfSummary: `"MCP ist der neue Standard dafür, wie KI auf Ihre Unternehmenssysteme zugreift. Wir bauen einmalig einen standardisierten Connector zu Ihrem ERP, Ihrem Dokumentensystem und Ihrer E-Mail — und jedes KI-Modell kann darüber zugreifen. Das schützt Ihre Investition und gibt Ihnen Flexibilität bei der Wahl des KI-Anbieters."`
  }
};

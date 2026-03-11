// ============================================================
// CURRICULUM DATA - Alle Lerninhalte des KI-Beratung LearningHub
// ============================================================

export const CURRICULUM = {
  phases: [
    {
      id: "foundation",
      number: 1,
      title: "Fundament",
      subtitle: "Wie funktioniert das alles?",
      weeks: "Woche 1–3",
      color: "#2D6A4F",
      icon: "🧱",
      description: "Orientierung & Grundbegriffe. Am Ende kannst du einem GF erklären, was KI kann und was nicht.",
      modules: [
        {
          id: "llm-basics",
          title: "LLMs, Modelle & Token",
          difficulty: 1,
          hours: 4,
          tags: ["Grundlagen", "Konzepte"],
          summary: "Was passiert unter der Haube eines Large Language Models?",
          analogy: "Stell dir ein LLM vor wie einen extrem belesenen Praktikanten: Er hat Millionen Bücher gelesen, kann Muster erkennen und plausible Antworten formulieren — aber er 'versteht' nicht wirklich. Er vervollständigt Text basierend auf Wahrscheinlichkeiten, wie ein sehr gutes Autocomplete.",
          keyPoints: [
            "Token = Wortbausteine (ca. 1 Token ≈ ¾ Wort). Das Modell denkt in Token, nicht in Wörtern.",
            "Context Window = Arbeitsspeicher des Modells. Alles was rein passt, kann es 'sehen'. Was nicht passt, existiert nicht.",
            "Modelle unterscheiden sich in Größe (Parameter), Trainings-Daten und Fähigkeiten. GPT-4, Claude, Llama = verschiedene 'Praktikanten'.",
            "Temperatur = Kreativitätsregler. Niedrig = präzise/wiederholbar, Hoch = kreativ/variabel.",
            "Training vs. Inference: Training = Lernen (teuer, einmalig). Inference = Anwenden (günstig, bei jeder Anfrage).",
            "Halluzination = Die KI erfindet etwas, das plausibel klingt aber falsch ist. Das Hauptrisiko im Unternehmenseinsatz. Gegenmaßnahmen: RAG, Quellenangaben, Human-in-the-Loop, Guardrails."
          ],
          practicalExample: "Wenn ein Mittelständler fragt 'Kann die KI unsere Lieferantenverträge analysieren?': Ja — aber nur wenn der Vertrag ins Context Window passt (bei Claude: ~200.000 Token ≈ 150.000 Wörter = ein ganzes Buch). Für 500 Verträge gleichzeitig braucht man RAG.",
          connections: ["api-basics", "rag-architecture", "prompt-engineering"]
        },
        {
          id: "api-basics",
          title: "API-Grundlogik",
          difficulty: 1,
          hours: 3,
          tags: ["Grundlagen", "Technologie"],
          summary: "Was ist eine API und warum ist sie der Schlüssel zu allem?",
          analogy: "Eine API ist wie ein standardisierter Schalter am Flughafen: Du musst die Sprache nicht sprechen — du musst nur wissen, an welchen Schalter du gehst (URL) und welches Formular du ausfüllst (Request). Die API nimmt deine Anfrage entgegen und liefert das Ergebnis.",
          keyPoints: [
            "API = Application Programming Interface. Eine standardisierte Tür zwischen zwei Systemen.",
            "HTTP-Methoden: GET (lesen), POST (neu anlegen), PUT (ändern), DELETE (löschen) — wie vier verschiedene Formulartypen.",
            "Request = URL + Headers + Body. Response = Status-Code + Daten. Jeder API-Aufruf folgt diesem Muster.",
            "JSON = das Datenformat, in dem APIs sprechen. Strukturierte Schlüssel-Wert-Paare, maschinenlesbar.",
            "API-Key = dein Ausweis + Kreditkarte. Identifikation, Autorisierung und Abrechnung in einem. Gehört NIEMALS in den Code auf GitHub.",
            "REST = Designprinzip: Jede Ressource hat eine eigene URL-Adresse. Die HTTP-Methode sagt, was damit passiert.",
            "Status-Codes merken: 2xx = gut, 4xx = dein Fehler, 5xx = deren Fehler."
          ],
          practicalExample: "Dein Projektmatcher macht genau das: POST-Request an api.anthropic.com mit dem Projekttext als JSON, API-Key im Header, und bekommt eine Bewertung als JSON zurück. Drei Zeilen Logik — Request, warten, Response verarbeiten. Das ist die ganze 'Magie' hinter KI-Integration.",
          connections: ["llm-basics", "integration-layer", "tools-infra"]
        },
        {
          id: "three-layers",
          title: "Frontend / Backend / Datenbank",
          difficulty: 1,
          hours: 3,
          tags: ["Grundlagen", "Architektur"],
          summary: "Die drei Schichten jeder Software verstehen.",
          analogy: "Denk an ein Autohaus: Das Showroom (Frontend) ist was der Kunde sieht — schick, einladend, mit klaren Wegen. Das Büro dahinter (Backend) verarbeitet Bestellungen, prüft Lagerbestände, berechnet Preise. Der Aktenschrank (Datenbank) speichert alle Kundendaten, Fahrzeugbestände und Verträge.",
          keyPoints: [
            "Frontend = Was der Nutzer sieht und bedient (Browser, App). Technologien: HTML, CSS, JavaScript, React.",
            "Backend = Die Logik dahinter. Verarbeitet Anfragen, wendet Regeln an, spricht mit Datenbanken. Technologien: Node.js, Python, Java.",
            "Datenbank = Langzeitgedächtnis. Speichert strukturierte Daten dauerhaft. Technologien: PostgreSQL (SQL), MongoDB (NoSQL).",
            "Edge = Besonderer Ort zwischen Nutzer und Server. Code wird nah am Nutzer ausgeführt für schnelle Antworten (z.B. Vercel Edge Functions).",
            "Diese Drei-Schichten-Architektur gilt ÜBERALL — auch für SAP, auch für KI-Lösungen."
          ],
          practicalExample: "Dein LearningHub: Das React-UI ist das Frontend (was du im Browser siehst), Supabase liefert Backend-Funktionen (Auth, Edge Functions) und die PostgreSQL-Datenbank speichert deinen Fortschritt. Drei Schichten, ein System.",
          connections: ["api-basics", "cloud-basics", "hosting-deployment"]
        },
        {
          id: "cloud-basics",
          title: "Cloud-Grundlagen",
          difficulty: 1,
          hours: 3,
          tags: ["Grundlagen", "Infrastruktur"],
          summary: "Azure, AWS, On-Premise — wo läuft was und warum ist das wichtig?",
          analogy: "Cloud vs. On-Premise ist wie Mietwohnung vs. Eigenheim: In der Cloud (Miete) kümmert sich der Vermieter um Heizung, Dach und Wasserleitungen — du ziehst einfach ein. On-Premise (Eigenheim) gehört dir alles, aber du musst auch alles selbst warten. Hybrid = du wohnst im Eigenheim, mietest aber ein Büro in der Stadt.",
          keyPoints: [
            "IaaS / PaaS / SaaS: Drei Abstraktionsebenen. IaaS = du mietest Server (wie leere Bürofläche). PaaS = du bekommst eine fertige Plattform (wie ein Co-Working-Space). SaaS = fertige Software (wie ein Catering-Service).",
            "Azure = Microsofts Cloud. Für SAP-Kunden besonders relevant wegen SAP on Azure.",
            "AWS = Amazon. Marktführer, breitestes Angebot.",
            "Für Mittelstand oft relevant: Hybrid-Cloud (sensible Daten On-Premise, Rest in Cloud).",
            "DSGVO-Relevanz: Wo stehen die Server? EU-Rechenzentren sind Pflicht für personenbezogene Daten."
          ],
          practicalExample: "Ein Mittelständler mit SAP ECC on-premise will KI nutzen: Die Unternehmensdaten bleiben auf seinem Server. Aber die KI (z.B. Claude API) läuft in der Cloud. Die Brücke dazwischen? Eine sichere API-Verbindung, oft über Azure als Mittler. Das ist Hybrid-Cloud in der Praxis.",
          connections: ["three-layers", "dsgvo-euai", "erp-as-datasource"]
        },
        {
          id: "agents-workflows",
          title: "Agents & Workflows",
          difficulty: 2,
          hours: 4,
          tags: ["Konzepte", "KI-Architektur"],
          summary: "Was ist ein Agent, was ein Workflow, und wann brauche ich was?",
          analogy: "Ein einfacher Prompt ist wie eine einzelne Frage an einen Experten. Ein Workflow ist wie eine Checkliste, die Schritt für Schritt abgearbeitet wird (immer gleich). Ein Agent ist wie ein selbstständiger Mitarbeiter: Er bekommt ein Ziel, entscheidet selbst welche Schritte nötig sind, nutzt verschiedene Werkzeuge und reagiert auf Zwischenergebnisse.",
          keyPoints: [
            "Prompt = Einmal-Anfrage. Rein-Raus. Kein Gedächtnis, keine Werkzeuge.",
            "Workflow = Fest definierte Kette von Schritten. Zuverlässig, vorhersagbar, aber unflexibel. Beispiel: E-Mail kommt rein → wird klassifiziert → wird an Abteilung weitergeleitet.",
            "Agent = Autonomes System mit Ziel, Werkzeugen und Entscheidungslogik. Flexibel, aber weniger vorhersagbar.",
            "MCP (Model Context Protocol) = Standard, über den Agents auf externe Werkzeuge zugreifen (wie ein USB-Standard für KI-Werkzeuge).",
            "Für den Mittelstand: Starte mit Workflows (80% der Fälle), nutze Agents nur wo Flexibilität wirklich nötig ist."
          ],
          practicalExample: "Dein Make.com-Blueprint für Projektanfragen ist ein klassischer Workflow: E-Mail → Filtern → Claude API → Bewertung → Antwort-Draft. Ein Agent-Ansatz wäre: 'Finde mir passende Projekte auf 5 Plattformen, bewerte sie, und schreib Bewerbungen für die Top 3' — er entscheidet selbst, wo er sucht und wie er vorgeht.",
          connections: ["llm-basics", "integration-layer", "agent-design", "mcp-tools"]
        },
        {
          id: "vocabulary-map",
          title: "Begriffslandkarte KI",
          difficulty: 1,
          hours: 3,
          tags: ["Grundlagen", "Orientierung"],
          summary: "RAG, Embedding, Vector DB, MCP, Webhook, Edge — die wichtigsten Begriffe auf einen Blick.",
          analogy: "Wie ein Glossar für eine Fremdsprache: Du musst nicht jedes Wort perfekt beherrschen, aber du solltest es erkennen und einordnen können, wenn es in einem Gespräch fällt.",
          keyPoints: [
            "RAG (Retrieval Augmented Generation) = KI + Unternehmenswissen. Die KI sucht erst in deinen Dokumenten, dann antwortet sie.",
            "Embedding = Text wird in Zahlen umgewandelt (Vektoren), damit der Computer 'Ähnlichkeit' berechnen kann.",
            "Vektor-Datenbank = Spezialdatenbank für Embeddings. Findet 'ähnliche' Inhalte blitzschnell.",
            "Webhook = Automatischer Alarm. Wenn Event X passiert, wird URL Y aufgerufen. Wie ein Bewegungsmelder.",
            "MCP = Standardprotokoll, über das KI-Modelle auf externe Tools zugreifen. Wie ein USB-Standard für KI-Werkzeuge.",
            "Halluzination = Die KI erfindet etwas, das plausibel klingt aber falsch ist. Das Hauptrisiko im Unternehmenseinsatz."
          ],
          practicalExample: "In einem Kundengespräch sagt der IT-Leiter: 'Wir denken über RAG nach, haben aber Bedenken wegen Halluzinationen.' Du weißt sofort: Er will Unternehmensdokumente durchsuchbar machen, hat aber Angst vor falschen Antworten. Dein Rat: 'Wir brauchen Grounding, Quellenangaben und einen Human-in-the-Loop.'",
          connections: ["llm-basics", "rag-architecture", "agents-workflows"]
        }
      ]
    },
    {
      id: "technology",
      number: 2,
      title: "Technologie-Landschaft",
      subtitle: "Womit wird gebaut?",
      weeks: "Woche 4–6",
      color: "#1B4965",
      icon: "⚙️",
      description: "Bausteine kennen und verstehen, wie sie zusammenspielen. Hands-on mit echten Tools.",
      modules: [
        {
          id: "erp-as-datasource",
          title: "ERP-Systeme als Datenquelle",
          difficulty: 2,
          hours: 5,
          tags: ["ERP", "Integration", "SAP"],
          summary: "Wie zapfe ich SAP, Navision & Co. für KI-Lösungen an?",
          analogy: "Das ERP ist wie ein riesiges Warenlager voller wertvoller Daten. Die Tür ist aber gesichert und hat verschiedene Schlösser (RFC, BAPI, OData, REST). Du musst wissen, welcher Schlüssel zu welcher Tür passt — aber du musst die Tür nicht selbst bauen.",
          keyPoints: [
            "SAP-Schnittstellen: RFC/BAPI (klassisch, stabil), OData (modern, REST-basiert), IDoc (für Massendaten). SAP BTP als Cloud-Brücke.",
            "Nicht-SAP: Navision/BC hat APIs, proALPHA hat REST-Schnittstellen, viele Systeme haben ODBC/SQL-Zugang.",
            "Wichtig: Nicht alle Daten sind gleich wertvoll. Stammdaten (Lieferanten, Materialien) vs. Bewegungsdaten (Bestellungen, Wareneingänge).",
            "Datenschutz: Personenbezogene Daten (Lieferantenkontakte) brauchen besondere Behandlung unter DSGVO.",
            "Praxis-Tipp: Starte immer mit einem Daten-Audit. Welche Daten gibt es? Wo liegen sie? Wie aktuell sind sie? Wie kommt man ran?"
          ],
          practicalExample: "Ein MedTech-Mittelständler will seine Lieferantenbewertung automatisieren. Schritt 1: Aus SAP MM die letzten 2 Jahre Bestelldaten, Wareneingangsdaten und Qualitätsmeldungen ziehen (via OData). Schritt 2: In eine Vektor-DB laden. Schritt 3: KI analysiert und erstellt automatische Bewertungsberichte.",
          connections: ["api-basics", "databases", "rag-architecture", "data-strategy"]
        },
        {
          id: "databases",
          title: "Datenbanken verstehen",
          difficulty: 2,
          hours: 4,
          tags: ["Technologie", "Daten"],
          summary: "SQL, NoSQL, Vektor — welche Datenbank wofür?",
          analogy: "SQL-Datenbank = ein perfekt organisierter Aktenschrank mit festen Fächern (Tabellen). NoSQL = flexible Mappen, in die du alles werfen kannst. Vektor-DB = ein Bibliothekar, der Bücher nicht nach Alphabet sortiert, sondern nach inhaltlicher Ähnlichkeit.",
          keyPoints: [
            "SQL (PostgreSQL, MySQL): Strukturierte Daten mit Beziehungen. Perfekt für Stammdaten, Transaktionen. Supabase = PostgreSQL as a Service.",
            "NoSQL (MongoDB): Flexible Strukturen, gut für Dokumente und variable Datenformate.",
            "Vektor-Datenbanken (Pinecone, Weaviate, Chroma): Speziell für KI/RAG. Speichern Embeddings und finden ähnliche Inhalte.",
            "Supabase ≠ Vercel: Supabase = Datenbank + Auth + Storage. Vercel = Hosting + Deployment. Zwei verschiedene Dinge!",
            "Für KI-Projekte oft: PostgreSQL (Geschäftsdaten) + Vektor-DB (Wissens-Retrieval) als Kombination."
          ],
          practicalExample: "Für deinen LearningHub: Supabase (PostgreSQL) speichert Fortschritt und Notizen als strukturierte Daten. Wenn du eine RAG-Wissensdatenbank für Kundendokumente baust, brauchst du zusätzlich eine Vektor-DB — Supabase hat dafür pgvector als Extension.",
          connections: ["three-layers", "rag-architecture", "erp-as-datasource"]
        },
        {
          id: "rag-architecture",
          title: "RAG-Architektur im Detail",
          difficulty: 3,
          hours: 6,
          tags: ["KI-Architektur", "Kernkompetenz"],
          summary: "Das Herzstück der meisten Enterprise-KI-Lösungen.",
          analogy: "RAG ist wie ein Berater, der vor jedem Meeting erst die relevanten Akten durchgeht: Er weiß nicht alles auswendig (das wäre Fine-Tuning), aber er kann blitzschnell die richtigen Dokumente finden und dann kompetent antworten.",
          keyPoints: [
            "Ingestion Pipeline: Dokumente → Chunking (in Abschnitte zerlegen) → Embedding (in Vektoren umwandeln) → Vektor-DB speichern.",
            "Retrieval: Nutzer-Frage → Embedding → Ähnlichkeitssuche in Vektor-DB → Top-K relevante Chunks holen.",
            "Generation: Relevante Chunks + Frage → LLM → Antwort mit Kontext.",
            "Chunking-Strategie ist KRITISCH: Zu klein = Kontext geht verloren. Zu groß = irrelevanter Ballast. 500-1000 Token mit Overlap ist ein guter Start.",
            "Evaluierung: Retrieval-Qualität (findet es die richtigen Dokumente?) und Generation-Qualität (ist die Antwort korrekt?) separat messen."
          ],
          practicalExample: "Ein Maschinenbauer will ein 'Wissens-System' für seine Service-Techniker: 5.000 technische Dokumentationen + Wartungsprotokolle werden via RAG durchsuchbar. Der Techniker fragt: 'Wie tausche ich die Dichtung an der CX-400?' — Das System findet die richtige Anleitung und gibt eine klare Antwort mit Seitenverweis.",
          connections: ["llm-basics", "databases", "prompt-engineering", "vocabulary-map"]
        },
        {
          id: "tools-infra",
          title: "Tools & Infrastruktur",
          difficulty: 2,
          hours: 4,
          tags: ["Werkzeuge", "Praxis"],
          summary: "GitHub, VS Code, Terminal, Claude Code, Cursor — dein Werkzeugkasten.",
          analogy: "Stell dir vor, du richtest eine Werkstatt ein: Cursor ist die KI-gesteuerte Werkbank (wo du arbeitest und die KI dir hilft), Terminal ist die Kommandozeile (direkte Befehle an die Maschine), GitHub ist der Tresor (versionierte Aufbewahrung), Claude Code ist der KI-Assistent im Terminal.",
          keyPoints: [
            "Cursor = VS Code + KI nativ integriert. Dein Haupteditor. Die KI darin wird von Claude (oder anderen Modellen) angetrieben.",
            "Terminal = Textbasierte Steuerung deines Computers. Grundbefehle reichen: cd, ls, npm, git.",
            "GitHub = Versionskontrolle + Zusammenarbeit. Wie 'Änderungen nachverfolgen' in Word, aber für Code.",
            "Claude Code = KI im Terminal, die Code schreibt und ausführt. Dein Hauptwerkzeug für Prototyping.",
            "npm = Paketmanager. Holt Code-Bausteine (Dependencies) aus dem Internet, wie ein Ersatzteillager."
          ],
          practicalExample: "Dein heutiger Ablauf war genau das: Vite-Projekt mit npm erstellt → in Cursor geöffnet → Pakete installiert → mit Git versioniert → auf GitHub gepusht → automatisch auf Vercel deployed. Du hast den kompletten Entwickler-Workflow einmal durchgespielt.",
          connections: ["three-layers", "api-basics", "prototyping"]
        },
        {
          id: "integration-layer",
          title: "Integration: APIs, Webhooks, Make.com/n8n",
          difficulty: 2,
          hours: 5,
          tags: ["Integration", "Automation"],
          summary: "Der 'Kleber' zwischen Systemen — wie alles zusammenkommt.",
          analogy: "Make.com/n8n sind wie ein Logistik-Hub: Pakete (Daten) kommen von verschiedenen Lieferanten (Systemen) an, werden sortiert, umgepackt und an die richtigen Empfänger weitergeleitet. Kein Code nötig — nur Konfiguration der Routen.",
          keyPoints: [
            "Make.com = No-Code Automatisierung. Perfekt für Workflows: Trigger → Aktion → Aktion. Du kennst das bereits gut.",
            "n8n = Open-Source Alternative. Kann selbst gehostet werden (wichtig für DSGVO!).",
            "Webhooks = Event-basierte Trigger. 'Wenn X passiert, rufe Y auf.' Die Brücke zwischen Systemen.",
            "MCP Server = Standardisierte Tool-Anbindung für KI-Agents. Du hast bereits n8n-MCP konfiguriert.",
            "Für Kunden: Die Integration ist oft 70% des Aufwands eines KI-Projekts. Hier liegt dein Beratungswert!"
          ],
          practicalExample: "Dein Make.com-Blueprint für den Projektmatcher: Outlook-Webhook → E-Mail parsen → Claude API aufrufen → Bewertung speichern → Antwort-Draft erstellen. Genau dieses Pattern (Trigger → KI → Aktion) ist der Kern jeder Enterprise-KI-Integration.",
          connections: ["api-basics", "agents-workflows", "erp-as-datasource", "tools-infra"]
        },
        {
          id: "hosting-deployment",
          title: "Hosting & Deployment",
          difficulty: 2,
          hours: 3,
          tags: ["Infrastruktur", "Praxis"],
          summary: "Vercel, Supabase, Azure — was wofür und wie geht live?",
          analogy: "Hosting ist wie die Wahl des Standorts für ein Geschäft: Vercel ist wie ein Pop-up-Store (schnell aufgebaut, perfekt für Web-Apps). Azure ist wie ein Industriepark (komplex, aber für alles gerüstet). Supabase ist das Büro-Backend (Datenbank, Nutzer-Verwaltung, Dateispeicher).",
          keyPoints: [
            "Vercel = Frontend-Hosting. Perfekt für React-Apps. Automatisches Deployment aus GitHub.",
            "Supabase = Backend-as-a-Service. PostgreSQL + Auth + Storage + Edge Functions. Dein Standard-Backend.",
            "Azure = Enterprise-Cloud. Für große Kunden mit SAP, Active Directory, Compliance-Anforderungen.",
            "Deployment = Der Prozess vom lokalen Entwicklungsrechner ins Internet. Git push → automatisch live.",
            "Für Mittelstand: Vercel + Supabase reicht für 80% der Projekte. Azure nur wenn der Kunde es vorschreibt."
          ],
          practicalExample: "Dein LearningHub läuft auf Vercel (Frontend) + Supabase (Datenbank). Wenn du einem Kunden eine RAG-Lösung baust, könnte das Setup sein: Vercel (Chat-UI) + Supabase (Nutzer + pgvector) + Claude API (LLM) — alles in EU-Rechenzentren.",
          connections: ["cloud-basics", "three-layers", "tools-infra"]
        }
      ]
    },
    {
      id: "solution-design",
      number: 3,
      title: "Lösungsdesign",
      subtitle: "Wie designe ich eine KI-Lösung?",
      weeks: "Woche 7–9",
      color: "#7B2D8E",
      icon: "🏗️",
      description: "Technologie mit Geschäftsproblemen verbinden. Vom Use Case zum Prototyp.",
      modules: [
        {
          id: "usecase-analysis",
          title: "Use-Case-Analyse",
          difficulty: 2,
          hours: 5,
          tags: ["Methodik", "Beratung"],
          summary: "Vom Kundenproblem zur KI-Lösung — strukturierte Methodik.",
          analogy: "Wie ein Arzt: Erst Symptome aufnehmen (Problem), dann Diagnose stellen (Analyse), dann Therapie vorschlagen (Lösung). Nicht sofort operieren, nur weil der Patient KI will!",
          keyPoints: [
            "Problem-First, nicht Technology-First. 'Welches Problem lösen wir?' vor 'Welche KI nutzen wir?'",
            "Use-Case-Priorisierung: Impact × Machbarkeit × Daten-Verfügbarkeit. Nicht alles auf einmal.",
            "Datenreife-Assessment: Hat der Kunde die nötigen Daten? In welcher Qualität? Wie zugänglich?",
            "Build vs. Buy: Muss man das selbst bauen oder gibt es fertige Lösungen? (SAP Joule, Microsoft Copilot)",
            "Quick-Win-Strategie: Starte mit dem Use Case, der schnell Ergebnisse zeigt und Vertrauen schafft."
          ],
          practicalExample: "Ein Automotive-Zulieferer klagt über zu lange Angebotsbearbeitung. Analyse: 60% der Zeit geht für Stücklisten-Recherche drauf. Lösung: RAG-System über technische Dokumentation + automatische Kalkulations-Vorschläge. Quick Win: Erst nur die Dokumenten-Suche, dann Kalkulation.",
          connections: ["vocabulary-map", "rag-architecture", "architecture-design"]
        },
        {
          id: "architecture-design",
          title: "Architektur-Design",
          difficulty: 3,
          hours: 6,
          tags: ["Architektur", "Kernkompetenz"],
          summary: "Wie skizziere ich eine Lösung? Komponenten, Datenflüsse, Schnittstellen.",
          analogy: "Wie ein Bauplan für ein Haus: Du zeichnest nicht jeden Nagel ein, aber du zeigst klar wo die Wände sind, wo Wasser und Strom laufen, wo die Eingänge sind. Der Architekt muss nicht mauern können — aber er muss wissen, was möglich ist.",
          keyPoints: [
            "Architektur-Diagramm: Kästchen (Komponenten) + Pfeile (Datenflüsse). Simpel aber mächtig.",
            "Schichten: Präsentation (UI) → Logik (Backend/Agents) → Daten (DB/ERP) → KI (LLM/RAG).",
            "Entscheidungen dokumentieren: Warum diese DB? Warum dieser LLM-Anbieter? Warum Cloud vs. On-Premise?",
            "Sicherheits-Architektur: Wo fließen personenbezogene Daten? Wo werden sie verarbeitet? Wer hat Zugang?",
            "Skalierbarkeit: Lösung muss von 5 Nutzern auf 500 wachsen können ohne Neudesign."
          ],
          practicalExample: "Architektur für eine Lieferanten-Chatbot-Lösung: React-Frontend (Vercel) → API-Gateway (Supabase Edge) → RAG-Pipeline (Embedding-Service + pgvector) → Claude API → SAP-Schnittstelle (OData für Echtzeit-Daten).",
          connections: ["three-layers", "cloud-basics", "rag-architecture", "hosting-deployment"]
        },
        {
          id: "prompt-engineering",
          title: "Prompt Engineering für Unternehmen",
          difficulty: 2,
          hours: 5,
          tags: ["KI-Kernkompetenz", "Praxis"],
          summary: "System Prompts, Chain-of-Thought, Few-Shot — professionelles Prompting.",
          analogy: "Prompt Engineering ist wie die Einarbeitung eines neuen Mitarbeiters: Je klarer du ihm sagst, wer er ist (Rolle), was er tun soll (Aufgabe), wie er es tun soll (Format), und welche Regeln gelten (Constraints) — desto besser arbeitet er.",
          keyPoints: [
            "System Prompt = Die 'Stellenbeschreibung' der KI. Definiert Rolle, Fähigkeiten, Grenzen, Tonalität.",
            "Few-Shot = Beispiele geben. 'So sieht ein gutes Ergebnis aus.' Extrem effektiv für konsistente Outputs.",
            "Chain-of-Thought = 'Denk Schritt für Schritt.' Verbessert die Qualität bei komplexen Aufgaben massiv.",
            "Structured Output = Fordere JSON, XML oder definierte Formate. Macht die Antwort maschinell verarbeitbar.",
            "Guardrails = Definiere, was die KI NICHT tun darf. 'Wenn du unsicher bist, sag es.' 'Erfinde keine Daten.'"
          ],
          practicalExample: "Für eine Reklamationsanalyse-KI: System Prompt definiert Rolle ('Du bist Qualitätsmanagement-Experte'), Output-Format (JSON mit Kategorie, Ursache, Maßnahme), Few-Shot-Beispiele (3 echte Reklamationen mit korrekter Analyse), und Guardrails ('Klassifiziere nur in vordefinierte Kategorien').",
          connections: ["llm-basics", "agents-workflows", "agent-design"]
        },
        {
          id: "agent-design",
          title: "Agent-Design",
          difficulty: 3,
          hours: 5,
          tags: ["KI-Architektur", "Fortgeschritten"],
          summary: "Wann ein Agent, wann ein Workflow, wann ein einfacher Prompt?",
          analogy: "Ampel-Regel: 🟢 Einfacher Prompt = einzelne, klar definierte Aufgabe. 🟡 Workflow = mehrere Schritte, aber vorhersagbar. 🔴 Agent = offenes Ziel, braucht Werkzeuge und Entscheidungsfreiheit. Starte immer bei Grün und geh nur auf Rot wenn nötig.",
          keyPoints: [
            "Agent = LLM + Tools + Loop. Der Agent entscheidet in einer Schleife: Denken → Tool nutzen → Ergebnis prüfen → weiter.",
            "Tool-Design: Welche Werkzeuge bekommt der Agent? Zu viele = Verwirrung. Zu wenige = Hilflosigkeit.",
            "Sub-Agents: Spezialisierte Agents für Teilaufgaben. Orchestriert von einem Haupt-Agent.",
            "Fehlerbehandlung: Was passiert, wenn der Agent sich verrennt? Timeouts, Fallbacks, Human-in-the-Loop.",
            "Kosten beachten: Agents machen viele API-Calls. Jeder Call kostet. Budget einplanen!"
          ],
          practicalExample: "Agent für Beschaffungsoptimierung: Haupt-Agent bekommt Anfrage 'Optimiere unsere Büromaterial-Beschaffung'. Sub-Agent 1 analysiert historische Bestelldaten (SAP). Sub-Agent 2 recherchiert aktuelle Marktpreise (Web). Sub-Agent 3 erstellt Empfehlungsbericht.",
          connections: ["agents-workflows", "prompt-engineering", "mcp-tools"]
        },
        {
          id: "prototyping",
          title: "Rapid Prototyping",
          difficulty: 2,
          hours: 4,
          tags: ["Praxis", "Werkzeuge"],
          summary: "Mit Claude Code / Cursor schnell einen PoC bauen.",
          analogy: "Ein Prototyp ist wie ein Holzmodell eines Autos: Es fährt nicht wirklich, aber der Kunde kann Form, Größe und Sitzposition erleben. Im KI-Bereich: Ein funktionierender Demo mit echten Daten, aber ohne Produktions-Qualität.",
          keyPoints: [
            "PoC (Proof of Concept) = Funktioniert die Idee grundsätzlich? Minimal, aber mit echten Daten.",
            "Claude Code = Perfekt für schnelle Prototypen. Du beschreibst was du willst, Claude baut es.",
            "Cursor = Besser für iterative Entwicklung an größeren Projekten. Versteht den ganzen Code-Kontext.",
            "Demo-Daten: Immer anonymisierte Echtdaten verwenden. Synthetische Daten überzeugen niemanden.",
            "Timeline: Ein guter PoC sollte in 1-2 Tagen stehen. Wenn es länger dauert, ist der Scope zu groß."
          ],
          practicalExample: "Kunde will sehen, ob KI Lieferantenanfragen automatisch kategorisieren kann. PoC in 4 Stunden: 1) 100 echte E-Mails (anonymisiert) als Testdaten. 2) Claude Code baut ein einfaches React-UI. 3) Claude API im Backend klassifiziert. 4) Ergebnis: 85% korrekte Kategorisierung.",
          connections: ["tools-infra", "architecture-design", "usecase-analysis"]
        },
        {
          id: "data-strategy",
          title: "Datenstrategie",
          difficulty: 2,
          hours: 4,
          tags: ["Strategie", "Daten"],
          summary: "Welche Daten brauche ich, wie komme ich ran, wie sichere ich sie?",
          analogy: "Daten sind das Rohöl der KI — aber genauso wie Rohöl ist es wertlos, wenn es verschmutzt ist (schlechte Qualität), im falschen Tank liegt (falsche Struktur), oder nicht durch die Pipeline passt (keine Schnittstelle).",
          keyPoints: [
            "Daten-Audit: Was gibt es? Wo liegt es? Wem gehört es? Wie aktuell ist es? Wie qualitativ?",
            "Datenqualität > Datenmenge. 1.000 saubere Datensätze schlagen 100.000 verschmutzte.",
            "Daten-Pipeline: Extraktion → Transformation → Laden (ETL). Muss automatisiert laufen.",
            "Datenschutz by Design: Von Anfang an planen, nicht nachträglich draufpfropfen.",
            "Daten-Governance: Wer darf was sehen? Wer pflegt? Wie wird Qualität gesichert? Rollen definieren."
          ],
          practicalExample: "Typischer Fund beim Mittelständler: SAP hat die Bestelldaten, Excel hat die Lieferantenbewertungen, SharePoint hat die Verträge, und im Mailpostfach liegen Reklamationen. Schritt 1: Alles inventarisieren. Schritt 2: Prioritäten setzen. Schritt 3: Pipeline für die Top-3-Datenquellen aufbauen.",
          connections: ["erp-as-datasource", "databases", "dsgvo-euai"]
        },
        {
          id: "mcp-tools",
          title: "MCP & Tool-Integration",
          difficulty: 3,
          hours: 4,
          tags: ["KI-Architektur", "Integration"],
          summary: "Model Context Protocol — wie KI auf externe Systeme zugreift.",
          analogy: "MCP ist wie USB für KI: Ein einheitlicher Standard, über den verschiedene Werkzeuge an ein KI-Modell angeschlossen werden können. Statt für jedes Tool eine eigene Integration zu bauen, gibt es einen Standard-Stecker.",
          keyPoints: [
            "MCP Server = Ein Dienst, der Tools bereitstellt. MCP Client = Das KI-Modell, das die Tools nutzt.",
            "Tool-Deklaration: Jedes Tool hat einen Namen, eine Beschreibung und ein Schema (was geht rein, was kommt raus).",
            "Du hast bereits n8n-MCP und Filesystem-MCP konfiguriert — das Prinzip kennst du also schon.",
            "Für Unternehmenslösungen: MCP-Server können SAP, CRM, DMS und andere Systeme anbinden.",
            "Sicherheit: MCP-Server brauchen Authentifizierung und Autorisierung. Nicht jeder Agent darf alles."
          ],
          practicalExample: "Ein Agent für den Einkauf: MCP-Server 1 = SAP (Bestellhistorie abrufen, Bestellvorschlag anlegen). MCP-Server 2 = Lieferanten-Portal (Preise abfragen). MCP-Server 3 = E-Mail (Anfragen versenden). Der Agent orchestriert alle drei.",
          connections: ["agents-workflows", "agent-design", "integration-layer"]
        }
      ]
    },
    {
      id: "consulting",
      number: 4,
      title: "Beratungspraxis",
      subtitle: "Wie verkaufe und manage ich das?",
      weeks: "Woche 10–12",
      color: "#C44536",
      icon: "🎯",
      description: "Aus technischem Wissen wird ein Beratungsansatz. Framework, Compliance, Change.",
      modules: [
        {
          id: "consulting-framework",
          title: "Dein Beratungsframework",
          difficulty: 2,
          hours: 5,
          tags: ["Beratung", "Methodik"],
          summary: "Analyse → Assessment → Design → PoC → Rollout — dein standardisiertes Vorgehen.",
          analogy: "Wie dein bewährtes Vorgehen bei Turnaround-Projekten — nur auf KI angewandt. Du weißt: Erst Diagnose, dann Therapie. Erst verstehen, dann handeln. Erst Quick Wins, dann Transformation.",
          keyPoints: [
            "Phase 1 — Discovery: Kundenproblem verstehen, Datenlandschaft aufnehmen, Quick-Win-Potenziale identifizieren.",
            "Phase 2 — Assessment: Use Cases priorisieren, Datenreife bewerten, Build-vs-Buy entscheiden.",
            "Phase 3 — Design: Architektur skizzieren, Techstack auswählen, Projektplan erstellen.",
            "Phase 4 — PoC: Prototyp bauen, mit echten Daten testen, Ergebnisse quantifizieren.",
            "Phase 5 — Scale: Produktion, Training, Change Management, Monitoring."
          ],
          practicalExample: "Mandate bei einem Pharma-Zulieferer: Discovery (2 Tage): Interviews mit Einkauf, Qualität, IT. Assessment (3 Tage): 8 Use Cases identifiziert, 3 priorisiert. Design (2 Tage): Architektur für Lieferanten-Chatbot. PoC (5 Tage): Funktionierender Demo. Scale: Go/No-Go Entscheidung durch GF.",
          connections: ["usecase-analysis", "architecture-design", "project-structure"]
        },
        {
          id: "dsgvo-euai",
          title: "DSGVO & EU AI Act",
          difficulty: 2,
          hours: 5,
          tags: ["Compliance", "Recht"],
          summary: "Was muss der Mittelstand wirklich beachten?",
          analogy: "DSGVO ist wie Arbeitsschutz: Es gibt klare Regeln, Verstöße kosten Geld, aber mit dem richtigen Setup wird es zum Routine-Prozess. Der EU AI Act ist die neue DSGVO für KI — dieselbe Logik, neues Regelwerk.",
          keyPoints: [
            "DSGVO-Kernanforderung: Personenbezogene Daten nur mit Rechtsgrundlage verarbeiten. AVV (Auftragsverarbeitungsvertrag) mit jedem KI-Anbieter.",
            "EU AI Act — Risikoklassen: Minimal (Chatbots, Textanalyse) → Limitiert (Empfehlungssysteme) → Hoch (HR-Entscheidungen, Kreditvergabe) → Unzulässig (Social Scoring).",
            "Für den Mittelstand: Die meisten KI-Anwendungen fallen in 'Minimal' oder 'Limitiert'. Keine Panik, aber Dokumentation ist Pflicht.",
            "Praktisch: EU-Hosting wählen, AVV abschließen, Verarbeitungsverzeichnis pflegen, Transparenz gegenüber Betroffenen.",
            "Dein Beratungs-Asset: Du kennst DSGVO bereits. Der EU AI Act folgt derselben Denke. Das ist ein Wettbewerbsvorteil."
          ],
          practicalExample: "Kunde will KI für Lieferantenbewertung: Personenbezogene Daten (Ansprechpartner-Namen, E-Mails) werden verarbeitet → AVV mit Claude/Anthropic nötig. Risikoklasse: Limitiert. Maßnahme: Anonymisierung der Kontaktdaten im RAG-System, Human-in-the-Loop für Entscheidungen.",
          connections: ["cloud-basics", "data-strategy", "consulting-framework"]
        },
        {
          id: "change-management",
          title: "Change Management für KI",
          difficulty: 2,
          hours: 4,
          tags: ["Change", "Beratung"],
          summary: "Ängste abbauen, Akzeptanz schaffen, Quick Wins liefern.",
          analogy: "KI-Einführung ist wie die Einführung von SAP vor 20 Jahren: Dieselben Ängste ('Werden wir ersetzt?'), dieselben Widerstände ('Das brauchen wir nicht'), dieselbe Lösung: Früh einbinden, sichtbare Erfolge liefern, Nutzen konkret zeigen.",
          keyPoints: [
            "Häufigste Angst: 'Die KI ersetzt mich.' Dein Narrativ: 'KI ersetzt niemanden, KI gibt dir Superkräfte.'",
            "Champions identifizieren: 1-2 begeisterte Nutzer pro Abteilung, die andere mitziehen.",
            "Quick Wins first: Der erste Use Case muss in 2 Wochen sichtbare Ergebnisse liefern.",
            "Training: Nicht nur 'wie bediene ich das Tool', sondern 'wie verändert sich mein Arbeitsalltag'.",
            "Widerstandsmuster: IT-Abteilung (Kontrollverlust), Betriebsrat (Überwachung), Fachabteilung (Veränderung). Jede Gruppe braucht eigene Ansprache."
          ],
          practicalExample: "Klassischer Ablauf: Kick-off mit GF + Abteilungsleitern. Workshop mit Fachanwendern ('Was nervt euch am meisten? Das lösen wir zuerst'). PoC mit 5 Power-Usern. Ergebnisse intern präsentieren ('Wir sparen 3 Stunden pro Woche'). Rollout auf alle Nutzer.",
          connections: ["stakeholder-mgmt", "consulting-framework", "project-structure"]
        },
        {
          id: "stakeholder-mgmt",
          title: "Stakeholder-Management",
          difficulty: 2,
          hours: 3,
          tags: ["Beratung", "Kommunikation"],
          summary: "IT-Leiter, GF, Fachabteilung — wer braucht was?",
          analogy: "Wie ein Übersetzer zwischen drei Sprachen: Die GF spricht ROI und Strategie. Die IT spricht Sicherheit und Standards. Die Fachabteilung spricht Effizienz und Alltagsprobleme. Du übersetzt zwischen allen dreien.",
          keyPoints: [
            "Geschäftsführung: Braucht Business Case (ROI, Wettbewerbsvorteil, Risikominimierung). Spreche in Euro und Prozent.",
            "IT-Leitung: Braucht Sicherheit (DSGVO, Hosting, Integration). Spreche in Architektur und Standards.",
            "Fachabteilung: Braucht konkreten Nutzen (Zeitersparnis, weniger Fehler). Spreche in Alltagssprache.",
            "Betriebsrat: Braucht Transparenz (keine Überwachung, keine Arbeitsplatzvernichtung). Früh einbinden!",
            "Dein Vorteil: Als Transformationsberater kannst du alle diese Sprachen. Das ist dein USP gegenüber reinen Tech-Beratern."
          ],
          practicalExample: "Derselbe KI-Chatbot, drei Pitches: GF: 'Reduziert Bearbeitungszeit um 40%, ROI in 6 Monaten.' IT: 'Läuft auf Azure EU, DSGVO-konform, keine Daten verlassen das Unternehmen.' Fachabteilung: 'Statt 20 Minuten Suche in SAP brauchst du 30 Sekunden.'",
          connections: ["change-management", "consulting-framework"]
        },
        {
          id: "project-structure",
          title: "KI-Projektstruktur",
          difficulty: 2,
          hours: 4,
          tags: ["Projektmanagement", "Methodik"],
          summary: "Wie plane ich ein KI-Projekt? Sprints, PoC, Skalierung.",
          analogy: "Wie ein Hausbau mit Besonderheit: Du baust erst ein Modell (PoC), zeigst es dem Kunden, und baust dann das echte Haus. Aber KI-Projekte sind agiler — du baust Raum für Raum und passt den Plan ständig an.",
          keyPoints: [
            "Sprint 0 (1 Woche): Setup, Datenzugang, Architektur-Entscheidungen.",
            "PoC-Phase (2-4 Wochen): Fokussierter Prototyp mit echten Daten. Go/No-Go am Ende.",
            "MVP-Phase (4-8 Wochen): Produkt-taugliche Version mit minimalen Features. Erste echte Nutzer.",
            "Skalierung (laufend): Weitere Use Cases, mehr Nutzer, Monitoring, Optimierung.",
            "Agil, nicht Wasserfall: 2-Wochen-Sprints mit Demo am Ende. Feedback einbauen. Richtung anpassen."
          ],
          practicalExample: "Projektplan für KI-gestützte Angebotsbearbeitung: Sprint 0: SAP-Zugang + Testdaten. Sprint 1-2: RAG über technische Docs. Sprint 3-4: Integration mit Angebots-Template. Sprint 5-6: UI + Nutzer-Tests. Sprint 7-8: Rollout + Training.",
          connections: ["consulting-framework", "prototyping", "change-management"]
        },
        {
          id: "positioning",
          title: "Dein Angebot & Positionierung",
          difficulty: 2,
          hours: 4,
          tags: ["Business", "Strategie"],
          summary: "Wie positionierst du dich? Pricing, Deliverables, Referenz-Cases.",
          analogy: "Du bist nicht der günstigste Handwerker und nicht der teuerste Technologie-Guru. Du bist der Architekt, der beides versteht: Das Geschäft UND die Technik. Das ist dein Sweet Spot.",
          keyPoints: [
            "Positionierung: 'KI-Transformationsberater für den industriellen Mittelstand' — nicht Entwickler, nicht Techniker, sondern Brückenbauer.",
            "Angebotsstruktur: Discovery Workshop (1-2 Tage) → Assessment Report → PoC-Projekt → Implementierungsbegleitung.",
            "Pricing: Tagessatz für Beratung, Festpreis für PoC, Retainer für Begleitung. KI-Premium auf deinen SCM-Satz.",
            "Referenz-Cases aufbauen: Erste 2-3 Projekte ggf. mit Discount, dafür mit Referenz-Erlaubnis.",
            "Thought Leadership: LinkedIn-Posts, Vorträge bei IHK/Branchenverband. Sichtbarkeit als KI+SCM-Experte."
          ],
          practicalExample: "Dein Pitch: 'Ich bringe 26 Jahre SCM- und Transformationserfahrung mit. Ich verstehe Ihre Prozesse, Ihre ERP-Systeme und Ihre Organisation. Und ich weiß, wie KI diese drei Dinge verbessern kann — pragmatisch, DSGVO-konform und mit messbarem ROI.'",
          connections: ["consulting-framework", "stakeholder-mgmt"]
        }
      ]
    }
  ]
};

// Flatten all modules for cross-referencing
export const ALL_MODULES = CURRICULUM.phases.flatMap(p =>
  p.modules.map(m => ({ ...m, phaseId: p.id, phaseColor: p.color, phaseNumber: p.number, phaseTitle: p.title }))
);

export const NOTIFICATIONS = [
  { id: 1, area: "EU AI Act", message: "Der EU AI Act ist seit Februar 2025 in Kraft. Phase 1 (verbotene Praktiken) gilt ab Februar 2025, Hochrisiko-Systeme ab August 2026. Jetzt einarbeiten!", module: "dsgvo-euai", isNew: true },
  { id: 2, area: "MCP Protocol", message: "Anthropic hat MCP als offenen Standard veröffentlicht. Immer mehr Tools bieten MCP-Server an — das wird der Standard für Agent-Tool-Integration.", module: "mcp-tools", isNew: true },
  { id: 3, area: "Claude Code", message: "Claude Code bekommt regelmäßig Updates. Die neueste Version unterstützt erweiterte MCP-Integration und besseres Projektverständnis.", module: "tools-infra", isNew: true },
  { id: 4, area: "SAP & KI", message: "SAP Joule wird immer tiefer in S/4HANA integriert. Für Kunden mit SAP wird das Build-vs-Buy Thema relevanter.", module: "erp-as-datasource", isNew: false },
  { id: 5, area: "RAG Best Practices", message: "Neue Erkenntnisse: Hybrid-Search (Vektor + Keyword) liefert deutlich bessere Ergebnisse als reine Vektor-Suche.", module: "rag-architecture", isNew: false },
];

export const DIFFICULTY_LABELS = ["", "Einsteiger", "Aufbau", "Fortgeschritten"];
export const STATUS_LABELS = { open: "Offen", active: "In Arbeit", done: "Abgeschlossen" };
export const STATUS_COLORS = { open: "#94a3b8", active: "#f59e0b", done: "#22c55e" };

// ============================================================
// TOPIC BACKLOG — Weiterführende Themen & Ressourcen
// Layer 2+ Inhalte, die noch entwickelt werden.
// Status: "coming-soon" | "in-progress" | "ready"
// ============================================================

const cs = (title, summary) => ({
  status: "coming-soon", title, summary,
  url: "#", type: "article", layer: 1,
  relevance: "Wird recherchiert und eingebunden.",
});

export const TOPIC_BACKLOG = {

  // ============================================================
  // PHASE 1 — FUNDAMENT
  // ============================================================

  "llm-basics": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Transformer-Architektur: Attention erklärt", summary: "Wie funktioniert Self-Attention? Warum sind Transformer das Fundament moderner KI — und was bedeutet das für die Praxis?" },
      { layer: 2, status: "coming-soon", title: "Fine-Tuning vs. RAG — Wann was?", summary: "Fine-Tuning passt das Modell an, RAG fügt Wissen hinzu. Die Entscheidung hat enorme Kosten- und Qualitätsauswirkungen." },
      { layer: 2, status: "coming-soon", title: "Modell-Evaluation & Benchmarks", summary: "MMLU, HumanEval, HELM — wie werden Modelle gemessen, und was sagen diese Zahlen für Unternehmensprojekte wirklich aus?" },
      { layer: 3, status: "coming-soon", title: "Mixture of Experts (MoE)", summary: "Warum sind GPT-4 und Mixtral eigentlich mehrere spezialisierte Modelle in einem? Das MoE-Prinzip und seine Implikationen." },
      { layer: 3, status: "coming-soon", title: "RLHF & Constitutional AI", summary: "Wie werden Modelle 'zahm' gemacht? RLHF (Reinforcement Learning from Human Feedback) und Anthropics Ansatz erklärt." },
      { layer: 4, status: "coming-soon", title: "Embedding-Modelle vs. Generative Modelle", summary: "Nicht jede KI generiert Text. Embedding-Modelle wandeln Text in Vektoren um — die Grundlage von RAG und Semantic Search." },
    ],
    resources: [
      cs("Attention Is All You Need (Vaswani et al.)", "Das Original-Paper das Transformer erfunden hat. Layer-2-Pflichtlektüre für wer verstehen will, was unter der Haube passiert."),
      cs("Anthropic Model Cards & Documentation", "Offizielle Beschreibungen von Claude-Modellen: Stärken, Schwächen, Einsatzgebiete, Sicherheitsmaßnahmen."),
      cs("Hugging Face Open LLM Leaderboard", "Aktuelle Rangliste aller Open-Source-Modelle nach Benchmark-Ergebnissen — nützlich für Modellauswahl-Empfehlungen."),
    ],
  },

  "api-basics": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Streaming APIs & Server-Sent Events", summary: "Warum 'tippt' ChatGPT die Antwort Wort für Wort? Streaming APIs und wann du sie in Kundenprojekten brauchst." },
      { layer: 2, status: "coming-soon", title: "Rate Limiting & Retry-Strategien", summary: "Was tun wenn die API 429 zurückgibt? Exponential Backoff, Token-Budgets und robuste API-Integration." },
      { layer: 2, status: "coming-soon", title: "API-Authentifizierung in der Tiefe", summary: "OAuth 2.0, JWT, API-Keys — die drei wichtigsten Auth-Mechanismen, die du in SAP-Integrationen antreffen wirst." },
      { layer: 3, status: "coming-soon", title: "GraphQL als Alternative zu REST", summary: "Wann macht GraphQL Sinn? Für Kunden mit komplexen, verschachtelten Datenstrukturen (z.B. SAP-Materialstämme) ein relevantes Thema." },
      { layer: 3, status: "coming-soon", title: "Webhooks & Event-Driven APIs", summary: "Statt APIs zu pollen — Systeme die push-basiert auf Ereignisse reagieren. Relevant für Echtzeit-KI-Integrationen." },
    ],
    resources: [
      cs("Anthropic API Reference", "Die vollständige API-Dokumentation: Alle Endpunkte, Parameter, Modelle, und Code-Beispiele."),
      cs("REST API Design Best Practices (Microsoft)", "Microsofts Guidelines für API-Design — relevant weil viele SAP-Kunden Microsoft-Stack nutzen."),
      cs("Postman Learning Center", "Interaktives Lernen für API-Testing, das du in jedem Kundenprojekt zur Demo nutzen kannst."),
    ],
  },

  "three-layers": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Microservices vs. Monolith", summary: "Wann ist es sinnvoll, eine KI-Komponente als eigenen Service zu isolieren — und wann ist das Over-Engineering?" },
      { layer: 2, status: "coming-soon", title: "Serverless & Edge Computing", summary: "Azure Functions, AWS Lambda — warum 'No-Server' für viele KI-Integrationen die günstigste und wartungsärmste Architektur ist." },
      { layer: 3, status: "coming-soon", title: "Message Queues & Async-Verarbeitung", summary: "Wenn eine KI-Anfrage 30 Sekunden dauert, wartet kein Nutzer. RabbitMQ, Azure Service Bus und Async-Patterns für KI." },
      { layer: 3, status: "coming-soon", title: "API Gateway & Backend-for-Frontend (BFF)", summary: "Wie strukturierst du den Übergang zwischen Frontend und mehreren Backend-Services? Das BFF-Pattern in der Praxis." },
    ],
    resources: [
      cs("Martin Fowler: Patterns of Enterprise Application Architecture", "Das Standardwerk für Softwarearchitektur-Muster. Layer-3-Referenz für Architekturentscheidungen."),
      cs("AWS/Azure Architecture Center", "Offizielle Referenzarchitekturen für KI-Workloads auf den wichtigsten Cloud-Plattformen."),
      cs("The Twelve-Factor App", "12 Prinzipien für skalierbare, wartbare Applikationen — Grundlage für jede moderne KI-Applikation."),
    ],
  },

  "cloud-basics": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Infrastructure as Code (IaC)", summary: "Terraform, Bicep, ARM Templates — warum 'Infrastruktur als Code' für reproduzierbare KI-Deployments unverzichtbar ist." },
      { layer: 2, status: "coming-soon", title: "Container & Docker Grundlagen", summary: "Was sind Container, warum lösen sie das 'Läuft bei mir' Problem, und wann brauchst du sie in Kundenprojekten?" },
      { layer: 2, status: "coming-soon", title: "FinOps: Cloud-Kosten im Griff", summary: "Azure Cost Management, Reserved Instances, Spot-VMs — KI-Projekte können teuer werden. So behältst du die Kontrolle." },
      { layer: 3, status: "coming-soon", title: "Kubernetes für KI-Workloads", summary: "GPU-Scheduling, Autoscaling für Inference-Dienste, und warum K8s bei hohem Volumen unvermeidlich wird." },
      { layer: 4, status: "coming-soon", title: "Multi-Cloud & Hybrid-Strategien", summary: "Wenn ein Kunde on-premise-Daten hat und gleichzeitig Cloud-KI nutzen will — Architekturmuster für hybride Szenarien." },
    ],
    resources: [
      cs("Microsoft Azure AI Services Dokumentation", "Komplette Doku für Azure OpenAI, Azure Cognitive Services, und Azure ML — die Plattform die die meisten SAP-Kunden bereits haben."),
      cs("AWS Well-Architected Framework: ML Lens", "Best Practices für ML-Workloads auf AWS — übertragbar auf andere Cloud-Plattformen."),
      cs("Google Cloud Architecture Framework", "Googles Pendant — interessant wegen Vertex AI und BigQuery ML."),
    ],
  },

  "agents-workflows": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "LangChain & LangGraph in der Praxis", summary: "Die dominantesten Frameworks für Agents und Workflows. Wann nutze ich sie — und wann ist reines API-Calling besser?" },
      { layer: 2, status: "coming-soon", title: "Tool Calling / Function Calling im Detail", summary: "Wie gibt man einem LLM 'Werkzeuge' — und wie verhindert man, dass es sie falsch benutzt? Schema-Design für Tools." },
      { layer: 2, status: "coming-soon", title: "ReAct Pattern: Reason + Act", summary: "Das meistverbreitete Pattern für Agents. Denken → Handeln → Beobachten — in einer Schleife." },
      { layer: 3, status: "coming-soon", title: "Multi-Agent Systeme", summary: "Wenn ein Agent nicht reicht: Orchestrator + Subagenten, parallele Ausführung, und wie man sie debuggt." },
      { layer: 3, status: "coming-soon", title: "Agent Evaluation & Monitoring", summary: "Wie testest du einen Agent systematisch? LangSmith, Trace-Logging, und Qualitätsmetriken für Agents." },
      { layer: 4, status: "coming-soon", title: "Autonome Agenten & Safety", summary: "Wenn Agents echte Aktionen ausführen (E-Mail senden, in SAP schreiben) — Guardrails, Human-in-the-Loop, Rollback." },
    ],
    resources: [
      cs("Anthropic Agents Guide", "Anthropics eigene Empfehlungen zum Bau von Agents mit Claude — sehr praxisnah."),
      cs("LangGraph Dokumentation", "Das wichtigste Framework für State-Machines und komplexe Agent-Workflows."),
      cs("n8n Dokumentation", "Der Low-Code-Ansatz für Workflows — für Kundenprojekte wo schnelle Implementierung wichtiger als Flexibilität ist."),
    ],
  },

  "vocabulary-map": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "KI-Landschaft 2025: Wer macht was?", summary: "Anthropic, OpenAI, Google, Meta, Mistral, Cohere — eine Karte der wichtigsten Spieler und ihrer Stärken." },
      { layer: 2, status: "coming-soon", title: "Foundation Models vs. Spezialisierte Modelle", summary: "Wann macht ein spezialisiertes Modell (z.B. für Code, Medizin, Recht) mehr Sinn als ein Generalisten-LLM?" },
      { layer: 3, status: "coming-soon", title: "AI Safety & Alignment — Grundlagen", summary: "Warum ist Alignment ein offenes Forschungsproblem? Für Kundengespräche auf Geschäftsführer-Ebene." },
      { layer: 3, status: "coming-soon", title: "Multimodale Modelle: Text, Bild, Audio", summary: "GPT-4V, Claude Vision, Whisper — wenn Kunden nicht nur Text, sondern Bilder, PDFs oder Audiodaten verarbeiten wollen." },
    ],
    resources: [
      cs("State of AI Report (jährlich)", "Die umfassendste Übersicht über Entwicklungen in AI-Forschung, Industrie und Politik — jedes Jahr neu."),
      cs("a16z AI Canon", "Andreessen Horowitz' kuratierte Leseliste zu KI — von Grundlagen bis Frontier-Forschung."),
      cs("Import AI Newsletter (Jack Clark)", "Wöchentlicher Deep-Dive in aktuelle KI-Entwicklungen — für wer auf dem Laufenden bleiben will."),
    ],
  },

  // ============================================================
  // PHASE 2 — TECHNOLOGIE-LANDSCHAFT
  // ============================================================

  "erp-as-datasource": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "SAP ABAP Grundlagen für Berater", summary: "Du musst kein ABAP programmieren — aber wenn du die Grundprinzipien kennst, kannst du mit SAP-Entwicklern auf Augenhöhe sprechen." },
      { layer: 2, status: "coming-soon", title: "S/4HANA Cloud: Neue Schnittstellen & APIs", summary: "Was ändert sich in S/4HANA vs. ECC? Welche OData-Services gibt es out-of-the-box — und was muss custom gebaut werden?" },
      { layer: 2, status: "coming-soon", title: "SAP Business Technology Platform (BTP)", summary: "Die Plattform, auf der SAP-native KI-Lösungen gebaut werden. Integration Suite, AI Services, CAP Framework." },
      { layer: 3, status: "coming-soon", title: "Event-Driven SAP Integration", summary: "SAP Event Mesh und der Wechsel von Request/Response zu Event-Streams — für Echtzeit-KI-Szenarien." },
      { layer: 4, status: "coming-soon", title: "SAP HANA als Vektor-Datenbank", summary: "SAP HANA hat native Vector-Engine-Unterstützung. Für Kunden die alles in SAP behalten wollen, der eleganteste RAG-Ansatz." },
    ],
    resources: [
      cs("SAP Help Portal: OData Services", "Offizielle Dokumentation aller Standard-OData-Services in S/4HANA — deine erste Anlaufstelle bei Integrationsfragen."),
      cs("SAP Learning Hub: Integration Suite", "SAP-eigene Lernplattform für BTP und Integration Suite."),
      cs("proALPHA & Navision API-Dokumentationen", "Für die Nicht-SAP-Kunden: Die wichtigsten API-Zugänge bei den häufigsten ERP-Alternativen im Mittelstand."),
    ],
  },

  "databases": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Vector Databases im Detail", summary: "Pinecone, Weaviate, Qdrant, pgvector — wie funktionieren sie, und wie wähle ich für einen Kunden die richtige aus?" },
      { layer: 2, status: "coming-soon", title: "Zeitreihendatenbanken für Industrie-KI", summary: "InfluxDB, TimescaleDB — wenn Maschinendaten, Produktionslogs oder Sensordaten die Grundlage für KI-Analysen sind." },
      { layer: 3, status: "coming-soon", title: "Datenmodellierung für KI", summary: "Star-Schema, Data Vault, Wide Tables — welche Datenbankstrukturen eignen sich besonders für ML-Features?" },
      { layer: 3, status: "coming-soon", title: "Graph-Datenbanken: Neo4j & Co.", summary: "Wenn Beziehungen wichtiger sind als Attribute — Lieferantennetzwerke, Stücklisten-Hierarchien als Graph." },
      { layer: 4, status: "coming-soon", title: "Distributed Databases & ACID vs. BASE", summary: "Wenn Daten über mehrere Standorte verteilt sind — Konsistenz-Tradeoffs und ihre Auswirkungen auf KI-Qualität." },
    ],
    resources: [
      cs("pgvector GitHub Repository", "Die PostgreSQL-Erweiterung für Vektorsuche — oft die einfachste Lösung für Kunden die bereits Postgres nutzen."),
      cs("Weaviate Vector Database Docs", "Umfassende Doku einer der beliebtesten Open-Source-Vektordatenbanken."),
      cs("Use The Index, Luke!", "Das beste Online-Buch zu Datenbankindizes — Pflichtlektüre wenn Datenbankperformance zum Thema wird."),
    ],
  },

  "rag-architecture": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Advanced RAG: HyDE & Reranking", summary: "Hypothetical Document Embeddings, Cross-Encoder Reranking — Techniken die die Retrieval-Qualität dramatisch verbessern." },
      { layer: 2, status: "coming-soon", title: "Chunking-Strategien im Vergleich", summary: "Fixed-Size, Semantic, Recursive, Agentic Chunking — welche Strategie für welchen Dokumenttyp am besten funktioniert." },
      { layer: 2, status: "coming-soon", title: "RAG-Evaluation mit RAGAS", summary: "Wie misst du, ob dein RAG gut funktioniert? Faithfulness, Answer Relevancy, Context Precision — die vier Key-Metrics." },
      { layer: 3, status: "coming-soon", title: "Multi-Modal RAG: Bilder & PDFs", summary: "Technische Zeichnungen, Tabellen in PDFs, Infrarot-Bilder — RAG über multimodale Dokumente mit Vision-Modellen." },
      { layer: 3, status: "coming-soon", title: "GraphRAG: Strukturiertes Wissen", summary: "Microsofts GraphRAG nutzt Knowledge Graphs statt Vektorsuche — dramatisch besser für komplexe, verknüpfte Dokumente." },
      { layer: 4, status: "coming-soon", title: "Agentic RAG & Self-Query", summary: "Wenn der Agent selbst entscheidet welche Dokumente er braucht, wie er sucht, und ob das Ergebnis ausreichend ist." },
    ],
    resources: [
      cs("LlamaIndex RAG Documentation", "Das vollständigste Framework für RAG-Systeme — mit Tutorials von Basic bis Advanced."),
      cs("RAGAS: RAG Assessment Framework", "Das Standard-Tool zur automatisierten Qualitätsmessung von RAG-Systemen."),
      cs("Anthropic: Building Effective Agents", "Anthropics eigene Empfehlungen — enthält auch den empfohlenen RAG-Ansatz für Claude."),
    ],
  },

  "tools-infra": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "LangSmith: Observability für LLM-Apps", summary: "Tracing, Evaluation, Datasets — warum LangSmith das wichtigste Tool für professionelle LLM-Entwicklung ist." },
      { layer: 2, status: "coming-soon", title: "Prompt Management & Versionierung", summary: "Wenn Prompts Production-Code sind, müssen sie auch wie Code behandelt werden. PromptLayer, Langfuse, eigene Lösungen." },
      { layer: 3, status: "coming-soon", title: "MLflow für KI-Projekte", summary: "Experiment-Tracking, Model Registry, Deployment — der MLOps-Stack für Projekte die über Prototype hinausgehen." },
      { layer: 3, status: "coming-soon", title: "Monitoring & Alerting für LLM-Produktivsysteme", summary: "Latenz, Fehlerrate, Token-Kosten, Output-Qualität — welche Metriken du in Production monitoren musst." },
      { layer: 4, status: "coming-soon", title: "Feature Stores für ML", summary: "Feast, Tecton, Vertex AI Feature Store — wenn Feature-Engineering für mehrere Modelle geteilt und versioniert werden muss." },
    ],
    resources: [
      cs("LangSmith Dokumentation", "Offizielle Doku für das führende LLM-Observability-Tool."),
      cs("Langfuse: Open-Source LLM Engineering", "Die Open-Source-Alternative zu LangSmith — selbst-hostbar, ideal für Kunden mit strengen Datenschutzanforderungen."),
      cs("MLflow Dokumentation", "Der Standard für ML-Experiment-Tracking, seit Jahren bewährt in der Industrie."),
    ],
  },

  "integration-layer": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Event-Driven Architecture (EDA)", summary: "Wenn Systeme auf Ereignisse reagieren statt auf Anfragen zu warten — das Architekturmuster hinter modernen KI-Workflows." },
      { layer: 2, status: "coming-soon", title: "Message Queues: Azure Service Bus & RabbitMQ", summary: "Entkopplung, Skalierung, Fehlertoleranz — warum Queues für asynchrone KI-Verarbeitung unverzichtbar sind." },
      { layer: 3, status: "coming-soon", title: "API Gateway Patterns", summary: "Rate Limiting, Auth, Caching, Request Transformation — was ein API Gateway leistet und wann du einen brauchst." },
      { layer: 3, status: "coming-soon", title: "iPaaS: Azure Integration Services", summary: "Logic Apps, Service Bus, API Management, Event Grid — Microsofts Integration-Plattform für SAP-Kunden." },
      { layer: 4, status: "coming-soon", title: "CQRS & Event Sourcing für KI", summary: "Command Query Responsibility Segregation — wenn Lesen und Schreiben von Daten unterschiedliche Anforderungen haben." },
    ],
    resources: [
      cs("Azure Integration Services Dokumentation", "Microsofts komplettes Integration-Portfolio — Logic Apps, Service Bus, API Management erklärt."),
      cs("Enterprise Integration Patterns (Hohpe & Woolf)", "Das Standardwerk für Integrationsmuster — seit 20 Jahren gültig, noch heute Pflichtlektüre."),
      cs("n8n Self-Hosted Dokumentation", "Für Kunden die eine Low-Code Integration-Lösung bevorzugen."),
    ],
  },

  "hosting-deployment": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "CI/CD Pipelines für KI-Anwendungen", summary: "GitHub Actions, Azure DevOps — automatische Tests, Builds und Deployments. Wie sieht ein professioneller Deployment-Prozess aus?" },
      { layer: 2, status: "coming-soon", title: "Blue-Green & Canary Deployments", summary: "Wie rollst du Updates aus ohne Downtime? Besonders wichtig wenn ein KI-Modell durch ein besseres ersetzt wird." },
      { layer: 3, status: "coming-soon", title: "Container-Orchestrierung mit Kubernetes", summary: "Wann brauche ich K8s statt einfacher Container-Dienste? GPU-Scheduling, Autoscaling für Inference-Workloads." },
      { layer: 3, status: "coming-soon", title: "SRE-Praktiken: SLAs, SLOs, SLIs", summary: "Service Level Objectives für KI-Systeme definieren — was ist eine akzeptable Antwortzeit? Was ist akzeptable Fehlerrate?" },
      { layer: 4, status: "coming-soon", title: "GitOps & Infrastructure as Code für ML", summary: "Wie versionierst und deployest du ML-Infrastruktur — nicht nur Code, sondern auch Modelle und Konfigurationen." },
    ],
    resources: [
      cs("Vercel Dokumentation", "Das Hosting-Tool das in diesem Projekt selbst genutzt wird — sehr gute Einstiegsdoku."),
      cs("Azure Container Apps Dokumentation", "Microsofts serverless Container-Dienst — ideal für KI-APIs die skalieren müssen ohne K8s-Komplexität."),
      cs("GitHub Actions für CI/CD", "Das verbreiteste CI/CD-Tool — direkt in GitHub integriert, mit starker Community."),
    ],
  },

  // ============================================================
  // PHASE 3 — LÖSUNGSDESIGN
  // ============================================================

  "usecase-analysis": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Business Case Modellierung für KI", summary: "ROI-Berechnung, TCO-Kalkulation, Payback-Period — wie du einen wasserdichten Business Case für KI-Projekte baust." },
      { layer: 2, status: "coming-soon", title: "Value Stream Mapping für KI", summary: "Wo in einem Prozess steckt der meiste Zeitverlust? Die Methode um den höchsten KI-Hebel zu finden." },
      { layer: 3, status: "coming-soon", title: "Jobs-to-be-Done Framework für KI", summary: "Was will der Nutzer eigentlich erledigen? Das JTBD-Framework angewendet auf KI-Use-Case-Entdeckung." },
      { layer: 3, status: "coming-soon", title: "KI-Reifegradmodell für den Mittelstand", summary: "Wo steht ein Unternehmen in Sachen KI-Readiness? Ein Bewertungsrahmen den du im Assessment-Workshop einsetzen kannst." },
    ],
    resources: [
      cs("McKinsey: State of AI (jährlich)", "Die umfassendste Marktstudie zu KI-Adoption — zeigt Benchmarks und hilft Business Cases zu untermauern."),
      cs("BCG AI Value Creation Framework", "BCGs Framework zur Identifikation von KI-Wertquellen in Unternehmen."),
      cs("Lean AI (Lomit Patel)", "Praktisches Buch zur schnellen Implementierung von KI mit messbarem ROI — gut für Business-Case-Argumente."),
    ],
  },

  "architecture-design": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Domain-Driven Design (DDD) für KI", summary: "Bounded Contexts, Aggregates, Domain Events — wie DDD hilft, KI-Systeme wartbar und erweiterbar zu halten." },
      { layer: 2, status: "coming-soon", title: "AI System Design: Trade-offs dokumentieren", summary: "Architecture Decision Records (ADRs) — wie du Architekturentscheidungen für Kunden transparent und nachvollziehbar machst." },
      { layer: 3, status: "coming-soon", title: "TOGAF für KI-Projekte", summary: "Enterprise Architecture Frameworks in der Praxis — wie passt eine KI-Lösung in die bestehende Enterprise-Architektur?" },
      { layer: 4, status: "coming-soon", title: "Responsible AI Architecture", summary: "Privacy by Design, Fairness, Explainability als Architekturprinzipien — nicht als Nachgedanke, sondern als Fundament." },
    ],
    resources: [
      cs("AWS Architecture Center: AI/ML Patterns", "Konkrete Referenzarchitekturen für die häufigsten KI-Szenarien."),
      cs("Martin Fowler Blog: AI Architecture", "Tiefe Artikel zu Softwarearchitektur-Entscheidungen für KI-Systeme."),
      cs("Designing Machine Learning Systems (Huyen)", "Das Standardwerk für ML-System-Design — von Feature Engineering bis Deployment."),
    ],
  },

  "prompt-engineering": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Few-Shot & Chain-of-Thought Prompting", summary: "Beispiele geben die denken lassen. Die zwei mächtigsten Prompting-Techniken für komplexe Reasoning-Aufgaben." },
      { layer: 2, status: "coming-soon", title: "Prompt-Bibliotheken für Beratungskontext", summary: "Fertige, erprobte Prompts für häufige Beratungsaufgaben: Use-Case-Analyse, Business Case, Stakeholder-Brief." },
      { layer: 3, status: "coming-soon", title: "Tree-of-Thought & Self-Consistency", summary: "Wenn Chain-of-Thought nicht reicht — Methoden für Aufgaben die mehrere Lösungspfade explorieren müssen." },
      { layer: 3, status: "coming-soon", title: "Prompt Injection & Sicherheitsrisiken", summary: "Wie können Nutzer oder böswillige Daten Prompts manipulieren — und wie baut man robuste Guardrails?" },
      { layer: 4, status: "coming-soon", title: "DSPy: Automatische Prompt-Optimierung", summary: "Statt Prompts manuell zu tunen: DSPy optimiert Prompts automatisch anhand von Beispieldaten und Metriken." },
    ],
    resources: [
      cs("Anthropic Prompt Engineering Guide", "Anthropics eigene, sehr praxisnahe Anleitung — direkt anwendbar für Claude-Projekte."),
      cs("Learn Prompting (Open Source)", "Das umfassendste kostenlose Lehrbuch zu Prompt Engineering — von Basics bis Advanced."),
      cs("Prompt Engineering Guide (DAIR.AI)", "Akademisch fundiert, trotzdem praxisnah — mit vielen Beispielen und Techniken."),
    ],
  },

  "agent-design": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Tool Schema Design", summary: "Wie definierst du Tools so, dass das LLM sie zuverlässig und korrekt verwendet? Naming, Beschreibungen, Parametertypen." },
      { layer: 2, status: "coming-soon", title: "Reflexion & Self-Correction", summary: "Agents die ihre eigenen Outputs bewerten und korrigieren — das Reflexion-Pattern und wann es Sinn macht." },
      { layer: 3, status: "coming-soon", title: "Multi-Agent Orchestrierung", summary: "Supervisor-Pattern, Swarm-Pattern, Pipeline — drei Wege wie mehrere Agents zusammenarbeiten können." },
      { layer: 3, status: "coming-soon", title: "Agent Memory: Short-Term vs. Long-Term", summary: "Wie merkt sich ein Agent was in früheren Sessions passiert ist? In-Context, Vektor-Memory, Strukturiertes Memory." },
      { layer: 4, status: "coming-soon", title: "Agent Safety: Guardrails & Kill Switches", summary: "Wenn Agents echte Aktionen ausführen — technische und organisatorische Sicherheitsmechanismen im Detail." },
    ],
    resources: [
      cs("Anthropic: Building Effective Agents", "Das wichtigste Dokument für Agent-Design mit Claude — Empfehlungen direkt vom Hersteller."),
      cs("LangGraph: Stateful Agent Workflows", "Das führende Framework für komplexe, stateful Agent-Systeme."),
      cs("AutoGPT & BabyAGI: Lessons Learned", "Was frühe autonome Agents richtig und falsch gemacht haben — wertvolle Lehren für robustes Agent-Design."),
    ],
  },

  "prototyping": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Design Sprint für KI", summary: "Google's Design Sprint adaptiert für KI-Projekte — in 5 Tagen von der Idee zum getesteten Prototyp." },
      { layer: 2, status: "coming-soon", title: "Rapid Evaluation: Wie gut ist der Prototyp?", summary: "Schnelle, pragmatische Bewertungsmethoden die ohne formales ML-Testing auskommen — für die frühe Phase." },
      { layer: 3, status: "coming-soon", title: "Storyboarding für KI-UX", summary: "Wie der Nutzer die KI-Lösung erleben soll — bevor eine Zeile Code geschrieben wird." },
      { layer: 3, status: "coming-soon", title: "Prototype → Production: Was ändert sich?", summary: "Der Gap zwischen funktionierendem Prototype und produktionsreifer Lösung — die häufigsten Überraschungen." },
    ],
    resources: [
      cs("The Design Sprint Book (Knapp/Zeratsky)", "Das Original-Buch zum Design Sprint-Prozess — gut übertragbar auf KI-Projekte."),
      cs("Streamlit Dokumentation", "Das schnellste Framework für KI-Prototypen mit Python — ideal für erste Demos beim Kunden."),
      cs("Gradio: ML Demo in Minuten", "Noch schneller als Streamlit für einfache Modell-Demos — perfekt für den ersten Kundentermin."),
    ],
  },

  "data-strategy": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Data Mesh: Dezentrale Datenverantwortung", summary: "Statt eines zentralen Data Lake: Datenprodukte in der Verantwortung der Fachbereiche — Vor- und Nachteile für KI." },
      { layer: 2, status: "coming-soon", title: "Data Contracts: Qualitätssicherung an der Quelle", summary: "Formale Vereinbarungen über Datenformat, Qualität, und Verfügbarkeit zwischen Produzenten und Konsumenten." },
      { layer: 3, status: "coming-soon", title: "Feature Engineering für ML", summary: "Wie rohe Daten zu ML-Features werden — und warum diese Transformation oft 80% des Gesamtaufwands ausmacht." },
      { layer: 3, status: "coming-soon", title: "Synthetische Datengenerierung", summary: "Wenn echte Daten fehlen oder nicht verwendet werden dürfen — KI generiert realistische Trainingsdaten." },
      { layer: 4, status: "coming-soon", title: "FAIR Data Principles für Unternehmen", summary: "Findable, Accessible, Interoperable, Reusable — die wissenschaftlichen Datenmanagement-Prinzipien in der Unternehmensrealität." },
    ],
    resources: [
      cs("dbt Dokumentation: Analytics Engineering", "Das Tool das modernen Datenteams hilft, saubere, gut-dokumentierte Datenpipelines zu bauen."),
      cs("Great Expectations: Datenqualität", "Open-Source-Framework für automatisierte Datenqualitätstests — unverzichtbar für produktive KI-Systeme."),
      cs("Data Management Body of Knowledge (DAMA)", "Das Standardwerk für professionelles Datenmanagement — für Kunden die Datenstrategie ganzheitlich angehen wollen."),
    ],
  },

  "mcp-tools": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "MCP Server entwickeln: Schritt für Schritt", summary: "Von der Spec zum lauffähigen MCP-Server — mit konkretem Codebeispiel für einen SAP-Connector." },
      { layer: 2, status: "coming-soon", title: "MCP Tool Schema Design", summary: "Wie definierst du Tools im MCP-Format so, dass KI-Modelle sie zuverlässig verstehen und nutzen?" },
      { layer: 3, status: "coming-soon", title: "MCP Security: Authorization & Scoping", summary: "OAuth 2.0 im MCP-Kontext — wie beschränkst du was ein KI-Agent in deinen Systemen tun darf?" },
      { layer: 3, status: "coming-soon", title: "MCP in der Enterprise-Praxis", summary: "Erfahrungen aus realen Enterprise-MCP-Deployments — was funktioniert, was nicht, und welche Stolperfallen warten." },
      { layer: 4, status: "coming-soon", title: "MCP vs. OpenAPI vs. Tool Calling", summary: "Drei Standards für KI-Systemintegration im Vergleich — wann wähle ich welchen?" },
    ],
    resources: [
      cs("MCP Official Specification", "Die vollständige technische Spezifikation von Anthropic — Pflicht für alle die MCP-Server entwickeln."),
      cs("MCP Server Examples Repository", "Offizielle Beispiel-Implementierungen für häufige Integrationen."),
      cs("Claude Desktop MCP Integration Guide", "Wie du MCP-Server mit Claude Desktop verbindest und testest."),
    ],
  },

  // ============================================================
  // PHASE 4 — BERATUNGSPRAXIS
  // ============================================================

  "consulting-framework": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "MECE-Prinzip in der KI-Beratung", summary: "Mutually Exclusive, Collectively Exhaustive — wie du Problemstrukturen aufbaust die keine Lücken und keine Überschneidungen haben." },
      { layer: 2, status: "coming-soon", title: "The Pyramid Principle", summary: "Barbara Minto's Methode für klare, überzeugende Kommunikation — unverzichtbar für Executive Presentations." },
      { layer: 3, status: "coming-soon", title: "Hypothesis-Driven Consulting", summary: "Statt alle Daten zu sammeln: Mit einer Hypothese starten und sie systematisch testen. Schneller, fokussierter, überzeugender." },
      { layer: 3, status: "coming-soon", title: "Value-Based Pricing für KI-Projekte", summary: "Statt Tagessatz: Wie du Preise an den generierten Wert koppelst — und warum das für KI-Projekte besonders gut funktioniert." },
    ],
    resources: [
      cs("The McKinsey Way (Rasiel)", "Insider-Einblick in McKinseys Beratungsmethodik — gut auf mittelständische Kundenprojekte übertragbar."),
      cs("The Pyramid Principle (Minto)", "Das Standardwerk für strukturierte Kommunikation — jeder Berater sollte es gelesen haben."),
      cs("Consulting Bible (Weiss)", "Praktischer Leitfaden für unabhängige Berater — sehr relevant für die Positionierung als Einzelberater."),
    ],
  },

  "dsgvo-euai": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "EU AI Act: Risikoklassen im Detail", summary: "Minimal Risk, Limited Risk, High Risk, Unacceptable Risk — welche KI-Systeme fallen wo rein, und was bedeutet das konkret?" },
      { layer: 2, status: "coming-soon", title: "DSGVO DPIA für KI-Systeme", summary: "Data Protection Impact Assessment — wann ist eine Datenschutzfolgeabschätzung Pflicht, und wie führt man sie durch?" },
      { layer: 3, status: "coming-soon", title: "KI-Governance Frameworks", summary: "ISO 42001, NIST AI RMF — internationale Standards für KI-Governance und wie du sie in Kundenprojekten nutzt." },
      { layer: 3, status: "coming-soon", title: "Erklärbarkeit (XAI) als Compliance-Anforderung", summary: "Wenn KI-Entscheidungen erklärt werden müssen — technische Ansätze (LIME, SHAP) und rechtliche Anforderungen." },
      { layer: 4, status: "coming-soon", title: "EU AI Liability Directive", summary: "Die geplante Haftungsrichtlinie für KI — was kommt auf Unternehmen zu, die KI-Systeme einsetzen oder entwickeln?" },
    ],
    resources: [
      cs("EU AI Act Volltext (EUR-Lex)", "Der offizielle Gesetzestext — für wer es genau wissen will."),
      cs("BVDW: DSGVO & KI Leitfaden", "Praxisnahe Hilfestellung für deutsche Unternehmen zur DSGVO-konformen KI-Nutzung."),
      cs("Future of Privacy Forum: AI Governance", "Internationale Perspektiven auf AI Governance — nützlich für Kunden mit globalem Footprint."),
    ],
  },

  "change-management": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Kotter's 8-Step Model für KI", summary: "Das klassische Change-Management-Framework angewendet auf KI-Transformationsprojekte im Mittelstand." },
      { layer: 2, status: "coming-soon", title: "ADKAR Model: Individuellen Wandel verstehen", summary: "Awareness, Desire, Knowledge, Ability, Reinforcement — warum Menschen Wandel ablehnen und wie du es änderst." },
      { layer: 3, status: "coming-soon", title: "Organizational Design für KI", summary: "Wie muss eine Organisation strukturiert sein um KI erfolgreich zu nutzen? Rollen, Verantwortlichkeiten, Prozesse." },
      { layer: 3, status: "coming-soon", title: "KI-Schulungskonzepte: Vom Laien zum Power User", summary: "Wie designst du ein Schulungsprogramm das Mitarbeiter befähigt statt überfordert?" },
    ],
    resources: [
      cs("Leading Change (Kotter)", "Das Standardwerk für Veränderungsmanagement — Pflichtlektüre für jeden KI-Transformationsberater."),
      cs("Switch: How to Change Things When Change Is Hard (Heath)", "Zugänglicheres Buch zu Verhaltensänderung — gut für Gespräche mit nicht-technischen Stakeholdern."),
      cs("MIT Sloan: Workforce and AI Research", "Aktuelle Forschung zu den Auswirkungen von KI auf Arbeit und Belegschaft."),
    ],
  },

  "stakeholder-mgmt": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Power-Interest Matrix", summary: "Wer hat Einfluss, wer ist betroffen? Eine einfache, mächtige Methode zur Stakeholder-Priorisierung vor Projektbeginn." },
      { layer: 2, status: "coming-soon", title: "Executive Communication: Der KI-Brief", summary: "Wie kommunizierst du komplexe KI-Themen in einer Seite — für die Geschäftsführung die keine Zeit hat." },
      { layer: 3, status: "coming-soon", title: "Verhandlungsführung in KI-Projekten", summary: "Harvard-Verhandlungsmodell, BATNA, Interessenbasiertes Verhandeln — wenn Budget und Scope zum Thema werden." },
      { layer: 3, status: "coming-soon", title: "Betriebsrat & Mitbestimmung bei KI", summary: "Was muss der Betriebsrat wissen, mitentscheiden, genehmigen? Rechtlicher Rahmen und praktische Empfehlungen." },
    ],
    resources: [
      cs("Getting to Yes (Fisher/Ury)", "Das Standardwerk für sachbezogenes Verhandeln — unverzichtbar für Berater in Stakeholder-Konflikten."),
      cs("HBR: Managing Stakeholders in Digital Projects", "Praxisartikel zu Stakeholder-Management in Digitalprojekten — auf KI direkt übertragbar."),
      cs("Betriebsrat & Digitalisierung: DGB-Leitfaden", "Orientierung für den Umgang mit Mitbestimmungsrechten bei KI-Projekten."),
    ],
  },

  "project-structure": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "OKR für KI-Projekte", summary: "Objectives & Key Results — wie setzt du messbare Ziele für KI-Projekte die oft noch keine klaren Metriken haben?" },
      { layer: 2, status: "coming-soon", title: "Sprint Planning für KI: Schätzung unter Unsicherheit", summary: "KI-Entwicklung ist weniger vorhersehbar als klassische Software. Wie planst und schätzt du trotzdem verlässlich?" },
      { layer: 3, status: "coming-soon", title: "SAFe für KI: Skalierung auf Programmebene", summary: "Scaled Agile Framework — wenn ein KI-Projekt mehrere Teams, mehrere Stakeholder, und mehrere Monate umfasst." },
      { layer: 3, status: "coming-soon", title: "Vendor Management für KI-Projekte", summary: "Wie wählst und managst du externe KI-Anbieter, Cloud-Partner, und Subunternehmer? SLAs, Exit-Strategien, IP-Rechte." },
    ],
    resources: [
      cs("Shape Up (Basecamp)", "Ein alternativer Ansatz zu Scrum für komplexe Projekte — interessant für KI-Projekte mit viel Unbekanntem."),
      cs("Measure What Matters (Doerr)", "Das OKR-Buch — wie Google und andere Unternehmen OKRs einsetzen."),
      cs("Project Management for AI (PMI)", "PMI-Leitfaden speziell für KI-Projektmanagement."),
    ],
  },

  "positioning": {
    upcomingTopics: [
      { layer: 2, status: "coming-soon", title: "Go-to-Market Strategie für KI-Beratung", summary: "Welche Kanäle, welche Botschaften, welche Zielgruppen — wie vermarktest du deine KI-Beratungsleistungen?" },
      { layer: 2, status: "coming-soon", title: "Nischen-Positionierung: Tiefer statt breiter", summary: "Warum 'KI für SAP-Kunden im Mittelstand mit SCM-Fokus' mächtiger ist als 'KI-Berater'." },
      { layer: 3, status: "coming-soon", title: "Thought Leadership: Sichtbarkeit aufbauen", summary: "LinkedIn, Fachvorträge, Fachartikel — wie du dich als Experte positionierst ohne dein Business dabei zu vernachlässigen." },
      { layer: 3, status: "coming-soon", title: "Partnership & Ecosystem Strategy", summary: "Kooperationen mit SAP-Partnern, Cloud-Anbietern, anderen Beratern — wie ein Netzwerk dein Geschäft multipliziert." },
      { layer: 4, status: "coming-soon", title: "Productizing Consulting: Vom Service zum Produkt", summary: "Wenn deine Beratungsleistung so standardisiert ist, dass du ein Produkt draus machen kannst — Frameworks, Templates, SaaS." },
    ],
    resources: [
      cs("Obviously Awesome (Appcues)", "Das Buch zu Positionierung von April Dunford — sehr gut anwendbar auf Beratungsleistungen."),
      cs("The Business of Expertise (Maister)", "Wie du dein Expertise-Geschäft aufbaust und skalierst."),
      cs("LinkedIn für Berater: Best Practices", "Wie du LinkedIn als Hauptkanal für Thought Leadership und Kundengewinnung nutzt."),
    ],
  },

};

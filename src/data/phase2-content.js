// ============================================================
// VOLLSTÄNDIGE LERNINHALTE - Phase 2: Technologie-Landschaft
// ============================================================

export const PHASE2_CONTENT = {

  "erp-as-datasource": {
    title: "ERP-Systeme als Datenquelle",
    layerLevel: 1,
    estimatedMinutes: 50,
    steps: [
      {
        title: "Das ERP als Datenschatz",
        content: `Jedes ERP-System — egal ob SAP, Navision, proALPHA oder Sage — ist eine **riesige Datenbank** mit jahrelang gesammelten Geschäftsdaten. Bestellungen, Lieferanten, Materialstämme, Qualitätsdaten, Produktionspläne — alles ist da.

Für KI-Lösungen ist das Gold wert: Statt Daten mühsam zu erheben, kannst du auf existierende, reale Geschäftsdaten zugreifen. Das Problem ist nicht der Datenmangel, sondern der **Datenzugang**.

ERPs sind wie Festungen: Die Daten sind gut geschützt, und es gibt nur bestimmte Tore (Schnittstellen) durch die man hereinkommt. Dein Job als Berater: Wissen welche Tore es gibt und welche für den Use Case die richtigen sind.`,
        analogy: `Das ERP ist wie ein riesiges Warenlager voller wertvoller Daten. Die Tür ist aber gesichert und hat verschiedene Schlösser. Du musst wissen, welcher Schlüssel zu welcher Tür passt — aber du musst die Tür nicht selbst bauen.`,
        consultingRelevance: `Dein Wettbewerbsvorteil: Du kennst SAP und andere ERPs von innen. Du weißt welche Tabellen wo liegen, welche Daten relevant sind und welche Qualitätsprobleme typisch sind. Ein reiner IT-Berater hat dieses Domänenwissen nicht.`
      },
      {
        title: "SAP-Schnittstellen — die wichtigsten Tore",
        content: `SAP hat über die Jahrzehnte verschiedene Schnittstellen entwickelt. Die wichtigsten:

**RFC/BAPI (klassisch):** Remote Function Call — der älteste Weg. Direkter Funktionsaufruf in SAP. Sehr stabil, aber technisch aufwändig. BAPIs (Business Application Programming Interfaces) sind standardisierte RFCs für Geschäftsprozesse: "Bestellung anlegen", "Material lesen", etc.

**OData (modern):** REST-basierte Schnittstelle. Funktioniert wie die APIs aus Modul 2 — URL, GET/POST, JSON. S/4HANA hat viele vorgefertigte OData-Services. Das ist der empfohlene Weg für neue Projekte.

**IDoc (Massendaten):** Intermediate Document — für den Austausch großer Datenmengen zwischen Systemen. Nicht für Einzelabfragen, sondern für Batch-Transfers: "Alle Bestellungen des letzten Monats".

**SAP BTP (Cloud-Brücke):** Die Business Technology Platform ist SAPs Cloud-Plattform. Sie dient als Vermittler zwischen dem On-Premise-SAP und Cloud-Diensten wie KI-APIs. Für Kunden mit S/4HANA Cloud ist BTP der Standard-Weg.

**CDS Views (Datenzugang):** Core Data Services — definieren welche Daten wie zusammengeführt werden. Wie vorgefertigte SQL-Abfragen in SAP. Viele OData-Services basieren auf CDS Views.`,
        analogy: `Die SAP-Schnittstellen sind wie verschiedene Zugänge zu einer Bank: RFC = der Tresor-Zugang (sicher, alt, braucht speziellen Schlüssel). OData = der Online-Banking-Zugang (modern, bequem, Standard). IDoc = der Geldtransporter (für große Mengen). BTP = die Banking-App (Cloud, mobil, flexibel).`,
        consultingRelevance: `Im Kundengespräch: "Haben Sie S/4HANA oder ECC?" bestimmt die Schnittstellen-Empfehlung. S/4HANA → OData. ECC → BAPI oder RFC mit OData-Wrapper. Cloud → BTP. Diese Einordnung dauert 5 Minuten und spart Wochen Fehlplanung.`
      },
      {
        title: "Nicht-SAP-Systeme — der Rest der Welt",
        content: `Viele Mittelständler nutzen kein SAP. Die wichtigsten Alternativen und ihre Zugangswege:

**Microsoft Dynamics (Navision/Business Central):** Gut dokumentierte REST-APIs. OData-basiert. Einfach anzubinden, besonders mit Azure als Middleware.

**proALPHA:** REST-API vorhanden, aber Dokumentation oft dünn. Häufig über ODBC/SQL-Direktzugriff auf die Datenbank.

**Sage, Infor, ABAS:** Variiert stark nach Version und Konfiguration. Oft: ODBC/SQL oder proprietäre APIs. Im Zweifelsfall Export als CSV/Excel und automatisierter Import.

**Der Fallback: Datenbank-Direktzugriff.** Wenn keine API verfügbar ist, kann man oft direkt auf die zugrundeliegende Datenbank zugreifen (PostgreSQL, MSSQL, Oracle). Das ist weniger elegant aber funktional. Vorsicht: Schreibzugriff auf die Produktiv-DB ist ein absolutes No-Go!

**Excel und SharePoint:** Unterschätze nicht die "Schatten-IT" — in vielen Unternehmen liegen kritische Geschäftsdaten in Excel-Tabellen und SharePoint-Dokumenten. Diese sind oft einfacher anzubinden als das ERP (SharePoint hat gute APIs, Excel kann per Papaparse oder SheetJS verarbeitet werden).`,
        analogy: `Wenn SAP die Autobahn ist (schnell, standardisiert, aber Mautpflicht), dann sind die anderen ERPs Bundesstraßen: Sie führen auch ans Ziel, aber jede hat ihre eigenen Eigenheiten, Baustellen und Geschwindigkeitsbegrenzungen.`,
        consultingRelevance: `Im Daten-Audit beim Kunden fragst du: "Wo liegen die Daten die wir brauchen?" Die Antwort ist fast nie "nur im ERP". Es gibt immer Excel-Listen, SharePoint-Ordner, E-Mail-Postfächer. Alle relevanten Datenquellen zu kartieren ist der erste und wichtigste Schritt.`
      },
      {
        title: "Stammdaten vs. Bewegungsdaten — was ist wertvoll?",
        content: `Nicht alle ERP-Daten sind gleich wertvoll für KI. Die Unterscheidung:

**Stammdaten** = beschreiben Objekte. Lieferanten, Materialien, Kunden, Arbeitspläne. Ändern sich selten, sind die Grundlage für alles.

**Bewegungsdaten** = beschreiben Vorgänge. Bestellungen, Wareneingänge, Rechnungen, Produktionsaufträge. Entstehen täglich in großen Mengen.

**Für KI-Projekte brauchst du meist beides:**
- Stammdaten für den Kontext: "Wer ist dieser Lieferant? Was kann er? Wo sitzt er?"
- Bewegungsdaten für die Analyse: "Wie oft hat er zu spät geliefert? Wie war die Qualität?"

**Datenqualität ist kritischer als Datenmenge.** 1.000 saubere Bestelldatensätze mit vollständigen Lieferantenzuordnungen sind wertvoller als 100.000 Datensätze mit fehlenden Feldern und Duplikaten.

**Typische Qualitätsprobleme im Mittelstand:**
- Lieferantenstamm nicht gepflegt (5 Einträge für denselben Lieferanten)
- Freitextfelder statt Kategorien (jeder schreibt "Werkzeug" anders)
- Historische Daten unvollständig (vor 3 Jahren ERP-Wechsel)
- Keine klare Datenverantwortlichkeit`,
        analogy: `Stammdaten sind wie das Telefonbuch: Namen, Adressen, Zuständigkeiten. Ändern sich selten, sind aber die Grundlage für jede Kommunikation. Bewegungsdaten sind wie das Gesprächsprotokoll: Wer hat wann mit wem worüber gesprochen. Beides zusammen ergibt das vollständige Bild.`,
        consultingRelevance: `Der Datenqualitäts-Check ist oft der ernüchterndste Moment im Projekt — und gleichzeitig der wertvollste. Wenn du dem Kunden zeigst, dass er 5 verschiedene Einträge für denselben Lieferanten hat, ist das ein Quick Win: Stammdatenbereinigung bringt Nutzen weit über das KI-Projekt hinaus.`
      },
      {
        title: "Das Daten-Audit — dein erster Schritt beim Kunden",
        content: `Bevor du über KI redest, machst du ein **Daten-Audit**. Das beantwortet fünf Fragen:

**1. Was gibt es?** Welche Datenquellen existieren? ERP, Excel, SharePoint, E-Mail, CRM?

**2. Wo liegt es?** Auf welchen Systemen, in welchen Tabellen, in welchem Format?

**3. Wie kommt man ran?** API vorhanden? Datenbank-Zugang? Nur manueller Export?

**4. Wie ist die Qualität?** Vollständigkeit, Konsistenz, Aktualität, Duplikate?

**5. Wer ist verantwortlich?** Datenverantwortliche (Data Owner) für jede Quelle identifizieren.

**Ergebnis:** Eine Datenlandkarte — ein Dokument das zeigt, welche Daten wo liegen, wie man rankommt, und wie gut sie sind. Das ist die Grundlage für jede KI-Architektur-Entscheidung.

**Typischer Aufwand:** 1-2 Tage Interviews + Systemzugang + Datenanalyse. Liefert oft schon eigenständigen Mehrwert — viele Kunden haben diese Übersicht selbst nicht.`,
        analogy: `Wie ein Arzt, der vor der Behandlung erst eine Blutuntersuchung macht: Nicht um zu verzögern, sondern um die richtige Therapie zu finden. Das Daten-Audit ist dein "Blutbild" — es zeigt den Zustand des Patienten und bestimmt die Behandlung.`,
        consultingRelevance: `Das Daten-Audit ist ein perfektes Einstiegsangebot: 1-2 Tage Aufwand, sofortiger Nutzen für den Kunden (Überblick über die eigene Datenlandschaft), und für dich die Grundlage für ein konkretes KI-Projektangebot. Es ist ein "Fuß in die Tür"-Produkt.`
      }
    ],
    gfSummary: `"Ihre ERP-Daten sind der Schlüssel für jede KI-Lösung. Wir beginnen mit einem Daten-Audit: Welche Daten haben Sie, wo liegen sie, wie kommen wir ran, und wie gut sind sie? Das dauert 1-2 Tage und liefert Ihnen eine Datenlandkarte, die weit über das KI-Projekt hinaus wertvoll ist."`
  },

  "databases": {
    title: "Datenbanken verstehen",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Drei Typen für drei Aufgaben",
        content: `In der KI-Welt begegnen dir drei Datenbank-Typen, und jeder hat seinen Platz:

**SQL-Datenbanken (PostgreSQL, MySQL, MSSQL):** Die Arbeitstiere. Speichern strukturierte Daten in Tabellen mit festen Spalten. Perfekt für Geschäftsdaten — Bestellungen, Kunden, Fortschritt. Dein Supabase nutzt PostgreSQL.

**NoSQL-Datenbanken (MongoDB, DynamoDB):** Für flexible, unstrukturierte Daten. Jeder Datensatz kann anders aussehen. Gut für Logs, Chat-Verläufe, oder Daten deren Struktur sich häufig ändert.

**Vektor-Datenbanken (Pinecone, Weaviate, Chroma, pgvector):** Speziell für KI und RAG. Speichern Embeddings (Zahlendarstellungen von Text) und finden ähnliche Inhalte per Vektorsuche.

**Die typische KI-Architektur nutzt zwei davon:** PostgreSQL für Geschäftsdaten und Nutzer-Management + Vektor-DB für die Wissenssuche. Mit pgvector (einer PostgreSQL-Extension) kannst du sogar beides in einer Datenbank haben — das vereinfacht die Architektur erheblich.`,
        analogy: `SQL = ein perfekt organisierter Aktenschrank mit festen Fächern. Alles hat seinen Platz, du findest sofort was du suchst. NoSQL = flexible Mappen, in die du alles werfen kannst — schnell befüllt, aber weniger geordnet. Vektor-DB = ein Bibliothekar, der Bücher nach inhaltlicher Ähnlichkeit gruppiert statt nach Alphabet.`,
        consultingRelevance: `Die Datenbank-Empfehlung gehört in jeden Architektur-Entwurf. Für die meisten Mittelstands-Projekte: Supabase (PostgreSQL + pgvector) als All-in-One-Lösung. Nur bei sehr großen Datenmengen (>1 Mio Dokumente) lohnt eine separate Vektor-DB wie Pinecone.`
      },
      {
        title: "SQL — die Sprache der Daten",
        content: `SQL (Structured Query Language) ist die Sprache, mit der du mit relationalen Datenbanken sprichst. Du hast sie bereits benutzt — im Supabase SQL Editor, als du die Tabellen angelegt hast.

Die wichtigsten Befehle:

**SELECT** = Daten lesen: "Zeig mir alle Module die den Status 'done' haben."
**INSERT** = Daten einfügen: "Füge eine neue Notiz für Modul 3 ein."
**UPDATE** = Daten ändern: "Setze den Status von Modul 1 auf 'done'."
**DELETE** = Daten löschen: "Lösche die Notiz von Modul 5."

**Tabellen** haben Spalten (definieren die Struktur) und Zeilen (enthalten die Daten). Wie eine Excel-Tabelle, aber mit strikten Regeln: Jede Spalte hat einen festen Datentyp (Text, Zahl, Datum).

**Relationen** verbinden Tabellen untereinander: Die Tabelle "module_progress" hat ein Feld "module_id" das auf ein Modul verweist. So werden Zusammenhänge abgebildet — ein Modul kann mehrere Notizen haben, ein Nutzer kann viele Fortschritte haben.

Du musst kein SQL-Experte werden — Supabase und andere Tools abstrahieren vieles. Aber die Grundlogik zu verstehen hilft enorm beim Architektur-Design.`,
        analogy: `SQL ist wie eine sehr präzise Frage an ein Archiv: "Gib mir alle Akten (SELECT) aus dem Ordner 'Bestellungen' (FROM) die nach dem 1. Januar erstellt wurden (WHERE) und sortiere sie nach Datum (ORDER BY)." Die Sprache ist logisch und fast wie normales Englisch aufgebaut.`,
        consultingRelevance: `Wenn du beim Kunden am Whiteboard eine Lösung skizzierst, hilft SQL-Grundwissen um schnell zu erklären, welche Daten wie verknüpft werden. "Wir joinen die Bestelltabelle mit dem Lieferantenstamm" — das versteht der IT-Leiter sofort.`
      },
      {
        title: "Vektor-Suche — das Herzstück von RAG",
        content: `Die Vektor-Suche ist der Mechanismus, der RAG möglich macht. So funktioniert sie:

**1. Dokument vorbereiten:** Ein Dokument wird in Abschnitte (Chunks) zerlegt, typisch 500-1000 Token pro Chunk.

**2. Embedding erzeugen:** Jeder Chunk wird durch ein Embedding-Modell geschickt und in einen Vektor umgewandelt — eine lange Zahlenreihe (z.B. 1536 Zahlen), die den Inhalt mathematisch repräsentiert.

**3. Speichern:** Die Vektoren werden in der Vektor-DB gespeichert.

**4. Suchen:** Wenn eine Frage kommt, wird auch die Frage in einen Vektor umgewandelt. Die DB findet die Chunks, deren Vektoren am ähnlichsten sind (geometrische Nähe im hochdimensionalen Raum).

**Warum ist das besser als Textsuche?** Textsuche findet nur exakte Wort-Übereinstimmungen. Vektor-Suche findet inhaltliche Ähnlichkeit: "Lieferverzögerung" findet auch Dokumente die "verspätete Zustellung" oder "Terminüberschreitung" enthalten.

**Cosine Similarity** ist das gängige Ähnlichkeitsmaß: Zwei Vektoren die in die gleiche Richtung zeigen (ähnlicher Inhalt) haben eine hohe Cosine Similarity (nahe 1.0), unähnliche Vektoren eine niedrige (nahe 0).`,
        analogy: `Stell dir eine Landkarte vor, auf der jeder Text als Punkt markiert ist. Ähnliche Texte liegen nah beieinander, verschiedene weit auseinander. Wenn du eine Frage stellst, wird auch sie als Punkt auf die Karte gesetzt — und die Vektor-DB zeigt dir die nächsten Nachbar-Punkte. Das sind die relevantesten Dokumente.`,
        consultingRelevance: `Du musst die Mathematik nicht verstehen — aber das Konzept. Wenn ein Kunde fragt "Warum findet die KI manchmal das Falsche?", ist die Antwort oft: Die Chunks sind zu groß (zu viel Kontext in einem Vektor) oder zu klein (zu wenig Kontext). Die Chunking-Strategie ist der häufigste Hebel für bessere Ergebnisse.`
      },
      {
        title: "Supabase als All-in-One-Lösung",
        content: `Supabase ist für deine Projekte die ideale Plattform, weil es mehrere Dinge kombiniert:

**PostgreSQL-Datenbank:** Vollwertige SQL-Datenbank für strukturierte Daten. Dein LearningHub speichert Fortschritt und Notizen hier.

**pgvector Extension:** Vektor-Suche direkt in PostgreSQL — keine separate Vektor-DB nötig. Perfekt für RAG-Projekte mit bis zu einigen hunderttausend Dokumenten.

**Authentication:** Nutzer-Verwaltung out-of-the-box. Login, Registrierung, Passwort-Reset.

**Storage:** Datei-Speicher für Dokumente, Bilder, PDFs.

**Edge Functions:** Serverless Backend-Logik. Hier kann deine RAG-Pipeline laufen.

**REST API:** Automatisch generierte API für jede Tabelle. Du hast gesehen wie dein LearningHub darüber Daten liest und schreibt.

**Realtime:** Echtzeit-Updates — wenn du auf dem Mac eine Notiz schreibst, erscheint sie auf dem iPhone. Das nutzen wir für deinen LearningHub.

**Für den Mittelstand:** Supabase ist die "Eierlegende Wollmilchsau" für Prototypen und mittelgroße Anwendungen. Für Enterprise-Scale (tausende gleichzeitige Nutzer) brauchst du eventuell dedizierte Dienste.`,
        analogy: `Supabase ist wie ein All-Inclusive-Hotel: Zimmer (Datenbank), Restaurant (API), Concierge (Auth), Spa (Realtime), Konferenzraum (Edge Functions) — alles unter einem Dach. Du musst nicht fünf verschiedene Anbieter koordinieren.`,
        consultingRelevance: `Für Kunden-PoCs ist Supabase ideal: Schnell aufgesetzt, EU-Hosting verfügbar, kostenloser Einstieg. Du kannst in einem Tag einen funktionierenden Prototyp bauen. Wenn das Projekt wächst, kann man einzelne Komponenten durch Enterprise-Lösungen ersetzen.`
      }
    ],
    gfSummary: `"Datenbanken speichern Ihre Geschäftsdaten dauerhaft und sicher. Für KI-Projekte brauchen wir zusätzlich eine spezielle Suche, die inhaltliche Ähnlichkeit erkennt — nicht nur exakte Wörter. Moderne Plattformen wie Supabase bieten beides in einem, inklusive Nutzerverwaltung und EU-Hosting. Das hält die Architektur einfach und die Kosten niedrig."`
  },

  "rag-architecture": {
    title: "RAG-Architektur im Detail",
    layerLevel: 1,
    estimatedMinutes: 50,
    steps: [
      {
        title: "RAG — das Herzstück jeder Enterprise-KI",
        content: `RAG (Retrieval Augmented Generation) ist der Ansatz, der KI für Unternehmen erst wirklich nutzbar macht. Ohne RAG kann die KI nur auf ihr Trainingswissen zurückgreifen — sie kennt deine Firmendokumente nicht.

**Das Problem:** Ein Mittelständler hat 5.000 technische Handbücher, 10.000 Lieferantenverträge und 3 Jahre Qualitätsmeldungen. Claude hat die nie gesehen. Wenn du fragst "Welche Reklamationen gab es bei Lieferant X?", muss Claude raten — und halluziniert.

**Die Lösung — RAG:** Vor jeder Antwort sucht das System die relevanten Dokumente heraus und gibt sie der KI mit. Claude antwortet dann nicht aus dem Bauchgefühl, sondern basierend auf deinen echten Daten.

**Der komplette RAG-Ablauf:**
1. **Ingestion** (einmalig): Dokumente aufbereiten und in der Vektor-DB speichern
2. **Retrieval** (bei jeder Anfrage): Relevante Dokumente zur Frage finden
3. **Generation** (bei jeder Anfrage): LLM antwortet basierend auf den gefundenen Dokumenten`,
        analogy: `RAG ist wie ein Berater, der vor jedem Meeting erst die relevanten Akten durchgeht: Er weiß nicht alles auswendig (das wäre Fine-Tuning), aber er kann blitzschnell die richtigen Dokumente finden und dann kompetent antworten. Die Akten werden jeden Tag aktualisiert — das Wissen ist immer aktuell.`,
        consultingRelevance: `Wenn ein Kunde "KI für unsere Dokumente" sagt, meint er RAG. Das ist dein Standard-Lösungsansatz für 90% der Anfragen. Die Frage ist nicht ob RAG, sondern wie: Welche Dokumente, welche Chunk-Größe, welches Embedding-Modell, welche Vektor-DB.`
      },
      {
        title: "Ingestion Pipeline — Dokumente aufbereiten",
        content: `Die Ingestion Pipeline macht Dokumente für die KI durchsuchbar. Vier Schritte:

**1. Laden:** Dokumente aus allen Quellen zusammenführen. PDFs, Word-Dateien, E-Mails, Webseiten. Jede Quelle braucht einen eigenen Loader (PDF-Parser, DOCX-Parser, etc.).

**2. Chunking:** Dokumente in Abschnitte zerlegen. Die wichtigste Entscheidung in der ganzen Pipeline!
- **Zu groß** (5000 Token): Zu viel irrelevanter Kontext in jedem Chunk → schlechte Ergebnisse.
- **Zu klein** (100 Token): Kontext geht verloren, einzelne Sätze ohne Zusammenhang.
- **Sweet Spot:** 500-1000 Token mit 100-200 Token Overlap (Überlappung), damit Zusammenhänge an Chunk-Grenzen nicht verloren gehen.

**3. Embedding:** Jeder Chunk wird durch ein Embedding-Modell geschickt und in einen Vektor umgewandelt. Populäre Modelle: OpenAI text-embedding-3-small, Voyage AI, Cohere.

**4. Speichern:** Vektoren + Original-Text werden in der Vektor-DB gespeichert. Der Original-Text ist wichtig, damit die KI den tatsächlichen Inhalt lesen kann — nicht nur den Vektor.

**Metadaten mitgeben:** Zu jedem Chunk gehören Metadaten — Quelldokument, Datum, Abteilung, Dokumententyp. Damit kann man die Suche filtern: "Nur in Qualitätsmeldungen aus 2024 suchen."`,
        analogy: `Wie ein Bibliothekar, der neue Bücher aufnimmt: Buch entgegennehmen (Laden), in Kapitel zerlegen (Chunking), jedes Kapitel mit einer inhaltlichen Signatur versehen (Embedding), und im Regal einsortieren (Speichern). Die Signatur ermöglicht später das schnelle Finden ähnlicher Kapitel.`,
        consultingRelevance: `Chunking-Strategie ist der häufigste Hebel für die Qualität der RAG-Lösung. Im PoC testest du verschiedene Chunk-Größen mit echten Kundendaten und misst die Ergebnis-Qualität. Das ist kein Hokuspokus, sondern systematisches Testen.`
      },
      {
        title: "Retrieval — die richtigen Dokumente finden",
        content: `Wenn ein Nutzer eine Frage stellt, muss das System die relevantesten Chunks finden. Es gibt mehrere Strategien:

**Vektor-Suche (Semantic Search):** Die Frage wird eingebettet (in einen Vektor umgewandelt) und die ähnlichsten Chunks werden gesucht. Findet inhaltliche Ähnlichkeit, auch wenn andere Wörter verwendet werden.

**Keyword-Suche (BM25):** Klassische Textsuche nach übereinstimmenden Wörtern. Gut für exakte Begriffe, Produktnummern, Namen.

**Hybrid Search:** Kombination aus beiden — und fast immer die beste Option. Vektor-Suche für inhaltliches Verständnis + Keyword-Suche für exakte Treffer. Die Ergebnisse werden zusammengeführt und neu gewichtet.

**Top-K:** Wie viele Chunks werden zurückgegeben? Typisch 3-10. Zu wenige = wichtiger Kontext fehlt. Zu viele = irrelevanter Ballast, der die KI verwirrt und Token kostet.

**Re-Ranking:** Nach der initialen Suche können die Ergebnisse nochmal durch ein spezialisiertes Modell sortiert werden, das die Relevanz genauer einschätzt. Verbessert die Qualität, kostet aber zusätzliche API-Calls.`,
        analogy: `Wie die Suche in einer Bibliothek: Vektor-Suche = den Bibliothekar fragen "Ich suche was zum Thema Lieferkettenprobleme" (inhaltlich). Keyword-Suche = im Katalog nach dem exakten Titel suchen. Hybrid = beides kombinieren. Re-Ranking = aus den 20 Ergebnissen die 5 wirklich relevantesten auswählen.`,
        consultingRelevance: `Empfehle immer Hybrid Search: Die Kombination deckt beide Fälle ab — der Mitarbeiter der "Lieferverzögerung" eingibt UND der der die exakte Bestellnummer sucht. Supabase pgvector unterstützt beides.`
      },
      {
        title: "Generation — die KI-Antwort erzeugen",
        content: `Die gefundenen Chunks werden zusammen mit der Frage an das LLM geschickt. Der Prompt sieht typisch so aus:

**System Prompt:** "Du bist ein Assistent für [Unternehmen]. Beantworte die Frage ausschließlich basierend auf den bereitgestellten Dokumenten. Wenn die Dokumente keine Antwort enthalten, sage 'Diese Information liegt mir nicht vor.' Gib immer die Quelle an."

**Nutzer-Nachricht:**
"Basierend auf folgenden Dokumenten:
[Chunk 1: Qualitätsbericht Lieferant Müller, 2024-03...]
[Chunk 2: Wareneingangsprüfung Müller, 2024-05...]
[Chunk 3: Reklamation #4521, Lieferant Müller...]

Frage: Welche Qualitätsprobleme gab es mit Lieferant Müller?"

**Wichtige Design-Entscheidungen:**
- **Quellenangabe:** Die KI soll angeben, aus welchem Chunk die Info stammt. Das ermöglicht Verifizierung.
- **Confidence Framing:** "Basierend auf den vorliegenden Dokumenten..." statt absoluter Aussagen.
- **Fallback:** Was passiert, wenn keine relevanten Chunks gefunden werden? Die KI muss das kommunizieren statt zu halluzinieren.`,
        analogy: `Wie ein Gutachter, der einen Bericht schreibt: Er bekommt die Akten (Chunks), liest sie durch (verarbeitet den Kontext), und schreibt ein Gutachten (generiert die Antwort) — immer mit Verweis auf die Fundstellen (Quellenangabe). Er fügt nichts hinzu, was nicht in den Akten steht.`,
        consultingRelevance: `Die Qualität der Antwort hängt zu 50% vom Retrieval (richtige Chunks) und zu 50% vom Prompt Engineering (richtige Anweisung an die KI) ab. Beides kannst du optimieren ohne Code zu schreiben — es ist Konfiguration und Formulierung, nicht Programmierung.`
      },
      {
        title: "Evaluierung — Qualität messen und verbessern",
        content: `Eine RAG-Lösung ist nur so gut wie ihre Ergebnisse. Du brauchst eine systematische Evaluierung:

**Retrieval-Qualität messen:** Findet das System die richtigen Dokumente?
- Erstelle einen Testdatensatz: 50 Fragen mit den jeweils "richtigen" Dokumenten.
- Miss: In wie vielen Fällen ist das richtige Dokument unter den Top-5-Ergebnissen? (Recall@5)
- Ziel: >85% ist gut, >95% ist exzellent.

**Generation-Qualität messen:** Ist die Antwort korrekt und nützlich?
- **Faithfulness:** Steht die Antwort wirklich in den Chunks? Keine Halluzination?
- **Relevance:** Beantwortet die Antwort die Frage?
- **Completeness:** Fehlen wichtige Informationen?

**Die häufigsten Optimierungshebel:**
1. **Chunking-Strategie anpassen** — andere Größe, anderer Overlap
2. **Embedding-Modell wechseln** — manche sind besser für Deutsch
3. **Hybrid Search aktivieren** — Vektor + Keyword kombinieren
4. **Prompt Engineering** — klarere Anweisungen an die KI
5. **Metadaten-Filter** — Suche auf relevante Dokumententypen einschränken

Das ist ein iterativer Prozess: Messen → Hypothese aufstellen → Änderung machen → erneut messen. Typisch 3-5 Iterationen bis die Qualität stimmt.`,
        analogy: `Wie die Qualitätssicherung in der Produktion: Du definierst den Standard (>85% korrekte Antworten), misst die Ist-Qualität, identifizierst die häufigsten Fehlerquellen, und optimierst Schritt für Schritt. Es ist kein einmaliges Setup, sondern ein kontinuierlicher Verbesserungsprozess.`,
        consultingRelevance: `Dem Kunden klarmachen: RAG ist kein "plug and play". Es braucht Feintuning und iterative Verbesserung. Ein PoC zeigt in 1-2 Wochen, ob der Ansatz grundsätzlich funktioniert. Die Optimierung auf Produktionsqualität dauert nochmal 2-4 Wochen. Das muss im Projektplan stehen.`
      }
    ],
    gfSummary: `"RAG ist das Verfahren, mit dem KI auf Ihre Unternehmensdaten zugreift: Ihre Dokumente werden durchsuchbar gemacht, und bei jeder Frage sucht das System erst die relevanten Informationen heraus, bevor die KI antwortet. Das Ergebnis: Verlässliche Antworten mit Quellenangabe, basierend auf Ihren echten Daten. Wir können in 1-2 Wochen einen funktionierenden Prototyp mit Ihren Dokumenten bauen."`
  },

  "tools-infra": {
    title: "Tools & Infrastruktur",
    layerLevel: 1,
    estimatedMinutes: 35,
    steps: [
      {
        title: "Dein Werkzeugkasten — Überblick",
        content: `Du hast beim LearningHub-Setup bereits alle wichtigen Werkzeuge benutzt. Hier ist die Einordnung:

**Cursor** = Dein Haupteditor. Im Kern VS Code (der weltweit beliebteste Code-Editor) mit eingebauter KI. Du öffnest hier dein Projekt, siehst alle Dateien, und bearbeitest Code. Die KI in Cursor wird von Claude oder anderen Modellen angetrieben und versteht deinen gesamten Projektkontext.

**Claude Code** = KI im Terminal. Du gibst einen Auftrag in natürlicher Sprache, Claude Code setzt ihn um — erstellt Dateien, schreibt Code, führt Befehle aus. Perfekt für schnelle Prototypen und Automatisierungen.

**Terminal (iTerm2)** = Die Kommandozeile. Hier gibst du direkte Befehle ein: \`npm install\`, \`git push\`, \`vercel\`. Wie die Textnachricht direkt an den Computer — ohne grafische Oberfläche dazwischen.

**GitHub** = Dein Code-Tresor. Versionskontrolle (jede Änderung wird gespeichert, du kannst jederzeit zurückspringen) + Zusammenarbeit + automatisches Deployment zu Vercel.

**npm** = Der Paketmanager. Holt Code-Bausteine (Libraries/Dependencies) aus dem Internet und verwaltet sie. Wie ein App Store für Code-Bausteine.`,
        analogy: `Stell dir eine Werkstatt vor: Cursor ist die intelligente Werkbank (wo du arbeitest, mit KI-Assistent der dir zuschaut und hilft). Terminal ist die Kommandozeile an der CNC-Maschine (direkte Befehle). GitHub ist der Tresor (alle Versionen sicher aufbewahrt). npm ist das Ersatzteillager (Bausteine auf Abruf).`,
        consultingRelevance: `Du musst nicht in all diesen Tools Experte sein. Aber du musst verstehen, wann welches Tool das richtige ist — und du musst einem Entwickler-Team erklären können, was du brauchst. Das ist Architektur-Kompetenz, nicht Programmier-Kompetenz.`
      },
      {
        title: "Git und GitHub — Versionskontrolle verstehen",
        content: `Git ist das wichtigste Werkzeug in der Softwareentwicklung. Du hast es bereits benutzt:

**git init** = "Starte die Versionskontrolle für diesen Ordner."
**git add .** = "Merke dir alle aktuellen Änderungen."
**git commit** = "Mach ein Foto vom aktuellen Zustand." Wie ein Snapshot.
**git push** = "Schieb alles nach GitHub hoch."
**git pull** = "Hol die neuesten Änderungen von GitHub."

**Warum ist das wichtig?**
1. **Rückgängig machen:** Jeder Commit ist ein Speicherpunkt. Etwas kaputt? Zurück zum letzten funktionierenden Zustand.
2. **Nachvollziehbarkeit:** Wer hat wann was geändert? Lückenlos dokumentiert.
3. **Zusammenarbeit:** Mehrere Entwickler können gleichzeitig am gleichen Projekt arbeiten.
4. **Deployment:** Git push → Vercel deployed automatisch. Kein manuelles Hochladen nötig.

**Branches** sind wie parallele Arbeitsstränge: Du arbeitest an einem neuen Feature in einem separaten Branch, ohne die funktionierende Version zu gefährden. Wenn alles passt, führst du die Branches zusammen (Merge).`,
        analogy: `Git ist wie "Änderungen nachverfolgen" in Word — nur viel mächtiger. Stell dir vor, du könntest zu jedem beliebigen Zwischenstand deines Dokuments zurückkehren, mehrere Versionen parallel bearbeiten, und am Ende die besten Teile zusammenführen. Das ist Git.`,
        consultingRelevance: `Wenn du ein KI-Projekt beim Kunden steuerst, ist Git-basiertes Deployment Standard. Du musst die Befehle nicht selbst tippen, aber du musst verstehen: Code wird in Git verwaltet, Änderungen werden über Pull Requests reviewed, und Deployment passiert automatisch. Das gehört in deinen Projektplan.`
      },
      {
        title: "npm und Dependencies — das Baukastenprinzip",
        content: `Moderne Software wird nicht von Grund auf gebaut. Sie besteht aus **tausenden wiederverwendbaren Bausteinen** (Libraries/Packages), die andere Entwickler geschrieben und veröffentlicht haben.

**npm** (Node Package Manager) verwaltet diese Bausteine für JavaScript-Projekte:

**package.json** = Die Einkaufsliste. Hier steht welche Pakete in welcher Version gebraucht werden.
**node_modules/** = Das Regal. Hier liegen die heruntergeladenen Pakete. Dieser Ordner kann riesig sein (hunderte MB) — deshalb wird er nie in Git eingecheckt.
**package-lock.json** = Das Bestellprotokoll. Dokumentiert die exakte Version jedes Pakets für Reproduzierbarkeit.

**npm install** = "Kauf alles von der Einkaufsliste." Liest package.json, holt die Pakete aus dem Internet (npmjs.com), legt sie in node_modules ab.

**npm run dev** = "Starte die Anwendung im Entwicklungsmodus." Startet den lokalen Server.

Für dein LearningHub: React (UI-Framework), Supabase-JS (Datenbankverbindung), React Router (Navigation), Vite-Plugin-PWA (installierbare App) — vier Bausteine, die zusammen eine komplette App ermöglichen.`,
        analogy: `npm ist wie ein IKEA-Teilelager: Du brauchst ein Regal? Statt Holz zu sägen, kaufst du ein Billy (React), dazu passende Einlegeböden (Supabase-JS), Türen (Router) und LED-Beleuchtung (PWA). Alles zusammenstecken = fertige App. Ohne diese Bausteine müsstest du alles selbst schreinern.`,
        consultingRelevance: `Für Kunden-Projekte: Die Wahl der Libraries bestimmt Wartbarkeit und Sicherheit. Populäre, gut gepflegte Pakete wählen (viele Downloads, regelmäßige Updates). Exotische Pakete vermeiden — wenn der Entwickler aufhört, stirbt die Wartung.`
      },
      {
        title: "Der Development Workflow — dein täglicher Ablauf",
        content: `Du hast den kompletten Entwicklungs-Workflow einmal durchgespielt. Hier ist er systematisch:

**1. Lokal entwickeln:**
- Cursor öffnen, Projekt laden
- \`npm run dev\` im Terminal → App läuft auf localhost:5173
- Änderungen machen → Browser aktualisiert sich automatisch (Hot Reload)

**2. Testen:**
- Im Browser prüfen ob alles funktioniert
- Auf verschiedenen Geräten testen (Desktop, Tablet, Mobile)

**3. Versionieren:**
- \`git add .\` → Änderungen merken
- \`git commit -m "Beschreibung"\` → Snapshot erstellen
- Commit-Messages sollten beschreiben WAS geändert wurde

**4. Deployen:**
- \`git push\` → Code geht zu GitHub
- Vercel bemerkt den Push → baut die App → stellt sie online
- In 1-2 Minuten ist die neue Version live

**5. Überwachen:**
- Vercel Dashboard zeigt Deployment-Status und Fehler
- Browser Console (F12) zeigt Client-seitige Fehler

Dieser Kreislauf — entwickeln, testen, deployen — wiederholt sich bei jeder Änderung. Mit der Zeit wird er zur Routine, wie Autofahren.`,
        analogy: `Wie ein Koch der ein neues Gericht entwickelt: In der Testküche ausprobieren (lokal entwickeln), kosten (testen), das Rezept aufschreiben (committen), auf die Speisekarte setzen (deployen). Und dann beobachten ob es den Gästen schmeckt (überwachen).`,
        consultingRelevance: `Diesen Workflow zu kennen hilft dir, realistische Zeitschätzungen zu machen. "Ein neues Feature" ist nicht nur Code schreiben — es ist Entwicklung + Test + Review + Deployment. Das verdoppelt typischerweise die reine Coding-Zeit.`
      }
    ],
    gfSummary: `"Die Entwicklungswerkzeuge von heute ermöglichen es, in Tagen zu bauen, wofür früher Monate nötig waren. Code-Editoren mit eingebauter KI, automatisches Deployment und fertige Bausteine beschleunigen die Entwicklung enorm. Für einen Prototypen brauchen wir keine IT-Abteilung — einen Tag Setup und wir können loslegen."`
  },

  "integration-layer": {
    title: "Integration: APIs, Webhooks, Make.com/n8n",
    layerLevel: 1,
    estimatedMinutes: 40,
    steps: [
      {
        title: "Integration — der Kleber zwischen Systemen",
        content: `Die meisten KI-Projekte scheitern nicht an der KI selbst, sondern an der **Integration** — der Verbindung zwischen bestehenden Systemen und der neuen KI-Lösung.

Ein typischer Mittelständler hat: SAP (oder anderes ERP), Outlook (E-Mail), SharePoint (Dokumente), vielleicht ein CRM, dazu Excel-Tabellen und Spezialsoftware. Die KI muss mit all diesen Systemen sprechen können.

**Drei Integrations-Ansätze:**

**1. Direkte API-Integration:** Code der direkt die API des Zielsystems aufruft. Am flexibelsten, braucht aber Entwickler.

**2. No-Code-Plattformen (Make.com, n8n):** Visuelle Workflow-Builder die Systeme verbinden. Kein Code nötig, schnell aufgesetzt, aber weniger flexibel bei komplexen Logiken.

**3. Middleware/iPaaS:** Enterprise-Integrationsplattformen (MuleSoft, Dell Boomi). Für große Unternehmen mit vielen Systemen. Overkill für die meisten Mittelständler.

**Für den Mittelstand ist No-Code meistens der Sweet Spot:** Schnell, günstig, und für 80% der Integrationsanforderungen ausreichend.`,
        analogy: `Integration ist wie ein Logistik-Hub: Pakete (Daten) kommen von verschiedenen Lieferanten (Systemen) an, werden sortiert, umgepackt und an die richtigen Empfänger weitergeleitet. Make.com/n8n sind solche Logistik-Hubs — sie routen Daten zwischen Systemen, ohne dass die Systeme direkt miteinander sprechen müssen.`,
        consultingRelevance: `"Wie verbinden wir das mit unserem SAP?" — diese Frage kommt in jedem Kundengespräch. Die Integrations-Strategie ist oft der komplexeste und teuerste Teil des Projekts. Hier liegt 70% deines Beratungswerts: Du kennst die Prozesse, die Systeme und die Datenflüsse.`
      },
      {
        title: "Make.com — No-Code Automation für den Mittelstand",
        content: `Make.com (ehemals Integromat) ist eine visuelle Automatisierungsplattform. Du baust Workflows durch Drag-and-Drop von Modulen.

**Kernkonzepte:**
- **Scenario** = Ein Workflow. Wird durch einen Trigger gestartet.
- **Module** = Ein Schritt. Jedes Modul verbindet sich mit einem System (Gmail, SAP, Claude API, etc.).
- **Route** = Verzweigung. "Wenn Kategorie = Reklamation → diesen Weg, sonst → anderen Weg."
- **Filter** = Bedingung. "Nur weitermachen wenn der Betrag über 1000€ liegt."

**Typischer KI-Workflow in Make.com:**
1. Trigger: Neue E-Mail in Outlook
2. Modul: E-Mail-Text extrahieren
3. Modul: An Claude API senden (HTTP-Modul mit POST-Request)
4. Modul: JSON-Antwort parsen
5. Route: Je nach Klassifizierung verschiedene Aktionen
6. Modul: In Datenbank speichern / E-Mail-Draft erstellen / Ticket anlegen

Du hast das Pattern bereits umgesetzt — dein Projektmatcher-Blueprint folgt genau dieser Logik.`,
        analogy: `Make.com ist wie ein visueller Rezeptbaukasten: Du siehst jeden Schritt als Kästchen, verbindest sie mit Pfeilen, und das System führt das Rezept automatisch aus. Kein Code, aber die volle Kontrolle über den Ablauf.`,
        consultingRelevance: `Make.com ist dein Go-to-Tool für schnelle Integrationen beim Kunden. In einem Tag kannst du einen funktionierenden Workflow bauen, der E-Mails klassifiziert, Dokumente analysiert oder Daten zwischen Systemen synchronisiert. Das beeindruckt und schafft sofort Mehrwert.`
      },
      {
        title: "n8n — die Open-Source-Alternative",
        content: `n8n ist das Open-Source-Pendant zu Make.com. Gleiche Grundidee (visueller Workflow-Builder), aber mit wichtigen Unterschieden:

**Vorteile gegenüber Make.com:**
- **Selbst hostbar:** Du kannst n8n auf dem Server des Kunden installieren. Keine Daten verlassen das Unternehmen — perfekt für DSGVO-sensible Szenarien.
- **Keine Workflow-Limits:** Make.com begrenzt die Anzahl der Operationen im Free-/Basis-Plan. n8n nicht.
- **Code-Nodes:** Wenn der visuelle Builder nicht reicht, kannst du JavaScript oder Python inline schreiben.
- **MCP-Integration:** n8n hat einen MCP-Server — du kannst n8n-Workflows als Tools für KI-Agents bereitstellen.

**Nachteile:**
- **Setup-Aufwand:** Muss installiert und gewartet werden (Docker/Cloud).
- **Weniger Templates:** Make.com hat mehr vorgefertigte Integrationen.
- **Steile Lernkurve:** Etwas technischer als Make.com.

**Empfehlung:** Starte mit Make.com für schnelle PoCs. Wechsel zu n8n wenn DSGVO-Anforderungen Self-Hosting erfordern oder wenn die Workflow-Komplexität steigt.`,
        analogy: `Make.com ist wie ein Mietwagen (schnell loslegen, Anbieter kümmert sich um Wartung, monatliche Kosten). n8n ist wie ein eigenes Auto (einmalige Investition, volle Kontrolle, selbst tanken und TÜV). Für kurze Strecken ist der Mietwagen besser, für tägliches Pendeln das eigene Auto.`,
        consultingRelevance: `Die Empfehlung Make.com vs. n8n ist eine häufige Beratungsfrage: Kleiner Mittelständler ohne IT-Abteilung → Make.com. Größerer Mittelständler mit DSGVO-Bedenken und IT-Team → n8n. Hybrid ist auch möglich: Make.com für einfache Workflows, n8n für datensensitive.`
      },
      {
        title: "Webhooks und Event-Driven Architecture",
        content: `Webhooks sind das Nervensystem moderner Integrationen. Statt regelmäßig nachzufragen "Gibt es was Neues?" (Polling), sagt das System proaktiv Bescheid wenn etwas passiert (Event-Driven).

**So funktioniert ein Webhook:**
1. Du registrierst eine URL bei einem System: "Hey Outlook, wenn eine neue E-Mail kommt, ruf diese URL auf."
2. Outlook merkt sich die URL.
3. Neue E-Mail kommt rein → Outlook macht einen POST-Request an deine URL mit den E-Mail-Daten.
4. Dein Workflow (Make.com, n8n, oder eigener Code) empfängt die Daten und verarbeitet sie.

**Event-Driven Architecture** ist das übergreifende Prinzip: Systeme reagieren auf Ereignisse statt auf Zeitpläne. "Wenn Bestellung eingeht → prüfe Lagerbestand → wenn unter Mindestmenge → erstelle Nachbestellung." Alles wird durch Events ausgelöst, nicht durch Timer.

**Für KI-Projekte sind Webhooks der Standard-Trigger:**
- Neue E-Mail → KI-Analyse
- Neues Dokument in SharePoint → RAG-Index aktualisieren
- Neue Bestellung in SAP → KI-Prüfung auf Anomalien
- Kundenanfrage auf Website → KI-Chatbot antwortet`,
        analogy: `Polling ist wie alle 5 Minuten zum Briefkasten gehen: Meistens leer, verschwendete Zeit. Ein Webhook ist wie eine Klingel am Briefkasten: Er meldet sich nur wenn tatsächlich Post da ist. Viel effizienter und schneller.`,
        consultingRelevance: `Webhooks ermöglichen Echtzeit-Reaktionen: Ein Mitarbeiter schickt eine E-Mail mit einer Lieferantenanfrage → innerhalb von Sekunden liegt ein KI-bewerteter Draft im Entwürfe-Ordner. Diese Geschwindigkeit beeindruckt Kunden und zeigt den Mehrwert sofort.`
      }
    ],
    gfSummary: `"Integration ist der Schlüssel: Ihre KI-Lösung muss mit Ihren bestehenden Systemen sprechen — ERP, E-Mail, Dokumentenmanagement. Mit modernen No-Code-Tools können wir diese Verbindungen in Tagen aufbauen statt in Monaten. Die Daten fließen automatisch: E-Mail kommt rein, KI analysiert, Ergebnis landet im System. Kein manuelles Hin-und-Her mehr."`
  },

  "hosting-deployment": {
    title: "Hosting & Deployment",
    layerLevel: 1,
    estimatedMinutes: 30,
    steps: [
      {
        title: "Hosting — wo läuft deine App?",
        content: `Hosting bedeutet: Ein Server stellt deine App im Internet bereit. Drei Optionen für verschiedene Szenarien:

**Vercel** = Frontend-Hosting-Spezialist. Perfekt für React-Apps. Automatisches Deployment aus GitHub, globales CDN (Content Delivery Network — deine App wird weltweit von nahen Servern ausgeliefert), eingebaute Edge Functions. Kostenlos für persönliche Projekte. Du nutzt es bereits für deinen LearningHub.

**Supabase** = Backend-as-a-Service. Nicht nur Datenbank, sondern auch Edge Functions, Storage und Authentifizierung. EU-Rechenzentren verfügbar (Frankfurt). Dein Standard-Backend für Prototypen und mittelgroße Apps.

**Azure / AWS** = Enterprise-Cloud. Für große Kunden mit spezifischen Compliance-Anforderungen, Active Directory-Integration, oder SAP on Azure. Deutlich komplexer aufzusetzen, aber unbegrenzt skalierbar.

**Für den Mittelstand:** Vercel (Frontend) + Supabase (Backend) reicht für 80% der Projekte. Kosten: <50€/Monat für eine vollwertige Anwendung mit bis zu tausend Nutzern. Azure/AWS erst wenn der Kunde es vorschreibt oder die Skalierung es erfordert.`,
        analogy: `Vercel ist wie ein Pop-up-Store: Schnell aufgebaut, guter Standort (CDN weltweit), perfekt für den Start. Supabase ist das Büro im Hintergrund: Datenbank, Ablage, Empfang. Azure ist der Industriepark: Komplex, teuer, aber für jede Anforderung gerüstet. Die meisten brauchen erst mal nur den Pop-up-Store.`,
        consultingRelevance: `Die Hosting-Empfehlung bestimmt Kosten und Aufwand: Vercel + Supabase = 1 Tag Setup, <50€/Monat. Azure = 1-2 Wochen Setup, >500€/Monat. Im Kundengespräch: "Wir starten schlank und skalieren bei Bedarf." Das minimiert das Investitionsrisiko.`
      },
      {
        title: "Continuous Deployment — automatisch live",
        content: `Das Prinzip hast du bereits erlebt: Du machst \`git push\` und 2 Minuten später ist die Änderung live auf deiner Vercel-URL. Das nennt man **Continuous Deployment (CD).**

**Der Ablauf:**
1. Du pusht Code zu GitHub (\`git push\`)
2. Vercel bemerkt den neuen Code (über einen Webhook!)
3. Vercel baut die App (führt \`npm run build\` aus)
4. Vercel verteilt die fertige App auf globale Server
5. Die neue Version ist live

**Wenn der Build fehlschlägt** (z.B. wegen eines Fehlers im Code), bleibt die vorherige Version online. Du bekommst eine Fehlermeldung im Vercel-Dashboard. Kein Risiko für die Live-App.

**Preview Deployments:** Bei Git Branches: Jeder Branch bekommt eine eigene Preview-URL. So kannst du Änderungen testen bevor sie auf die Haupt-URL gehen. Ideal für größere Änderungen.

**Environment Variables:** Sensible Daten (API-Keys, Datenbank-Zugangsdaten) werden nicht im Code gespeichert, sondern in Vercel's Environment Variables. Du hast das mit den Supabase-Keys gemacht.`,
        analogy: `Continuous Deployment ist wie eine moderne Druckerei: Du schickst das Manuskript (git push), die Druckerei setzt es automatisch (Build), prüft auf Druckfehler, und liefert das fertige Buch (Deployment) aus. Wenn das Manuskript Fehler hat, wird die alte Auflage weiter verkauft — kein Ausfall.`,
        consultingRelevance: `CD ist Standard in der modernen Softwareentwicklung und ein Argument für den Kunden: Änderungen und Updates können in Stunden statt Wochen ausgerollt werden. Im PoC zeigst du: "Ich ändere jetzt die Farbe des Buttons — in 2 Minuten ist es live." Das demonstriert Agilität.`
      },
      {
        title: "PWA — Web-App als native App",
        content: `Eine Progressive Web App (PWA) ist eine Website, die sich wie eine native App anfühlt. Dein LearningHub ist (oder wird) eine PWA.

**Was eine PWA kann:**
- **Installierbar:** Icon auf dem Homescreen, Vollbildmodus, keine Browser-Leiste
- **Offline-fähig:** Grundfunktionen auch ohne Internet (über Service Worker)
- **Push-Benachrichtigungen:** "Hallo Dean, es gibt neue Lerninhalte!" (optional)
- **Automatische Updates:** Die App aktualisiert sich beim nächsten Öffnen

**Was eine PWA NICHT kann** (vs. native App):
- Kein Zugriff auf alle Handy-Sensoren (NFC, manche Bluetooth-Funktionen)
- Kein App-Store-Eintrag (aber das ist für Unternehmensanwendungen irrelevant)
- Performance bei grafisch anspruchsvollen Apps etwas geringer

**Für Unternehmens-KI-Anwendungen ist PWA ideal:** Die App wird über eine URL verteilt (kein App-Store nötig), funktioniert auf allen Geräten (iPhone, Android, Desktop), und Updates passieren automatisch. Der Aufwand für eine PWA ist 90% geringer als für eine native App.

Du hast die PWA-Grundlagen bereits eingerichtet: \`vite-plugin-pwa\` im Projekt, Manifest mit Icons, Meta-Tags in der HTML.`,
        analogy: `Eine PWA ist wie ein Schlüssel, der in jedes Schloss passt: iPhone, Android, Windows, Mac — ein Code, alle Geräte. Eine native App ist wie ein Schlüssel der nur in ein Schloss passt — du brauchst einen für iOS (Swift) und einen für Android (Kotlin). Für Unternehmensanwendungen ist der Universal-Schlüssel fast immer die bessere Wahl.`,
        consultingRelevance: `"Brauchen wir eine App?" hörst du oft. Die Antwort: "Eine PWA — sieht aus wie eine App, fühlt sich an wie eine App, kostet einen Bruchteil." Für den Mittelstand ist das die richtige Empfehlung: Kein App-Store, keine doppelte Entwicklung, sofortige Updates.`
      }
    ],
    gfSummary: `"Ihre KI-Anwendung wird als Web-App bereitgestellt, die auf jedem Gerät funktioniert — Smartphone, Tablet, Desktop. Installierbar auf dem Homescreen, mit automatischen Updates, ohne App-Store-Abhängigkeit. Das Hosting kostet unter 50€ pro Monat und Änderungen sind in Minuten live. Kein eigener Server, kein IT-Betrieb nötig."`
  }
};

# Quellen-Bewertungs- und Integrations-Guide
## LearningHub — Externe Inhalte strukturiert einbinden

---

## Das Ziel

Der LearningHub baut Wissen **praxis- und umsetzungsorientiert** auf. Jede externe Quelle muss diesem Ziel dienen — nicht dekorieren. Die Frage ist nicht "Ist das interessant?", sondern "Macht das den Lernenden handlungsfähiger?"

---

## Schritt 1: Relevanz-Check (5 Minuten)

Beantworte diese vier Fragen bevor du Zeit investierst:

| Frage | Wenn NEIN → |
|---|---|
| Trifft das Thema eine der 4 Phasen des Curriculums? | Ablegen, nicht einbauen |
| Würde ein KI-Berater für den Mittelstand das brauchen? | Ablegen, nicht einbauen |
| Gibt es einen konkreten Anwendungsbezug (nicht rein akademisch)? | Nur als Vertiefung (Layer 3+) |
| Ist der Inhalt aktuell (< 18 Monate alt, oder zeitlos)? | Vermerken, erst prüfen |

**Daumenregel:** Wenn du nach 5 Minuten nicht sagen kannst, in welche Phase und welches Modul es gehört, gehört es (noch) nicht rein.

---

## Schritt 2: Qualitäts-Check (10 Minuten)

Bewerte den Inhalt auf drei Dimensionen:

### Inhaltliche Tiefe
- **Oberflächlich** (Buzzwords, kein Substanz) → nicht einbauen
- **Erklärend** (was ist X) → Layer 1 Material
- **Vertiefend** (wie funktioniert X genau) → Layer 2 Material
- **Praktisch-anwendend** (X in echten Projekten umsetzen) → Layer 2–3 Material

### Korrektheit
- Technik-Fakten auf Aktualität prüfen (API-Versionen, Modellnamen, Protokolle)
- Studien-Referenzen: Gibt es eine echte Quelle? (Nicht nur "Studien zeigen...")
- Verallgemeinerungen die für den Mittelstand nicht passen → markieren für Anpassung

### Didaktische Qualität
- Gibt es Analogien oder Beispiele die das Konzept greifbar machen?
- Ist die Struktur nachvollziehbar (Problem → Lösung, oder Konzept → Anwendung)?
- Ist es zu entwickler-spezifisch und braucht eine "Berater-Übersetzung"?

---

## Schritt 3: Curriculum-Mapping (10 Minuten)

Ordne den Inhalt ins Curriculum ein:

### Phase-Zuordnung
| Phase | Passt wenn... |
|---|---|
| **Phase 1: Fundament** | Grundkonzepte, Orientierung, "Was ist X?" |
| **Phase 2: Technologie** | Tools, Infrastruktur, konkrete Systeme |
| **Phase 3: Lösungsdesign** | Architektur, Methodik, Prototyping |
| **Phase 4: Beratungspraxis** | Kommunikation, Compliance, Positionierung |

### Layer-Zuordnung
| Layer | Inhalt |
|---|---|
| **Layer 1 (Einsteiger)** | Kernerklärung, eine Analogie, ein Praxisbeispiel |
| **Layer 2 (Grundlagen)** | Vertiefte Konzepte, ROI-Bezug, Beratungsrelevanz |
| **Layer 3 (Practitioner)** | Implementierungsdetails, Spezialfälle, Edge Cases |

### Integrations-Typ entscheiden:
- **Neues Modul** → Thema hat kein passendes Heimatmodul, trägt eigenständigen Lernwert
- **Zusätzlicher Layer** → Thema passt zu bestehendem Modul, vertieft es
- **Ressource/Link** → Zu spezifisch für eigenen Content, aber wertvoll als Vertiefung
- **Notification** → Aktuelles Update das ein bestehendes Modul tangiert

---

## Schritt 4: Aufbereitungs-Bedarf einschätzen (vor dem Einbauen)

Checkliste für jede Quelle:

- [ ] **Perspektive anpassen**: Ist es aus Entwickler-Sicht geschrieben? → Berater-Übersetzung nötig
- [ ] **GF-tauglich machen**: Gibt es eine Zusammenfassung in Geschäftssprache? → `gfSummary` schreiben
- [ ] **Analogie ergänzen**: Hat die Quelle keine gute Analogie? → Eine mit Mittelstands-Bezug hinzufügen
- [ ] **Praxisbeispiel**: Gibt es ein konkretes Beispiel für einen SCM/Industrie-Kunden? → Ergänzen
- [ ] **Beratungsrelevanz**: Was bedeutet das für ein Kundengespräch? → `consultingRelevance` schreiben
- [ ] **Verknüpfungen**: Welche bestehenden Module werden durch dieses Thema ergänzt? → `connections` setzen

---

## Schritt 5: Format der Quelle

| Quellen-Typ | Vorgehen |
|---|---|
| **Video / YouTube** | NotebookLM: Zusammenfassung + Podcast generieren, PDF-Export der Präsentation → dann wie PDF behandeln |
| **PDF / Präsentation** | Claude liest direkt, Extraktion der Kernaussagen, Mapping auf Modul-Struktur |
| **Artikel / Blog** | URL weitergeben, Claude fasst zusammen, Qualitäts-Check wie oben |
| **Podcast / Audio** | Transkript erstellen (NotebookLM, Whisper), dann wie Artikel behandeln |
| **Buch / Paper** | Kapitelweise vorgehen, pro Kapitel separater Bewertungs-Durchlauf |

---

## Schritt 6: Einbauen

### Wenn neues Modul:
1. Modul-Metadaten in `curriculum.js` eintragen (id, title, difficulty, hours, tags, summary, analogy, keyPoints, practicalExample, connections)
2. Layer 1 Content in entsprechende `phase[N]-content.js` schreiben (3 Steps: Problem/Konzept → Vertiefung → Praxis/Transfer)
3. Layer 2 Content in `phase[N]-layer2-content.js` schreiben (3 Steps: tiefere Konzepte + consultingRelevance)
4. Ressource (PDF, Audio, Link) im letzten Step als `📎 Ressource:` vermerken

### Wenn zusätzlicher Layer:
1. Neue Step-Objekte am Ende des bestehenden Moduls ergänzen
2. `estimatedMinutes` anpassen

### Wenn Ressource:
1. Als `📎 Ressource:` Vermerk im relevanten Step des betroffenen Moduls
2. Datei in `/Dateien/` ablegen

### Wenn Notification:
1. In `curriculum.js` unter `NOTIFICATIONS` eintragen (area, message, module, isNew: true)

---

## Qualitäts-Kriterium für fertige Integration

Ein eingebauter Inhalt ist gut wenn:
- Ein KI-Berater am Ende des Moduls eine neue Handlungsoption hat (nicht nur neues Wissen)
- Der `gfSummary` in einem GF-Gespräch direkt verwendbar ist
- Die Analogie einen Mittelstands-Bezug hat (keine rein Software-Development-Metaphern)
- `consultingRelevance` konkret ist ("Du wirst in Situation X auf Frage Y treffen, dann sagst du Z")

---

## Beispiel-Bewertung: AI_Agent_Architecture_Blueprint

| Kriterium | Bewertung |
|---|---|
| Relevanz | ✅ Phase 3 (Lösungsdesign), Modul Agent-Architektur |
| Zielgruppe | ⚠️ Entwickler-fokussiert → Berater-Übersetzung nötig |
| Tiefe | ✅ Layer 2-tauglich (Konzepte + Praxis) |
| Aktualität | ✅ Claude Code / MCP aktuell (2025) |
| Analogien | ✅ Vorhanden (Memory Funnel, Küchenchef-Metapher ergänzt) |
| GF-Tauglichkeit | ⚠️ Original nicht GF-tauglich → `gfSummary` geschrieben |
| Integration | ✅ Neues Modul `context-engineering` in Phase 3 |

---

*Dieser Guide gilt für alle zukünftigen Quellen-Integrationen im LearningHub.*
*Letzte Aktualisierung: 2026-03-12*

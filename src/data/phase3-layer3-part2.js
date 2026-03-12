// PHASE3_LAYER3_PART2 - modules 5-7
// Layer 3 "Practitioner" — konkrete Implementierungsdetails, fortgeschrittene Methoden
// Module: prototyping, data-strategy, mcp-tools

export const PHASE3_LAYER3_PART2 = {

  "prototyping": {
    title: "Vom Prototyp zur Production",
    layerLevel: 3,
    estimatedMinutes: 75,
    steps: [
      {
        title: "Gradio vs. Streamlit vs. FastAPI+React: Entscheidungsmatrix nach Ziel",
        content: `Die Wahl des richtigen Frameworks ist keine technische Präferenzfrage — sie bestimmt, wie schnell du lieferst, wie überzeugend deine Demo wirkt und ob das System später produktionstauglich skaliert. Jedes Framework trifft andere Kompromisse.

**Gradio — für schnelle ML-Demos:**

Gradio ist auf Machine-Learning-Interfaces optimiert: Input/Output-Blöcke, integriertes Sharing via \`share=True\`, direkte HuggingFace-Integration.

\`\`\`python
import gradio as gr
from anthropic import Anthropic

client = Anthropic()

def analyse_lieferant(text: str, analyseart: str) -> str:
    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"Analysiere folgenden Lieferantentext ({analyseart}): {text}"
        }]
    )
    return response.content[0].text

demo = gr.Interface(
    fn=analyse_lieferant,
    inputs=[
        gr.Textbox(label="Lieferantentext", lines=5),
        gr.Dropdown(["Risikobewertung", "Vertragsanalyse", "Performance-Score"],
                    label="Analyseart")
    ],
    outputs=gr.Textbox(label="Analyse", lines=10),
    title="Lieferanten-Analyse Prototyp"
)
demo.launch(share=True)  # Öffentliche URL in 30 Sekunden
\`\`\`

**Stärken:** Deployment in einer Zeile, automatisches UI-Layout, kein CSS. **Schwächen:** Kein State Management für komplexe Workflows, kein Auth, keine Custom-Brand.

**Streamlit — für interaktive Business-Dashboards:**

Streamlit eignet sich für Anwendungen mit mehreren Schritten, Session State und Datenvisualisierungen. Es ist der Standard für interne Tools im Mittelstand.

\`\`\`python
import streamlit as st
import pandas as pd

st.set_page_config(page_title="Bestandsoptimierung", layout="wide")

if "analyse_history" not in st.session_state:
    st.session_state.analyse_history = []

uploaded = st.file_uploader("Bestandsdaten (CSV)", type="csv")
if uploaded:
    df = pd.read_csv(uploaded)
    st.dataframe(df.head())

    if st.button("KI-Analyse starten"):
        with st.spinner("Analysiere..."):
            # API-Call hier
            result = "Analyse-Ergebnis..."
            st.session_state.analyse_history.append(result)
            st.success(result)
\`\`\`

**Stärken:** Session State, Datenvisualisierung, Auth via Streamlit Community Cloud. **Schwächen:** Jede Interaktion re-rendert die gesamte App, Performance-Limit bei >100 gleichzeitigen Nutzern.

**FastAPI + React — für Production:**

Wenn das System in die IT-Infrastruktur des Kunden integriert werden soll, echte User-Rollen braucht oder >500 req/day hat, ist eine echte API + Frontend die einzige skalierbare Option.

\`\`\`python
# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer
from pydantic import BaseModel

app = FastAPI()
security = HTTPBearer()

class AnalyseRequest(BaseModel):
    text: str
    typ: str
    lieferant_id: str

@app.post("/api/analyse")
async def analyse(req: AnalyseRequest, token=Depends(security)):
    # JWT-Validierung, Rate Limiting, Logging hier
    result = await run_llm_analyse(req.text, req.typ)
    await log_to_db(req.lieferant_id, req.typ, result)
    return {"result": result, "token_usage": result.usage}
\`\`\`

**Entscheidungsmatrix:**

| Kriterium | Gradio | Streamlit | FastAPI+React |
|-----------|--------|-----------|---------------|
| Zeit bis Demo | 30 Min | 2-4 Std | 2-5 Tage |
| Interne Nutzung (<50 User) | ✓ | ✓✓ | Overkill |
| Externe Nutzung / Kunden | — | bedingt | ✓✓ |
| ERP-Integration | — | bedingt | ✓✓ |
| Custom Auth & Rollen | — | ✓ | ✓✓ |
| Skalierung >1000 req/h | — | — | ✓✓ |

**Regel für die Praxis:** Starte mit Streamlit, wenn das Ziel ein interner Entscheidungs-Support ist. Nimm Gradio nur für reine ML-Demonstrationen ohne Business-Logik. Migriere zu FastAPI+React sobald der Kunde "wann können wir das in SAP einbinden?" fragt.`,
        analogy: `Gradio ist ein Klappzelt — in fünf Minuten steht es, funktioniert für die Demo, aber du willst nicht den Winter darin verbringen. Streamlit ist ein Bürocontainer: solide für Monate, konfigurierbar, aber kein permanentes Gebäude. FastAPI+React ist das Firmengebäude: Aufwand am Anfang, aber Fundament für alles was kommt.`,
        consultingRelevance: `Die Wahl des Frameworks ist oft der erste technische Weichenentscheid in einem Projekt. Wenn du mit Gradio anfängst und der Kunde nach drei Wochen "wir wollen das an unser SSO anbinden" sagt, steht du vor einem Rewrite. Erkläre dem Kunden früh die Trade-offs: Geschwindigkeit der ersten Demo vs. Aufwand der späteren Integration. Empfehle Streamlit für Piloten bis 50 interne Nutzer, plane aber von Anfang an eine FastAPI-Schicht wenn SAP-Integration im Raum steht. Diese Entscheidung proaktiv zu treffen zeigt technische Reife und vermeidet teure Nacharbeiten.`
      },
      {
        title: "Evaluation-First Development: Golden Dataset und TDD für LLM-Anwendungen",
        content: `Das größte Risiko beim LLM-Prototypen ist, keine objektive Qualitätsmessung zu haben. Ohne Evaluation weißt du nicht ob dein Prompt-Tuning das System besser oder schlechter macht — du vertraust deinem Gefühl. Evaluation-First Development löst das strukturell.

**Das Golden Dataset:**

Ein Golden Dataset ist eine kuratierte Sammlung von Eingaben mit definierten erwarteten Ausgaben — erstellt, bevor die erste Codezeile geschrieben wird. Für ein Lieferschein-Analyse-System könnte das so aussehen:

\`\`\`python
# golden_dataset.py
GOLDEN_CASES = [
    {
        "id": "GD-001",
        "input": "Lieferschein #4521, Artikel: Pumpengehäuse A4, Menge: 50 Stück, "
                 "Lieferdatum: 15.03.2025, Abweichung: 3 Stück fehlen",
        "expected_fields": {
            "lieferschein_nr": "4521",
            "artikel": "Pumpengehäuse A4",
            "bestellmenge": 50,
            "gelieferte_menge": 47,
            "abweichung_stueck": -3,
            "abweichung_prozent": -6.0
        },
        "expected_flags": ["UNTERLIEFERUNG"],
        "should_not_contain": ["ÜBERLIEFERUNG", "KEINE_ABWEICHUNG"]
    },
    {
        "id": "GD-002",  # Edge Case: Mengenangabe in Verpackungseinheiten
        "input": "LS 9912: 5 Paletten à 12 Stück Flansch B2, bestellt waren 60 Stück",
        "expected_fields": {
            "bestellmenge": 60,
            "gelieferte_menge": 60,
            "abweichung_stueck": 0
        },
        "expected_flags": ["KEINE_ABWEICHUNG"]
    },
    # 20-50 weitere Cases...
]
\`\`\`

**Der Evaluations-Runner:**

\`\`\`python
import json
from anthropic import Anthropic
from golden_dataset import GOLDEN_CASES

client = Anthropic()

def run_evaluation(prompt_version: str, system_prompt: str) -> dict:
    results = {"passed": 0, "failed": 0, "errors": [], "score": 0.0}

    for case in GOLDEN_CASES:
        response = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=512,
            system=system_prompt,
            messages=[{"role": "user", "content": case["input"]}]
        )

        try:
            parsed = json.loads(response.content[0].text)
            passed = True

            # Pflichtfelder prüfen
            for field, expected in case["expected_fields"].items():
                if parsed.get(field) != expected:
                    results["errors"].append({
                        "case_id": case["id"],
                        "field": field,
                        "expected": expected,
                        "got": parsed.get(field)
                    })
                    passed = False

            # Flags prüfen
            for flag in case.get("expected_flags", []):
                if flag not in parsed.get("flags", []):
                    passed = False

            if passed:
                results["passed"] += 1
            else:
                results["failed"] += 1

        except json.JSONDecodeError:
            results["failed"] += 1
            results["errors"].append({"case_id": case["id"], "error": "INVALID_JSON"})

    results["score"] = results["passed"] / len(GOLDEN_CASES) * 100
    print(f"Prompt {prompt_version}: {results['score']:.1f}% ({results['passed']}/{len(GOLDEN_CASES)})")
    return results

# Vor jeder Prompt-Änderung: Score festhalten
# v1: 72% → v2: 81% → v3: 78% (schlechter! Rollback)
\`\`\`

**Regression-Testing in der CI/CD-Pipeline:**

\`\`\`yaml
# .github/workflows/eval.yml
name: LLM Evaluation
on: [pull_request]
jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Golden Dataset Evaluation
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: python evaluate.py --min-score 80
      - name: Fail if score drops
        run: |
          score=$(cat eval_results.json | jq '.score')
          if (( $(echo "$score < 80" | bc -l) )); then
            echo "Score $score% unter Minimum (80%). PR abgelehnt."
            exit 1
          fi
\`\`\`

**Praktische Mindestgröße für Golden Datasets:**

| Anwendungstyp | Minimum Cases | Davon Edge Cases |
|---------------|---------------|------------------|
| Klassifikation | 30 | 30% |
| Extraktion | 20 | 40% |
| Generierung | 15 | 20% |
| Chat/Q&A | 25 | 35% |

**Die wichtigste Erkenntnis:** Edge Cases machen 40% des Datasets aus, aber 80% der Produktionsfehler. Identifiziere Edge Cases aus echten Fehlern im bisherigen manuellen Prozess, nicht aus der Theorie.`,
        analogy: `Ein Qualitätsingenieur in der Fertigung entwickelt zuerst den Prüfplan — welche Toleranzen, welche Messmethoden, welche Grenzwerte — bevor er die Maschine einstellt. Ohne Prüfplan gibt es keine objektive Aussage über Gut- oder Schlechtteile. Das Golden Dataset ist der Prüfplan für KI-Systeme.`,
        consultingRelevance: `Wenn ein Kunde nach drei Monaten Pilotbetrieb fragt "Hat sich das System eigentlich verbessert?", musst du eine Antwort haben die über "Gefühlt schon" hinausgeht. Evaluation-First ist auch ein Verkaufsargument: Du kannst dem Kunden zeigen, dass Qualitätsverbesserungen messbar sind und nicht auf Glauben basieren. Außerdem schützt ein Golden Dataset vor einem häufigen Beratungs-Anti-Pattern: Prompt-Änderungen die in einer Situation helfen, in zehn anderen aber Regressionsfehler erzeugen.`
      },
      {
        title: "Demo-Engineering: überzeugenden Demo-Flow designen und Graceful Failure",
        content: `Eine Demo ist kein Test — sie ist ein Verkaufsgespräch in technischer Verkleidung. Die meisten Prototyp-Demos scheitern nicht wegen mangelnder Technologie, sondern wegen schlechtem Demo-Engineering. Die Entscheidungsträger sehen Randfälle die das System nicht kann, und das Vertrauen kollabiert.

**Das drei-Akt-Modell für KI-Demos:**

**Akt 1 — Der Pain (2 Min):** Zeige das aktuelle Problem ohne KI. Nicht abstrakt ("wir haben Ineffizienzen"), sondern konkret: "Dieser Mitarbeiter öffnet jeden Morgen 40 Lieferschein-PDFs und tippt die Daten manuell in SAP — das dauert 3 Stunden täglich."

**Akt 2 — Die Transformation (5 Min):** Zeige den Workflow mit KI. Geschwindigkeit ist entscheidend: kein Warten auf API-Calls, keine Ladefehler. Cached Responses sind legitim für Demos — speed ist Teil der User Experience.

\`\`\`python
# demo_cache.py — Pre-cached Demo-Responses für Offline/Speed-Szenarien
DEMO_CACHE = {
    "lieferschein_beispiel_1.pdf": {
        "extracted": {
            "lieferant": "Müller Metallbau GmbH",
            "lieferschein_nr": "LS-2024-4521",
            "positionen": [
                {"artikel": "Pumpengehäuse A4", "menge": 50, "einheit": "Stück"},
                {"artikel": "Flansch B2-15", "menge": 200, "einheit": "Stück"}
            ],
            "abweichungen": ["Pumpengehäuse: 3 Stück Unterlieferung"]
        },
        "sap_match_status": "ABWEICHUNG_GEFUNDEN",
        "empfehlung": "Rückruf Lieferant, Teillieferung buchen"
    }
}

def get_response(input_key: str, live_mode: bool = False):
    if not live_mode and input_key in DEMO_CACHE:
        return DEMO_CACHE[input_key]  # Instant, deterministisch
    return call_llm_api(input_key)  # Live-Modus für Tech-Due-Diligence
\`\`\`

**Akt 3 — Die Zahlen (2 Min):** ROI-Rechnung live zeigen. "3 Stunden × 220 Arbeitstage × 45€/Std = 29.700€/Jahr nur für diesen einen Prozess."

**Bekannte Edge Cases einbauen, nicht verstecken:**

Der häufigste Demo-Fehler: Das System wird gezeigt, ein Entscheidungsträger stellt eine Frage die außerhalb des vorbereiteten Flows liegt, das System versagt, die Stimmung kippt.

Die Gegenmaßnahme ist kontraintuitiv: **Zeige Grenzen proaktiv.**

\`\`\`python
# Graceful Failure Pattern
def analyse_with_confidence(text: str) -> dict:
    result = llm_extract(text)

    # Confidence-Score basierend auf Vollständigkeit
    required_fields = ["lieferant", "menge", "artikel"]
    found = sum(1 for f in required_fields if result.get(f))
    confidence = found / len(required_fields)

    if confidence < 0.6:
        return {
            "status": "NIEDRIGE_KONFIDENZ",
            "message": "Dieser Lieferschein hat ungewöhnliches Format — "
                       "bitte manuell prüfen",
            "partial_data": result,
            "konfidenz": f"{confidence*100:.0f}%"
        }

    return {"status": "OK", "data": result, "konfidenz": f"{confidence*100:.0f}%"}
\`\`\`

**Demo-Script mit eingebautem Failure:**

\`\`\`
Demo-Ablauf:
1. Normaler Lieferschein → 100% Konfidenz, sofortige SAP-Buchung
2. Handgeschriebener Lieferschein → 45% Konfidenz → System eskaliert an Sachbearbeiter
   SCRIPT: "Sehen Sie — das System erkennt seine eigenen Grenzen. Es gibt
   keine falschen Buchungen, es fordert Hilfe an. Das ist genau das Verhalten
   das wir wollen."
3. Fremdsprachiger Lieferschein → automatische Spracherkennung, dann Extraktion
\`\`\`

**Demo-Umgebung absichern:**

- Eigenen Hotspot verwenden (keine Abhängigkeit vom Kunden-WLAN)
- Offline-Fallback für alle kritischen Pfade
- Datenschutz: Nur anonymisierte/synthetische Daten in der Demo
- Zwei Geräte: Hauptlaptop + Backup-Tablet mit Screenshots aller Schritte`,
        analogy: `Ein Theaterstück hat ein Skript, eine Generalprobe und Notfallpläne für wenn der Scheinwerfer ausfällt. Niemand improvisiert in der Premiere. Eine KI-Demo ist eine Premiere — bereite dich entsprechend vor, kenne deine Schwachstellen und entscheide aktiv was du zeigst und was nicht.`,
        consultingRelevance: `Die Demo ist oft der einzige Moment, in dem du die Aufmerksamkeit aller Entscheidungsträger gleichzeitig hast. Eine fehlgeschlagene Demo kann ein Projekt stoppen, das technisch einwandfrei ist. Investiere mindestens ein Drittel der Prototyp-Bauzeit in Demo-Engineering. Das Einbauen von Graceful Failures ist gleichzeitig technisch korrekt und kommunikativ brilliant: Du kontrollierst die Narrative um Systemgrenzen, bevor der Kunde sie unkontrolliert entdeckt.`
      },
      {
        title: "Technische Schulden im Prototyp: Absichtliche vs. versehentliche Schulden",
        content: `Technische Schulden sind keine Fehler — sie sind ein Werkzeug. Der Unterschied zwischen einem guten und einem schlechten Prototyp liegt nicht in der Abwesenheit von technischen Schulden, sondern in der Bewusstheit darüber welche Schulden absichtlich eingegangen wurden.

**Ward Cunninghams Original-Metapher:** Technische Schulden sind wie finanzielle Schulden. Manchmal ist es rational, Schulden aufzunehmen um schneller voranzukommen — solange man Zinsen bezahlt (Wartungsaufwand) und einen Tilgungsplan hat (Refactoring-Budget).

**Taxonomie für LLM-Prototypen:**

**Absichtliche akzeptable Schulden (dokumentieren, später tilgen):**

\`\`\`python
# TODO-TECH-DEBT: Hardcoded API Key — vor Production in Vault/Env migrieren
# Geschätzte Tilgungszeit: 2h
ANTHROPIC_API_KEY = "sk-ant-..."  # Nur für Pilot-Phase!

# TODO-TECH-DEBT: Kein Retry-Mechanismus — bei >100 req/day einbauen
# Geschätzte Tilgungszeit: 4h
response = client.messages.create(...)

# TODO-TECH-DEBT: Alle Nutzerdaten in SQLite statt PostgreSQL
# Migration wenn >500 Einträge oder Multi-User benötigt
# Geschätzte Tilgungszeit: 1 Tag
\`\`\`

**Versehentliche kritische Schulden (sofort adressieren):**

\`\`\`python
# SCHLECHT: SQL Injection Risiko — kein Placeholder, String-Konkatenation
query = f"SELECT * FROM lieferanten WHERE name = '{user_input}'"

# SCHLECHT: Keine Input-Validierung — LLM-Prompt-Injection möglich
def analyse(user_text):
    prompt = f"Analysiere: {user_text}"  # user_text könnte Instruktionen enthalten!

# SCHLECHT: Unbegrenzte Token-Ausgabe — Kosten unkontrolliert
response = client.messages.create(
    model="claude-opus-4-5",
    # max_tokens fehlt! Standard ist je nach Modell sehr hoch
    messages=[...]
)
\`\`\`

**Das Tech-Debt-Register:**

\`\`\`markdown
# Tech-Debt-Register — Lieferschein-Analyse Pilot
Erstellt: 2025-03-01 | Status: PILOT

## Akzeptierte Schulden

| ID | Beschreibung | Ort | Risiko | Tilgung bis |
|----|--------------|-----|--------|-------------|
| TD-01 | API Key in .env statt Vault | config.py:3 | Niedrig (intern) | Vor Go-Live |
| TD-02 | Keine Rate-Limiting | api/routes.py | Mittel | Sprint 3 |
| TD-03 | Logging nur in Konsole, nicht in DB | alle | Niedrig | Sprint 2 |
| TD-04 | Kein automatisches Retry bei API-Fehler | llm_client.py | Mittel | Sprint 2 |

## Nicht akzeptable Schulden (blockieren Go-Live)
- Keine SQL Injection Absicherung
- Keine Authentifizierung
- Kein Error Handling für LLM-Ausfälle
\`\`\`

**Dokumentationspflicht als Kulturprinzip:**

Jede bewusste technische Abkürzung bekommt einen \`# TODO-TECH-DEBT:\`-Kommentar mit drei Pflichtfeldern: Was ist das Problem, was ist die Lösung, wie lange dauert die Umsetzung. Ohne diese drei Felder ist es keine akzeptable Schuld, sondern ein versteckter Fehler.

**Für Mittelstandsprojekte typische Schulden-Budget-Regel:** Pro zwei Wochen Entwicklung ein Tag Schulden-Tilgung einplanen. Wird diese Regel nicht eingehalten, verdoppelt sich die Tilgungszeit bei jedem weiteren Feature.`,
        analogy: `Ein Maschinenbauer verwendet im Prototyp bewusst Normteile statt maßgefertigter Komponenten — er weiß dass das Endprodukt andere Verbindungselemente braucht, aber für die Funktionstüchtigkeitsprüfung reichen Normteile. Das ist absichtliche Schuld mit Tilgungsplan. Wenn er aber vergisst, ein Sicherheitsventil einzubauen "weil es schneller geht", ist das versehentliche kritische Schuld.`,
        consultingRelevance: `Als externer Berater übernimmst du implizit Verantwortung für die technische Qualität deiner Artefakte. Wenn du einen Prototyp ablieferst ohne Tech-Debt-Register, gibt es zwei schlechte Ausgänge: Entweder der Kunde baut auf dem Prototyp weiter ohne die Schulden zu tilgen (technisches Desaster in 12 Monaten), oder das interne IT-Team sieht den Code und verliert das Vertrauen in die externe Beratungsqualität. Ein explizites Tech-Debt-Register signalisiert professionelle Reife und gibt der IT-Abteilung des Kunden eine klare Grundlage für die Übergabe.`
      },
      {
        title: "Vom PoC zur Produktion: Checkliste und Kommunikation",
        content: `Der Übergang von Proof-of-Concept zu Production ist der schwierigste Schritt in KI-Projekten — nicht technisch, sondern organisatorisch. Viele Piloten sterben hier: Das System funktioniert, aber niemand übernimmt Ownership, das Budget für Production wird nicht freigegeben, oder der Betrieb ist unklar.

**Die Production-Readiness-Checkliste:**

**Sicherheit (blocking):**
\`\`\`
☐ Authentifizierung und Autorisierung implementiert (SSO/LDAP-Integration)
☐ Alle Secrets in Vault/Environment Variables, kein Hardcoding
☐ Input Sanitization gegen Prompt Injection
☐ Rate Limiting pro User und global
☐ Datenverschlüsselung in Transit (TLS) und at Rest
☐ DSGVO-Compliance: Datenverarbeitungsverzeichnis, Löschkonzept
☐ Penetrationstest für öffentlich zugängliche Endpunkte
\`\`\`

**Skalierung (nach Volumen):**
\`\`\`python
# Async für parallele Requests — kritisch ab >50 req/min
import asyncio
from anthropic import AsyncAnthropic

client = AsyncAnthropic()

async def batch_analyse(texte: list[str]) -> list[dict]:
    tasks = [analyse_single(text) for text in texte]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return [r if not isinstance(r, Exception) else {"error": str(r)}
            for r in results]

# Connection Pooling für Datenbankzugriffe
from sqlalchemy.ext.asyncio import create_async_engine
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True  # Tote Verbindungen automatisch ersetzen
)
\`\`\`

**Monitoring (blocking):**
\`\`\`python
# Minimales Monitoring-Setup mit Prometheus
from prometheus_client import Counter, Histogram, start_http_server
import time

REQUEST_COUNT = Counter('llm_requests_total', 'Gesamte LLM-Anfragen',
                        ['model', 'status'])
REQUEST_LATENCY = Histogram('llm_request_duration_seconds', 'Anfrage-Latenz',
                             buckets=[0.5, 1.0, 2.0, 5.0, 10.0, 30.0])
TOKEN_USAGE = Counter('llm_tokens_total', 'Token-Verbrauch',
                      ['model', 'type'])  # type: input/output

def tracked_llm_call(messages: list, model: str = "claude-opus-4-5"):
    start = time.time()
    try:
        response = client.messages.create(model=model, messages=messages,
                                          max_tokens=1024)
        REQUEST_COUNT.labels(model=model, status="success").inc()
        TOKEN_USAGE.labels(model=model, type="input").inc(
            response.usage.input_tokens)
        TOKEN_USAGE.labels(model=model, type="output").inc(
            response.usage.output_tokens)
        return response
    except Exception as e:
        REQUEST_COUNT.labels(model=model, status="error").inc()
        raise
    finally:
        REQUEST_LATENCY.observe(time.time() - start)
\`\`\`

**Dokumentation (blocking):**
\`\`\`
☐ Technische Architektur-Dokumentation (Systemübersicht, Datenflüsse)
☐ API-Dokumentation (OpenAPI/Swagger, automatisch generiert)
☐ Betriebshandbuch: Startup, Shutdown, Fehlerdiagnose, Skalierung
☐ Incident-Runbook: Die 5 häufigsten Fehler und Lösungen
☐ Prompt-Versionierung: Welcher Prompt war bei welcher Version aktiv?
\`\`\`

**Kommunikation beim Übergang:**

Das Gespräch mit dem Kunden kurz vor Go-Live muss drei Dinge klären:

1. **Ownership:** Wer ist technischer Ansprechpartner beim Kunden für Betrieb und Incidents? Diese Person braucht mindestens zwei Stunden Onboarding.

2. **Eskalationspfad:** Was passiert wenn das LLM-Modell eine API-Downtime hat? Gibt es einen manuellen Fallback-Prozess?

3. **Erfolgsmessung:** Welche KPIs werden nach Go-Live gemessen? (Verarbeitungszeit, Fehlerquote, User Adoption). Ohne diese Vereinbarung kann niemand sagen ob das Projekt erfolgreich war.

**Checkliste für die Übergabe-Dokumentation:**
Das einzige Dokument das zählt ist das Betriebshandbuch — nicht die Präsentation, nicht der Abschlussbericht. Wenn das System um 3 Uhr morgens abstürzt, muss ein IT-Mitarbeiter ohne Beraterkontakt es wieder zum Laufen bringen können.`,
        analogy: `Eine Maschine geht nicht einfach von der Werkhalle direkt in die Serienfertigung — sie durchläuft FAT (Factory Acceptance Test), SAT (Site Acceptance Test), Schulungen für Maschinenbediener und Wartungstechniker, und es gibt ein Wartungshandbuch. Der PoC-zu-Production-Übergang bei KI ist dasselbe: Kein Deployment ohne Abnahme, Schulung und Dokumentation.`,
        consultingRelevance: `Als Berater bist du oft in der Situation, dass du den Prototyp gebaut hast aber das Betriebsteam beim Kunden ihn übernehmen muss. Dieser Übergang ist deine letzte Chance, professionellen Eindruck zu hinterlassen — oder ihn zu zerstören. Ein System das drei Monate nach Go-Live krachend scheitert weil Monitoring fehlte, beschädigt nicht nur das Projekt sondern die gesamte Kundenbeziehung. Investiere in saubere Übergabe-Dokumentation und Onboarding genauso wie in Code-Qualität. Das ist auch ein Argument für Folgeaufträge: "Wir haben das System so dokumentiert dass euer Team eigenständig operieren kann — und wir sind für die nächste Ausbaustufe bereits eingearbeitet."`,
      }
    ],
    gfSummary: `KI-Prototypen, die intern überzeugen, scheitern oft beim Übergang zur Produktion — wegen falscher Framework-Wahl, fehlender Qualitätsmessung oder mangelnder Betriebsdokumentation. Layer 3 zeigt: Gradio/Streamlit für schnelle Demos, FastAPI+React wenn SAP-Integration geplant ist. Qualität ist messbar: Golden Datasets vor der ersten Codezeile definieren was "gut" bedeutet. Technische Schulden sind ein Werkzeug, keine Fehler — aber nur wenn sie dokumentiert und geplant getilgt werden. Das Ergebnis: KI-Projekte die nicht nur im Piloten funktionieren, sondern 18 Monate nach Go-Live stabil im Betrieb laufen.`
  },

  "data-strategy": {
    title: "Enterprise Data Strategy",
    layerLevel: 3,
    estimatedMinutes: 80,
    steps: [
      {
        title: "Data Mesh vs. Data Lake vs. Data Warehouse für KI: Architekturentscheidung",
        content: `Die Wahl der Datenarchitektur ist eine strategische Investitionsentscheidung mit 5-10 Jahren Wirkung. Für KI-Anwendungen im Mittelstand sind die drei dominanten Paradigmen nicht gleichwertig — ihre Eignung hängt von Organisationsgröße, Datenvolumen und KI-Ziel ab.

**Data Warehouse (klassisch, OLAP-optimiert):**

Ein Data Warehouse aggregiert Daten aus operativen Systemen (ERP, MES, CRM) in einem zentralen, schema-definierten Repository. Perfekt für Business Intelligence und standardisierte Berichte.

\`\`\`
Architektur: SAP → ETL-Pipeline → Snowflake/BigQuery DWH → BI-Tools
Stärken: Konsistente Datendefinitionen, starke Query-Performance, ACID-Compliance
Schwächen: Schema-on-Write = Schemaänderungen teuer, schlecht für unstrukturierte Daten,
           kein nativer Vektor-Support für Embeddings
KI-Eignung: Gut für Predictive Analytics auf strukturierten Daten,
            schlecht für RAG/Dokumentenanalyse
Typische Kosten Mittelstand: 3.000-15.000€/Monat (Snowflake Enterprise)
\`\`\`

**Data Lake (Hadoop/S3-basiert, Schema-on-Read):**

Ein Data Lake speichert Rohdaten in Originalformat ohne vorher ein Schema zu definieren. Maximale Flexibilität — aber auch maximaler Governance-Aufwand.

\`\`\`python
# Beispiel: Azure Data Lake mit Delta Lake Format
from delta import DeltaTable
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .config("spark.jars.packages", "io.delta:delta-core_2.12:2.4.0") \
    .getOrCreate()

# Lieferschein-PDFs + extrahierte Daten + Embeddings in einer Struktur
spark.read \
    .format("delta") \
    .load("abfss://raw@storageaccount.dfs.core.windows.net/lieferscheine/") \
    .createOrReplaceTempView("lieferscheine_raw")

# Schema entsteht beim Lesen, nicht beim Schreiben
df = spark.sql("""
    SELECT
        file_path,
        extracted_data:lieferant::string as lieferant,
        extracted_data:menge::int as menge,
        embedding_vector  -- für Vector Similarity Search
    FROM lieferscheine_raw
    WHERE processing_date >= '2025-01-01'
""")
\`\`\`

\`\`\`
Stärken: Speichert alles, Schema-Flexibilität, günstiger Speicher (S3/ADLS)
Schwächen: "Data Swamp"-Risiko ohne Governance, komplexe Infrastruktur,
           Abfrage-Performance schlechter als DWH
KI-Eignung: Gut für multimodale Daten (PDFs, Bilder, Texte), gut für Embeddings
Typische Kosten Mittelstand: 1.000-8.000€/Monat (Storage + Compute)
\`\`\`

**Data Mesh (domain-orientiert, dezentral):**

Data Mesh ist kein Technologie-Stack sondern ein Organisationsparadigma: Jede Business-Domain (Einkauf, Produktion, Logistik) besitzt und publiziert ihre eigenen Daten als "Data Products".

\`\`\`
Data Mesh Prinzipien:
1. Domain Ownership: Einkaufs-Team verantwortet Beschaffungsdaten
2. Data as a Product: Daten haben SLAs, Dokumentation, Tests
3. Self-Serve Infrastructure: Platform-Team stellt Infrastruktur bereit
4. Federated Governance: Zentrale Standards, dezentrale Umsetzung

Stärken: Skaliert mit Organisationsgröße, klare Accountability, keine Daten-Silos
Schwächen: Erfordert hohe Organisationsreife, komplex bei <500 Mitarbeitern
KI-Eignung: Ideal für föderiertes Lernen, ermöglicht domänenspezifische KI-Modelle
\`\`\`

**Bewertungsmatrix für Mittelstand (100-2000 MA):**

| Kriterium | DWH | Data Lake | Data Mesh |
|-----------|-----|-----------|-----------|
| Setup-Aufwand | Mittel | Hoch | Sehr hoch |
| Eignung <500 MA | ✓✓ | ✓ | — |
| Eignung 500-2000 MA | ✓ | ✓✓ | ✓ |
| RAG/Vektor-Suche | — | ✓✓ | ✓✓ |
| Predictive Analytics | ✓✓ | ✓ | ✓ |
| Governance Aufwand | Niedrig | Hoch | Mittel |
| Empfehlung für Start | ✓✓ | — | — |

**Für die meisten Mittelstandsprojekte gilt:** Starte mit einem modernen Cloud-DWH (Snowflake, BigQuery, oder Databricks Lakehouse als Hybrid) und ergänze es um einen Vektor-Store (pgvector in PostgreSQL oder Qdrant) für RAG-Anwendungen. Vollständiges Data Mesh erst ab >1000 Mitarbeitern oder wenn klare Domänengrenzen existieren.`,
        analogy: `Ein Data Warehouse ist wie ein zentrales Lager mit festen Regalen und einem Lagerverwaltungssystem — alles hat seinen Platz, alles ist sofort findbar, aber neue Warengruppen erfordern neue Regalplanung. Ein Data Lake ist eine riesige Halle wo alles angeliefert wird — maximale Flexibilität, aber ohne Ordnungssystem wird es zum Chaos. Data Mesh ist wie ein Netz von spezialisierten Fachhandlungen die sich gegenseitig beliefern — effizient wenn die Strukturen stimmen, komplex in der Koordination.`,
        consultingRelevance: `In Erstgesprächen wirst du oft gefragt "Wir wollen KI einführen — welche Datenarchitektur brauchen wir?" Die ehrliche Antwort ist fast immer: "Optimiert euer bestehendes DWH und ergänzt einen Vektor-Store." Empfehle kein Data Mesh an einen Kunden mit 300 Mitarbeitern und einem dreiköpfigen IT-Team — das scheitert organisatorisch, nicht technisch. Zeig dem Kunden, dass du die Trade-offs verstehst und eine Empfehlung gibst die zu seiner Kapazität passt, nicht zu der modernsten Architektur.`
      },
      {
        title: "Synthetische Datengenerierung: SDV, Faker und LLM-basierte Synthese",
        content: `Datenmangel ist der häufigste Blocker für KI-Projekte im Mittelstand: Entweder gibt es zu wenige labeled Beispiele, oder die vorhandenen Daten sind zu sensibel für Tests und Demos. Synthetische Datengenerierung löst beide Probleme — wenn sie richtig angewendet wird.

**Drei Ansätze im Vergleich:**

**1. Regel-basierte Synthese mit Faker:**

Für strukturierte Testdaten ohne statistische Abhängigkeiten zwischen Feldern:

\`\`\`python
from faker import Faker
from faker.providers import BaseProvider
import random
from datetime import datetime, timedelta

fake = Faker('de_DE')

class SupplyChainProvider(BaseProvider):
    """Custom Faker-Provider für Supply-Chain-Daten"""

    ARTIKEL_KATEGORIEN = {
        "Hydraulik": ["Pumpe", "Ventil", "Zylinder", "Schlauch", "Fitting"],
        "Elektro": ["Motor", "Sensor", "Kabel", "Schütz", "Frequenzumrichter"],
        "Mechanik": ["Lager", "Welle", "Flansch", "Gehäuse", "Dichtung"]
    }

    def artikel_bezeichnung(self) -> str:
        kategorie = random.choice(list(self.ARTIKEL_KATEGORIEN.keys()))
        typ = random.choice(self.ARTIKEL_KATEGORIEN[kategorie])
        nummer = random.choice(["A4", "B2-15", "C7", "D12", "E3-X"])
        return f"{typ} {nummer}"

    def lieferschein_nr(self) -> str:
        return f"LS-{datetime.now().year}-{random.randint(1000, 9999)}"

fake.add_provider(SupplyChainProvider)

def generate_lieferschein(abweichung_wahrscheinlichkeit: float = 0.15) -> dict:
    bestellmenge = random.choice([10, 25, 50, 100, 200])
    hat_abweichung = random.random() < abweichung_wahrscheinlichkeit
    geliefert = bestellmenge + random.randint(-5, 2) if hat_abweichung else bestellmenge

    return {
        "lieferschein_nr": fake.lieferschein_nr(),
        "lieferant": fake.company(),
        "datum": fake.date_between(start_date="-30d").isoformat(),
        "artikel": fake.artikel_bezeichnung(),
        "bestellmenge": bestellmenge,
        "gelieferte_menge": geliefert,
        "abweichung": geliefert - bestellmenge
    }

# 1000 synthetische Lieferscheine generieren
dataset = [generate_lieferschein() for _ in range(1000)]
\`\`\`

**2. Statistische Synthese mit SDV (Synthetic Data Vault):**

SDV lernt die statistischen Verteilungen und Abhängigkeiten aus echten Daten und generiert neue Datensätze die dieselben Eigenschaften haben — ohne echte Personendaten zu enthalten:

\`\`\`python
from sdv.single_table import GaussianCopulaSynthesizer
from sdv.metadata import SingleTableMetadata
import pandas as pd

# Echte Daten (anonymisiert geladen aus Produktions-DB)
real_data = pd.read_csv("lieferanten_performance_anon.csv")

# Metadata definieren
metadata = SingleTableMetadata()
metadata.detect_from_dataframe(real_data)
metadata.update_column('lieferant_id', sdtype='id')
metadata.update_column('bestelldatum', sdtype='datetime',
                        datetime_format='%Y-%m-%d')

# Modell trainieren
synthesizer = GaussianCopulaSynthesizer(metadata)
synthesizer.fit(real_data)

# 5000 synthetische Zeilen generieren
synthetic_data = synthesizer.sample(num_rows=5000)

# Qualitätsprüfung
from sdv.evaluation.single_table import evaluate_quality
quality_report = evaluate_quality(real_data, synthetic_data, metadata)
print(quality_report.get_score())  # Ziel: >0.85
\`\`\`

**3. LLM-basierte Synthese für Texte und Edge Cases:**

\`\`\`python
import anthropic
import json

client = anthropic.Anthropic()

def generate_edge_case_lieferscheine(n: int = 50) -> list[dict]:
    """Generiert herausfordernde Edge Cases für das Golden Dataset"""

    prompt = """Generiere {n} realistische aber herausfordernde Lieferschein-Texte
    auf Deutsch für ein Extraktionssystem. Jeder Text soll einen anderen Edge Case darstellen:
    - Mengenangaben in Verpackungseinheiten (Paletten, Kartons)
    - Teillieferungen mit Voranmeldung der Restlieferung
    - Mehrsprachige Dokumente (DE/EN gemischt)
    - Handschriftliche Ergänzungen im Text beschrieben
    - Ungewöhnliche Datumsformate
    - Fehlerhafte Artikelnummern die korrigiert wurden

    Ausgabe als JSON-Array mit Feldern: text, typ_edge_case, erwartete_extraktion""".format(n=n)

    response = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )

    return json.loads(response.content[0].text)
\`\`\`

**DSGVO-Konformität synthetischer Daten:**

Synthetische Daten sind nicht automatisch DSGVO-konform. Kritische Punkte:

\`\`\`
☐ Kein "Memorization" im Synthesemodell: Bei SDV prüfen ob einzelne echte
  Datensätze rekonstruierbar sind (Privacy Metrics in SDV auswerten)
☐ Keine direkte Ableitung: Wenn aus Name + PLZ + Bestellhistorie die Identität
  rekonstruierbar ist, ist der Datensatz nicht anonym
☐ Dokumentation: Synthetische Daten im Verarbeitungsverzeichnis als
  "abgeleitete synthetische Daten" kennzeichnen
☐ LLM-basierte Synthese: Keine echten Personendaten an externe APIs senden
\`\`\``,
        analogy: `Ein Crashtest-Dummy ist kein echter Mensch — aber er reproduziert die biomechanischen Eigenschaften eines Menschen so genau, dass seine Verletzungsmuster für die Fahrzeugsicherheit aussagekräftig sind. Synthetische Daten sind die Crashtest-Dummies der KI-Entwicklung: keine echten Kundendaten, aber statistisch korrekte Abbilder ihrer Eigenschaften.`,
        consultingRelevance: `Im ersten Kundengespräch kommt fast immer: "Wir können unsere Daten nicht für Tests verwenden — DSGVO." Die Antwort "wir generieren synthetische Daten" klingt für viele Kunden nach einer Notlösung. Erläutere: Gute synthetische Daten sind oft bessere Trainingsdaten als echte, weil du die Klassenverteilung kontrollieren kannst (z.B. seltene Fehlerfälle überrepräsentieren). Das ist kein Kompromiss, sondern ein methodischer Vorteil. SDV-Qualitätsscores über 0.85 sind ein konkretes Qualitätsargument das auch einem CFO einleuchtet.`
      },
      {
        title: "Data Lineage und Provenance: Apache Atlas, OpenLineage und Marquez",
        content: `"Woher kommen diese Daten und wie wurden sie transformiert?" ist in regulierten Industrien keine akademische Frage — sie ist eine Audit-Anforderung. Data Lineage trackt den vollständigen Lebensweg eines Datenpunkts: von der Quelle über alle Transformationen bis zur KI-Vorhersage, die auf ihm basiert.

**Warum Lineage für KI-Projekte kritisch ist:**

\`\`\`
Szenario: KI empfiehlt, Bestellmenge für Artikel XY um 30% zu erhöhen.
Audit-Frage: "Auf welchen Daten basiert diese Empfehlung?"

Ohne Lineage: "Das Modell hat das so berechnet..."
Mit Lineage: "Die Empfehlung basiert auf Verkaufsdaten aus SAP SD (Jan-Dez 2024),
             Lagerbeständen aus SAP MM (Stand 2025-03-01, Version 2.1.4),
             und Lieferzeiten aus dem Lieferanten-Portal (exportiert 2025-02-28).
             Die Daten wurden durch Pipeline v3.2.1 transformiert,
             Ausreißer-Bereinigung nach IQR-Methode (Grenzwert: 3σ)."
\`\`\`

**OpenLineage — das offene Standard-Protokoll:**

OpenLineage ist ein offener Standard (CNCF) für Lineage-Events. Jede Datentransformation emittiert strukturierte Events:

\`\`\`json
{
  "eventType": "COMPLETE",
  "eventTime": "2025-03-01T08:30:00Z",
  "run": {
    "runId": "28f04b5e-0f96-4a9a-b0c1-4e3f9c7d8e9f"
  },
  "job": {
    "namespace": "supplyconsult.prod",
    "name": "lieferschein_preprocessing_v3"
  },
  "inputs": [
    {
      "namespace": "sap.erp.prod",
      "name": "EKKO",
      "facets": {
        "dataSource": {
          "name": "SAP ECC 6.0",
          "uri": "sap://erp.kunde.de:8000"
        },
        "schema": {
          "fields": [
            {"name": "EBELN", "type": "CHAR", "description": "Bestellnummer"},
            {"name": "LIFNR", "type": "CHAR", "description": "Lieferantennummer"}
          ]
        }
      }
    }
  ],
  "outputs": [
    {
      "namespace": "supplyconsult.datalake",
      "name": "bestellungen_enriched",
      "facets": {
        "columnLineage": {
          "fields": {
            "lieferant_name": {
              "inputFields": [
                {"namespace": "sap.erp.prod", "name": "LFA1", "field": "NAME1"},
                {"namespace": "sap.erp.prod", "name": "EKKO", "field": "LIFNR"}
              ],
              "transformationType": "JOIN"
            }
          }
        }
      }
    }
  ]
}
\`\`\`

**Marquez — lokaler Lineage-Server:**

\`\`\`bash
# Marquez mit Docker starten
docker run -p 5000:5000 -p 5001:5001 marquezproject/marquez

# Python-Integration
from openlineage.client import OpenLineageClient
from openlineage.client.run import RunEvent, RunState, Run, Job
from openlineage.client.facet import ParentRunFacet
import uuid

client = OpenLineageClient(url="http://localhost:5000")

run_id = str(uuid.uuid4())
client.emit(RunEvent(
    eventType=RunState.START,
    eventTime="2025-03-01T09:00:00Z",
    run=Run(runId=run_id),
    job=Job(namespace="supplyconsult", name="lieferanten_scoring"),
    producer="https://github.com/supplyconsult/ki-pipeline",
    inputs=[...],
    outputs=[...]
))
\`\`\`

**Apache Atlas — für Hadoop/Azure-Ökosysteme:**

Apache Atlas ist die schwergewichtige Enterprise-Lösung für Data Governance, nativ in HDInsight und Azure Databricks integriert:

\`\`\`python
from pyapacheatlas.core import AtlasClient
from pyapacheatlas.auth import ServicePrincipalAuthentication

auth = ServicePrincipalAuthentication(
    tenant_id=TENANT_ID,
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET
)
client = AtlasClient(
    endpoint_url="https://atlas.azurehdinsight.net",
    authentication=auth
)

# Datensatz registrieren
entity = {
    "typeName": "DataSet",
    "attributes": {
        "name": "lieferanten_performance_q1_2025",
        "qualifiedName": "supplyconsult://datalake/lieferanten/q1_2025",
        "description": "Lieferanten-KPIs Q1 2025, Quelle: SAP MM + EWM",
        "owner": "data-team@supplyconsult.de",
        "createTime": 1740825600000
    }
}
client.upload_entities(entity)
\`\`\`

**Praktische Lineage-Strategie für Mittelstandsprojekte:**

Starte nicht mit Atlas (zu schwer). Empfehle OpenLineage + Marquez für den Beginn — Marquez läuft lokal, Overhead minimal, und das Protokoll ist kompatibel mit späteren Migrationen zu Databricks Unity Catalog oder Apache Atlas.`,
        analogy: `In der Lebensmittelindustrie gibt es Rückverfolgbarkeit: Wenn ein Produkt Mängel hat, muss der Hersteller innerhalb von 4 Stunden sagen können, aus welchem Rohstoff-Batch die Charge kommt, welcher Lieferant geliefert hat und welche Produktionsmaschine das Produkt verarbeitet hat. Data Lineage ist die digitale Rückverfolgbarkeit für KI-Systeme — bei einem Audit oder einem Fehler weißt du in Minuten statt Tagen was woher kommt.`,
        consultingRelevance: `Lineage ist im ersten Gespräch selten ein Thema — aber in regulierten Branchen (Automotive, Pharma, Lebensmittel) wird es spätestens beim ersten Audit zum Blocker. Empfehle Lineage-Tracking von Anfang an, auch wenn der Aufwand zunächst übertrieben wirkt. Die Alternative — Lineage im Nachhinein einzubauen — kostet fünfmal so viel. Als Berater kannst du OpenLineage + Marquez als "pragmatische Einstiegslösung" positionieren, die mit dem Projekt skaliert und enterprise-kompatibel ist.`
      },
      {
        title: "Feature Store: Konzept, Feast als Open-Source-Lösung und Abgrenzung",
        content: `Ein Feature Store ist eine zentrale Plattform für das Management von Machine-Learning-Features — die aufbereiteten Eingabegrößen die ein ML-Modell für Vorhersagen nutzt. Für klassisches ML ist ein Feature Store oft notwendig; für LLM-Anwendungen ist er oft unnötig. Diese Unterscheidung zu kennen spart Kunden Geld und dir Glaubwürdigkeit.

**Was ein Feature Store löst:**

\`\`\`
Problem ohne Feature Store:
- Data Scientist berechnet "durchschnittliche Lieferzeit letzter 90 Tage"
  für Training → Feature wird im Python-Notebook berechnet
- ML-Engineer implementiert dasselbe Feature in Java für Production
  → Training-Serving-Skew: leicht unterschiedliche Berechnung = schlechtere Vorhersagen
- Feature wird in drei verschiedenen Projekten dreimal unterschiedlich berechnet
- Kein Caching: Für jede Vorhersage wird dieselbe teure DB-Abfrage neu ausgeführt

Lösung mit Feature Store:
- Feature wird einmal definiert und berechnet
- Dieselbe Definition für Training und Serving (kein Skew)
- Historische Features für Backtesting verfügbar (Point-in-Time Correctness)
- Gecachte Feature-Werte für Low-Latency Serving
\`\`\`

**Feast — Open Source Feature Store:**

\`\`\`python
# feast/feature_repo/features.py
from feast import Entity, Feature, FeatureView, FileSource, ValueType
from datetime import timedelta

# Entity: die "Schlüssel"-Entität für die Features berechnet werden
lieferant = Entity(
    name="lieferant_id",
    value_type=ValueType.STRING,
    description="Eindeutige Lieferanten-ID aus SAP"
)

# Datenquelle (kann Parquet, BigQuery, Snowflake, Redis sein)
lieferant_source = FileSource(
    path="data/lieferant_features.parquet",
    timestamp_field="event_timestamp"
)

# Feature View: definiert welche Features wo herkommen
lieferant_features = FeatureView(
    name="lieferant_performance",
    entities=["lieferant_id"],
    ttl=timedelta(days=1),  # Cache-Dauer
    features=[
        Feature(name="lieferzeit_avg_90d", dtype=ValueType.FLOAT),
        Feature(name="qualitaetsquote_ytd", dtype=ValueType.FLOAT),
        Feature(name="pünktlichkeit_score", dtype=ValueType.FLOAT),
        Feature(name="offene_reklamationen", dtype=ValueType.INT32)
    ],
    source=lieferant_source
)
\`\`\`

\`\`\`python
# Training: Features für historischen Datensatz abrufen
from feast import FeatureStore
import pandas as pd

store = FeatureStore(repo_path="feast/feature_repo")

training_df = pd.DataFrame({
    "lieferant_id": ["L-001", "L-002", "L-003"],
    "event_timestamp": pd.to_datetime(["2024-12-31", "2024-12-31", "2024-12-31"])
})

# Point-in-Time korrekte Features: Was waren die Features zum Zeitpunkt t?
features = store.get_historical_features(
    entity_df=training_df,
    features=["lieferant_performance:lieferzeit_avg_90d",
              "lieferant_performance:qualitaetsquote_ytd"]
).to_df()

# Serving (Produktion): Aktuelle Features für Echtzeit-Vorhersage
online_features = store.get_online_features(
    features=["lieferant_performance:lieferzeit_avg_90d"],
    entity_rows=[{"lieferant_id": "L-001"}]
).to_dict()
\`\`\`

**Wann ein Feature Store Sinn macht:**

\`\`\`
Sinnvoll wenn:
✓ >3 verschiedene ML-Modelle die dasselbe Feature nutzen
✓ Training-Serving-Skew bereits Probleme verursacht hat
✓ >10.000 Vorhersagen/Tag (Caching lohnt sich)
✓ Regulatorische Anforderungen (Rückverfolgbarkeit welches Feature welche Vorhersage beeinflusst)
✓ Mehrere Data Scientists die unabhängig an Features arbeiten

Overkill wenn:
✗ Ein einzelnes ML-Modell mit <1000 Vorhersagen/Tag
✗ Reine LLM-Anwendungen ohne klassisches ML (RAG braucht keinen Feature Store)
✗ Prototyp-Phase (erst wenn das Modell in Production geht)
✗ Team mit <3 Personen die an ML arbeiten
\`\`\`

**Alternativen für kleinere Setups:**

Für Mittelstand-KI-Projekte ohne dediziertes ML-Team: Feature-Berechnungen als SQL-Views in bestehenden DWH materialisieren und mit dbt (data build tool) versionieren. Kein eigener Feature Store, aber reproduzierbar und auditierbar.`,
        analogy: `Ein Feature Store ist wie ein Teilelager in der Fertigung: Statt dass jede Abteilung dieselbe Komponente selbst herstellt, gibt es ein zentrales Lager mit geprüften, standardisierten Teilen. Das spart Aufwand und stellt sicher, dass alle dieselbe Qualität verwenden. Der Feature Store lagert vorberechnete, geprüfte ML-Eingaben statt selbst gefertigter Teile.`,
        consultingRelevance: `Feature Stores werden in Verkaufsgesprächen oft überbewertet — jede MLOps-Plattform bewirbt ihn als essentiell. Dein Wert als Berater liegt darin, ehrlich zu sagen: "Für euren ersten Use Case braucht ihr das nicht." Das spart dem Kunden 3-6 Monate Infrastruktur-Aufbau und positioniert dich als pragmatischen Berater der nicht unnötig Komplexität verkauft. Wenn das zweite oder dritte ML-Projekt kommt, bist du der erste den der Kunde anruft.`
      },
      {
        title: "Datenschutz-Engineering: k-Anonymity, l-Diversity und Pseudonymisierungs-Patterns",
        content: `DSGVO-Compliance ist für die meisten Mittelstandskunden ein Angst-Thema — sie wissen dass es wichtig ist, aber nicht wie man es technisch umsetzt. Als KI-Berater musst du die wichtigsten Privacy-Engineering-Konzepte kennen, um handlungsfähige Empfehlungen zu geben.

**k-Anonymity: Das Grundprinzip:**

Ein Datensatz erfüllt k-Anonymity wenn jede Person in einer Quasi-Identifier-Gruppe durch mindestens k-1 andere Personen ununterscheidbar ist.

\`\`\`python
import pandas as pd

# Original-Datensatz (Mitarbeiter-Bestellverhalten)
df = pd.DataFrame({
    "abteilung": ["Einkauf", "Einkauf", "Einkauf", "Fertigung", "Fertigung",
                  "Logistik"],
    "altersgruppe": ["30-35", "30-35", "35-40", "30-35", "30-35", "40-45"],
    "bestellvolumen_klasse": ["mittel", "mittel", "hoch", "niedrig", "mittel",
                              "hoch"],
    "lieferant_bevorzugt": ["A", "B", "A", "C", "A", "B"]  # sensibles Attribut
})

def check_k_anonymity(df: pd.DataFrame,
                      quasi_identifiers: list[str],
                      k: int = 3) -> dict:
    groups = df.groupby(quasi_identifiers).size().reset_index(name='count')
    violations = groups[groups['count'] < k]
    return {
        "k_erreicht": len(violations) == 0,
        "min_gruppengroesse": groups['count'].min(),
        "verletzungen": violations.to_dict('records')
    }

result = check_k_anonymity(
    df,
    quasi_identifiers=["abteilung", "altersgruppe", "bestellvolumen_klasse"],
    k=3
)
# → Verletzung: Logistik/40-45/hoch hat nur 1 Person → identifizierbar!
\`\`\`

**l-Diversity: Schützt vor Homogenitäts-Angriff:**

k-Anonymity reicht nicht wenn alle Personen in einer Gruppe dasselbe sensible Attribut haben:

\`\`\`python
def check_l_diversity(df: pd.DataFrame,
                      quasi_identifiers: list[str],
                      sensitive_attribute: str,
                      l: int = 2) -> dict:
    """Prüft ob jede Quasi-ID-Gruppe mindestens l verschiedene sensible Werte hat"""
    violations = []

    for name, group in df.groupby(quasi_identifiers):
        diversity = group[sensitive_attribute].nunique()
        if diversity < l:
            violations.append({
                "gruppe": name,
                "diversity": diversity,
                "alle_werte": group[sensitive_attribute].tolist()
            })

    return {
        "l_erreicht": len(violations) == 0,
        "verletzungen": violations
    }

# Selbst wenn k=3 erfüllt: wenn alle 3 Personen in Einkauf/30-35 dasselbe
# bevorzugten Lieferanten haben → Homogenitäts-Angriff möglich
\`\`\`

**Pseudonymisierungs-Patterns für LLM-Pipelines:**

Bevor Produktionsdaten an eine LLM-API gesendet werden, müssen personenbezogene Daten pseudonymisiert werden:

\`\`\`python
import hashlib
import re
from typing import tuple

# Pattern: Ersetze Namen durch Pseudonyme vor API-Call, stelle nach dem Call wieder her
class DataPseudonymizer:
    def __init__(self, salt: str = "static_project_salt_2025"):
        self.salt = salt
        self.forward_map = {}   # original → pseudonym
        self.reverse_map = {}   # pseudonym → original

    def _pseudonymize(self, value: str, prefix: str) -> str:
        hash_val = hashlib.sha256(f"{self.salt}{value}".encode()).hexdigest()[:8]
        pseudonym = f"{prefix}_{hash_val}"
        self.forward_map[value] = pseudonym
        self.reverse_map[pseudonym] = value
        return pseudonym

    def pseudonymize_text(self, text: str) -> tuple[str, dict]:
        """Ersetzt erkannte Entitäten durch Pseudonyme"""
        result = text

        # Lieferantennamen (aus bekannter Liste oder NER)
        lieferanten_pattern = r'(Müller GmbH|Bauer AG|Schmidt & Co\.?)'
        for match in re.finditer(lieferanten_pattern, result, re.IGNORECASE):
            original = match.group()
            pseudo = self._pseudonymize(original, "LIEFERANT")
            result = result.replace(original, pseudo)

        # Personennamen via spaCy NER
        # import spacy; nlp = spacy.load("de_core_news_sm")
        # doc = nlp(result)
        # for ent in doc.ents:
        #     if ent.label_ == "PER":
        #         pseudo = self._pseudonymize(ent.text, "PERSON")
        #         result = result.replace(ent.text, pseudo)

        return result, self.reverse_map

    def restore_text(self, pseudonymized: str) -> str:
        result = pseudonymized
        for pseudo, original in self.reverse_map.items():
            result = result.replace(pseudo, original)
        return result

# Verwendung
p = DataPseudonymizer()
safe_text, mapping = p.pseudonymize_text(
    "Lieferant Müller GmbH hat Bestellung #4521 nicht pünktlich geliefert."
)
# safe_text: "Lieferant LIEFERANT_a3f9b2c1 hat Bestellung #4521 nicht pünktlich geliefert."

result = call_llm_api(safe_text)  # Keine echten Namen an externe API
restored = p.restore_text(result)  # Namen im Ergebnis wiederhergestellt
\`\`\`

**Praktische DSGVO-Checkliste für LLM-Projekte:**

\`\`\`
☐ Welche Daten werden an das LLM gesendet? (Klassifikation: anonym/pseudonym/personenbezogen)
☐ Pseudonymisierung vor API-Call implementiert?
☐ Datenverarbeitungsvertrag (DPA) mit LLM-Anbieter abgeschlossen? (Anthropic: ✓, OpenAI: ✓)
☐ Opt-out für Modell-Training aktiviert? (Anthropic: standard, OpenAI: muss aktiviert werden)
☐ Löschkonzept: Wann werden Logs mit Nutzerdaten gelöscht?
☐ Datenlokalisierung: EU-Region für API-Calls? (Azure OpenAI: EU verfügbar, Anthropic: derzeit nur US)
\`\`\``,
        analogy: `k-Anonymity ist wie das Verpixeln von Gesichtern in einem Gruppenfoto — wenn man fünf Personen unkenntlich macht, ist das nutzlos wenn alle anderen Merkmale (Kleidung, Körpergröße, Umgebung) trotzdem auf eine bestimmte Person hinweisen. l-Diversity stellt sicher, dass die unkenntlich gemachten Personen auch in ihren sonstigen Eigenschaften ausreichend verschieden sind.`,
        consultingRelevance: `Der häufigste Fehler in KI-Projekten ist es, echte Kundendaten unreflektiert an externe LLM-APIs zu schicken "weil es schnell geht". Das Risiko ist real: Datenschutzverletzungen können Bußgelder bis 4% des Jahresumsatzes nach sich ziehen. Als Berater bist du in der Pflicht, dieses Thema proaktiv anzusprechen — auch wenn der Kunde es nicht fragt. Pseudonymisierungs-Patterns sind eine technische Antwort die Projekte nicht blockiert sondern ermöglicht: "Wir können mit euren Daten arbeiten, und zwar DSGVO-konform."`,
      }
    ],
    gfSummary: `Daten sind der kritische Erfolgsfaktor für KI im Mittelstand — und gleichzeitig das größte Hemmnis. Die richtigen Architekturentscheidungen (Cloud-DWH + Vektor-Store für die meisten Fälle, kein Data Mesh unter 500 Mitarbeitern) sparen Monate unnötiger Komplexität. Synthetische Daten lösen das DSGVO-Dilemma und ermöglichen bessere Trainingsdaten als oft vorhanden. Data Lineage und Pseudonymisierung sind keine bürokratischen Pflichten, sondern Wettbewerbsvorteile: Auditierbarkeit und Datenschutz-Compliance öffnen regulierte Branchen wie Automotive und Pharma. Feature Stores sind ein mächtiges Werkzeug — aber nur für Kunden die sie wirklich brauchen.`
  },

  "mcp-tools": {
    title: "MCP in Production",
    layerLevel: 3,
    estimatedMinutes: 70,
    steps: [
      {
        title: "MCP-Server implementieren: Vollständige Python-Implementierung",
        content: `Layer 2 hat das MCP-Protokoll (Model Context Protocol) als Konzept eingeführt. Layer 3 zeigt die vollständige Implementierung eines produktionsreifen MCP-Servers — von der Struktur über Error Handling bis zu Testing.

**Zwei Implementierungswege:**

**1. FastMCP (High-Level, empfohlen für Start):**

\`\`\`python
# mcp_server/lieferanten_server.py
from mcp.server.fastmcp import FastMCP
from typing import Optional
import httpx
import json

# Server initialisieren
mcp = FastMCP(
    name="lieferanten-management",
    version="1.0.0",
    description="MCP-Server für Lieferantendaten aus SAP und CRM"
)

# Tool-Definition mit vollständiger Typisierung
@mcp.tool()
async def get_lieferant_details(
    lieferant_id: str,
    include_performance: bool = True
) -> dict:
    """
    Gibt Details zu einem Lieferanten zurück.

    Args:
        lieferant_id: SAP-Lieferantennummer (Format: L-XXXXX oder numerisch)
        include_performance: Ob KPI-Daten eingeschlossen werden sollen

    Returns:
        Lieferant-Stammdaten inkl. optionaler Performance-KPIs
    """
    # Input-Validierung
    if not lieferant_id or len(lieferant_id) > 20:
        raise ValueError(f"Ungültige Lieferanten-ID: {lieferant_id}")

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(
            f"https://erp.intern.de/api/lieferanten/{lieferant_id}",
            headers={"Authorization": f"Bearer {get_token()}"}
        )
        response.raise_for_status()
        data = response.json()

    if include_performance:
        perf = await get_performance_kpis(lieferant_id, client)
        data["performance"] = perf

    return data


@mcp.tool()
async def search_lieferanten(
    stichwort: str,
    kategorie: Optional[str] = None,
    max_ergebnisse: int = 10
) -> list[dict]:
    """
    Sucht Lieferanten nach Stichwort und optionaler Kategorie.

    Args:
        stichwort: Suchbegriff (Name, Ort, Artikel)
        kategorie: Filtert auf Warengruppe (z.B. "Hydraulik", "Elektro")
        max_ergebnisse: Maximale Anzahl Ergebnisse (1-50)
    """
    if not 1 <= max_ergebnisse <= 50:
        raise ValueError("max_ergebnisse muss zwischen 1 und 50 liegen")

    params = {"q": stichwort, "limit": max_ergebnisse}
    if kategorie:
        params["kategorie"] = kategorie

    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://erp.intern.de/api/lieferanten/search",
            params=params
        )
        return response.json()["results"]


# Resource-Definition (schreibgeschützte Daten)
@mcp.resource("lieferant://{lieferant_id}/stammdaten")
async def get_lieferant_stammdaten(lieferant_id: str) -> str:
    """Gibt Lieferant-Stammdaten als formatiertes Markdown zurück"""
    data = await get_lieferant_details(lieferant_id, include_performance=False)
    return f"""# Lieferant {data['name']} ({lieferant_id})

**Adresse:** {data['adresse']['strasse']}, {data['adresse']['plz']} {data['adresse']['ort']}
**Ansprechpartner:** {data.get('ansprechpartner', 'nicht hinterlegt')}
**Zahlungsziel:** {data['zahlungsbedingungen']['tage']} Tage
**Aktiv seit:** {data['aktiv_seit']}
"""


# Server starten
if __name__ == "__main__":
    mcp.run(transport="stdio")  # Stdio für Claude Desktop
    # mcp.run(transport="sse", port=8080)  # SSE für Web-Clients
\`\`\`

**2. Raw SDK (Low-Level, für volle Kontrolle):**

\`\`\`python
# Für spezielle Anforderungen (Custom Transport, Middleware, etc.)
import asyncio
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

server = Server("lieferanten-raw")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_bestellhistorie",
            description="Ruft Bestellhistorie für einen Lieferanten ab",
            inputSchema={
                "type": "object",
                "properties": {
                    "lieferant_id": {"type": "string"},
                    "von": {"type": "string", "format": "date"},
                    "bis": {"type": "string", "format": "date"}
                },
                "required": ["lieferant_id"]
            }
        )
    ]

@server.call_tool()
async def handle_call_tool(
    name: str, arguments: dict
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    if name == "get_bestellhistorie":
        result = await fetch_bestellhistorie(**arguments)
        return [types.TextContent(type="text", text=json.dumps(result))]
    raise ValueError(f"Unbekanntes Tool: {name}")

async def main():
    from mcp.server.stdio import stdio_server
    async with stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream,
                         InitializationOptions(
                             server_name="lieferanten-raw",
                             server_version="1.0.0"
                         ))

asyncio.run(main())
\`\`\`

**Claude Desktop Integration:**

\`\`\`json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "lieferanten": {
      "command": "python",
      "args": ["/Users/berater/mcp-server/lieferanten_server.py"],
      "env": {
        "SAP_API_URL": "https://erp.intern.de/api",
        "SAP_API_TOKEN": "Bearer eyJ..."
      }
    }
  }
}
\`\`\``,
        analogy: `Ein MCP-Server ist wie ein spezialisierter Werkzeugkoffer den du dem KI-Assistenten überreichst: Jedes Tool im Koffer hat einen Namen, eine Beschreibung was es tut, und klare Einschränkungen was es kann und was nicht. Der Assistent entscheidet selbst wann er welches Werkzeug greift — aber du hast die Werkzeuge gestaltet und ihre Grenzen definiert.`,
        consultingRelevance: `MCP-Server sind das stärkste Argument für Claude als Enterprise-KI-Plattform — die Fähigkeit, SAP-Daten, interne Wikis und Monitoring-Systeme direkt in den Assistenten zu integrieren ohne API-Entwicklung von Grund auf. Als Berater kannst du einen MCP-Server für die SAP-Anbindung als "Quick Win" positionieren: Innerhalb einer Woche hat der Einkaufsleiter einen Assistenten der direkt Lieferantendaten abrufen kann. Das ist ein greifbarer Mehrwert der Vertrauen für größere Projekte aufbaut.`
      },
      {
        title: "Tool-Sicherheit: OAuth für MCP, Rate Limiting und Input Validation",
        content: `Ein MCP-Server ohne Sicherheitsarchitektur ist eine offene Backdoor in interne Systeme. Da MCP-Tools direkten Zugriff auf Datenbanken, APIs und Dateisysteme ermöglichen, sind Sicherheitsmechanismen keine optionale Ergänzung, sondern fundamentale Anforderungen.

**OAuth 2.0 für MCP (Remote Server):**

Für MCP-Server die über das Netzwerk erreichbar sind (SSE-Transport), ist OAuth der Standard:

\`\`\`python
# mcp_server/auth.py
from fastapi import HTTPException, Security
from fastapi.security import OAuth2AuthorizationCodeBearer
import httpx
import jwt
from functools import wraps

# OAuth2 mit Keycloak oder Azure AD
oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl="https://auth.firma.de/realms/intern/protocol/openid-connect/auth",
    tokenUrl="https://auth.firma.de/realms/intern/protocol/openid-connect/token",
    scopes={
        "mcp:read": "Lesezugriff auf MCP-Tools",
        "mcp:write": "Schreibzugriff auf MCP-Tools",
        "lieferanten:admin": "Administrative Lieferanten-Operationen"
    }
)

async def verify_token_and_scopes(token: str, required_scopes: list[str]) -> dict:
    """Verifiziert JWT und prüft erforderliche Scopes"""
    try:
        # Public Key von JWKS-Endpoint holen (gecacht)
        payload = jwt.decode(
            token,
            options={"verify_signature": True},
            algorithms=["RS256"],
            audience="mcp-lieferanten-server"
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token abgelaufen")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Ungültiger Token: {e}")

    token_scopes = payload.get("scope", "").split()
    for scope in required_scopes:
        if scope not in token_scopes:
            raise HTTPException(
                status_code=403,
                detail=f"Fehlender Scope: {scope}"
            )

    return payload  # Enthält user_id, department, etc.
\`\`\`

**Rate Limiting pro User:**

\`\`\`python
# Sliding Window Rate Limiter mit Redis
import redis.asyncio as redis
import time

class RateLimiter:
    def __init__(self, redis_client, max_requests: int = 100,
                 window_seconds: int = 60):
        self.redis = redis_client
        self.max_requests = max_requests
        self.window = window_seconds

    async def check_rate_limit(self, user_id: str, tool_name: str) -> bool:
        key = f"rate_limit:{user_id}:{tool_name}"
        now = time.time()
        window_start = now - self.window

        pipe = self.redis.pipeline()
        # Alte Einträge löschen
        pipe.zremrangebyscore(key, 0, window_start)
        # Aktuellen Request hinzufügen
        pipe.zadd(key, {str(now): now})
        # Anzahl Requests im Window
        pipe.zcard(key)
        # Expiry setzen
        pipe.expire(key, self.window * 2)

        _, _, count, _ = await pipe.execute()

        if count > self.max_requests:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit überschritten: {count}/{self.max_requests} "
                       f"Requests in {self.window}s"
            )
        return True

# Unterschiedliche Limits per Tool
TOOL_RATE_LIMITS = {
    "get_lieferant_details": (200, 60),       # 200/min
    "search_lieferanten": (50, 60),            # 50/min (teuer)
    "update_lieferant_daten": (20, 60),        # 20/min (Schreibzugriff)
    "bulk_export_lieferanten": (5, 3600),      # 5/Stunde (sehr teuer)
}
\`\`\`

**Input Validation gegen Prompt Injection:**

\`\`\`python
import re
from pydantic import BaseModel, validator, Field

class LieferantSucheInput(BaseModel):
    stichwort: str = Field(..., min_length=2, max_length=100)
    kategorie: Optional[str] = Field(None, max_length=50)
    max_ergebnisse: int = Field(10, ge=1, le=50)

    @validator("stichwort")
    def validate_stichwort(cls, v):
        # SQL Injection Prevention
        gefaehrliche_patterns = [
            r"[;'\"]",              # SQL-Sonderzeichen
            r"--",                   # SQL-Kommentar
            r"\/\*.*\*\/",          # Multi-line Kommentar
            r"\b(DROP|DELETE|INSERT|UPDATE|EXEC)\b",  # SQL-Keywords
        ]
        for pattern in gefaehrliche_patterns:
            if re.search(pattern, v, re.IGNORECASE):
                raise ValueError(f"Ungültige Zeichen in Suchbegriff")

        # Prompt Injection Prevention
        prompt_injection_patterns = [
            r"ignore (previous|all) instructions",
            r"you are now",
            r"system prompt",
            r"<\|.*\|>",            # Modell-spezifische Token
        ]
        for pattern in prompt_injection_patterns:
            if re.search(pattern, v, re.IGNORECASE):
                raise ValueError("Ungültige Eingabe erkannt")

        return v.strip()

# Error Boundaries: Fehlschlagen eines Tools darf Server nicht abstürzen
@mcp.tool()
async def sicheres_tool(input_data: LieferantSucheInput) -> dict:
    try:
        validated = LieferantSucheInput(**input_data)
        await rate_limiter.check_rate_limit(current_user_id, "search")
        return await do_actual_search(validated)
    except ValueError as e:
        return {"error": "VALIDATION_ERROR", "message": str(e)}
    except httpx.TimeoutException:
        return {"error": "UPSTREAM_TIMEOUT",
                "message": "SAP-System antwortet nicht"}
    except Exception as e:
        logger.error(f"Unerwarteter Fehler in tool: {e}", exc_info=True)
        return {"error": "INTERNAL_ERROR",
                "message": "Interner Fehler — bitte Administrator informieren"}
\`\`\`

**Security-Checkliste MCP Production:**

\`\`\`
☐ Authentifizierung: OAuth 2.0 für Remote-Server, keine anonymen Zugriffe
☐ Autorisierung: Scope-basiert, Least-Privilege-Prinzip
☐ Rate Limiting: per User und per Tool, Redis-backed
☐ Input Validation: Pydantic-Modelle für alle Tool-Inputs
☐ Error Handling: Keine Stack Traces an Clients, strukturierte Fehlermeldungen
☐ Logging: Alle Tool-Calls mit user_id, Zeitstempel, Parameter (ohne Secrets)
☐ Secrets: Keine API Keys im Code, Environment Variables oder Vault
☐ TLS: Immer HTTPS für Remote-Server, Zertifikat-Pinning erwägen
\`\`\``,
        analogy: `Ein MCP-Server ohne Sicherheitsarchitektur ist wie ein Schlüsselkopierservice der keine Ausweise prüft — jeder kann sich einen Schlüssel für jedes Schloss anfertigen lassen. Rate Limiting, OAuth und Input Validation sind die Identitätsprüfung, das Zugriffsprotokoll und die Materialprüfung, ohne die kein seriöser Schlüsselservice arbeiten würde.`,
        consultingRelevance: `Im Gespräch mit IT-Sicherheitsverantwortlichen beim Kunden ist dies der entscheidende Punkt: "Wer kann auf den MCP-Server zugreifen, und was kann er damit tun?" Ohne eine klare Antwort wird das Projekt geblockt. Mit der gezeigten Sicherheitsarchitektur kannst du überzeugend argumentieren: "Nur authentifizierte Nutzer mit spezifischen Scopes, mit Rate Limiting und vollständigem Audit-Log." Das öffnet Türen die ohne diese Vorbereitung geschlossen bleiben.`
      },
      {
        title: "MCP-Ökosystem: Verfügbare Server und Bewertung für Enterprise-Einsatz",
        content: `Das MCP-Ökosystem wächst schnell — Anthropic und die Community stellen fertige MCP-Server für viele Business-Systeme bereit. Die Kunst liegt darin, die richtigen Server auszuwählen und ihre Enterprise-Tauglichkeit realistisch zu bewerten.

**Offiziell unterstützte Anthropic-Server:**

\`\`\`
Server              | Beschreibung              | Enterprise-Eignung | Notes
--------------------|---------------------------|-------------------|------------------------
filesystem          | Lokale Dateisystem-Ops    | ✓✓ (intern)      | Pfad-Sandboxing beachten
postgresql          | PostgreSQL Queries         | ✓✓               | Read-only Modus empfohlen
github              | Repos, Issues, PRs         | ✓✓               | PAT oder GitHub App Auth
slack               | Channels, Messages         | ✓                | Bot-Token, Rate Limits
puppeteer           | Browser-Automation         | ✓ (mit Vorsicht) | Sandbox-Umgebung notwendig
google-maps         | Geodaten, Routing          | ✓                | API-Kosten beachten
brave-search        | Web-Suche                  | ✓                | Kein Google-Lock-in
memory              | Persistente Erinnerungen   | ✓ (begrenzt)     | Kein echter Vektor-Store
\`\`\`

**Bewertung für Supply-Chain-Kontext:**

**PostgreSQL MCP-Server — sehr empfohlen:**

\`\`\`json
// Claude Desktop Config
{
  "mcpServers": {
    "produktions-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres",
               "postgresql://readonly_user:pw@db.intern.de:5432/produktion"],
      "env": {}
    }
  }
}
\`\`\`

\`\`\`
Einsatz: Claude kann direkt Produktionsdaten abfragen (Lagerbestände, Bestellhistorie)
Sicherheit: Read-only User anlegen! Nie den Admin-User verwenden.
Limit: Kein Connection Pooling im Default-Setup → bei >10 parallelen Nutzern PgBouncer vorschalten
Kosten: Nur Server-Hosting, keine API-Gebühren
\`\`\`

**GitHub MCP-Server — empfohlen für Entwicklungsteams:**

\`\`\`bash
# Als GitHub App mit granularen Berechtigungen (besser als PAT)
export GITHUB_APP_ID=12345
export GITHUB_PRIVATE_KEY_PATH=/secrets/github-app.pem
export GITHUB_INSTALLATION_ID=67890

npx @modelcontextprotocol/server-github
\`\`\`

\`\`\`
Einsatz: Code-Review-Unterstützung, Issue-Analyse, Dokumentation generieren
Sicherheit: GitHub App statt PAT — granulare Repo-Berechtigungen, keine Org-Admin-Rechte
Limit: Rate Limits der GitHub API (5000 req/h mit App-Token)
\`\`\`

**Puppeteer MCP-Server — mit Einschränkungen:**

\`\`\`
Einsatz: Web-Scraping, Screenshot-Analyse, Legacy-Web-App-Automatisierung
Sicherheit-Risiken:
  - SSRF (Server-Side Request Forgery): Browser kann interne Netzwerk-Ressourcen abrufen
  - Sandbox: Immer in isoliertem Container (Docker mit --network=none für interne URLs)
  - Content Security Policy: Webseiten können XSS-Payloads enthalten
Empfehlung: Nur in Whitelist-Modus betreiben (erlaubte URLs vordefinieren)
\`\`\`

**Community Server — Qualitätsprüfung notwendig:**

\`\`\`python
# Checkliste für Community MCP-Server Evaluation
EVALUATION_CHECKLIST = {
    "github_sterne": "> 100 Sterne als Mindestindikator",
    "aktive_wartung": "letzter Commit < 3 Monate",
    "sicherheitsaudit": "keine bekannten CVEs, Abhängigkeiten aktuell",
    "input_validation": "Pydantic oder ähnliche Validierung vorhanden",
    "error_handling": "strukturierte Fehlermeldungen, keine Stack Traces",
    "authentifizierung": "OAuth oder API-Key-Support vorhanden",
    "dokumentation": "vollständige Tool-Beschreibungen mit Beispielen",
    "lizenz": "kompatibel mit Unternehmenspolitik (MIT/Apache bevorzugt)"
}

# Beispiel: SAP MCP-Server (hypothetisch)
sap_server_eval = {
    "verfügbar": "https://github.com/beispiel/mcp-sap-connector",
    "github_sterne": 45,         # WARNUNG: zu wenig
    "aktive_wartung": "8 Monate ohne Commit",  # WARNUNG
    "sicherheitsaudit": "nicht durchgeführt",  # BLOCKER
    "empfehlung": "NICHT verwenden — selbst implementieren oder warten"
}
\`\`\`

**Eigene Server-Registry für das Team:**

\`\`\`yaml
# mcp-registry.yaml — interne Server-Übersicht
servers:
  - name: lieferanten-api
    version: "2.1.0"
    status: PRODUCTION
    transport: stdio
    owner: team-einkauf
    tools: [get_lieferant, search_lieferanten, update_kontakt]
    auth: oauth2_keycloak
    sla: "99.5% Uptime, <500ms p95"

  - name: sap-readonly
    version: "1.0.3"
    status: PRODUCTION
    transport: sse
    owner: team-it
    tools: [query_mm, query_sd, query_fi]
    auth: service_principal
    sla: "99% Uptime (abhängig von SAP)"

  - name: dokument-suche
    version: "0.8.1"
    status: PILOT
    transport: stdio
    tools: [search_docs, get_doc_content]
    note: "Nur für Pilot-Nutzer, noch nicht produktionsreif"
\`\`\``,
        analogy: `Das MCP-Ökosystem ist wie ein Marktplatz für Spezialwerkzeuge: Es gibt hochwertige Markentools (Anthropic-Server), solide Community-Tools von erfahrenen Handwerkern, und billige Importe mit fraglicher Qualität. Bevor du ein Tool in die Produktionswerkstatt lässt, prüfst du Materialzertifikate und Herstellerreferenzen — genau das ist das Evaluation-Framework.`,
        consultingRelevance: `Kunden fragen oft: "Gibt es schon einen MCP-Server für SAP?" Die ehrliche Antwort ist meistens: "Community-Server existieren, aber keiner ist bisher produktionsreif und sicherheitsauditiert." Das ist keine schlechte Nachricht — es ist ein Projektauftrag. Du kannst anbieten, einen produktionsreifen SAP-MCP-Server zu entwickeln, der dem Kunden dauerhaften Mehrwert liefert und potentiell als Asset für andere Kunden wiederverwendbar ist. Das ist die Standardsituation in einem wachsenden Ökosystem.`
      },
      {
        title: "Custom Tool-Development: Best Practices, Self-Describing Tools und Testing",
        content: `Gut designte MCP-Tools sind mehr als funktionierende Code-Snippets — sie sind die Schnittstelle zwischen dem LLM und der Unternehmenswelt. Das LLM entscheidet anhand der Tool-Beschreibung, ob und wie es ein Tool aufruft. Schlechte Beschreibungen führen zu falschen Tool-Aufrufen, missverstandenen Parametern und schwer debuggbaren Fehlern.

**Prinzip 1: Self-Describing Tools**

\`\`\`python
# SCHLECHT: Minimale Beschreibung
@mcp.tool()
async def get_order(id: str) -> dict:
    """Gibt Bestellung zurück"""  # Was für eine ID? Welches Format? Was enthält die Antwort?
    return fetch_from_db(id)

# GUT: Vollständige, präzise Beschreibung
@mcp.tool()
async def get_bestellung_details(
    bestellnummer: str,
    include_positionen: bool = True,
    include_lieferstatus: bool = False
) -> dict:
    """
    Ruft Details zu einer Einkaufsbestellung ab.

    Verwende dieses Tool wenn du Informationen zu einer spezifischen Bestellung
    benötigst: Bestelldatum, Lieferant, bestellte Artikel, Menge und Preis.

    Args:
        bestellnummer: SAP-Bestellnummer im Format XXXXXXXXXX (10-stellig numerisch).
                      Beispiel: "4500123456". NICHT die interne Datenbank-ID verwenden.
        include_positionen: Wenn True, werden alle Bestellpositionen mitgeliefert.
                           Setze auf False wenn du nur Kopfdaten benötigst (schneller).
        include_lieferstatus: Wenn True, wird aktueller Wareneingangs-Status pro
                             Position mitgeliefert (benötigt zusätzliche DB-Abfrage).

    Returns:
        {
          "kopf": {"bestellnummer": str, "lieferant": str, "bestelldatum": str,
                   "gesamtwert": float, "waehrung": str},
          "positionen": [{"pos_nr": int, "material": str, "menge": float,
                          "einheit": str, "nettopreis": float}],  # wenn requested
          "lieferstatus": {...}  # wenn requested
        }

    Mögliche Fehler:
        - BESTELLUNG_NICHT_GEFUNDEN: Bestellnummer existiert nicht
        - KEINE_BERECHTIGUNG: Bestellung gehört zu einer anderen Abteilung
        - SAP_NICHT_ERREICHBAR: SAP-System temporär nicht verfügbar
    """
    # Implementation...
\`\`\`

**Prinzip 2: Idempotenz und Nebeneffekte klar kennzeichnen:**

\`\`\`python
@mcp.tool()
async def erstelle_bestellanforderung(
    material_nr: str,
    menge: float,
    bedarfsdatum: str,
    kostenstelle: str
) -> dict:
    """
    ACHTUNG: Dieses Tool erstellt eine ECHTE Bestellanforderung in SAP (BANF).
    Dieser Vorgang ist NICHT rückgängig zu machen ohne manuelle Stornierung.

    Verwende dieses Tool NUR wenn der Nutzer explizit bestätigt hat, dass
    eine neue Bestellanforderung angelegt werden soll.

    Empfehlung: Vorher get_bestellanforderungen aufrufen um Duplikate zu vermeiden.
    """
\`\`\`

**Prinzip 3: Strukturiertes Testing mit pytest:**

\`\`\`python
# tests/test_lieferanten_tools.py
import pytest
from unittest.mock import AsyncMock, patch
from mcp_server.lieferanten_server import get_lieferant_details, search_lieferanten

@pytest.fixture
def mock_sap_response():
    return {
        "id": "L-001",
        "name": "Müller Metallbau GmbH",
        "adresse": {"strasse": "Industriestr. 5", "plz": "80331", "ort": "München"},
        "zahlungsbedingungen": {"tage": 30}
    }

@pytest.mark.asyncio
async def test_get_lieferant_success(mock_sap_response):
    with patch("mcp_server.lieferanten_server.httpx.AsyncClient") as mock_client:
        mock_client.return_value.__aenter__.return_value.get = AsyncMock(
            return_value=AsyncMock(
                status_code=200,
                json=lambda: mock_sap_response,
                raise_for_status=lambda: None
            )
        )
        result = await get_lieferant_details("L-001", include_performance=False)
        assert result["name"] == "Müller Metallbau GmbH"

@pytest.mark.asyncio
async def test_get_lieferant_invalid_id():
    with pytest.raises(ValueError, match="Ungültige Lieferanten-ID"):
        await get_lieferant_details("A" * 25)  # Zu lang

@pytest.mark.asyncio
async def test_search_rate_limit_validation():
    with pytest.raises(ValueError):
        await search_lieferanten("Pumpe", max_ergebnisse=100)  # Über Limit

@pytest.mark.asyncio
async def test_sap_timeout_graceful():
    with patch("mcp_server.lieferanten_server.httpx.AsyncClient") as mock_client:
        mock_client.return_value.__aenter__.return_value.get = AsyncMock(
            side_effect=httpx.TimeoutException("Timeout")
        )
        result = await get_lieferant_details("L-001")
        assert result["error"] == "UPSTREAM_TIMEOUT"  # Kein Exception-Crash

# Integration Test mit echtem MCP-Client
@pytest.mark.integration
async def test_full_mcp_roundtrip():
    from mcp import ClientSession, StdioServerParameters
    from mcp.client.stdio import stdio_client

    server_params = StdioServerParameters(
        command="python",
        args=["mcp_server/lieferanten_server.py"]
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            assert any(t.name == "get_lieferant_details" for t in tools.tools)

            result = await session.call_tool(
                "get_lieferant_details",
                arguments={"lieferant_id": "TEST-001"}
            )
            assert result.content[0].type == "text"
\`\`\`

**CI/CD für MCP-Server:**

\`\`\`yaml
# .github/workflows/mcp-test.yml
name: MCP Server Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Unit + Integration Tests
        run: |
          pip install -r requirements.txt pytest pytest-asyncio
          pytest tests/ -v --timeout=30 -m "not integration"
      - name: Security Scan
        run: pip install bandit && bandit -r mcp_server/
      - name: Dependency Check
        run: pip install safety && safety check
\`\`\``,
        analogy: `Ein gut geschriebenes MCP-Tool ist wie ein präzises Datenblatt für ein technisches Bauteil: Es beschreibt nicht nur was das Teil tut, sondern auch welche Eingänge es erwartet, welche Ausgänge es liefert, welche Toleranzen es hat und was bei Überbelastung passiert. Ein Maschinenbauer ohne Datenblatt kauft das Bauteil nicht — ein LLM ohne präzise Tool-Beschreibung ruft das Tool falsch auf.`,
        consultingRelevance: `Die Qualität deiner MCP-Tool-Beschreibungen bestimmt direkt die Qualität des Assistenten den der Kunde erlebt. Wenn das LLM ein Tool falsch aufruft weil die Beschreibung mehrdeutig war, ist das aus Kundenperspektive ein KI-Fehler — nicht ein Beschreibungsfehler. Nimm dir bewusst Zeit für Beschreibungen und teste sie mit echten LLM-Aufrufen. Eine Stunde in Tool-Dokumentation investiert spart Tage Debugging und Kundengespräche über "warum macht die KI das falsch".`
      },
      {
        title: "MCP vs. Function Calling vs. OpenAPI: Vergleich und Migrationspfade",
        content: `In Kundengesprächen wirst du regelmäßig gefragt: "Wir haben bereits eine OpenAPI-Dokumentation unserer API — können wir die direkt nutzen? Brauchen wir MCP?" Die Antwort erfordert ein klares Verständnis der drei Paradigmen und ihrer Trade-offs.

**Technischer Vergleich:**

\`\`\`
Merkmal              | Function Calling    | OpenAPI             | MCP
---------------------|---------------------|---------------------|--------------------
Standard von         | OpenAI (2023)       | OpenAPI Initiative  | Anthropic (2024)
Protokoll            | JSON über HTTP      | REST + JSON Schema  | JSON-RPC über stdio/SSE
Tool-Discovery       | Statisch (im Prompt)| Dynamisch via Spec  | Dynamisch via Server
Multi-Tool-Session   | Zustandslos         | Zustandslos         | Zustandsbehaftet möglich
Ressourcen-Konzept   | Nur Tools           | Nur Endpoints       | Tools + Resources + Prompts
Server-Seite         | Kein Standard       | Swagger/OpenAPI     | MCP-SDK
Client-Unterstützung | GPT-4, Gemini, etc. | Alle HTTP-Clients   | Claude, MCP-Clients
Streaming            | Nein (Standard)     | Nein (ohne SSE)     | Ja (SSE-Transport)
Local Execution      | Nein                | Nein                | Ja (stdio)
\`\`\`

**Function Calling — der OpenAI-Standard:**

\`\`\`python
# OpenAI Function Calling
tools = [{
    "type": "function",
    "function": {
        "name": "get_lieferant",
        "description": "Ruft Lieferantendaten ab",
        "parameters": {
            "type": "object",
            "properties": {
                "lieferant_id": {"type": "string"}
            },
            "required": ["lieferant_id"]
        }
    }
}]

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Zeige Lieferant L-001"}],
    tools=tools
)

# Wenn Modell Tool aufruft: manuell ausführen und Ergebnis zurückgeben
if response.choices[0].finish_reason == "tool_calls":
    tool_call = response.choices[0].message.tool_calls[0]
    result = execute_tool(tool_call.function.name,
                          json.loads(tool_call.function.arguments))
    # Zweiter API-Call mit Ergebnis...
\`\`\`

**Von OpenAPI zu MCP — Migrations-Pattern:**

\`\`\`python
# openapi_to_mcp.py — Automatische Konvertierung
import yaml
from mcp.server.fastmcp import FastMCP

def generate_mcp_from_openapi(openapi_spec_path: str) -> FastMCP:
    """Konvertiert eine OpenAPI-Spec in MCP-Tools"""
    with open(openapi_spec_path) as f:
        spec = yaml.safe_load(f)

    mcp = FastMCP(name=spec["info"]["title"])

    for path, path_item in spec["paths"].items():
        for method, operation in path_item.items():
            if method not in ["get", "post"]:
                continue

            # Tool-Name aus operationId oder Pfad generieren
            tool_name = operation.get("operationId",
                                      path.replace("/", "_").strip("_"))

            # Parameter-Schema aus OpenAPI extrahieren
            params = {}
            for param in operation.get("parameters", []):
                params[param["name"]] = {
                    "type": param["schema"]["type"],
                    "description": param.get("description", "")
                }

            # Dynamisch Tool registrieren
            @mcp.tool(name=tool_name, description=operation.get("summary", ""))
            async def auto_tool(**kwargs):
                async with httpx.AsyncClient() as client:
                    url = f"{spec['servers'][0]['url']}{path}"
                    if method == "get":
                        return (await client.get(url, params=kwargs)).json()
                    else:
                        return (await client.post(url, json=kwargs)).json()

    return mcp
\`\`\`

**Wann welches Paradigma:**

\`\`\`
Function Calling wählen wenn:
✓ Primäres Modell ist GPT-4 oder Gemini (kein Claude)
✓ Bestehende OpenAI-Integration soll erweitert werden
✓ Stateless, einfache Tool-Aufrufe ohne Session-State

OpenAPI direkt nutzen wenn:
✓ Bestehende REST-API mit Swagger-Docs
✓ Nicht-KI-Clients (Mobile, Frontend) nutzen dieselbe API
✓ Multi-Modell-Strategie (verschiedene LLMs nutzen dieselbe API)

MCP wählen wenn:
✓ Claude ist das primäre oder einzige Modell
✓ Lokale Ressourcen (Dateisystem, lokale DBs) eingebunden werden sollen
✓ Persistenter Server-State benötigt wird
✓ Resources (strukturierte Daten) zusätzlich zu Tools
✓ Claude Desktop Integration erwünscht
\`\`\`

**Koexistenz-Strategie für Enterprise:**

Die meisten größeren Deployments werden nicht auf ein Paradigma setzen. Eine pragmatische Architektur:

\`\`\`
REST API (intern) → OpenAPI Spec
        ↓                    ↓
MCP-Server         Function-Calling-Wrapper
(für Claude)       (für OpenAI/Gemini)
        ↓                    ↓
        LLM-Agenten-Layer (Routing)
\`\`\`

Dieselbe Business-Logik wird einmal implementiert und über beide Interfaces exponiert. Migrationsaufwand bei LLM-Wechsel: minimal.`,
        analogy: `MCP, Function Calling und OpenAPI sind wie drei verschiedene Steckernormen für dasselbe elektrische Gerät: Das Gerät (die Business-Logik dahinter) ist identisch, aber je nach Land (LLM-Anbieter) brauchst du den richtigen Adapter. Kluge Architekten bauen Geräte mit Universaladapter — die Business-Logik einmal, mehrere Interfaces drauf.`,
        consultingRelevance: `Die Frage "MCP oder Function Calling" ist oft eine Proxy-Frage für "Claude oder OpenAI". Hilf dem Kunden, die eigentliche Frage zu stellen: "Welches Modell passt zu unserem Use Case, und wieviel Vendor-Lock-in akzeptieren wir?" Wenn die Antwort "primär Claude, aber Multi-Modell-Offenheit gewünscht" ist, empfiehl eine Koexistenzstrategie. Das zeigt architektonische Weitsicht und schützt den Kunden vor Abhängigkeiten die heute noch nicht absehbar sind.`
      }
    ],
    gfSummary: `MCP (Model Context Protocol) verwandelt Claude von einem isolierten Assistenten in ein System das direkt mit SAP, Datenbanken, GitHub und internen APIs kommuniziert. Der Unterschied zwischen einem Demo-Server und einem produktionsreifen Server liegt in drei Bereichen: Sicherheitsarchitektur (OAuth, Rate Limiting, Input Validation), Tool-Qualität (präzise Beschreibungen die das LLM korrekt interpretiert), und Testing (automatisierte Tests die Regressionen abfangen). Das MCP-Ökosystem bietet fertige Server für viele Systeme — aber im Enterprise-Kontext schlägt "selbst implementiert und auditiert" immer "schnell aus der Community gezogen". Für Kunden die bereits OpenAI-basierte Function Calling nutzen ist eine Koexistenzstrategie der pragmatische Weg.`
  },

};

export default PHASE3_LAYER3_PART2;

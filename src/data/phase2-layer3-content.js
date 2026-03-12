export const PHASE2_LAYER3 = {

  "erp-as-datasource": {
    title: "ERP-Integration für Production",
    layerLevel: 3,
    estimatedMinutes: 85,
    steps: [
      {
        title: "SAP OData V4 Deep-Dive: Filter, Expand, Batch und Delta-Queries",
        content: `OData V4 ist der moderne Standard für SAP-API-Zugriffe und übertrifft RFC/BAPI in Flexibilität und Performance deutlich. Für Production-Integrationen musst du die erweiterten Abfragemöglichkeiten beherrschen.

**Filter-Syntax im Detail:**

OData V4 bietet mächtige Filteroperatoren weit über einfache Gleichheitsprüfungen hinaus:

\`\`\`
# Einfacher Filter
GET /sap/opu/odata4/sap/api_material/srvd_a2x/sap/material/0001/Material
  ?$filter=MaterialType eq 'FERT' and Plant eq '1000'

# Komplexer Filter mit Funktionen
GET /Material?$filter=contains(MaterialDescription,'Pumpe')
  and CreationDate gt 2024-01-01T00:00:00Z
  and to_MaterialPlant/any(p: p/Plant eq '1000')

# Top-N mit Sortierung
GET /Material?$top=100&$orderby=CreationDate desc&$select=Material,MaterialDescription
\`\`\`

**$expand für Navigationseigenschaften:**

Das teuerste Anti-Pattern bei SAP OData ist N+1-Abfragen: erst alle Bestellköpfe laden, dann pro Kopf die Positionen einzeln abfragen. $expand löst das in einem Request:

\`\`\`
GET /PurchaseOrder?$expand=to_PurchaseOrderItem($select=PurchaseOrderItem,Material,OrderQuantity;
  $filter=PurchaseOrderItemCategory eq '0')
  &$filter=PurchaseOrderDate gt 2024-01-01T00:00:00Z
  &$top=500
\`\`\`

**Batch Requests für Bulk-Operationen:**

Statt 1000 Einzelanfragen einen Batch-Request senden — kritisch für Performance:

\`\`\`http
POST /sap/opu/odata4/sap/api_purchaseorder_2/srvd_a2x/sap/purchaseorder/0001/$batch
Content-Type: multipart/mixed; boundary=batch_12345

--batch_12345
Content-Type: application/http

GET PurchaseOrder?$filter=Supplier eq 'LIEFERANT001'&$select=PurchaseOrder,TotalNetAmount
--batch_12345
Content-Type: application/http

GET PurchaseOrder?$filter=Supplier eq 'LIEFERANT002'&$select=PurchaseOrder,TotalNetAmount
--batch_12345--
\`\`\`

**Delta-Queries für Change Data Capture:**

Delta-Queries sind das wichtigste Feature für effizientes Change Tracking — nur geänderte Datensätze werden übertragen:

\`\`\`python
import requests

class SAPDeltaExtractor:
    def __init__(self, base_url, auth):
        self.base_url = base_url
        self.auth = auth
        self.delta_token = None  # Wird persistent gespeichert

    def initial_load(self, entity_set):
        """Erstmalige Vollladung + Delta-Token abholen"""
        url = f"{self.base_url}/{entity_set}?$deltatoken=initial"
        response = requests.get(url, auth=self.auth)
        data = response.json()

        # Delta-Link aus Response extrahieren
        if "@odata.deltaLink" in data:
            self.delta_token = data["@odata.deltaLink"].split("$deltatoken=")[1]

        return data["value"]

    def get_changes(self, entity_set):
        """Nur Änderungen seit letztem Delta-Token"""
        if not self.delta_token:
            return self.initial_load(entity_set)

        url = f"{self.base_url}/{entity_set}?$deltatoken={self.delta_token}"
        response = requests.get(url, auth=self.auth)
        data = response.json()

        # Gelöschte Datensätze erkennen
        deleted = [r for r in data.get("value", []) if r.get("@removed")]
        changed = [r for r in data.get("value", []) if not r.get("@removed")]

        # Neuen Delta-Token speichern
        if "@odata.deltaLink" in data:
            self.delta_token = data["@odata.deltaLink"].split("$deltatoken=")[1]

        return {"changed": changed, "deleted": deleted}
\`\`\`

**Performance-Tipps für Production:**
- Immer $select nutzen — niemals alle Felder übertragen
- $top mit Paginierung via $skiptoken implementieren
- HTTP/2 aktivieren für parallele Requests
- Response-Komprimierung (gzip) aktivieren: senkt Datenvolumen um 60-80%`,
        analogy: `Delta-Queries sind wie ein Kontoauszug: Du brauchst nicht jedes Mal die gesamte Kontohistorie — nur die Buchungen seit deinem letzten Auszug. Das spart 95% der übertragenen Datenmenge bei täglichen Synchronisierungen.`,
        consultingRelevance: `In Kundenprojekten verursachen naive OData-Implementierungen ohne $select und $expand regelmäßig Performance-Probleme, die erst in Production sichtbar werden. Mit diesem Wissen kannst du im technischen Design-Review konkrete Optimierungen vorschlagen und den Unterschied zwischen einem 5-Sekunden und einem 0,3-Sekunden API-Call erklären. Delta-Queries sind zudem die Grundlage für Near-Realtime-KI-Anwendungen — ohne sie ist jede Synchronisierung teuer und langsam.`
      },
      {
        title: "SAP BTP und KI: AI Core, Integration Suite, Business AI",
        content: `SAP Business Technology Platform (BTP) ist der strategische Rahmen, in dem SAP KI-Funktionalität für seine Kunden bereitstellt. Für Berater, die SAP-Kunden betreuen, ist BTP unumgänglich.

**SAP AI Core — Die KI-Laufzeitumgebung:**

AI Core ist SAPs managed Service zum Trainieren und Deployen von ML-Modellen. Es läuft auf BTP und abstrahiert Kubernetes-Komplexität:

\`\`\`yaml
# AI Core Serving Template (vereinfacht)
apiVersion: ai.sap.com/v1alpha1
kind: ServingTemplate
metadata:
  name: demand-forecast-server
  labels:
    scenarios.ai.sap.com/id: "supply-chain-ai"
spec:
  inputs:
    parameters:
      - name: model_version
        type: string
  template:
    spec:
      containers:
        - name: server
          image: "your-registry/demand-forecast:{{inputs.parameters.model_version}}"
          ports:
            - containerPort: 8080
              protocol: TCP
          resources:
            requests:
              cpu: "1"
              memory: "2Gi"
\`\`\`

**AI Launchpad:** Das UI für Data Scientists in BTP — Model-Tracking, Experiment-Management, Deployment-Steuerung ohne CLI-Kenntnisse.

**SAP Integration Suite für KI-Pipelines:**

Die Integration Suite (früher: Cloud Integration) ist SAPs iPaaS. Für KI-Projekte relevant als Orchestrierungsschicht:

- **API Management:** Rate Limiting, OAuth 2.0, API-Katalog für interne Dienste
- **Integration Advisor:** KI-gestützte Mapping-Vorschläge für EDI/IDoc-Transformationen
- **Event Mesh:** Message-Broker für Event-Driven-Architekturen auf BTP

\`\`\`python
# BTP AI Core API nutzen (Python SDK)
from ai_core_sdk.ai_core_v2_client import AICoreV2Client

client = AICoreV2Client(
    base_url="https://api.ai.prod.eu-central-1.aws.ml.hana.ondemand.com",
    auth_url="https://your-tenant.authentication.eu10.hana.ondemand.com",
    client_id="your-client-id",
    client_secret="your-client-secret"
)

# Deployment starten
deployment = client.deployment.create(
    configuration_id="your-config-id",
    resource_group="default"
)
print(f"Deployment ID: {deployment.id}, Status: {deployment.status}")
\`\`\`

**SAP Business AI — Embedded KI:**

SAP integriert KI-Funktionen direkt in S/4HANA und andere Produkte:
- **Joule:** SAP's generativer KI-Assistent (Copilot) für alle SAP-Anwendungen
- **Predictive Material and Resource Planning (pMRP):** ML-basierte Bedarfsplanung
- **Invoice Intelligence:** Automatische Rechnungsverarbeitung via Document Information Extraction

**Für Berater kritisch:** Kunden fragen oft "Warum eigenes KI-Projekt wenn SAP schon KI hat?" Die ehrliche Antwort: SAP Business AI deckt Standard-Use-Cases ab, aber kundenspezifische Anforderungen (eigene Qualitätsprognosen, proprietäre Lieferantenbewertung) brauchen immer noch Custom-Entwicklung auf Basis der eigenen Daten.

**Pricing-Struktur:** BTP nutzt ein Service-Unit-Modell. AI Core kostet pro Rechenzeit, AI Launchpad pro User. Für ROI-Kalkulationen: AI Core kostet ~0,40 EUR/Stunde für Standard-Compute, GPU-Instanzen 5-10x teurer.`,
        analogy: `SAP BTP ist wie ein Gewerbepark mit Gemeinschaftsinfrastruktur: Du musst nicht selbst Strom- und Wasserleitungen verlegen (Kubernetes, Networking), sondern mietest Fläche und nutzt die vorhandene Infrastruktur. Das spart Aufwand, kostet aber Flexibilität — du bist an SAPs Infrastruktur gebunden.`,
        consultingRelevance: `Viele Mittelstandskunden haben bereits BTP-Lizenzen als Teil ihrer S/4HANA-Verträge und wissen es nicht. Im ersten Discovery-Workshop lohnt es sich immer, nach bestehenden BTP-Verträgen zu fragen — das kann den Business Case erheblich vereinfachen. Gleichzeitig solltest du wissen, wann BTP die falsche Wahl ist: Bei stark individualisierten Anforderungen und hohem Datenvolumen ist ein eigenes Cloud-Setup oft günstiger und flexibler.`
      },
      {
        title: "Datenqualitäts-Pipeline: Profiling, Duplikaterkennung, Normalisierung",
        content: `ERP-Daten sind selten so sauber, wie IT-Abteilungen behaupten. Eine automatisierte Datenqualitäts-Pipeline ist keine optionale Ergänzung — sie ist Grundvoraussetzung für brauchbare KI-Ergebnisse.

**Schritt 1: Automatisches Datenprofiling mit Great Expectations:**

\`\`\`python
import great_expectations as gx
import pandas as pd

# Kontext initialisieren
context = gx.get_context()

# Datenquelle registrieren
datasource = context.sources.add_pandas("sap_materials")
asset = datasource.add_dataframe_asset("material_master")

# Expectation Suite definieren
suite = context.add_expectation_suite("material_quality_suite")

validator = context.get_validator(
    batch_request=asset.build_batch_request(dataframe=df_materials),
    expectation_suite_name="material_quality_suite"
)

# Regeln definieren
validator.expect_column_values_to_not_be_null("Material")
validator.expect_column_values_to_be_between("StandardPrice", min_value=0.01, max_value=1000000)
validator.expect_column_values_to_match_regex("MaterialGroup", r"^[A-Z0-9]{4,8}$")
validator.expect_column_pair_values_a_to_be_greater_than_b(
    "SafetyStock", "MinimumLotSize", or_equal=True
)

# Profiling ausführen
results = validator.validate()
print(f"Erfolgsquote: {results.statistics['success_percent']:.1f}%")
\`\`\`

**Schritt 2: Duplikaterkennung mit Record Linkage:**

In SAP-Systemen gibt es häufig Duplikate bei Lieferanten (gleicher Lieferant, verschiedene Debitor-Nummern) und Materialien (gleiche Teile mit verschiedenen SAP-Nummern). Fuzzy Matching findet diese:

\`\`\`python
import recordlinkage

# Zwei Dataframes: interne Lieferanten vs. externe Lieferantenliste
indexer = recordlinkage.Index()
indexer.block("PostalCode")  # Nur innerhalb gleicher PLZ vergleichen
candidate_links = indexer.index(df_vendors_internal, df_vendors_external)

# Vergleichsfunktionen
compare = recordlinkage.Compare()
compare.string("CompanyName", "Name", method="jarowinkler", threshold=0.85)
compare.string("StreetAddress", "Address", method="levenshtein", threshold=0.80)
compare.exact("VATNumber", "TaxID")  # Exakter Vergleich für Steuer-ID

features = compare.compute(candidate_links, df_vendors_internal, df_vendors_external)

# Klassifikation: Duplikat ja/nein
matches = features[features.sum(axis=1) >= 2.5]
print(f"Potenzielle Duplikate: {len(matches)}")
\`\`\`

**Schritt 3: Normalisierung vor LLM-Verarbeitung:**

LLMs arbeiten mit Text — SAP-Daten sind strukturiert. Die Normalisierung überbrückt diesen Bruch:

\`\`\`python
def normalize_material_for_llm(row: dict) -> str:
    """Wandelt SAP-Materialstamm in strukturierten Text um."""
    return f"""
Material: {row['Material']} — {row['MaterialDescription']}
Typ: {row['MaterialType']} | Gruppe: {row['MaterialGroup']}
Mengeneinheit: {row['BaseUnit']}
Standardpreis: {row['StandardPrice']:.2f} {row['Currency']} per {row['BaseUnit']}
Dispositionsart: {row['MRPType']} | Sicherheitsbestand: {row['SafetyStock']} {row['BaseUnit']}
Lieferzeit: {row['PlannedDeliveryTime']} Tage
Letzter Wareneingang: {row['LastGoodsReceiptDate']}
Qualitätsstatus: {'Prüfpflichtig' if row['QualityInspection'] else 'Frei verwendbar'}
""".strip()

# Batch-Verarbeitung
df_materials["llm_text"] = df_materials.apply(normalize_material_for_llm, axis=1)
\`\`\`

**Qualitäts-Dashboard-Metriken:**
- Vollständigkeit: % ausgefüllter Pflichtfelder
- Aktualität: Durchschnittliches Alter der letzten Änderung
- Konsistenz: Widersprüche zwischen verknüpften Tabellen
- Eindeutigkeit: Duplikatrate

In der Praxis haben 60-70% der Mittelstandskunden Datenqualitätsprobleme, die erst bei der ersten KI-Projektvorbereitung sichtbar werden.`,
        analogy: `Datenqualität vor LLM-Verarbeitung ist wie das Vorbereiten von Zutaten vor dem Kochen: Schimmelige Kartoffeln werden durch einen guten Koch nicht besser — sie werden rausgeworfen. Ein LLM, das auf schlechten Daten arbeitet, gibt konfident falsche Antworten, was schlimmer ist als gar keine Antwort.`,
        consultingRelevance: `Datenqualität ist in fast jedem Kundenprojekt ein versteckter Zeitfresser. Wenn du im Angebot eine dedizierte "Datenqualitäts-Sprint"-Phase einplanst und das Great-Expectations-Framework nennst, wirkst du kompetenter als Berater, die "wir nehmen einfach die SAP-Daten" versprechen. Außerdem schützt du dich: Schlechte Datenqualität ist der häufigste Grund für KI-Projektverzögerungen — und wenn du die Phase nicht eingeplant hast, zahlst du die Mehrkosten selbst.`
      },
      {
        title: "ERP-unabhängige Extraktion: JDBC-Connector Pattern und DB-Replication",
        content: `Nicht jedes Unternehmen hat SAP. Viele Mittelständler nutzen Microsoft Dynamics, Infor, proAlpha oder eigene ERP-Systeme. Ein ERP-unabhängiges Extraktionsmuster macht dich als Berater flexibler.

**JDBC-Connector Pattern:**

JDBC (Java Database Connectivity) erlaubt direkten Datenbankzugriff unabhängig vom ERP-Frontend. Mit Python via JDBC-Brücke oder nativem Datenbanktreiber:

\`\`\`python
# Universelles Extraktions-Interface
from abc import ABC, abstractmethod
from typing import Iterator
import pandas as pd

class ERPExtractor(ABC):
    @abstractmethod
    def extract_materials(self, last_modified_since: str) -> pd.DataFrame:
        pass

    @abstractmethod
    def extract_orders(self, date_from: str, date_to: str) -> pd.DataFrame:
        pass

# SAP-Implementierung via PyRFC
class SAPExtractor(ERPExtractor):
    def __init__(self, connection_params):
        import pyrfc
        self.conn = pyrfc.Connection(**connection_params)

    def extract_materials(self, last_modified_since: str) -> pd.DataFrame:
        result = self.conn.call("RFC_READ_TABLE",
            QUERY_TABLE="MARA",
            FIELDS=[{"FIELDNAME": f} for f in ["MATNR", "MAKTX", "MTART", "MATKL"]],
            OPTIONS=[{"TEXT": f"LAEDA >= '{last_modified_since}'"}]
        )
        return self._parse_rfc_result(result)

# MS Dynamics 365 via ODBC
class DynamicsExtractor(ERPExtractor):
    def __init__(self, connection_string):
        import pyodbc
        self.conn = pyodbc.connect(connection_string)

    def extract_materials(self, last_modified_since: str) -> pd.DataFrame:
        query = """
            SELECT ItemId, ItemName, ItemGroupId, UnitId, CostPrice
            FROM InventTable
            WHERE modifiedDateTime >= ?
        """
        return pd.read_sql(query, self.conn, params=[last_modified_since])
\`\`\`

**DB-Replication vs. API-Polling:**

| Kriterium | DB-Replication | API-Polling |
|-----------|----------------|-------------|
| Latenz | Sekunden (CDC) | Minuten bis Stunden |
| ERP-Last | Keine | Mittel bis hoch |
| Komplexität | Hoch (Setup) | Niedrig |
| Datenvollständigkeit | 100% | Abhängig von API |
| Empfehlung | Große Datenmengen, hohe Frequenz | Kleinere Systeme, einfache Use Cases |

**Change Data Capture mit Debezium:**

Debezium ist der Standard für CDC aus relationalen Datenbanken. Es liest den Datenbank-Transaction-Log:

\`\`\`yaml
# Debezium Connector Konfiguration für MS SQL Server (Dynamics-Backend)
{
  "name": "dynamics-erp-connector",
  "config": {
    "connector.class": "io.debezium.connector.sqlserver.SqlServerConnector",
    "database.hostname": "erp-db.internal",
    "database.port": "1433",
    "database.user": "debezium_user",
    "database.password": "\${vault:erp/db-password}",
    "database.dbname": "DynamicsDB",
    "table.include.list": "dbo.InventTable,dbo.PurchTable,dbo.SalesTable",
    "database.history.kafka.topic": "schema-changes.erp",
    "transforms": "unwrap",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState"
  }
}
\`\`\`

**Anti-Pattern: Direktzugriff auf ERP-Produktionsdatenbank**

Niemals direkt auf die ERP-Produktionsdatenbank zugreifen. Immer über einen Read-Replica oder eine Staging-Datenbank. Gründe:
- Schlechte Queries können ERP-Performance beeinträchtigen (In einem Kundenprojekt hat ein fehlerhafter JOIN die SAP-Produktion für 45 Minuten verlangsamt)
- ERP-Datenbankschemas sind nicht für externe Lesezugriffe optimiert
- Sicherheits- und Compliance-Anforderungen`,
        analogy: `Der JDBC-Connector ist wie ein universeller Schlüsseladapter beim Reisen: Statt für jedes Land einen anderen Stecker mitzubringen, nimmst du einen Adapter, der überall passt. Das ERP-Extraktions-Interface ist dein Adapter — egal ob SAP, Dynamics oder Infor, die KI-Pipeline dahinter bleibt gleich.`,
        consultingRelevance: `In der Realität wechseln Mittelstandskunden ERP-Systeme — S/4HANA-Migrationen laufen bei vielen Kunden parallel zu KI-Projekten. Wenn du eine ERP-unabhängige Extraktionsschicht baust, bleibt die KI-Pipeline beim ERP-Wechsel stabil. Das ist ein starkes Verkaufsargument: "Die KI-Investition ist nicht an SAP gebunden."`
      },
      {
        title: "Echtzeit vs. Batch: Streaming-ERP-Daten mit Kafka",
        content: `Die Entscheidung zwischen Echtzeit-Streaming und Batch-Verarbeitung ist eine der wichtigsten Architekturentscheidungen in KI-Projekten mit ERP-Daten. Sie bestimmt Komplexität, Kosten und den erzielbaren Business Value.

**Wann Echtzeit, wann Batch?**

| Use Case | Empfehlung | Begründung |
|----------|-----------|------------|
| Anomalie-Erkennung in Produktionsdaten | Echtzeit | Reaktionszeit entscheidend |
| Demand Forecasting | Batch (täglich) | Prognosen ändern sich nicht stündlich |
| Lieferanten-Risikobewertung | Batch (wöchentlich) | Daten ändern sich langsam |
| Qualitäts-Alert bei Wareneingang | Echtzeit | Sofortige Intervention nötig |
| KI-gestützte Rechnungsprüfung | Near-Realtime (5 Min.) | Balanciert Aufwand und Nutzen |

**Kafka-Architektur für ERP-Streaming:**

\`\`\`python
from confluent_kafka import Producer, Consumer
import json
from datetime import datetime

# Producer: ERP-Events in Kafka schreiben
class ERPEventProducer:
    def __init__(self, bootstrap_servers: str):
        self.producer = Producer({
            "bootstrap.servers": bootstrap_servers,
            "acks": "all",                    # Sicherste Bestätigung
            "enable.idempotence": True,        # Keine Duplikate
            "compression.type": "snappy"       # Komprimierung
        })

    def send_goods_receipt(self, event: dict):
        """Wareneingang-Event in Kafka publizieren."""
        self.producer.produce(
            topic="erp.goods-receipts",
            key=event["PurchaseOrder"].encode("utf-8"),
            value=json.dumps({
                **event,
                "event_timestamp": datetime.utcnow().isoformat(),
                "source_system": "SAP_ERP",
                "schema_version": "1.2"
            }).encode("utf-8"),
            callback=self._delivery_report
        )
        self.producer.flush()

    def _delivery_report(self, err, msg):
        if err:
            print(f"Delivery failed: {err}")

# Consumer: KI-Pipeline verarbeitet Events
class QualityCheckConsumer:
    def __init__(self, bootstrap_servers: str, ai_model):
        self.consumer = Consumer({
            "bootstrap.servers": bootstrap_servers,
            "group.id": "quality-check-ai-v1",
            "auto.offset.reset": "earliest",
            "enable.auto.commit": False         # Manuelles Commit für Exactly-Once
        })
        self.ai_model = ai_model

    def process_goods_receipts(self):
        self.consumer.subscribe(["erp.goods-receipts"])
        while True:
            msg = self.consumer.poll(timeout=1.0)
            if msg is None:
                continue
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                continue

            event = json.loads(msg.value().decode("utf-8"))

            # KI-Qualitätsprüfung
            risk_score = self.ai_model.predict_quality_risk(event)
            if risk_score > 0.75:
                self._trigger_quality_hold(event, risk_score)

            # Erst nach erfolgreicher Verarbeitung committen
            self.consumer.commit(message=msg)
\`\`\`

**Kafka Connect für SAP-Integration:**

Kafka Connect mit dem SAP-Connector (von Confluent oder Lenses) liest direkt IDocs oder BAPIs:

\`\`\`json
{
  "name": "sap-erp-source",
  "config": {
    "connector.class": "com.sap.kafka.connect.source.SapTableSourceConnector",
    "tasks.max": "3",
    "sap.jco.ashost": "sap-prod.internal",
    "sap.jco.sysnr": "00",
    "sap.jco.client": "100",
    "sap.source.tables": "MSEG,EKKO,VBAK",
    "poll.interval.ms": "30000",
    "kafka.topic.prefix": "sap.erp."
  }
}
\`\`\`

**Trade-offs in Zahlen:**
- Batch (täglich): Setup in 1-2 Wochen, ~500 EUR/Monat Cloud-Kosten
- Near-Realtime (5 Min. Polling): Setup in 2-3 Wochen, ~800 EUR/Monat
- Kafka-Streaming: Setup in 4-8 Wochen, ~1.500-3.000 EUR/Monat

Für 80% der Mittelstandsfälle ist täglicher Batch ausreichend und deutlich einfacher zu betreiben.`,
        analogy: `Der Unterschied zwischen Batch und Streaming ist wie Zeitung vs. Twitter: Die Zeitung (Batch) bringt jeden Morgen gesammelte, gut aufbereitete Informationen. Twitter (Streaming) liefert jeden Tweet sofort — aber du musst auch jeden Tweet sofort verarbeiten können. Die meisten Geschäftsentscheidungen basieren auf der Zeitung.`,
        consultingRelevance: `Kunden wollen fast immer "Echtzeit" — bis du ihnen die Kostenunterschiede zeigst. Ein klares Framework mit konkreten Zahlen (Setup-Zeit, monatliche Kosten, Komplexität) hilft, die richtige Architekturentscheidung zu treffen. In 90% der Fälle beginnt man mit Batch und steigt bei bewiesenem Business Value auf Near-Realtime um. Diese schrittweise Herangehensweise reduziert Projekrisiko erheblich.`
      }
    ],
    gfSummary: `**ERP-Integration für Production — Zusammenfassung für Geschäftsführer:**

Moderne SAP-Anbindung nutzt OData V4 statt alter RFC-Schnittstellen — das ist schneller, stabiler und reduziert die Last auf dem ERP-System. Delta-Queries übertragen nur Änderungen statt immer alle Daten neu zu laden, was die Synchronisierungskosten um bis zu 95% reduziert.

SAPs eigene KI-Plattform (BTP/AI Core) ist für Standard-Anwendungen geeignet, aber kundenspezifische KI-Anwendungen auf Basis eigener Daten erfordern in der Regel Custom-Entwicklung. Datenqualität ist die häufigste Ursache für KI-Projektverzögerungen — eine dedizierte Bereinigungsphase ist keine Fleißarbeit, sondern Risikomanagement.

Die Entscheidung zwischen Echtzeit-Streaming und täglichem Batch-Betrieb bestimmt Komplexität und Kosten. Für 80% der Mittelstandsfälle ist täglicher Batch ausreichend — und kostet nur ein Drittel im Vergleich zu Kafka-Streaming.`
  },

  "databases": {
    title: "Datenbankarchitektur für KI-Workloads",
    layerLevel: 3,
    estimatedMinutes: 90,
    steps: [
      {
        title: "pgvector in Production: HNSW-Tuning, IVFFlat vs. HNSW, Multi-Tenancy",
        content: `pgvector ist die pragmatischste Lösung für Vektordatenbanken im Mittelstand — es läuft direkt in PostgreSQL ohne zusätzliche Infrastruktur. Für Production-Einsatz musst du die Index-Optionen verstehen.

**HNSW vs. IVFFlat — Der entscheidende Vergleich:**

| Kriterium | HNSW | IVFFlat |
|-----------|------|---------|
| Query-Latenz | 1-5ms (konsistent) | 5-50ms (variabel) |
| Build-Zeit | Langsam (Stunden bei Mio. Vektoren) | Schnell (Minuten) |
| RAM-Verbrauch | Hoch (Index bleibt im RAM) | Niedrig |
| Recall@10 | 95-99% | 85-95% |
| Empfehlung | < 5M Vektoren, Latenz kritisch | > 5M Vektoren, RAM limitiert |

**HNSW-Parameter optimieren:**

\`\`\`sql
-- HNSW Index erstellen mit optimierten Parametern
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops)
WITH (
    m = 16,           -- Verbindungen pro Knoten (Standard: 16, Range: 4-64)
                      -- Höher = besserer Recall, mehr RAM, langsamerer Build
    ef_construction = 128  -- Build-Qualität (Standard: 64, Range: 64-512)
                           -- Höher = besser Recall, langsamerer Build
);

-- Suchparameter zur Laufzeit setzen
SET hnsw.ef_search = 100;  -- Standard: 40, höher = besser Recall, langsamer

-- Performance-Check
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, content, embedding <=> '[0.1, 0.2, ...]'::vector AS distance
FROM documents
ORDER BY distance
LIMIT 10;
\`\`\`

**IVFFlat für große Datenmengen:**

\`\`\`sql
-- Zuerst Daten laden, DANN Index erstellen (wichtig für IVFFlat!)
INSERT INTO documents (content, embedding) VALUES (...);  -- Masse laden

-- Index nach dem Laden erstellen
-- Faustregel: lists = sqrt(Anzahl Zeilen)
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 1000);  -- Für ~1M Vektoren: sqrt(1M) = 1000

-- Suchparameter
SET ivfflat.probes = 50;  -- Durchsuchte Listen (Standard: 1, empfohlen: lists/10)
\`\`\`

**Multi-Tenancy-Strategien für SaaS-Szenarien:**

\`\`\`sql
-- Strategie 1: Row-Level Security (empfohlen für < 100 Tenants)
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL,
    content TEXT,
    embedding vector(1536),
    metadata JSONB
);

-- Composite Index für Tenant-gefilterte Suche
CREATE INDEX ON documents (tenant_id, id);
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- RLS aktivieren
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON documents
    USING (tenant_id = current_setting('app.current_tenant_id')::UUID);

-- Anfrage mit Tenant-Kontext
SET app.current_tenant_id = '550e8400-e29b-41d4-a716-446655440000';
SELECT content, embedding <=> $1 AS distance
FROM documents
ORDER BY distance LIMIT 10;

-- Strategie 2: Separate Schemas (empfohlen für > 100 Tenants mit > 100k Docs)
-- Jeder Tenant bekommt eigenes Schema, eigenen Index
CREATE SCHEMA tenant_acme;
CREATE TABLE tenant_acme.documents (LIKE documents INCLUDING ALL);
\`\`\`

**Typische Performance-Zahlen:**
- 1M Vektoren (1536 dim), HNSW m=16: 2-3ms p99 Latenz, ~6GB RAM
- 10M Vektoren, IVFFlat lists=3000: 15-30ms p99, ~2GB RAM
- PostgreSQL 16 + pgvector 0.7+: Parallele Index-Builds (2-4x schneller)`,
        analogy: `HNSW ist wie ein gut sortiertes Warenlager mit klaren Gängen und Wegweisern — der Picker findet schnell was er sucht, aber das Einrichten hat Zeit gekostet. IVFFlat ist wie Lagerhallen-Zonen: grobe Einteilung, schnell aufgebaut, aber man muss manchmal mehrere Zonen durchsuchen.`,
        consultingRelevance: `Kunden fragen oft "Brauchen wir Pinecone oder reicht PostgreSQL?" Für 90% der Mittelstandsprojekte mit unter 5 Millionen Dokumenten ist pgvector mit HNSW-Index ausreichend und eliminiert eine weitere Infrastrukturkomponente. Das vereinfacht Operations erheblich und spart 200-500 EUR/Monat an spezialisierten Vektordatenbank-Kosten. Die Entscheidungsmatrix kannst du direkt im Kundengespräch nutzen.`
      },
      {
        title: "Qdrant Deep-Dive: Collections, Payload Filtering, Sparse Vectors, Quantization",
        content: `Qdrant ist die leistungsfähigste dedizierte Vektordatenbank für Unternehmenseinsatz — wenn pgvector an seine Grenzen stößt, ist Qdrant die erste Wahl. Es bietet Features, die PostgreSQL nicht hat.

**Collections und Konfiguration:**

\`\`\`python
from qdrant_client import QdrantClient
from qdrant_client.models import (
    VectorParams, Distance, HnswConfigDiff,
    QuantizationConfig, ScalarQuantizationConfig, ScalarType,
    OptimizersConfigDiff
)

client = QdrantClient(url="http://localhost:6333")

# Collection mit optimierter Konfiguration erstellen
client.create_collection(
    collection_name="sap_documents",
    vectors_config=VectorParams(
        size=1536,                    # OpenAI text-embedding-3-small
        distance=Distance.COSINE,
        on_disk=True,                 # Vektoren auf Disk für große Collections
        hnsw_config=HnswConfigDiff(
            m=16,
            ef_construct=128,
            full_scan_threshold=10000  # Unter 10k Vektoren: brute force
        )
    ),
    quantization_config=QuantizationConfig(
        scalar=ScalarQuantizationConfig(
            type=ScalarType.INT8,
            quantile=0.99,
            always_ram=True           # Quantisierte Vektoren im RAM halten
        )
    ),
    optimizers_config=OptimizersConfigDiff(
        indexing_threshold=20000,     # Index erst ab 20k Vektoren aufbauen
        memmap_threshold=100000       # Ab 100k Vektoren: Memory-mapped Files
    )
)
\`\`\`

**Payload Filtering — Qdrants Killer-Feature:**

Payload-Filter werden direkt im Vektorindex ausgeführt (Pre-Filtering), nicht nachträglich (Post-Filtering). Das ist 10-100x schneller:

\`\`\`python
from qdrant_client.models import Filter, FieldCondition, MatchValue, Range, SearchRequest

# Hybrid-Suche: Vektorähnlichkeit + Metadaten-Filter
results = client.search(
    collection_name="sap_documents",
    query_vector=[0.1, 0.2, ...],    # Embedding der Anfrage
    query_filter=Filter(
        must=[
            FieldCondition(
                key="doc_type",
                match=MatchValue(value="quality_report")
            ),
            FieldCondition(
                key="plant",
                match=MatchValue(value="1000")  # Nur Werk 1000
            ),
            FieldCondition(
                key="created_date",
                range=Range(
                    gte=1704067200,  # Unix timestamp: 2024-01-01
                    lte=1735689600   # Unix timestamp: 2025-01-01
                )
            )
        ]
    ),
    limit=10,
    with_payload=True,
    score_threshold=0.75             # Mindest-Ähnlichkeit
)
\`\`\`

**Sparse Vectors für Hybrid-Search:**

Qdrant unterstützt nativ Sparse Vectors (BM25/SPLADE) parallel zu Dense Vectors. Hybrid-Search kombiniert beides:

\`\`\`python
from qdrant_client.models import SparseVector, NamedSparseVector, NamedVector

# Collection mit Dense + Sparse Vectors
client.create_collection(
    collection_name="hybrid_docs",
    vectors_config={
        "dense": VectorParams(size=1536, distance=Distance.COSINE),
    },
    sparse_vectors_config={
        "sparse": SparseVectorParams()
    }
)

# Hybrid Search mit RRF (Reciprocal Rank Fusion)
results = client.query_points(
    collection_name="hybrid_docs",
    prefetch=[
        Prefetch(query=dense_embedding, using="dense", limit=20),
        Prefetch(query=SparseVector(indices=sparse_indices, values=sparse_values),
                 using="sparse", limit=20)
    ],
    query=FusionQuery(fusion=Fusion.RRF),
    limit=10
)
\`\`\`

**Quantization — RAM-Kosten halbieren:**

Int8-Quantization reduziert den RAM-Bedarf um 75% bei nur ~5% Recall-Verlust:
- Ohne Quantization: 1M Vektoren × 1536 dim × 4 Bytes = 6 GB
- Mit Int8-Quantization: 1M × 1536 × 1 Byte = 1,5 GB

**Wann Qdrant statt pgvector:**
- > 5M Vektoren
- Komplexe Payload-Filter sind Core-Feature (nicht Edge-Case)
- Multi-Vector-Suche (z.B. ColBERT für Late Interaction)
- Dediziertes Team für Vector-DB-Operations vorhanden`,
        analogy: `Qdrant ist wie ein spezialisiertes Hochregallager für E-Commerce-Fulfillment: Perfekt optimiert für einen spezifischen Anwendungsfall, deutlich effizienter als ein Allzwecklager (PostgreSQL) — aber du brauchst Spezialisten für den Betrieb und es lohnt sich erst ab einem bestimmten Volumen.`,
        consultingRelevance: `Die Entscheidung pgvector vs. Qdrant ist eine der häufigsten Architekturfragen in KI-Projekten. Als Berater kannst du mit klaren Schwellenwerten punkten: Unter 5M Dokumenten und ohne komplexe Filteranforderungen ist pgvector die bessere Wahl — einfacher, günstiger, weniger Betriebsaufwand. Oberhalb dieser Schwelle zahlt sich Qdrant aus. Diese klare Entscheidungsmatrix vermeidet Over-Engineering und zeigt Urteilsvermögen.`
      },
      {
        title: "Hybrid-Store-Pattern: PostgreSQL + pgvector als Unified Store",
        content: `Das überzeugendste Argument für pgvector im Mittelstand ist das Hybrid-Store-Pattern: eine einzige Datenbank für relationale Daten, Volltextsuche UND Vektorsuche. Keine Datensynchronisation zwischen mehreren Systemen nötig.

**Architektur des Hybrid-Stores:**

\`\`\`sql
-- Einheitliche Tabelle für alle Suchmodi
CREATE TABLE knowledge_base (
    id BIGSERIAL PRIMARY KEY,
    -- Relationale Daten
    source_system VARCHAR(50),      -- 'SAP', 'SharePoint', 'Email'
    document_type VARCHAR(50),      -- 'quality_report', 'procedure', 'contract'
    plant_code VARCHAR(4),
    supplier_id VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    -- Volltextsuche
    title TEXT,
    content TEXT,
    tsvector_content TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('german', coalesce(title, '') || ' ' || coalesce(content, ''))
    ) STORED,
    -- Vektorsuche
    embedding vector(1536),
    -- Metadaten flexibel
    metadata JSONB DEFAULT '{}'
);

-- Indizes für alle drei Suchmodi
CREATE INDEX idx_kb_fulltext ON knowledge_base USING gin(tsvector_content);
CREATE INDEX idx_kb_vector ON knowledge_base USING hnsw(embedding vector_cosine_ops);
CREATE INDEX idx_kb_plant ON knowledge_base (plant_code);
CREATE INDEX idx_kb_metadata ON knowledge_base USING gin(metadata);
\`\`\`

**Hybrid-Suche mit RRF (Reciprocal Rank Fusion):**

\`\`\`python
import asyncpg
import asyncio
from typing import List, Dict

async def hybrid_search(
    query_text: str,
    query_embedding: List[float],
    plant_code: str = None,
    doc_type: str = None,
    limit: int = 10
) -> List[Dict]:
    """Kombiniert Volltext- und Vektorsuche mit RRF."""

    conn = await asyncpg.connect("postgresql://...")

    # RRF k-Parameter (empfohlen: 60)
    rrf_k = 60

    results = await conn.fetch("""
        WITH
        -- Vektorsuche: Top-50 Kandidaten
        vector_search AS (
            SELECT id, ROW_NUMBER() OVER (ORDER BY embedding <=> $1) as rank
            FROM knowledge_base
            WHERE ($3::VARCHAR IS NULL OR plant_code = $3)
              AND ($4::VARCHAR IS NULL OR document_type = $4)
            ORDER BY embedding <=> $1
            LIMIT 50
        ),
        -- Volltextsuche: Top-50 Kandidaten
        fulltext_search AS (
            SELECT id, ROW_NUMBER() OVER (
                ORDER BY ts_rank(tsvector_content, plainto_tsquery('german', $2)) DESC
            ) as rank
            FROM knowledge_base
            WHERE tsvector_content @@ plainto_tsquery('german', $2)
              AND ($3::VARCHAR IS NULL OR plant_code = $3)
              AND ($4::VARCHAR IS NULL OR document_type = $4)
            LIMIT 50
        ),
        -- RRF Score berechnen
        rrf_scores AS (
            SELECT
                COALESCE(v.id, f.id) as id,
                COALESCE(1.0 / ($5 + v.rank), 0) +
                COALESCE(1.0 / ($5 + f.rank), 0) as rrf_score
            FROM vector_search v
            FULL OUTER JOIN fulltext_search f ON v.id = f.id
        )
        SELECT kb.id, kb.title, kb.content, kb.document_type,
               kb.source_system, kb.metadata, r.rrf_score
        FROM rrf_scores r
        JOIN knowledge_base kb ON r.id = kb.id
        ORDER BY r.rrf_score DESC
        LIMIT $6
    """, query_embedding, query_text, plant_code, doc_type, rrf_k, limit)

    await conn.close()
    return [dict(r) for r in results]
\`\`\`

**JSONB für flexible Metadaten:**

\`\`\`sql
-- Flexible Metadaten-Abfragen ohne Schema-Änderungen
SELECT title, metadata->>'supplier_name' as supplier,
       (metadata->>'confidence_score')::float as confidence
FROM knowledge_base
WHERE metadata @> '{"quality_status": "approved"}'
  AND (metadata->>'confidence_score')::float > 0.8
  AND document_type = 'quality_report';

-- Index auf häufig genutzte JSONB-Keys
CREATE INDEX idx_kb_quality_status
ON knowledge_base ((metadata->>'quality_status'))
WHERE document_type = 'quality_report';
\`\`\`

**Operational Benefits des Hybrid-Store:**
- Ein Backup deckt alles ab
- Eine Verbindung in der Applikation
- Transaktionale Konsistenz: Dokument und Embedding werden atomar gespeichert
- Kein Sync-Problem zwischen Relational-DB und Vector-DB
- PostgreSQL-Ökosystem (Replikation, PITR, Monitoring) vollständig nutzbar`,
        analogy: `Der Hybrid-Store ist wie ein Swiss Army Knife statt eines Werkzeugkoffers: Ein Werkzeug für alle Aufgaben. Es ist nicht für jede Aufgabe das optimale Werkzeug — aber die Einfachheit und die Tatsache, dass du nur eines dabei haben musst, macht es zur praktischsten Wahl für die meisten Situationen.`,
        consultingRelevance: `Im Mittelstand ist Betriebseinfachheit oft wichtiger als absolute Performance. Ein System, das ein erfahrener DBA betreiben kann, ist wertvoller als zwei spezialisierte Systeme, die niemand im Haus versteht. Das Hybrid-Store-Argument — "Ihr spart euch eine zweite Infrastrukturkomponente und alle Sync-Probleme" — ist besonders bei IT-Leitern wirkungsvoll, die bereits mit zu vielen Systemen kämpfen.`
      },
      {
        title: "Time-Series für KI: TimescaleDB und InfluxDB für Sensor-/Prozessdaten",
        content: `Industrieller Mittelstand hat Sensor- und Prozessdaten aus Produktion, Qualitätsmessung und Anlagenüberwachung. Standard-Datenbanken sind für diese Zeitreihendaten ungeeignet. TimescaleDB und InfluxDB sind die Marktführer für diesen Use Case.

**Warum Standard-Datenbanken für Zeitreihendaten schlecht sind:**
- Keine automatische Datenkomprimierung für ältere Zeitscheiben
- Langsame Time-Range-Queries ohne spezielle Partitionierung
- Keine nativen Aggregationsfunktionen für Zeitfenster
- Speicherineffizienz: reguläre Tabellen brauchen 5-10x mehr Platz als spezialisierte Time-Series-Datenbanken

**TimescaleDB — PostgreSQL-Extension für Time-Series:**

\`\`\`sql
-- TimescaleDB-Extension aktivieren
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Tabelle erstellen und als Hypertable konfigurieren
CREATE TABLE sensor_readings (
    time        TIMESTAMPTZ NOT NULL,
    sensor_id   VARCHAR(50) NOT NULL,
    plant_code  VARCHAR(4),
    parameter   VARCHAR(50),     -- 'temperature', 'pressure', 'vibration'
    value       DOUBLE PRECISION,
    quality     SMALLINT DEFAULT 192  -- OPC UA Quality Code
);

-- Hypertable: automatische Partitionierung nach Zeit
SELECT create_hypertable('sensor_readings', 'time',
    chunk_time_interval => INTERVAL '1 day'
);

-- Optimierter Index für typische Abfragen
CREATE INDEX ON sensor_readings (sensor_id, time DESC);

-- Automatische Komprimierung nach 7 Tagen
SELECT add_compression_policy('sensor_readings', INTERVAL '7 days');

-- Datenspeicherung: 90 Tage detailliert, dann löschen
SELECT add_retention_policy('sensor_readings', INTERVAL '90 days');
\`\`\`

\`\`\`sql
-- ML-Feature-Engineering direkt in TimescaleDB
SELECT
    time_bucket('1 hour', time) AS hour,
    sensor_id,
    AVG(value) AS mean_value,
    STDDEV(value) AS std_value,
    MAX(value) - MIN(value) AS range_value,
    -- Rolling Statistics für Anomalie-Erkennung
    AVG(value) OVER (
        PARTITION BY sensor_id
        ORDER BY time
        ROWS BETWEEN 23 PRECEDING AND CURRENT ROW
    ) AS rolling_24h_mean
FROM sensor_readings
WHERE time > NOW() - INTERVAL '7 days'
  AND sensor_id = 'PRESS-001'
GROUP BY hour, sensor_id
ORDER BY hour;
\`\`\`

**InfluxDB 3.0 für High-Cardinality-Szenarien:**

\`\`\`python
import influxdb_client_3 as InfluxDBClient3
import pandas as pd

client = InfluxDBClient3.InfluxDBClient3(
    host="https://eu-central-1-1.aws.cloud2.influxdata.com",
    token="your-api-token",
    database="production_sensors"
)

# Schreiben: 10.000 Messungen/Sekunde problemlos
from influxdb_client_3 import write_client_options, WriteOptions, SYNCHRONOUS

data = pd.DataFrame({
    "time": pd.date_range("2024-01-01", periods=1000, freq="1s", tz="UTC"),
    "sensor_id": ["TEMP-001"] * 1000,
    "value": [22.5 + i * 0.01 for i in range(1000)]
})

client.write(database="production_sensors", record=data,
             data_frame_measurement_name="temperature",
             data_frame_tag_columns=["sensor_id"])

# SQL-Query (InfluxDB 3.0 unterstützt SQL!)
query = """
    SELECT DATE_TRUNC('hour', time) as hour,
           sensor_id,
           AVG(value) as mean_temp,
           STDDEV_POP(value) as std_temp
    FROM temperature
    WHERE time > NOW() - INTERVAL '24 hours'
      AND sensor_id LIKE 'TEMP-%'
    GROUP BY hour, sensor_id
    ORDER BY hour DESC
"""
df_result = client.query(query=query, language="sql", mode="pandas")
\`\`\`

**Entscheidungsmatrix:**

| Kriterium | TimescaleDB | InfluxDB 3.0 |
|-----------|------------|--------------|
| PostgreSQL-Kompatibilität | Ja (volle SQL-Kompatibilität) | Nein |
| Cardinality | < 100k unique Tags | > 100k unique Tags |
| Komprimierungsrate | 90-95% | 95-99% |
| Lernkurve | Niedrig (SQL) | Mittel |
| Empfehlung | SAP-nahe Teams | IoT-Heavy-Environments |`,
        analogy: `Time-Series-Datenbanken für Sensordaten sind wie Videoüberwachungsarchive: Du brauchst die letzten 24 Stunden in voller Auflösung (Minute für Minute), aber für Daten von vor einem Jahr reicht es, täglich einen Schnappschuss zu haben. Normale Datenbanken speichern alles in gleicher Auflösung — das füllt den Speicher und macht Analysen langsam.`,
        consultingRelevance: `Viele Produktionsunternehmen sammeln Sensordaten bereits — oft in Excel-Tabellen oder propriätären Historian-Systemen wie OSIsoft PI. Wenn du zeigst, dass diese Daten strukturiert in einer Time-Series-Datenbank das Fundament für Predictive Maintenance und Qualitäts-KI bilden können, öffnet das eine wichtige Projektkategorie. TimescaleDB ist dabei die einsteigerfreundlichere Option für SAP-erfahrene IT-Teams, die SQL kennen.`
      },
      {
        title: "Caching-Layer: Redis für Embedding-Cache, Query-Cache, Session-Speicher",
        content: `Ein gut implementierter Caching-Layer kann Kosten für Embedding-APIs um 60-80% senken und Antwortzeiten von 2 Sekunden auf 50ms reduzieren. Für Production-KI-Anwendungen ist Redis unverzichtbar.

**Drei Caching-Schichten in KI-Applikationen:**

1. **Embedding-Cache:** Identische Texte nicht zweimal embeddigen
2. **Semantic Cache:** Semantisch ähnliche Anfragen mit gleicher Antwort bedienen
3. **Query-Cache:** Vollständige RAG-Ergebnisse für häufige Anfragen cachen

**Embedding-Cache implementieren:**

\`\`\`python
import redis
import hashlib
import numpy as np
import json
from openai import OpenAI

class CachedEmbeddingClient:
    def __init__(self, redis_url: str, openai_client: OpenAI):
        self.redis = redis.from_url(redis_url, decode_responses=False)
        self.openai = openai_client
        self.model = "text-embedding-3-small"
        self.cache_ttl = 86400 * 30  # 30 Tage

    def _cache_key(self, text: str) -> str:
        """SHA256-Hash als Cache-Key."""
        return f"emb:{self.model}:{hashlib.sha256(text.encode()).hexdigest()}"

    def embed(self, text: str) -> list[float]:
        """Embedding mit Cache."""
        key = self._cache_key(text)

        # Cache-Hit?
        cached = self.redis.get(key)
        if cached:
            return json.loads(cached)

        # Cache-Miss: API aufrufen
        response = self.openai.embeddings.create(
            input=text,
            model=self.model
        )
        embedding = response.data[0].embedding

        # In Cache speichern
        self.redis.setex(key, self.cache_ttl, json.dumps(embedding))
        return embedding

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """Batch-Embedding mit Cache — nur nicht-gecachte API-Calls."""
        keys = [self._cache_key(t) for t in texts]
        cached = self.redis.mget(keys)

        results = {}
        uncached_indices = []
        uncached_texts = []

        for i, (text, cached_val) in enumerate(zip(texts, cached)):
            if cached_val:
                results[i] = json.loads(cached_val)
            else:
                uncached_indices.append(i)
                uncached_texts.append(text)

        # Nur nicht-gecachte Texte an API senden
        if uncached_texts:
            response = self.openai.embeddings.create(
                input=uncached_texts,
                model=self.model
            )
            pipe = self.redis.pipeline()
            for idx, emb_data in zip(uncached_indices, response.data):
                results[idx] = emb_data.embedding
                pipe.setex(keys[idx], self.cache_ttl, json.dumps(emb_data.embedding))
            pipe.execute()

        return [results[i] for i in range(len(texts))]
\`\`\`

**Semantic Cache mit Vektorähnlichkeit:**

\`\`\`python
class SemanticQueryCache:
    """Cachet RAG-Antworten für semantisch ähnliche Anfragen."""

    def __init__(self, redis_client, embedding_client, threshold=0.95):
        self.redis = redis_client
        self.embedder = embedding_client
        self.threshold = threshold  # Ähnlichkeit für Cache-Hit

    def get(self, query: str) -> dict | None:
        query_emb = np.array(self.embedder.embed(query))

        # Alle gecachten Query-Embeddings laden und vergleichen
        cached_keys = self.redis.keys("semantic_cache:*")
        for key in cached_keys:
            data = json.loads(self.redis.get(key))
            cached_emb = np.array(data["embedding"])

            # Kosinus-Ähnlichkeit
            similarity = np.dot(query_emb, cached_emb) / (
                np.linalg.norm(query_emb) * np.linalg.norm(cached_emb)
            )
            if similarity >= self.threshold:
                return data["response"]  # Cache-Hit!

        return None  # Cache-Miss

    def set(self, query: str, response: dict, ttl: int = 3600):
        embedding = self.embedder.embed(query)
        key = f"semantic_cache:{hashlib.sha256(query.encode()).hexdigest()}"
        self.redis.setex(key, ttl, json.dumps({
            "query": query,
            "embedding": embedding,
            "response": response
        }))
\`\`\`

**Session-Speicher für Multi-Turn-Konversationen:**

\`\`\`python
def save_conversation(session_id: str, messages: list, ttl: int = 3600):
    """Gesprächshistorie in Redis speichern."""
    redis_client.setex(
        f"session:{session_id}",
        ttl,
        json.dumps(messages[-20:])  # Nur letzte 20 Nachrichten
    )

def load_conversation(session_id: str) -> list:
    data = redis_client.get(f"session:{session_id}")
    return json.loads(data) if data else []
\`\`\`

**Kosten-Kalkulation Embedding-Cache:**
- OpenAI text-embedding-3-small: $0,02 per 1M Tokens
- 10.000 tägl. Anfragen × 500 Tokens = 5M Tokens/Tag = $0,10/Tag = $36/Jahr
- Mit 70% Cache-Hit-Rate: $10,80/Jahr statt $36/Jahr — Ersparnis: $25,20/Jahr
- Bei Enterprise-Scale (1M Anfragen/Tag): Ersparnis von $2.500+/Jahr`,
        analogy: `Caching ist wie ein gut organisierter Schreibtisch: Die wichtigsten Unterlagen liegen oben, damit du nicht jedes Mal ins Archiv (teure API) laufen musst. Der Semantic Cache ist noch smarter: Er erkennt, dass "Wie hoch ist unser Lagerbestand für Pumpen?" und "Zeig mir den aktuellen Pumpen-Lagerbestand" dieselbe Frage sind und gibt dieselbe Antwort.`,
        consultingRelevance: `Caching ist eines der wenigen Themen, bei dem du Kunden sofort ROI in Euro zeigen kannst. Die Kostenersparnis bei Embedding-APIs ist messbar und vorhersagbar. Noch wichtiger: Redis löst das Session-Problem für KI-Chatbots, das fast jeder Mittelstandskunde hat — "Wie erinnert sich der Chatbot, was ich vorhin gefragt habe?" Das ist eine Frage, die du ohne Redis-Erklärung nicht überzeugend beantworten kannst.`
      }
    ],
    gfSummary: `**Datenbankarchitektur für KI-Workloads — Zusammenfassung für Geschäftsführer:**

Für die meisten Mittelstandsprojekte reicht PostgreSQL mit der pgvector-Erweiterung vollständig aus — eine zusätzliche spezialisierte Vektordatenbank ist oft Over-Engineering. PostgreSQL kann gleichzeitig Stammdaten, Volltext und KI-Ähnlichkeitssuche verwalten, was Betriebsaufwand und Kosten reduziert.

Produktions- und Sensordaten aus der Fertigung brauchen dagegen spezialisierte Time-Series-Datenbanken wie TimescaleDB. Diese komprimieren Daten automatisch und ermöglichen performante Analysen über Monate und Jahre — die Basis für Predictive Maintenance.

Ein Caching-Layer (Redis) kann API-Kosten um 60-80% senken und Antwortzeiten dramatisch verbessern. Das ist eine der wenigen Investitionen in KI-Infrastruktur, deren ROI direkt und schnell messbar ist.`
  },

  "rag-architecture": {
    title: "Advanced RAG",
    layerLevel: 3,
    estimatedMinutes: 95,
    steps: [
      {
        title: "Advanced Chunking: Proposition Indexing, Parent-Child Chunks, Sentence Windows",
        content: `Naive Chunking (feste 512-Token-Blöcke) ist der häufigste Grund für schlechte RAG-Performance. Advanced Chunking-Strategien verbessern Recall und Präzision erheblich — oft ohne den Retrieval-Algorithmus zu ändern.

**Das grundlegende Problem mit Fixed-Size Chunking:**

Fixe Token-Blöcke reißen semantische Einheiten auseinander: Ein Satz, der eine wichtige Aussage über einen Lieferanten macht, landet zur Hälfte in Chunk 47 und zur Hälfte in Chunk 48. Kein Retrieval-Algorithmus kann das reparieren.

**Strategie 1: Sentence Window Retrieval**

Klein indexieren, groß antworten:

\`\`\`python
from llama_index.core.node_parser import SentenceWindowNodeParser
from llama_index.core.postprocessor import MetadataReplacementPostProcessor

# Parser konfigurieren: jeder Satz wird einzeln indexiert,
# aber mit Kontext-Fenstern gespeichert
sentence_parser = SentenceWindowNodeParser.from_defaults(
    window_size=3,           # 3 Sätze vor und nach jedem Index-Satz speichern
    window_metadata_key="window",
    original_text_metadata_key="original_text"
)

nodes = sentence_parser.get_nodes_from_documents(documents)

# Index aus einzelnen Sätzen aufbauen
index = VectorStoreIndex(nodes)

# Bei der Ausgabe: nicht den einzelnen Satz, sondern das 7-Satz-Fenster nutzen
postprocessor = MetadataReplacementPostProcessor(
    target_metadata_key="window"
)

query_engine = index.as_query_engine(
    node_postprocessors=[postprocessor],
    similarity_top_k=5
)
\`\`\`

**Strategie 2: Parent-Child Chunks (Hierarchisches Chunking)**

\`\`\`python
from llama_index.core.node_parser import HierarchicalNodeParser, get_leaf_nodes

# Zwei Ebenen: große Parent-Chunks (512 Token) und kleine Child-Chunks (128 Token)
hierarchical_parser = HierarchicalNodeParser.from_defaults(
    chunk_sizes=[512, 128, 64]  # Parent → Child → Grandchild
)

all_nodes = hierarchical_parser.get_nodes_from_documents(documents)
leaf_nodes = get_leaf_nodes(all_nodes)  # Nur die kleinsten Chunks indexieren

# Alle Nodes im Docstore speichern (für Parent-Retrieval)
from llama_index.core.storage.docstore import SimpleDocumentStore
docstore = SimpleDocumentStore()
docstore.add_documents(all_nodes)

# Index nur aus Leaf-Nodes
index = VectorStoreIndex(leaf_nodes)

# Auto-Merging: wenn viele Child-Chunks desselben Parents gefunden werden,
# gibt der Retriever den Parent-Chunk zurück
from llama_index.core.retrievers import AutoMergingRetriever
base_retriever = index.as_retriever(similarity_top_k=12)
retriever = AutoMergingRetriever(base_retriever, docstore, verbose=True)
\`\`\`

**Strategie 3: Proposition Indexing (Dense X)**

Proposition Indexing extrahiert atomare Aussagen aus Dokumenten und indexiert diese statt der originalen Absätze:

\`\`\`python
PROPOSITION_PROMPT = """
Zerlege den folgenden Text in atomare, selbstständige Aussagen (Propositionen).
Jede Proposition soll:
- Eine einzelne, überprüfbare Tatsache enthalten
- Ohne Kontext verständlich sein (keine Pronomen wie "er", "sie", "es")
- So kurz wie möglich, aber vollständig sein

Text: {text}

Gib die Propositionen als JSON-Array zurück.
"""

async def extract_propositions(text: str, llm_client) -> list[str]:
    response = await llm_client.complete(
        PROPOSITION_PROMPT.format(text=text)
    )
    return json.loads(response.text)

# Beispiel-Output für einen Qualitätsbericht-Absatz:
# ["Lieferant Müller GmbH hat im Q3 2024 eine Fehlerquote von 2,3% erreicht.",
#  "Die Ziel-Fehlerquote für Lieferant Müller GmbH beträgt < 1,5%.",
#  "Lieferant Müller GmbH liefert Hydraulikpumpen an Werk 1000.",
#  "Im Q2 2024 betrug die Fehlerquote von Müller GmbH 1,8%."]
\`\`\`

**Wann welche Strategie:**

| Strategie | Dokumente | Vorteil | Overhead |
|-----------|-----------|---------|----------|
| Sentence Window | Fließtext (Berichte, Handbücher) | Einfach, guter Kontext | Minimal |
| Parent-Child | Strukturierte Dokumente (PDFs, Word) | Präziser Retrieval | Mittel |
| Proposition Indexing | Faktendichte Dokumente | Beste Präzision | Hoch (LLM für Extraktion) |`,
        analogy: `Chunking-Strategien sind wie das Einreichen von Belegen für eine Steuerprüfung: Fixed-Size-Chunks sind wie Seiten zufällig abgerissen — der Prüfer findet keine vollständigen Belege. Proposition Indexing ist wie jede Ausgabe als einzelnen, vollständig beschrifteten Beleg einzureichen — präzise, aber aufwändig. Sentence Windows sind wie Belege mit Post-its, die den Kontext erklären.`,
        consultingRelevance: `"Unsere RAG-Anwendung gibt schlechte Antworten" ist einer der häufigsten Kundenbeschwerden nach dem ersten Deployment. In 70% der Fälle liegt das Problem am Chunking, nicht am LLM oder am Retrieval-Algorithmus. Mit diesen drei Strategien im Repertoire kannst du gezielt diagnostizieren und verbessern — das unterscheidet einen erfahrenen KI-Berater von jemandem, der nur das Standard-Tutorial kennt.`
      },
      {
        title: "Re-Ranking Pipeline: Cross-Encoder, Cohere Rerank, LLM-as-Reranker",
        content: `Bi-Encoder-Retrieval (Standard-Vektorsuche) ist schnell aber ungenau: Er vergleicht Query und Dokument separat im Vektorraum. Re-Ranking mit Cross-Encodern bewertet jedes Dokument direkt gegen die Query — deutlich präziser, aber langsamer. Die Kombination beider ist der State-of-the-Art.

**Das Two-Stage-Retrieval-Pattern:**

Stage 1 (schnell, hohe Recall): Bi-Encoder → 50-100 Kandidaten
Stage 2 (präzise, hohe Precision): Cross-Encoder → Top 5-10

\`\`\`python
from sentence_transformers import CrossEncoder
from typing import List, Tuple
import numpy as np

class TwoStageRetriever:
    def __init__(self, vector_store, cross_encoder_model: str):
        self.vector_store = vector_store
        # Deutsches Cross-Encoder-Modell für Unternehmens-Dokumente
        self.cross_encoder = CrossEncoder(
            cross_encoder_model,
            # z.B. "cross-encoder/ms-marco-MiniLM-L-12-v2"
            # oder "deepset/gbert-large-cross-encoder" für Deutsch
            max_length=512
        )

    def retrieve(self, query: str, final_k: int = 5) -> List[dict]:
        # Stage 1: Vektorsuche — viele Kandidaten
        candidates = self.vector_store.similarity_search(
            query, k=50  # 10x mehr als final_k
        )

        # Stage 2: Cross-Encoder Re-Ranking
        pairs = [(query, doc.page_content) for doc in candidates]
        scores = self.cross_encoder.predict(pairs, batch_size=32)

        # Nach Cross-Encoder-Score sortieren
        ranked = sorted(
            zip(candidates, scores),
            key=lambda x: x[1],
            reverse=True
        )

        return [
            {"document": doc, "score": float(score)}
            for doc, score in ranked[:final_k]
        ]
\`\`\`

**Cohere Rerank API — Einfachste Production-Lösung:**

\`\`\`python
import cohere

co = cohere.Client("your-api-key")

def rerank_with_cohere(
    query: str,
    documents: list[str],
    top_n: int = 5
) -> list[dict]:
    response = co.rerank(
        model="rerank-multilingual-v3.0",  # Unterstützt Deutsch!
        query=query,
        documents=documents,
        top_n=top_n,
        return_documents=True
    )
    return [
        {
            "text": result.document.text,
            "relevance_score": result.relevance_score,
            "original_rank": result.index
        }
        for result in response.results
    ]

# Kosten: ~$1 per 1000 Re-Ranking-Anfragen (bei 100 Docs je Anfrage)
\`\`\`

**LLM-as-Reranker — Flexibel, aber teuer:**

\`\`\`python
RERANK_PROMPT = """Du bist ein Relevanz-Bewerter für ein Unternehmens-Wissenssystem.

Anfrage: {query}

Dokument:
{document}

Bewerte auf einer Skala von 0-10, wie relevant dieses Dokument für die Anfrage ist.
Antworte NUR mit einer Zahl (0-10).
"""

async def llm_reranker(
    query: str,
    documents: list[str],
    llm_client,
    top_n: int = 5
) -> list[Tuple[str, float]]:
    scores = []
    for doc in documents:
        response = await llm_client.complete(
            RERANK_PROMPT.format(query=query, document=doc[:1000])
        )
        try:
            score = float(response.text.strip())
        except ValueError:
            score = 0.0
        scores.append((doc, score))

    return sorted(scores, key=lambda x: x[1], reverse=True)[:top_n]

# Kosten: ~$0.01-0.05 per Re-Ranking-Anfrage (bei 20 Docs, Claude Haiku)
# → Nur für high-value Anfragen sinnvoll
\`\`\`

**Entscheidungsmatrix:**

| Methode | Latenz | Kosten | Qualität | Empfehlung |
|---------|--------|--------|----------|------------|
| sentence-transformers Cross-Encoder | 50-200ms | Minimal (self-hosted) | Sehr gut | Default-Wahl |
| Cohere Rerank | 100-300ms | $1/1k Anfragen | Exzellent (multilingual) | SaaS-Projekte |
| LLM-as-Reranker | 500ms-2s | $10-50/1k Anfragen | Exzellent | Complex Reasoning |`,
        analogy: `Re-Ranking ist wie eine zweistufige Jobbewerbungsauswahl: Im ersten Schritt scannt HR alle Lebensläufe nach Schlüsselbegriffen und schickt 50 durch (Bi-Encoder). Im zweiten Schritt liest der Abteilungsleiter diese 50 gründlich durch und wählt die besten 5 aus (Cross-Encoder). Beide Stufen braucht man — die erste für Geschwindigkeit, die zweite für Qualität.`,
        consultingRelevance: `Re-Ranking ist die günstigste Verbesserungsmaßnahme bei bestehenden RAG-Systemen mit schlechter Präzision. In einem typischen Pilotprojekt lässt sich die Präzision (Precision@5) durch Re-Ranking von 60% auf 85%+ steigern, ohne die Embedding-Infrastruktur anfassen zu müssen. Das ist ein starkes Argument für einen "Quick Win"-Sprint, bevor man in größere Umbaumaßnahmen investiert.`
      },
      {
        title: "Query Transformation: HyDE, Step-Back Prompting, Query Expansion",
        content: `Die Anfrage des Nutzers ist selten optimal für Vektorsuche formuliert. Query Transformation verbessert den Retrieval, indem die Anfrage vor der Suche umgeformt wird — ohne die Datenbank zu ändern.

**HyDE — Hypothetical Document Embeddings:**

Statt die kurze User-Query zu embedden, generiert HyDE zuerst eine hypothetische Antwort und embeddet diese. Die hypothetische Antwort ist semantisch näher an echten Dokumenten:

\`\`\`python
from anthropic import Anthropic

client = Anthropic()

HYDE_PROMPT = """Generiere einen hypothetischen Dokumentenabsatz, der die folgende Frage
direkt beantwortet. Der Text soll so klingen wie er in einem Unternehmens-Handbuch,
Qualitätsbericht oder technischen Dokument stehen würde.

Frage: {query}

Hypothetischer Absatz (2-4 Sätze, sachlich, präzise):"""

async def hyde_retrieve(query: str, vector_store, k: int = 5) -> list:
    # 1. Hypothetisches Dokument generieren
    response = client.messages.create(
        model="claude-haiku-4-5",  # Günstigstes Modell für diese Aufgabe
        max_tokens=200,
        messages=[{"role": "user", "content": HYDE_PROMPT.format(query=query)}]
    )
    hypothetical_doc = response.content[0].text

    # 2. Hypothetisches Dokument embedden (nicht die originale Query)
    hyde_embedding = embed(hypothetical_doc)

    # 3. Mit hypothetischem Embedding suchen
    results = vector_store.similarity_search_by_vector(hyde_embedding, k=k)
    return results

# Beispiel:
# Query: "Lieferant Fehlerquote"
# HyDE generiert: "Die Fehlerquote von Lieferant Müller GmbH für Hydraulikteile
#   betrug im Q3 2024 2,3% und überschreitet damit den Zielwert von 1,5%."
# → Dieses längere, dokumentähnliche Embedding findet relevante Berichte besser
\`\`\`

**Step-Back Prompting:**

Abstrahiert eine spezifische Anfrage zu einer allgemeineren Frage und sucht zuerst nach dem Kontext:

\`\`\`python
STEP_BACK_PROMPT = """Gegeben eine spezifische Frage, formuliere eine allgemeinere
"Step-Back"-Frage, die den breiteren Kontext für die Beantwortung der spezifischen
Frage liefert.

Spezifische Frage: {query}
Step-Back Frage:"""

async def step_back_rag(query: str, vector_store, llm_client) -> str:
    # 1. Allgemeinere Frage generieren
    step_back_response = await llm_client.complete(
        STEP_BACK_PROMPT.format(query=query)
    )
    step_back_query = step_back_response.text

    # 2. Beide Anfragen parallel suchen
    import asyncio
    specific_results, context_results = await asyncio.gather(
        vector_store.asimilarity_search(query, k=3),
        vector_store.asimilarity_search(step_back_query, k=3)
    )

    # 3. Kontext kombinieren
    all_context = context_results + specific_results
    return all_context

# Beispiel:
# Query: "Welche Maßnahmen wurden nach dem Ausfall der Pumpe P-042 ergriffen?"
# Step-Back: "Was sind die Standard-Fehleranalyse-Prozesse für Hydraulikpumpen?"
# → Context-Suche findet SOP, spezifische Suche findet den konkreten Vorfall
\`\`\`

**Query Expansion mit Multi-Query:**

\`\`\`python
MULTI_QUERY_PROMPT = """Du bist ein KI-Assistent für ein Unternehmens-Wissenssystem.
Generiere 3 verschiedene Umformulierungen der folgenden Anfrage, um verschiedene
Aspekte des Themas abzudecken. Trenne die Anfragen mit Zeilenumbrüchen.

Originale Anfrage: {query}

3 Umformulierungen:"""

from langchain.retrievers import MultiQueryRetriever
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-haiku-4-5")
retriever = MultiQueryRetriever.from_llm(
    retriever=vector_store.as_retriever(search_kwargs={"k": 5}),
    llm=llm,
    prompt=MULTI_QUERY_PROMPT,
    include_original=True  # Original-Query ebenfalls suchen
)

# Intern werden 4 Queries ausgeführt (3 generierte + 1 original)
# Duplikate werden automatisch entfernt
docs = retriever.get_relevant_documents("Qualitätsprobleme Lieferant 2024")
\`\`\`

**Wann welche Strategie:**
- **HyDE:** Kurze, unpräzise User-Queries; Factual-QA-Szenarien
- **Step-Back:** Wenn Kontext-Verständnis nötig ist (Prozesskenntnisse)
- **Multi-Query:** Wenn Anfragen mehrere Aspekte haben; breite Informationssuche`,
        analogy: `Query Transformation ist wie ein erfahrener Bibliothekar, der deine Anfrage "Was ist mit Pumpe 42 passiert?" neu formuliert: Er sucht nicht nur nach "Pumpe 42", sondern auch nach Wartungsprotokollen, Fehlerberichten und Hydraulik-SOPs — und kombiniert die Ergebnisse zu einer vollständigen Antwort.`,
        consultingRelevance: `Query Transformation ist besonders wertvoll wenn Endnutzer unpräzise, kurze Anfragen stellen — was im Mittelstand der Standard ist. Produktionsmitarbeiter tippen keine präzisen Suchanfragen. HyDE und Multi-Query verbessern den Recall erheblich, ohne dass die Nutzer geschult werden müssen. Das ist ein wichtiges Argument: "Die KI passt sich dem Nutzer an, nicht umgekehrt."`
      },
      {
        title: "Evaluation Deep-Dive: RAGAS-Metriken in der Praxis",
        content: `Ohne Evaluation ist RAG-Entwicklung Blindflug. RAGAS (Retrieval Augmented Generation Assessment) bietet ein standardisiertes Framework mit vier Kernmetriken, die verschiedene Aspekte der RAG-Pipeline messen.

**Die vier RAGAS-Kernmetriken:**

| Metrik | Was wird gemessen | Gut wenn | Schlecht wenn |
|--------|-----------------|----------|---------------|
| Faithfulness | Sind Antwortaussagen im Kontext belegt? | > 0.85 | < 0.70 |
| Answer Relevancy | Beantwortet die Antwort die Frage? | > 0.85 | < 0.70 |
| Context Precision | Sind gefundene Chunks relevant? | > 0.75 | < 0.60 |
| Context Recall | Wurden alle relevanten Infos gefunden? | > 0.80 | < 0.65 |

**Evaluation-Dataset erstellen:**

\`\`\`python
from ragas.testset.generator import TestsetGenerator
from ragas.testset.evolutions import simple, reasoning, multi_context
from langchain_anthropic import ChatAnthropic
from langchain_openai import OpenAIEmbeddings

# Testset automatisch aus Dokumenten generieren
generator_llm = ChatAnthropic(model="claude-opus-4-5")
critic_llm = ChatAnthropic(model="claude-opus-4-5")
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

generator = TestsetGenerator.from_langchain(
    generator_llm=generator_llm,
    critic_llm=critic_llm,
    embeddings=embeddings
)

# 100 Testfragen aus Dokumenten generieren
testset = generator.generate_with_langchain_docs(
    documents=quality_docs,
    test_size=100,
    distributions={
        simple: 0.5,          # Direkte Faktenfragen
        reasoning: 0.3,       # Schlussfolgerungsfragen
        multi_context: 0.2    # Fragen die mehrere Dokumente brauchen
    }
)

testset.to_pandas().to_csv("rag_testset.csv", index=False)
\`\`\`

**Evaluation Pipeline:**

\`\`\`python
from ragas import evaluate
from ragas.metrics import (
    faithfulness, answer_relevancy,
    context_precision, context_recall
)
from datasets import Dataset

# RAG-Antworten für alle Testfragen generieren
results = []
for row in testset:
    # RAG-Pipeline aufrufen
    response = rag_pipeline.query(row["question"])
    results.append({
        "question": row["question"],
        "answer": response.response,
        "contexts": [node.text for node in response.source_nodes],
        "ground_truth": row["ground_truth"]  # Aus Testset
    })

# RAGAS Evaluation
eval_dataset = Dataset.from_list(results)
scores = evaluate(
    eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall]
)

print(scores)
# Output:
# {'faithfulness': 0.87, 'answer_relevancy': 0.82,
#  'context_precision': 0.79, 'context_recall': 0.74}
\`\`\`

**Diagnose bei schlechten Metriken:**

\`\`\`python
def diagnose_rag_issues(scores: dict) -> list[str]:
    issues = []

    if scores["context_precision"] < 0.70:
        issues.append("RETRIEVAL-PROBLEM: Zu viele irrelevante Chunks gefunden. "
                      "→ Re-Ranking implementieren, Similarity-Threshold erhöhen")

    if scores["context_recall"] < 0.70:
        issues.append("RETRIEVAL-PROBLEM: Relevante Infos werden nicht gefunden. "
                      "→ Chunking-Strategie überarbeiten, Query Expansion hinzufügen")

    if scores["faithfulness"] < 0.80:
        issues.append("GENERATION-PROBLEM: LLM halluziniert / weicht von Kontext ab. "
                      "→ System-Prompt verschärfen: 'Antworte NUR auf Basis des Kontexts'")

    if scores["answer_relevancy"] < 0.75:
        issues.append("GENERATION-PROBLEM: Antworten sind unvollständig oder abweichend. "
                      "→ Output-Format im Prompt präzisieren")

    return issues
\`\`\`

**Minimum Viable Eval-Setup:**
- 50 Testfragen (manuell erstellt oder RAGAS-generiert)
- Evaluation nach jedem größeren Deployment
- Alert wenn Metrik > 5% unter Baseline fällt
- Separate Testsets für verschiedene Dokumentkategorien`,
        analogy: `RAGAS ist wie TÜV für KI-Systeme: Ohne regelmäßige Prüfung weißt du nicht, ob dein System noch zuverlässig fährt. Die vier Metriken sind wie die vier Prüfbereiche Bremsen, Lenkung, Licht und Abgase — jede misst einen anderen kritischen Aspekt, und alle müssen stimmen damit das Gesamtsystem sicher ist.`,
        consultingRelevance: `Kunden fragen in jeder Präsentation "Wie gut ist Ihr KI-System?" Ohne RAGAS-Metriken hast du keine quantitative Antwort. Mit einem Evaluation-Dashboard kannst du konkret sagen: "Unser System beantwortet 87% der Anfragen factual korrekt, findet 74% der relevanten Informationen." Das ist der Unterschied zwischen "es funktioniert gut" und einer verifizierbaren Qualitätsaussage. Außerdem schützt dich Evaluation vertraglich — du kannst SLA-ähnliche Qualitätszusagen mit messbaren Metriken belegen.`
      },
      {
        title: "RAG-Monitoring: LangSmith Tracing, Drift-Detection, Quality Alerts",
        content: `Ein RAG-System, das in Production läuft ohne Monitoring, ist wie ein Flugzeug ohne Instrumente. Qualitätsprobleme entwickeln sich schleichend — Embedding-Drift, Datenbasis-Veränderungen, veränderte Nutzeranfragen — und sind ohne aktives Monitoring nicht erkennbar.

**LangSmith für Production-Tracing:**

\`\`\`python
import os
from langsmith import Client
from langchain.callbacks.tracers import LangChainTracer

# LangSmith aktivieren
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "your-langsmith-key"
os.environ["LANGCHAIN_PROJECT"] = "supply-chain-rag-prod"

# Automatisches Tracing für alle LangChain-Calls
# Jede Anfrage wird mit vollständigem Trace gespeichert:
# - Query Text
# - Retrieved Chunks + Scores
# - LLM-Prompt (vollständig)
# - LLM-Response
# - Latenz pro Schritt
# - Token-Kosten

# Manuelle Feedback-Erfassung nach Nutzer-Interaktion
client = Client()

def record_user_feedback(run_id: str, rating: int, comment: str = None):
    """Nutzer-Feedback zu einem RAG-Run speichern."""
    client.create_feedback(
        run_id=run_id,
        key="user_rating",
        score=rating / 5.0,        # Normalisiert auf 0-1
        comment=comment,
        feedback_source_type="human"
    )
\`\`\`

**Embedding Drift Detection:**

Wenn sich das Nutzer-Anfrageverhalten ändert, driften Query-Embeddings aus dem Bereich der indexierten Dokumente heraus. Das ist messbar:

\`\`\`python
import numpy as np
from scipy.spatial.distance import cosine
from datetime import datetime, timedelta
import redis

class EmbeddingDriftMonitor:
    def __init__(self, redis_client, alert_threshold: float = 0.15):
        self.redis = redis_client
        self.threshold = alert_threshold

    def record_query_embedding(self, embedding: list[float]):
        """Query-Embedding in gleitendem Fenster speichern."""
        key = f"embeddings:{datetime.now().strftime('%Y-%m-%d-%H')}"
        self.redis.lpush(key, json.dumps(embedding))
        self.redis.ltrim(key, 0, 999)   # Letzten 1000 Embeddings
        self.redis.expire(key, 86400 * 7)

    def check_drift(self) -> dict:
        """Vergleicht aktuelle Embeddings mit Baseline (7 Tage alt)."""
        current_key = f"embeddings:{datetime.now().strftime('%Y-%m-%d-%H')}"
        baseline_key = f"embeddings:{(datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d-%H')}"

        current_embs = [json.loads(e) for e in self.redis.lrange(current_key, 0, -1)]
        baseline_embs = [json.loads(e) for e in self.redis.lrange(baseline_key, 0, -1)]

        if len(current_embs) < 10 or len(baseline_embs) < 10:
            return {"status": "insufficient_data"}

        # Zentroid-Verschiebung als Drift-Metrik
        current_centroid = np.mean(current_embs, axis=0)
        baseline_centroid = np.mean(baseline_embs, axis=0)
        drift = cosine(current_centroid, baseline_centroid)

        return {
            "drift_score": float(drift),
            "status": "drift_detected" if drift > self.threshold else "ok",
            "sample_size": len(current_embs)
        }
\`\`\`

**Quality Regression Alerts:**

\`\`\`python
import anthropic
from dataclasses import dataclass

@dataclass
class QualityAlert:
    metric: str
    current_value: float
    baseline_value: float
    regression_pct: float

class RAGQualityMonitor:
    def __init__(self, baseline_scores: dict, alert_threshold: float = 0.05):
        self.baseline = baseline_scores
        self.threshold = alert_threshold  # 5% Regression = Alert

    def check_regression(self, current_scores: dict) -> list[QualityAlert]:
        alerts = []
        for metric, baseline_val in self.baseline.items():
            current_val = current_scores.get(metric, 0)
            regression = (baseline_val - current_val) / baseline_val

            if regression > self.threshold:
                alerts.append(QualityAlert(
                    metric=metric,
                    current_value=current_val,
                    baseline_value=baseline_val,
                    regression_pct=regression * 100
                ))
        return alerts

    def send_alert(self, alerts: list[QualityAlert], channel: str):
        if not alerts:
            return
        message = "🚨 RAG Quality Regression Detected:\n"
        for alert in alerts:
            message += (f"- {alert.metric}: {alert.current_value:.3f} "
                       f"(Baseline: {alert.baseline_value:.3f}, "
                       f"Regression: -{alert.regression_pct:.1f}%)\n")
        # Via Slack/Teams/Email senden
        send_notification(channel, message)
\`\`\`

**Monitoring-Dashboard KPIs:**
- Anfragen/Minute (Traffic)
- P50/P95/P99 Latenz
- Cache-Hit-Rate
- Durchschnittlicher Faithfulness-Score (via RAGAS auf Sample)
- Nutzer-Feedback-Score (Thumbs Up/Down)
- Embedding-Drift-Score`,
        analogy: `RAG-Monitoring ist wie Qualitätssicherung in der Produktion: Du prüfst nicht jedes Teil manuell (jede Anfrage mit RAGAS evaluieren), aber du überwachst Prozessparameter (Latenz, Drift, Feedback) und ziehst eine Stichprobe für tiefere Prüfung. Wenn die Prozessparameter driften, schlägt der Alarm — bevor fehlerhafte Teile (schlechte Antworten) beim Kunden ankommen.`,
        consultingRelevance: `"Was passiert, wenn das System schlechter wird?" ist eine berechtigte Frage jedes CIOs. Mit einem Monitoring-Konzept — LangSmith für Tracing, Drift-Detection für frühzeitige Warnung, RAGAS-Samples für Qualitätsmessung — kannst du diese Frage konkret beantworten. Das erhöht die Bereitschaft, in Production zu gehen erheblich. Außerdem ist Monitoring oft der Unterschied zwischen einem abgeschlossenen Piloten und einer echten, dauerhaften KI-Investition.`
      }
    ],
    gfSummary: `**Advanced RAG — Zusammenfassung für Geschäftsführer:**

Die Qualität einer KI-Anwendung, die auf Unternehmensdokumenten basiert, hängt zu 70% von der richtigen Datenaufbereitung (Chunking) und Suchtechnologie (Re-Ranking) ab — nicht vom KI-Modell selbst. Mit fortgeschrittenen Chunking-Strategien und Re-Ranking lässt sich die Präzision von 60% auf 85%+ steigern, ohne das zugrundeliegende Modell zu wechseln.

Ohne Evaluation ist jede Qualitätsaussage über ein KI-System spekulativ. RAGAS ermöglicht messbare, nachweisbare Qualitätskennzahlen — der Unterschied zwischen "funktioniert gut" und "beantwortet 87% der Anfragen korrekt auf Basis der eigenen Dokumentenbasis."

Monitoring in Production ist keine optionale Ergänzung: KI-Systeme verschlechtern sich, wenn sich Datenbasis oder Nutzungsverhalten ändern. Frühwarnsysteme ermöglichen proaktives Eingreifen bevor Nutzer die Qualitätsprobleme bemerken.`
  },

  "tools-infra": {
    title: "Developer Toolchain für KI-Teams",
    layerLevel: 3,
    estimatedMinutes: 80,
    steps: [
      {
        title: "LangChain vs. LlamaIndex vs. Haystack: Entscheidungsmatrix für Unternehmen",
        content: `Die Wahl des KI-Frameworks entscheidet über Entwicklungsgeschwindigkeit, Wartbarkeit und Team-Skalierbarkeit. Alle drei sind leistungsfähig — aber für verschiedene Anwendungsfälle optimiert.

**LangChain — Das Schweizer Taschenmesser:**

\`\`\`python
from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.vectorstores import PGVector
from langchain.chains import RetrievalQA

# LCEL (LangChain Expression Language) — moderne Syntax
llm = ChatAnthropic(model="claude-sonnet-4-5")

# Chain als Pipeline definieren
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | ChatPromptTemplate.from_template("""
        Beantworte die Frage basierend auf folgendem Kontext:
        {context}
        Frage: {question}
    """)
    | llm
    | StrOutputParser()
)

# Ausführen
answer = rag_chain.invoke("Was sind die Qualitätsprobleme bei Lieferant Müller?")

# Streaming
for chunk in rag_chain.stream("Zeige mir offene Bestellungen für Werk 1000"):
    print(chunk, end="", flush=True)
\`\`\`

**Stärken:** Größtes Ökosystem (500+ Integrationen), beste Agent-Unterstützung, LangSmith-Integration, aktive Community.
**Schwächen:** Komplexe Abstraktion, häufige Breaking Changes, Overkill für einfache RAG-Pipelines.

**LlamaIndex — Der RAG-Spezialist:**

\`\`\`python
from llama_index.core import VectorStoreIndex, Document, Settings
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.llms.anthropic import Anthropic
from llama_index.embeddings.openai import OpenAIEmbedding

# Globale Settings konfigurieren
Settings.llm = Anthropic(model="claude-sonnet-4-5")
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")
Settings.chunk_size = 512
Settings.chunk_overlap = 50

# Index aus Dokumenten erstellen — LlamaIndex optimiert das automatisch
index = VectorStoreIndex.from_documents(
    documents,
    show_progress=True
)

# Erweiterte Query Engine mit Re-Ranking
from llama_index.core.postprocessor import SentenceTransformerRerank

reranker = SentenceTransformerRerank(
    model="cross-encoder/ms-marco-MiniLM-L-12-v2",
    top_n=5
)

query_engine = index.as_query_engine(
    similarity_top_k=20,       # Erst 20 holen
    node_postprocessors=[reranker]  # Dann auf 5 re-ranken
)

response = query_engine.query("Qualitätsbericht Pumpen Q3 2024")
print(response)
print(response.source_nodes)  # Quellen mit Scores
\`\`\`

**Stärken:** Beste RAG-Primitiven, Indexing-Strategien out-of-the-box, hervorragende Dokumentation für RAG-Patterns.
**Schwächen:** Weniger geeignet für komplexe Agenten, kleineres Nicht-RAG-Ökosystem.

**Haystack — Der Enterprise-Framework:**

\`\`\`python
from haystack import Pipeline
from haystack.components.retrievers.in_memory import InMemoryBM25Retriever
from haystack.components.generators import AnthropicGenerator
from haystack.components.builders import PromptBuilder

# Deklarative Pipeline-Definition
pipeline = Pipeline()
pipeline.add_component("retriever", InMemoryBM25Retriever(document_store=doc_store))
pipeline.add_component("prompt_builder", PromptBuilder(template=template))
pipeline.add_component("llm", AnthropicGenerator(model="claude-haiku-4-5"))

pipeline.connect("retriever", "prompt_builder.documents")
pipeline.connect("prompt_builder", "llm")

# Pipeline serialisieren (für Versionierung!)
pipeline.to_yaml("pipelines/rag_v1.yaml")
\`\`\`

**Stärken:** Klare Abstraktionen, YAML-Serialisierung für Pipeline-Versionierung, beste Testbarkeit, stabile API.
**Schwächen:** Kleinere Community, weniger Integrationen als LangChain.

**Entscheidungsmatrix:**

| Kriterium | LangChain | LlamaIndex | Haystack |
|-----------|-----------|------------|---------|
| RAG-Fokus | Mittel | Hoch | Mittel |
| Agent-Fokus | Hoch | Mittel | Niedrig |
| API-Stabilität | Niedrig | Mittel | Hoch |
| Team: Python-Einsteiger | Mittel | Hoch | Hoch |
| Empfehlung | Agenten, Multi-Tool | RAG-first Projekte | Enterprise, Stabilität |`,
        analogy: `Die Framework-Wahl ist wie die Wahl zwischen Toyota (Haystack: zuverlässig, gut dokumentiert), BMW (LangChain: viele Features, braucht Pflege) und einem Sportwagen (LlamaIndex: für einen spezifischen Anwendungsfall optimiert). Für die meisten Unternehmensprojekte ist Toyota die richtige Wahl.`,
        consultingRelevance: `Framework-Entscheidungen werden in der Regel am Anfang eines Projekts getroffen und sind schwer rückgängig zu machen. Als Berater solltest du aktiv eine Empfehlung geben — nicht "kommt drauf an". Für einen Mittelstandskunden ohne KI-Team ist LlamaIndex für RAG-Projekte oder Haystack für Stabilität die konkreteste Empfehlung. LangChain empfiehlst du, wenn Agenten-Funktionalität ein Kernfeature ist.`
      },
      {
        title: "LangSmith: Tracing, Evaluation und Prompt Management in Production",
        content: `LangSmith ist die Produktions-Observability-Plattform für LangChain-basierte Anwendungen. Sie löst das größte Problem bei KI-Projekten: Sichtbarkeit darüber, was das System intern tut.

**Setup und automatisches Tracing:**

\`\`\`python
import os
from langsmith import Client, traceable

# Aktivierung via Environment Variables
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "ls__your_key"
os.environ["LANGCHAIN_PROJECT"] = "supply-chain-rag-prod"
os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"

# Alle LangChain-Aufrufe werden automatisch getracet
# Für Non-LangChain Code: @traceable Decorator

@traceable(name="quality-document-retrieval", tags=["retrieval", "quality"])
def retrieve_quality_docs(query: str, plant: str) -> list[dict]:
    """Qualitätsdokumente aus Vektordatenbank abrufen."""
    results = vector_store.similarity_search(
        query,
        k=10,
        filter={"plant": plant}
    )
    return [{"content": r.page_content, "metadata": r.metadata} for r in results]

@traceable(name="rag-complete-pipeline")
def rag_pipeline(user_query: str, plant: str) -> dict:
    docs = retrieve_quality_docs(user_query, plant)
    # ... LLM-Aufruf ...
    return {"answer": answer, "sources": docs}
\`\`\`

**Evaluation mit LangSmith:**

\`\`\`python
from langsmith.evaluation import evaluate, LangChainStringEvaluator
from langsmith import Client

client = Client()

# Evaluator: LLM bewertet Korrektheit
correctness_evaluator = LangChainStringEvaluator(
    "cot_qa",  # Chain-of-Thought QA Evaluator
    config={"llm": ChatAnthropic(model="claude-opus-4-5")},
    prepare_data=lambda run, example: {
        "prediction": run.outputs["answer"],
        "reference": example.outputs["expected_answer"],
        "input": example.inputs["question"]
    }
)

# Dataset aus LangSmith laden (vorher erstellt)
dataset = client.read_dataset(dataset_name="quality-rag-eval-v2")

# Evaluation ausführen
results = evaluate(
    rag_pipeline,
    data=dataset,
    evaluators=[correctness_evaluator],
    experiment_prefix="rag-v1.3-hnsw-rerank",
    max_concurrency=4
)

print(results.to_pandas()[["input", "output", "score"]].head(10))
\`\`\`

**Prompt-Versionierung und A/B-Testing:**

\`\`\`python
from langsmith import Client
from langchain import hub

client = Client()

# Prompt in LangSmith Hub pushen (Versionierung)
# Version wird automatisch inkrementiert
client.push_prompt(
    "supply-chain-rag-system-prompt",
    object=ChatPromptTemplate.from_messages([
        ("system", """Du bist ein KI-Assistent für Supply-Chain-Management.
        Beantworte Fragen basierend auf dem bereitgestellten Kontext.
        Wenn die Information nicht im Kontext steht, sage klar: "Diese Information
        liegt mir nicht vor."
        Antworte immer auf Deutsch, präzise und faktenbasiert."""),
        ("human", "{question}")
    ])
)

# Prompt aus Hub laden (spezifische Version)
prompt_v2 = hub.pull("your-org/supply-chain-rag-system-prompt:2")

# A/B-Test: 50% der Anfragen mit neuer Version
import random
def get_prompt_for_request(request_id: str):
    if hash(request_id) % 2 == 0:
        return hub.pull("your-org/supply-chain-rag-system-prompt:1")
    else:
        return hub.pull("your-org/supply-chain-rag-system-prompt:2")
\`\`\`

**LangSmith Dashboard — Wichtigste Metriken:**
- Feedback-Rate (Thumbs Up/Down von Nutzern)
- Latenz-Breakdown: Retrieval vs. LLM vs. Re-Ranking
- Token-Verbrauch und -Kosten per Prompt-Version
- Error-Rate und häufigste Fehlermuster
- Automatischer Eval-Score per Deployment

**Kosten:** LangSmith Developer: kostenlos (10k Traces/Monat). Plus: $39/Monat (unbegrenzte Traces). Enterprise: Custom Pricing.`,
        analogy: `LangSmith ist wie ein Cockpit-Recorder (Black Box) und Flugsimulator in einem: Die Black Box zeichnet jeden Flug auf und zeigt bei Problemen genau wo es schiefgelaufen ist. Der Simulator testet neue Routen (Prompt-Versionen) bevor sie in Production gehen.`,
        consultingRelevance: `LangSmith ist das stärkste Argument gegen "wir bauen das selbst" bei Observability. Die Zeit, die ein Team braucht um eigenes Logging, Tracing und Evaluation zu bauen, übersteigt die LangSmith-Kosten um das 10-fache. Als Berater empfiehlst du LangSmith standardmäßig für alle LangChain-Projekte ab Proof-of-Concept-Phase — nicht erst in Production.`
      },
      {
        title: "Prompt Management: Versionierung, A/B-Testing, Regression Tests",
        content: `Prompts sind Code. Sie müssen versioniert, getestet und dokumentiert werden — genau wie Software. Ohne systematisches Prompt Management werden KI-Systeme unkontrollierbar.

**Prompt-Versionierungsstruktur:**

\`\`\`
prompts/
├── system/
│   ├── rag_assistant_v1.yaml
│   ├── rag_assistant_v2.yaml
│   └── current -> rag_assistant_v2.yaml  (Symlink)
├── extraction/
│   ├── invoice_extractor_v1.yaml
│   └── invoice_extractor_v2.yaml
└── evaluation/
    └── quality_judge.yaml
\`\`\`

\`\`\`yaml
# rag_assistant_v2.yaml
metadata:
  name: "rag_assistant"
  version: "2.1.0"
  author: "Dean Dukic"
  created: "2024-11-15"
  changelog: "Verbesserte Quellenangaben, striktere Halluzinations-Prevention"
  model_tested: ["claude-sonnet-4-5", "claude-haiku-4-5"]
  eval_scores:
    faithfulness: 0.91
    answer_relevancy: 0.87

system_prompt: |
  Du bist ein KI-Assistent für Supply-Chain-Fragen der {company_name}.
  Du hast Zugriff auf interne Dokumente, Qualitätsberichte und ERP-Daten.

  VERHALTENSREGELN:
  1. Beantworte NUR Fragen, die durch den bereitgestellten Kontext belegt sind
  2. Wenn Information fehlt: "Diese Information liegt mir nicht vor. Ich empfehle..."
  3. Nenne immer die Quelle: "Laut [Dokumentname] vom [Datum]..."
  4. Bei Widersprüchen in den Quellen: beide Informationen nennen + Datum
  5. Antworte auf Deutsch, außer die Frage ist in einer anderen Sprache

  FORMATIERUNG:
  - Kurze Antworten: Fließtext
  - Mehrere Punkte: Aufzählung
  - Zahlen: immer mit Einheit und Zeitbezug
\`\`\`

**Prompt Regression Testing:**

\`\`\`python
import pytest
import json
from anthropic import Anthropic

client = Anthropic()

# Testfälle definieren
PROMPT_REGRESSION_TESTS = [
    {
        "id": "hallucination_prevention",
        "context": "Lieferant Müller GmbH liefert Hydraulikpumpen.",
        "question": "Wie hoch ist der Umsatz von Müller GmbH?",
        "expected_behavior": "refuses_to_answer",
        "forbidden_phrases": ["Der Umsatz beträgt", "€", "Millionen"]
    },
    {
        "id": "source_citation",
        "context": "Qualitätsbericht Q3 2024: Fehlerquote 2.3%",
        "question": "Wie war die Fehlerquote im Q3?",
        "expected_behavior": "answers_with_source",
        "required_phrases": ["2,3%", "Q3 2024"]
    },
    {
        "id": "contradiction_handling",
        "context": "Bericht A (Jan): Lagerbestand 1000 Stück. Bericht B (Feb): Lagerbestand 750 Stück.",
        "question": "Wie hoch ist der Lagerbestand?",
        "expected_behavior": "mentions_both_sources",
        "required_phrases": ["1000", "750", "Januar", "Februar"]
    }
]

@pytest.mark.parametrize("test_case", PROMPT_REGRESSION_TESTS)
def test_prompt_behavior(test_case):
    """Automatischer Regression-Test für Prompt-Änderungen."""
    with open("prompts/system/current.yaml") as f:
        system_prompt = yaml.safe_load(f)["system_prompt"]

    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=200,
        system=system_prompt.format(company_name="TestCorp"),
        messages=[{
            "role": "user",
            "content": f"Kontext:\n{test_case['context']}\n\nFrage: {test_case['question']}"
        }]
    )
    answer = response.content[0].text

    # Prüfe verbotene Phrasen
    for forbidden in test_case.get("forbidden_phrases", []):
        assert forbidden not in answer, \
            f"Test {test_case['id']}: Verbotener Ausdruck '{forbidden}' in Antwort"

    # Prüfe erforderliche Phrasen
    for required in test_case.get("required_phrases", []):
        assert required in answer, \
            f"Test {test_case['id']}: Erforderlicher Ausdruck '{required}' fehlt"
\`\`\`

**CI/CD-Integration für Prompt-Tests:**

\`\`\`yaml
# .github/workflows/prompt-regression.yml
name: Prompt Regression Tests
on:
  push:
    paths:
      - 'prompts/**'    # Nur bei Prompt-Änderungen triggern

jobs:
  test-prompts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run prompt regression tests
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: pytest tests/test_prompts.py -v --tb=short
\`\`\`

**A/B-Testing in Production:**

\`\`\`python
from dataclasses import dataclass
import hashlib

@dataclass
class PromptVariant:
    name: str
    prompt: str
    traffic_share: float  # 0.0 - 1.0

ACTIVE_VARIANTS = [
    PromptVariant("control", load_prompt("v2.0.0"), traffic_share=0.8),
    PromptVariant("challenger", load_prompt("v2.1.0"), traffic_share=0.2)
]

def select_variant(user_id: str) -> PromptVariant:
    """Deterministische Variantenauswahl (gleicher User → gleiche Variante)."""
    hash_val = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
    threshold = hash_val % 100
    cumulative = 0
    for variant in ACTIVE_VARIANTS:
        cumulative += variant.traffic_share * 100
        if threshold < cumulative:
            return variant
    return ACTIVE_VARIANTS[0]
\`\`\``,
        analogy: `Prompt Management ohne Versionierung ist wie Software-Entwicklung ohne Git: Jede Änderung könnte alles kaputt machen, und du weißt nicht warum oder wann es passiert ist. Prompt Regression Tests sind die Unit-Tests für KI-Verhalten — sie fangen Regressionen bevor sie in Production kommen.`,
        consultingRelevance: `In jedem KI-Projekt gibt es den Moment, wo jemand "den Prompt leicht angepasst hat" und das System plötzlich merkwürdige Antworten gibt. Ohne Versionierung und Tests ist dieser Moment ein Alptraum. Als Berater gibst du dem Kunden einen klaren Prozess: Prompts in YAML-Dateien, Git-Versionierung, Regression Tests im CI. Das erhöht die Qualitätssicherung erheblich und macht das System für das Kundenteam wartbar.`
      },
      {
        title: "KI-Sicherheits-Tools: LLM Guard, Presidio und NeMo Guardrails",
        content: `Produktions-KI-Systeme müssen gegen Prompt Injection, Datenlecks und unerwünschte Ausgaben abgesichert werden. Diese Tools sind keine optionalen Extras — sie sind Pflicht für Unternehmenssysteme.

**LLM Guard — Input/Output Scanning:**

\`\`\`python
from llm_guard import scan_prompt, scan_output
from llm_guard.input_scanners import (
    Anonymize, BanTopics, PromptInjection, Toxicity
)
from llm_guard.output_scanners import (
    Deanonymize, NoRefusal, Relevance, Sensitive
)
from llm_guard.vault import Vault

vault = Vault()  # Für Anonymisierung/De-Anonymisierung

# Input-Scanner konfigurieren
input_scanners = [
    # PII erkennen und anonymisieren
    Anonymize(vault, preamble="Anonymisiere persönliche Daten:",
              language="de", recognizer_conf={"DE_NLP": {"score_threshold": 0.4}}),
    # Prompt Injection erkennen
    PromptInjection(threshold=0.9),
    # Verbotene Themen blockieren
    BanTopics(topics=["konkurrenten", "gehälter", "personalakten"], threshold=0.6),
]

# Output-Scanner konfigurieren
output_scanners = [
    Deanonymize(vault),   # Anonymisierung wieder rückgängig machen
    NoRefusal(threshold=0.95),  # Modell soll nicht grundlos verweigern
    Sensitive(threshold=0.8),   # Sensitive Infos in Output prüfen
]

async def secure_rag_pipeline(user_input: str, user_id: str) -> str:
    # Input scannen
    sanitized_input, results_valid, results_score = scan_prompt(
        input_scanners, user_input
    )
    if not results_valid["PromptInjection"]:
        raise SecurityException("Prompt Injection erkannt")

    # RAG ausführen (mit anonymisiertem Input)
    raw_output = await rag_pipeline(sanitized_input)

    # Output scannen
    sanitized_output, _, _ = scan_output(
        output_scanners, sanitized_input, raw_output
    )
    return sanitized_output
\`\`\`

**Microsoft Presidio — PII-Erkennung für Deutsch:**

\`\`\`python
from presidio_analyzer import AnalyzerEngine, RecognizerRegistry
from presidio_analyzer.nlp_engine import NlpEngineProvider
from presidio_anonymizer import AnonymizerEngine

# Deutsches NLP-Modell konfigurieren
configuration = {
    "nlp_engine_name": "spacy",
    "models": [{"lang_code": "de", "model_name": "de_core_news_lg"}],
}
provider = NlpEngineProvider(nlp_configuration=configuration)
nlp_engine = provider.create_engine()

analyzer = AnalyzerEngine(nlp_engine=nlp_engine, supported_languages=["de"])
anonymizer = AnonymizerEngine()

def detect_pii_in_erp_data(text: str) -> dict:
    """PII in ERP-Daten vor LLM-Verarbeitung erkennen."""
    results = analyzer.analyze(
        text=text,
        language="de",
        entities=["PERSON", "PHONE_NUMBER", "EMAIL_ADDRESS",
                  "IBAN_CODE", "CREDIT_CARD"]
    )

    if results:
        anonymized = anonymizer.anonymize(text=text, analyzer_results=results)
        return {
            "pii_detected": True,
            "entities": [(r.entity_type, r.score) for r in results],
            "anonymized_text": anonymized.text
        }
    return {"pii_detected": False, "original_text": text}

# Beispiel:
# Input: "Herr Mueller (mueller@lieferant.de) hat eine Bestellung über 50.000€"
# Output: "PERSON (0.85), EMAIL_ADDRESS (0.99)"
# Anonymized: "<PERSON> (<EMAIL_ADDRESS>) hat eine Bestellung über 50.000€"
\`\`\`

**NeMo Guardrails — Verhaltenssteuerung:**

\`\`\`yaml
# config/guardrails/colang/main.co
# Verhaltensregeln in Colang-Sprache definieren

define user ask about competitors
  "Wie ist Wettbewerber X im Vergleich?"
  "Was macht Firma Y besser?"

define bot refuse competitors discussion
  "Ich bin auf Supply-Chain-Fragen für unser Unternehmen spezialisiert.
   Für Wettbewerbsanalysen empfehle ich unsere Business-Intelligence-Abteilung."

define flow handle competitor questions
  user ask about competitors
  bot refuse competitors discussion

define user ask about personal data
  "Zeig mir die Personaldaten von"
  "Wie hoch ist das Gehalt von"

define bot refuse personal data
  "Ich habe keinen Zugriff auf Personaldaten.
   Bitte wenden Sie sich an die HR-Abteilung."

define flow protect personal data
  user ask about personal data
  bot refuse personal data
\`\`\`

\`\`\`python
from nemoguardrails import RailsConfig, LLMRails

config = RailsConfig.from_path("config/guardrails")
rails = LLMRails(config)

# Alle LLM-Aufrufe gehen durch Guardrails
response = await rails.generate_async(
    messages=[{"role": "user", "content": user_message}]
)
\`\`\`

**Sicherheitsarchitektur für Unternehmens-KI:**

\`\`\`
Nutzeranfrage
    ↓
[Presidio: PII erkennen + anonymisieren]
    ↓
[LLM Guard: Prompt Injection prüfen]
    ↓
[NeMo Guardrails: Themenfilterung]
    ↓
[RAG-Pipeline]
    ↓
[LLM Guard: Output-Scanning]
    ↓
[Presidio: De-Anonymisierung]
    ↓
Antwort an Nutzer
\`\`\``,
        analogy: `KI-Sicherheits-Tools sind wie Schleusen in einem Kernkraftwerk: Mehrere unabhängige Barrieren, jede für einen anderen Schadenstyp. Eine einzelne Barriere reicht nicht — erst die Kombination aus Input-Scanning, Verhaltensregeln und Output-Scanning macht das System sicher genug für Unternehmenseinsatz.`,
        consultingRelevance: `Datenschutz und IT-Sicherheit sind in deutschen Mittelstandsunternehmen nicht verhandelbar. Wenn du im ersten Gespräch proaktiv Presidio für PII-Erkennung und NeMo Guardrails für Verhaltenssteuerung nennst, nimmst du die häufigste Einwandkategorie — "Was ist mit unseren sensiblen Daten?" — vorweg. Das erhöht das Vertrauen erheblich und beschleunigt die Freigabe von Pilotprojekten durch Datenschutzbeauftragte und IT-Sicherheitsverantwortliche.`
      },
      {
        title: "Vector Store Management: Index-Lifecycle, Re-Indexing, Shard-Management",
        content: `Ein Vektorindex ist keine Set-it-and-Forget-it-Infrastruktur. Wenn sich Dokumente, Embedding-Modelle oder Abfragemuster ändern, muss der Index gepflegt werden. Ohne Lifecycle-Management degeneriert die Suchqualität schleichend.

**Wann Re-Indexing notwendig ist:**

1. **Embedding-Modell-Wechsel:** Alle Vektoren müssen neu berechnet werden (vollständiges Re-Indexing)
2. **Massive Neudokumente:** Bei > 20% neuer Dokumente lohnt sich ein Index-Rebuild
3. **Index-Drift:** Wenn HNSW-Index durch viele Einzelupdates fragmentiert
4. **Qualitätsdegradierung:** RAGAS-Scores sinken ohne Quelldatenänderung

\`\`\`python
import asyncio
from datetime import datetime
import logging

class VectorStoreIndexManager:
    def __init__(self, vector_store, embedding_client, document_store):
        self.vs = vector_store
        self.embedder = embedding_client
        self.docs = document_store
        self.logger = logging.getLogger(__name__)

    async def incremental_update(self, new_or_changed_docs: list[dict]) -> dict:
        """Inkrementelles Update: nur geänderte Dokumente neu indexieren."""
        stats = {"added": 0, "updated": 0, "deleted": 0, "errors": 0}

        for doc in new_or_changed_docs:
            try:
                # Altes Embedding löschen falls Update
                if doc.get("action") == "update":
                    await self.vs.adelete(ids=[doc["id"]])
                    stats["updated"] += 1
                elif doc.get("action") == "delete":
                    await self.vs.adelete(ids=[doc["id"]])
                    stats["deleted"] += 1
                    continue

                # Neues Embedding berechnen und speichern
                embedding = await self.embedder.aembed(doc["content"])
                await self.vs.aadd_embeddings(
                    embeddings=[embedding],
                    texts=[doc["content"]],
                    metadatas=[doc["metadata"]],
                    ids=[doc["id"]]
                )
                if doc.get("action") == "add":
                    stats["added"] += 1

            except Exception as e:
                self.logger.error(f"Error indexing {doc['id']}: {e}")
                stats["errors"] += 1

        return stats

    async def full_reindex(self, batch_size: int = 100) -> dict:
        """Vollständiges Re-Indexing — für Modell-Wechsel."""
        self.logger.info("Starting full re-indexing...")
        start_time = datetime.now()

        # Alle Dokumente aus Document Store laden
        all_docs = await self.docs.get_all()
        total = len(all_docs)

        # Alten Index leeren
        await self.vs.adelete_collection()
        await self.vs.acreate_collection()

        # Batch-weise neu indexieren
        for i in range(0, total, batch_size):
            batch = all_docs[i:i + batch_size]
            texts = [d["content"] for d in batch]
            metadatas = [d["metadata"] for d in batch]
            ids = [d["id"] for d in batch]

            # Batch-Embedding (günstiger als Einzelaufrufe)
            embeddings = await self.embedder.aembed_documents(texts)

            await self.vs.aadd_embeddings(
                embeddings=embeddings,
                texts=texts,
                metadatas=metadatas,
                ids=ids
            )

            progress = (i + len(batch)) / total * 100
            self.logger.info(f"Re-indexing progress: {progress:.1f}%")

        elapsed = (datetime.now() - start_time).total_seconds()
        return {"total": total, "elapsed_seconds": elapsed,
                "docs_per_second": total / elapsed}

    def check_index_health(self) -> dict:
        """Index-Gesundheitsprüfung."""
        stats = self.vs.get_collection_stats()
        return {
            "total_vectors": stats["vectors_count"],
            "indexed_vectors": stats["indexed_vectors_count"],
            "pending_optimization": stats["vectors_count"] - stats["indexed_vectors_count"],
            "health": "ok" if stats["indexed_vectors_count"] == stats["vectors_count"]
                      else "optimization_pending"
        }
\`\`\`

**Shard-Management für große Collections (Qdrant):**

\`\`\`python
from qdrant_client import QdrantClient
from qdrant_client.models import ShardingMethod

# Sharding für > 1M Vektoren / Cluster-Deployment
client.create_collection(
    collection_name="large_document_base",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),
    shard_number=4,              # 4 Shards für Parallelität
    replication_factor=2,        # 2 Replikas für Ausfallsicherheit
    sharding_method=ShardingMethod.CUSTOM  # Manuelle Shard-Key-Zuweisung
)

# Tenant-basiertes Sharding: jeder Tenant in eigenem Shard
client.create_payload_index(
    collection_name="large_document_base",
    field_name="tenant_id",
    field_schema="keyword"
)
\`\`\`

**Index-Monitoring:**

\`\`\`sql
-- pgvector: Index-Größe und Performance überwachen
SELECT
    indexname,
    pg_size_pretty(pg_relation_size(indexname::regclass)) AS index_size,
    idx_scan as index_scans,
    idx_tup_read as tuples_read
FROM pg_stat_user_indexes
WHERE tablename = 'knowledge_base';

-- Fragmented Index erkennen (viele einzelne Inserts → Fragmentierung)
SELECT relname, n_live_tup, n_dead_tup,
       round(n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0) * 100, 2)
       AS dead_tuple_pct
FROM pg_stat_user_tables
WHERE relname = 'knowledge_base';
-- Wenn dead_tuple_pct > 10%: VACUUM ANALYZE ausführen
\`\`\``,
        analogy: `Vector Index Management ist wie Pflege eines Stadtarchivs: Neue Dokumente kommen täglich dazu, alte werden ersetzt oder gelöscht. Ohne regelmäßige Reorganisation (Re-Indexing) stapeln sich veraltete Einträge, die Suche wird langsamer und ungenauer — bis man das ganze Archiv neu sortieren muss.`,
        consultingRelevance: `Index-Lifecycle ist ein Thema das häufig im Betriebskonzept eines KI-Projekts fehlt. Als Berater planst du explizit: monatliche Gesundheitschecks, Re-Indexing bei Modellwechsel, Alert bei Qualitätsdegradierung. Das unterscheidet ein professionelles Betriebskonzept von einem Piloten, der "einfach weiterläuft". Für Kunden, die langfristige Wartungsverträge vergeben, ist das ein wichtiges Differenzierungsmerkmal.`
      }
    ],
    gfSummary: `**Developer Toolchain für KI-Teams — Zusammenfassung für Geschäftsführer:**

Die Wahl des richtigen KI-Frameworks (LangChain, LlamaIndex, Haystack) beeinflusst Entwicklungsgeschwindigkeit und Wartungsaufwand erheblich. Für Mittelstandsprojekte mit Fokus auf Dokumentensuche ist LlamaIndex die pragmatischste Wahl — spezialisiert, gut dokumentiert, stabile API.

Ohne Observability ist ein KI-System in Production eine Black Box. LangSmith ermöglicht vollständige Nachvollziehbarkeit: Jede Anfrage, jede LLM-Antwort, jede Retrieval-Entscheidung ist einsehbar und auswertbar. Das ist die Basis für kontinuierliche Verbesserung.

Sicherheits-Tools für PII-Erkennung und Prompt-Injection-Schutz sind in deutschen Unternehmensumgebungen nicht optional. Presidio und LLM Guard können innerhalb eines Tages integriert werden und schützen gegen die häufigsten KI-Sicherheitsrisiken.`
  },

  "integration-layer": {
    title: "Enterprise Integration Patterns",
    layerLevel: 3,
    estimatedMinutes: 85,
    steps: [
      {
        title: "Event-Driven Architecture mit Kafka: Topics, Consumer Groups, Exactly-Once",
        content: `Apache Kafka ist der De-facto-Standard für Event-Driven Architecture in Unternehmen. Für KI-Pipelines, die auf Echtzeit-Daten angewiesen sind, ist Kafka-Wissen unverzichtbar.

**Kafka-Grundkonzepte für KI-Pipelines:**

\`\`\`
Producer → [Topic: erp.goods-receipts] → Consumer Group: ai-quality-check
                                       → Consumer Group: analytics-pipeline
                                       → Consumer Group: audit-log
\`\`\`

Topics sind append-only Logs. Consumer Groups ermöglichen parallele Verarbeitung und unabhängige Offsets — die AI-Pipeline kann unabhängig von der Analytics-Pipeline lesen.

**Topic-Design für KI-Workloads:**

\`\`\`python
from confluent_kafka.admin import AdminClient, NewTopic

admin = AdminClient({"bootstrap.servers": "kafka-broker:9092"})

# Topic-Konfiguration für KI-Pipeline
topics = [
    NewTopic(
        "erp.goods-receipts",
        num_partitions=12,       # Parallelitätsstufe
        replication_factor=3,    # Ausfallsicherheit (min. 3 für Production)
        config={
            "retention.ms": str(7 * 24 * 60 * 60 * 1000),  # 7 Tage Retention
            "compression.type": "snappy",
            "max.message.bytes": "1048576",  # 1MB max pro Event
            "cleanup.policy": "delete"       # Alte Events löschen
        }
    ),
    NewTopic(
        "ai.quality-predictions",  # Output der KI-Pipeline
        num_partitions=6,
        replication_factor=3,
        config={
            "retention.ms": str(30 * 24 * 60 * 60 * 1000),  # 30 Tage
        }
    )
]
admin.create_topics(topics)
\`\`\`

**Consumer Group mit Exactly-Once-Semantik:**

Für KI-Pipelines ist Exactly-Once kritisch: Ein Wareneingang darf nicht doppelt verarbeitet werden (doppelter Qualitäts-Alert) und nicht verloren gehen (kein Quality-Hold):

\`\`\`python
from confluent_kafka import Consumer, Producer, KafkaError
import json

class QualityCheckPipeline:
    def __init__(self, consumer_config: dict, producer_config: dict):
        # Exactly-Once: read_committed Isolation
        consumer_config.update({
            "isolation.level": "read_committed",
            "enable.auto.commit": False,
            "auto.offset.reset": "earliest",
            "group.id": "quality-check-ai-v2"
        })
        self.consumer = Consumer(consumer_config)

        # Transaktionaler Producer für Exactly-Once
        producer_config.update({
            "transactional.id": "quality-check-ai-transactional",
            "enable.idempotence": True,
            "acks": "all"
        })
        self.producer = Producer(producer_config)
        self.producer.init_transactions()

    def process_batch(self, batch_size: int = 50):
        self.consumer.subscribe(["erp.goods-receipts"])

        while True:
            messages = self.consumer.consume(batch_size, timeout=5.0)
            if not messages:
                continue

            # Transaktion starten
            self.producer.begin_transaction()
            try:
                for msg in messages:
                    if msg.error():
                        if msg.error().code() == KafkaError.PARTITION_EOF:
                            continue
                        raise Exception(f"Consumer error: {msg.error()}")

                    event = json.loads(msg.value())
                    prediction = self.ai_model.predict(event)

                    # Ergebnis in Output-Topic schreiben
                    self.producer.produce(
                        "ai.quality-predictions",
                        key=event["PurchaseOrder"].encode(),
                        value=json.dumps(prediction).encode()
                    )

                # Offsets und Nachrichten atomar committen
                self.producer.send_offsets_to_transaction(
                    self.consumer.position(self.consumer.assignment()),
                    self.consumer.consumer_group_metadata()
                )
                self.producer.commit_transaction()

            except Exception as e:
                self.producer.abort_transaction()
                raise
\`\`\`

**Consumer Group Rebalancing und KI-Pipelines:**

KI-Modelle brauchen Warmup-Zeit (Modell in Memory laden). Beim Rebalancing muss das berücksichtigt werden:

\`\`\`python
from confluent_kafka import ConsumerRebalanceListener

class AIConsumerRebalanceHandler(ConsumerRebalanceListener):
    def on_partitions_assigned(self, consumer, partitions):
        print(f"Partitions assigned: {partitions}")
        # Modell warm halten — wird bei Rebalancing nicht neu geladen
        # da AI-Modell als Klassen-Attribut gespeichert

    def on_partitions_revoked(self, consumer, partitions):
        # Offsets vor Rebalancing committen
        consumer.commit(asynchronous=False)
        print(f"Partitions revoked: {partitions}")
\`\`\`

**Monitoring-Metriken für Kafka-KI-Pipelines:**
- Consumer Lag: Rückstand der KI-Pipeline gegenüber Producer
- Processing Time per Message: Latenz der KI-Inferenz
- Error Rate: Fehlgeschlagene Verarbeitungen
- Rebalancing Frequency: Instabilität der Consumer Group`,
        analogy: `Kafka Consumer Groups sind wie mehrere unabhängige Qualitätskontroll-Teams in einer Fabrik, die das gleiche Förderband beobachten: Jedes Team sieht alle Teile, aber macht unabhängige Aufgaben — Team A prüft auf Risse, Team B misst Toleranzen. Exactly-Once ist die Garantie, dass kein Teil aus Versehen doppelt geprüft oder übersprungen wird.`,
        consultingRelevance: `Kafka ist in Industrieunternehmen häufiger vorhanden als man denkt — oft für OT/IT-Integration zwischen Produktions-SCADA und ERP. Wenn du zeigst, dass die bestehende Kafka-Infrastruktur für KI-Event-Pipelines genutzt werden kann, reduzierst du den Scope erheblich. "Keine neue Infrastruktur, wir nutzen was schon da ist" ist ein starkes Argument gegenüber IT-Entscheidern.`
      },
      {
        title: "Apache Camel vs. MuleSoft vs. Custom Python: Entscheidungsrahmen",
        content: `Integrations-Middleware ist eine der häufigsten Entscheidungen in KI-Projekten: Bestehende Enterprise-Service-Bus-Plattformen nutzen oder leichtgewichtige Custom-Lösungen bauen?

**Apache Camel — Der Open-Source-Standard:**

\`\`\`java
// Camel Route für ERP → KI-Pipeline
@Component
public class ERPToAIPipeline extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        // SAP → Kafka → KI-Service
        from("sap-netweaver:sap-host:bapi:BAPI_MATERIAL_GETLIST?"
             + "rfcDestination=SAP_PROD&"
             + "pollingInterval=300000")  // Alle 5 Minuten
            .routeId("sap-material-extractor")
            .log("Extracting \${header.CamelSapFunctionName}")
            // Transformation: SAP-Format → JSON
            .process(exchange -> {
                SAPMaterial sapMaterial = exchange.getIn().getBody(SAPMaterial.class);
                exchange.getIn().setBody(sapMaterial.toJSON());
            })
            // Fehlerbehandlung
            .onException(SAPRfcException.class)
                .maximumRedeliveries(3)
                .redeliveryDelay(5000)
                .to("kafka:erp.errors")
            .end()
            .to("kafka:erp.materials?brokers=kafka:9092");
    }
}
\`\`\`

**Stärken:** 300+ Komponenten, bewährte Enterprise-Patterns (EIP), leichtgewichtig, kostenlos.
**Schwächen:** Java-Ökosystem (Umschulung für Python-Teams), verbose Konfiguration.

**MuleSoft Anypoint — Enterprise-iPaaS:**

Für Kunden mit bestehender MuleSoft-Lizenz ist es oft sinnvoll, KI-Integrationen auf der vorhandenen Plattform aufzubauen:

\`\`\`xml
<!-- MuleSoft Flow für SAP → KI-Service -->
<flow name="sap-to-ai-quality-flow">
    <sap:inbound-endpoint type="function" rfcType="SERVER"
        functionName="ZQUALITY_NOTIFICATION"
        jcoSysnr="00" jcoClient="100"/>

    <!-- Transformation via DataWeave 2.0 -->
    <ee:transform>
        <ee:message>
            <ee:set-payload><![CDATA[%dw 2.0
output application/json
---
{
    materialNumber: payload.MATNR,
    plant: payload.WERKS,
    qualityInspectionLot: payload.PRUEFLOS,
    defectCount: payload.FEHLMENGE as Number
}]]></ee:set-payload>
        </ee:message>
    </ee:transform>

    <!-- HTTP-Aufruf an KI-Service -->
    <http:request method="POST"
        url="http://ai-quality-service/predict"
        doc:name="Call AI Quality Service"/>
</flow>
\`\`\`

**Stärken:** Grafische Entwicklungsumgebung, starkes Monitoring, SAP-Connector out-of-the-box.
**Schwächen:** Teuer (ab ~$50k/Jahr), Vendor Lock-in, langsame Deployment-Zyklen.

**Custom Python mit FastAPI — Leichtgewichtig und flexibel:**

\`\`\`python
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
import asyncio

app = FastAPI()

class IntegrationEvent(BaseModel):
    source_system: str
    event_type: str
    payload: dict
    timestamp: str

class ERPIntegrationRouter:
    """Leichtgewichtiger Integrations-Router in Python."""

    def __init__(self):
        self.handlers = {}  # event_type → handler function

    def register(self, event_type: str):
        def decorator(func):
            self.handlers[event_type] = func
            return func
        return decorator

router = ERPIntegrationRouter()

@router.register("goods_receipt")
async def handle_goods_receipt(payload: dict) -> dict:
    result = await ai_quality_service.predict(payload)
    await kafka_producer.send("ai.quality-predictions", result)
    return result

@router.register("purchase_order_created")
async def handle_new_po(payload: dict) -> dict:
    risk_score = await ai_supplier_risk.assess(payload)
    if risk_score > 0.8:
        await alert_service.send_high_risk_alert(payload, risk_score)
    return {"risk_score": risk_score}

@app.post("/events")
async def receive_event(event: IntegrationEvent, background_tasks: BackgroundTasks):
    handler = router.handlers.get(event.event_type)
    if not handler:
        raise HTTPException(404, f"No handler for event type: {event.event_type}")
    background_tasks.add_task(handler, event.payload)
    return {"status": "accepted"}
\`\`\`

**Entscheidungsrahmen:**

| Szenario | Empfehlung |
|----------|-----------|
| Kunde hat MuleSoft-Lizenz | MuleSoft nutzen |
| Java-Team vorhanden, komplexe Routing-Logik | Apache Camel |
| Python-Team, < 10 Integrationen | Custom FastAPI |
| Schneller Prototyp, begrenzte IT-Ressourcen | Custom FastAPI |
| > 50 Integrationen, komplexes Monitoring | MuleSoft/Camel |`,
        analogy: `Die Entscheidung zwischen Camel, MuleSoft und Custom-Code ist wie zwischen einem LKW, einem Transporter und einem PKW wählen: Für 1-2 Pakete ist der PKW (Custom Python) völlig ausreichend. Für täglich 50 Lieferungen braucht man den Transporter (Camel). Nur für ein Logistikunternehmen mit Hunderten Routen lohnt der LKW (MuleSoft).`,
        consultingRelevance: `Kunden mit bestehenden MuleSoft- oder IBM Integration Bus-Lizenzen reagieren positiv, wenn du deren Investition wertschätzt und zeigst, wie sie diese für KI-Integrationen nutzen können. Kunden ohne Middleware-Infrastruktur übst du, nicht in teure iPaaS-Lizenzen zu investieren, wenn ein einfaches Python-Service reicht. Diese ehrliche Empfehlung baut mehr Vertrauen als immer die teure Lösung zu empfehlen.`
      },
      {
        title: "API Versioning und Breaking Changes: Semver, Evolution, Deprecation",
        content: `KI-APIs ändern sich häufiger als klassische Business-APIs: Neue Modelle, veränderte Ausgabeformate, verbesserte Prompt-Strukturen. Ohne Versionierungsstrategie führt jede Verbesserung zu Ausfall bei abhängigen Systemen.

**Semantic Versioning für KI-APIs:**

\`\`\`
MAJOR.MINOR.PATCH
  3   .  2  .  1

MAJOR: Breaking Change (Response-Format geändert, Endpoint entfernt)
MINOR: Neues Feature (neuer optionaler Parameter, neues Feld in Response)
PATCH: Bugfix (Fehler korrigiert, Performance verbessert, kein API-Änderung)
\`\`\`

**API-Versioning-Strategien:**

\`\`\`python
from fastapi import FastAPI, APIRouter, Header
from typing import Optional

app = FastAPI()

# Strategie 1: URL-Versioning (empfohlen für majore Änderungen)
router_v1 = APIRouter(prefix="/v1")
router_v2 = APIRouter(prefix="/v2")

@router_v1.post("/quality/predict")
async def predict_quality_v1(payload: dict) -> dict:
    """V1: Gibt einfachen Score zurück."""
    score = await ai_model.predict(payload)
    return {"score": score}  # Einfache Struktur

@router_v2.post("/quality/predict")
async def predict_quality_v2(payload: dict) -> dict:
    """V2: Gibt Score + Explanation + Confidence zurück."""
    result = await ai_model_v2.predict_with_explanation(payload)
    return {
        "score": result.score,
        "confidence": result.confidence,
        "explanation": result.explanation,
        "top_factors": result.top_factors  # Neu in V2
    }

app.include_router(router_v1)
app.include_router(router_v2)

# Strategie 2: Header-Versioning (für subtile Änderungen)
@app.post("/quality/predict")
async def predict_quality_versioned(
    payload: dict,
    api_version: Optional[str] = Header(None, alias="X-API-Version")
) -> dict:
    if api_version == "2024-11":
        return await predict_quality_v2(payload)
    return await predict_quality_v1(payload)  # Default: alte Version
\`\`\`

**Deprecation-Strategie:**

\`\`\`python
from datetime import date
import warnings
from functools import wraps

def deprecated(removal_date: str, replacement: str):
    """Decorator für deprecated Endpoints."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Deprecation-Header in Response
            response = await func(*args, **kwargs)
            # FastAPI Response-Header setzen
            return JSONResponse(
                content=response,
                headers={
                    "Deprecation": "true",
                    "Sunset": removal_date,  # RFC 8594
                    "Link": f'<{replacement}>; rel="successor-version"',
                    "Warning": f'299 - "Deprecated endpoint. Use {replacement}"'
                }
            )
        return wrapper
    return decorator

@router_v1.post("/quality/predict")
@deprecated(removal_date="2025-06-01", replacement="/v2/quality/predict")
async def predict_quality_v1(payload: dict):
    # ...
\`\`\`

**Consumer-Driven Contract Testing:**

\`\`\`python
# Pact: Consumer schreibt Erwartungen, Provider verifiziert
# In consumer test:
from pact import Consumer, Provider

pact = Consumer("erp-integration").has_pact_with(Provider("ai-quality-service"))

(pact
 .given("A valid goods receipt event")
 .upon_receiving("A quality prediction request")
 .with_request(
     method="POST",
     path="/v2/quality/predict",
     body={"materialNumber": "100-200", "defectCount": 3}
 )
 .will_respond_with(
     status=200,
     body={
         "score": Like(0.75),           # Irgendein Float
         "confidence": Like(0.9),
         "explanation": Like("Defect count exceeds threshold")
     }
 ))
\`\`\`

**Deprecation-Timeline für KI-APIs:**
- Ankündigung: 6 Monate vor Removal in API-Changelog
- Deprecation-Header: 3 Monate vor Removal
- Email-Notification an alle registrierten API-Konsumenten
- Monitoring: Welche Clients rufen noch V1 auf?
- Sunset: Harte Abschaltung mit klarer Fehlermeldung (nicht 404 sondern 410 Gone)`,
        analogy: `API-Deprecation ist wie das Schließen einer alten Autobahnausfahrt: Du kündigst es lange im Voraus an (Schilder km vorher), leitest auf die neue Ausfahrt um (Redirect/Header), und erst nach angemessener Zeit sperrst du die alte endgültig. Wer die Schilder ignoriert, kommt nicht ans Ziel — aber du hast alles getan um den Schaden zu minimieren.`,
        consultingRelevance: `API-Versioning ist ein Thema das Kunden gerne ignorieren bis es zu spät ist. "Wir hatten V1 geändert und drei Systeme sind ausgefallen" ist ein klassischer KI-Projekt-Rückschlag. Als Berater baust du Versionierungsstrategie und Deprecation-Prozess von Anfang an ein — auch wenn der Kunde sagt "erstmal nur ein Pilot". Die Grundlage früh zu legen kostet wenig, das Nacharbeiten kostet viel.`
      },
      {
        title: "Circuit Breaker Pattern für KI-API-Integration",
        content: `KI-APIs (OpenAI, Anthropic, Cohere) haben Ausfälle, Rate Limits und Latenzschwankungen. Ohne Circuit Breaker zieht ein ausgefallener KI-Service alle abhängigen Systeme mit herunter — Cascading Failures sind das häufigste Infrastrukturproblem in KI-Integrationsprojekten.

**Circuit Breaker States:**

\`\`\`
CLOSED → (Fehlerrate > Threshold) → OPEN
OPEN → (Timeout abgelaufen) → HALF-OPEN
HALF-OPEN → (Probeaufruf erfolgreich) → CLOSED
HALF-OPEN → (Probeaufruf fehlgeschlagen) → OPEN
\`\`\`

**Implementation mit tenacity + circuitbreaker:**

\`\`\`python
import time
import threading
from dataclasses import dataclass, field
from enum import Enum
from typing import Callable, Any
from datetime import datetime, timedelta

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5       # Fehler bis OPEN
    recovery_timeout: int = 60       # Sekunden in OPEN-State
    half_open_max_calls: int = 3     # Testaufrufe in HALF-OPEN
    success_threshold: int = 2       # Erfolge bis CLOSED

class AIServiceCircuitBreaker:
    def __init__(self, name: str, config: CircuitBreakerConfig):
        self.name = name
        self.config = config
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = None
        self.half_open_calls = 0
        self._lock = threading.Lock()

    def call(self, func: Callable, *args, fallback=None, **kwargs) -> Any:
        with self._lock:
            if self.state == CircuitState.OPEN:
                if self._should_attempt_recovery():
                    self.state = CircuitState.HALF_OPEN
                    self.half_open_calls = 0
                else:
                    if fallback:
                        return fallback(*args, **kwargs)
                    raise CircuitOpenException(
                        f"Circuit '{self.name}' is OPEN. "
                        f"Retry after {self._seconds_until_recovery():.0f}s"
                    )

            if self.state == CircuitState.HALF_OPEN:
                if self.half_open_calls >= self.config.half_open_max_calls:
                    raise CircuitOpenException("Half-open call limit reached")
                self.half_open_calls += 1

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure(e)
            raise

    def _on_success(self):
        with self._lock:
            self.failure_count = 0
            if self.state == CircuitState.HALF_OPEN:
                self.success_count += 1
                if self.success_count >= self.config.success_threshold:
                    self.state = CircuitState.CLOSED
                    self.success_count = 0

    def _on_failure(self, exception):
        with self._lock:
            self.failure_count += 1
            self.last_failure_time = datetime.now()
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.OPEN
            elif self.failure_count >= self.config.failure_threshold:
                self.state = CircuitState.OPEN

    def _should_attempt_recovery(self) -> bool:
        return (datetime.now() - self.last_failure_time >
                timedelta(seconds=self.config.recovery_timeout))

    def _seconds_until_recovery(self) -> float:
        elapsed = (datetime.now() - self.last_failure_time).total_seconds()
        return max(0, self.config.recovery_timeout - elapsed)
\`\`\`

**Circuit Breaker für KI-Services in Production:**

\`\`\`python
# Circuit Breaker für Anthropic API
anthropic_cb = AIServiceCircuitBreaker(
    name="anthropic-claude",
    config=CircuitBreakerConfig(
        failure_threshold=5,
        recovery_timeout=30,
        half_open_max_calls=2
    )
)

# Fallback: einfachere Antwort ohne LLM
def quality_check_fallback(goods_receipt: dict) -> dict:
    """Regelbasierter Fallback wenn KI nicht verfügbar."""
    defect_rate = goods_receipt.get("defectCount", 0) / max(goods_receipt.get("quantity", 1), 1)
    return {
        "score": 1.0 - defect_rate,
        "confidence": 0.5,
        "method": "rule_based_fallback",
        "explanation": "KI-Service nicht verfügbar — regelbasierte Bewertung"
    }

async def predict_quality_with_circuit_breaker(goods_receipt: dict) -> dict:
    return anthropic_cb.call(
        ai_quality_model.predict,
        goods_receipt,
        fallback=quality_check_fallback
    )
\`\`\`

**Bulkhead Pattern — Ressourcenisolation:**

\`\`\`python
import asyncio
from asyncio import Semaphore

class BulkheadExecutor:
    """Isoliert KI-Aufrufe um andere Services nicht zu beeinträchtigen."""
    def __init__(self, max_concurrent_ai_calls: int = 10):
        self.semaphore = Semaphore(max_concurrent_ai_calls)

    async def execute(self, coro):
        async with self.semaphore:
            return await coro

bulkhead = BulkheadExecutor(max_concurrent_ai_calls=10)
result = await bulkhead.execute(ai_service.predict(payload))
\`\`\``,
        analogy: `Circuit Breaker ist wie ein elektrischer Sicherungsautomat: Wenn zu viel Strom fließt (zu viele Fehler), löst er aus (OPEN) und schützt den Rest der Installation. Nach einer Abkühlzeit (recovery_timeout) kannst du ihn wieder einschalten (HALF-OPEN) und prüfen ob das Problem behoben ist. Ohne Sicherung brennt alles durch.`,
        consultingRelevance: `"Was passiert wenn OpenAI ausfällt?" ist eine berechtigte Frage jedes IT-Leiters. Circuit Breaker mit sinnvollem Fallback ist die konkrete Antwort: Das System degradiert graceful auf regelbasierte Logik statt vollständig auszufallen. Diese Resilienz-Story ist oft entscheidend für die Freigabe kritischer KI-Anwendungen in der Produktion.`
      },
      {
        title: "GraphQL für KI-Frontends: Flexible Abfragen und Federation",
        content: `REST-APIs geben immer das gleiche Datenmuster zurück — egal ob der Client alle Felder braucht oder nur zwei. GraphQL löst das Overfetching/Underfetching-Problem und ist besonders für KI-Frontends geeignet, die dynamisch unterschiedliche Datenkombinationen brauchen.

**GraphQL Schema für KI-Ergebnisse:**

\`\`\`graphql
# Schema Definition
type Query {
    qualityPrediction(
        materialNumber: String!
        plant: String!
        dateFrom: String
        dateTo: String
    ): QualityAnalysis

    supplierRisk(
        supplierId: String!
        includeHistory: Boolean = false
    ): SupplierRiskAssessment
}

type QualityAnalysis {
    score: Float!
    confidence: Float!
    riskLevel: RiskLevel!
    topDefects: [DefectPattern!]!
    recommendations: [String!]!
    sourceDocuments: [SourceDocument!]!
    # Teures Feld — nur bei explizitem Request berechnen
    detailedExplanation: String
}

type SupplierRiskAssessment {
    supplierId: String!
    supplierName: String!
    overallRisk: Float!
    dimensions: RiskDimensions!
    history: [HistoricalRiskPoint!]  # Nur wenn includeHistory=true
}

type RiskDimensions {
    deliveryReliability: Float!
    qualityPerformance: Float!
    financialStability: Float
    geopoliticalRisk: Float
}

enum RiskLevel { LOW MEDIUM HIGH CRITICAL }

# Subscriptions für Echtzeit-Updates
type Subscription {
    qualityAlerts(plantCode: String!): QualityAlert!
}
\`\`\`

**Python Resolver mit Strawberry:**

\`\`\`python
import strawberry
from strawberry.types import Info
from typing import Optional

@strawberry.type
class QualityAnalysis:
    score: float
    confidence: float
    risk_level: str
    top_defects: list[str]
    recommendations: list[str]

    @strawberry.field(description="Expensive: only computed when requested")
    async def detailed_explanation(self, info: Info) -> Optional[str]:
        # Resolver wird nur aufgerufen wenn das Feld angefragt wird
        return await ai_service.generate_explanation(self.score, self.top_defects)

@strawberry.type
class Query:
    @strawberry.field
    async def quality_prediction(
        self,
        material_number: str,
        plant: str,
        date_from: Optional[str] = None
    ) -> QualityAnalysis:
        # DataLoader für Batch-Anfragen (verhindert N+1)
        result = await info.context["quality_loader"].load({
            "material": material_number,
            "plant": plant,
            "date_from": date_from
        })
        return result

schema = strawberry.Schema(query=Query)
\`\`\`

**Apollo Federation für Micro-Service-Architektur:**

Wenn KI-Services und ERP-Services separate Teams betreiben:

\`\`\`graphql
# ERP-Service Schema (Subgraph 1)
type Material @key(fields: "id") {
    id: ID!
    name: String!
    plant: String!
    currentStock: Int!
}

# KI-Service Schema (Subgraph 2) — erweitert Material
type Material @key(fields: "id") @extends {
    id: ID! @external
    # KI-Felder werden zum Material-Typ hinzugefügt
    qualityScore: Float
    demandForecast: DemandForecast
    anomalyDetected: Boolean
}
\`\`\`

**GraphQL vs. REST für KI-Frontends:**

| Aspekt | REST | GraphQL |
|--------|------|---------|
| Overfetching | Häufig (immer alle Felder) | Nie (nur angefragte Felder) |
| Multiple Ressourcen | Mehrere Requests | Ein Request |
| Caching | Einfach (HTTP-Cache) | Komplexer (persisted queries) |
| Typsicherheit | Manuell (OpenAPI) | Built-in |
| Lernkurve | Niedrig | Mittel |
| Empfehlung KI-Dashboard | Gut geeignet | Optimal für komplexe UIs |`,
        analogy: `GraphQL für KI-Frontends ist wie ein Buffet statt Table-d'hôte: Bei einem Menü (REST) bekommst du immer alle Gänge — ob du Suppe willst oder nicht. Am Buffet (GraphQL) nimmst du nur was du brauchst. Ein Dashboard, das manchmal nur Scores, manchmal auch Erklärungen und manchmal vollständige Analysen braucht, ist der perfekte Buffet-Gast.`,
        consultingRelevance: `GraphQL ist besonders wertvoll wenn mehrere Frontend-Anwendungen (Mobile, Desktop, Reporting) dieselbe KI-Backend-Infrastruktur nutzen. Statt für jedes Frontend einen eigenen REST-Endpoint zu bauen, definierst du ein flexibles Schema, das alle Clients bedient. Das reduziert Backend-Entwicklungsaufwand erheblich und ist ein überzeugendes Argument wenn der Scope "ein KI-Dashboard für mehrere Abteilungen" umfasst.`
      }
    ],
    gfSummary: `**Enterprise Integration Patterns — Zusammenfassung für Geschäftsführer:**

Event-getriebene Architektur mit Kafka ermöglicht Echtzeit-Reaktion auf ERP-Ereignisse — Wareneingang triggert sofort KI-Qualitätsprüfung statt auf den nächsten Batch zu warten. Die Investition lohnt sich wenn Reaktionszeit kritisch ist; für die meisten Mittelstandsfälle reicht tägliche Batch-Verarbeitung.

Integrations-Middleware wie MuleSoft ist nur sinnvoll wenn bereits Lizenzen vorhanden sind oder wenn mehr als 50 Systeme integriert werden müssen. Für typische KI-Piloten sind leichtgewichtige Python-Services deutlich effizienter und günstiger.

Circuit Breaker sind Pflicht für KI-Anwendungen die in kritische Geschäftsprozesse integriert sind. Sie stellen sicher, dass ein Ausfall des KI-Services nicht den gesamten Geschäftsprozess anhält — das System degradiert auf regelbasierte Logik statt auszufallen.`
  },

  "hosting-deployment": {
    title: "Production Deployment",
    layerLevel: 3,
    estimatedMinutes: 90,
    steps: [
      {
        title: "Kubernetes für LLM-Inference: GPU Operator, NVIDIA Plugin, KEDA Autoscaling",
        content: `Selbst-gehostete LLM-Inference auf Kubernetes ist die Alternative zu API-basierten Diensten wenn Datenschutz, Latenz oder Kosten bei hohem Volumen es erfordern. Die Kubernetes-GPU-Infrastruktur hat spezifische Anforderungen.

**NVIDIA GPU Operator Setup:**

Der GPU Operator installiert und verwaltet alle notwendigen GPU-Treiber, CUDA-Bibliotheken und Monitoring-Tools als Kubernetes-Operator:

\`\`\`bash
# GPU Operator via Helm installieren
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update

helm install --wait --generate-name \\
  -n gpu-operator --create-namespace \\
  nvidia/gpu-operator \\
  --set driver.enabled=true \\
  --set toolkit.enabled=true \\
  --set devicePlugin.enabled=true
\`\`\`

\`\`\`yaml
# GPU-fähiger Node Pool (Kubernetes Node Labels)
# Wird automatisch durch GPU Operator gesetzt:
# nvidia.com/gpu.count: "4"
# nvidia.com/gpu.product: "A100-SXM4-80GB"

# Pod-Spezifikation für LLM-Inference
apiVersion: apps/v1
kind: Deployment
metadata:
  name: llama-3-inference
  namespace: ai-services
spec:
  replicas: 1
  selector:
    matchLabels:
      app: llama-3-inference
  template:
    spec:
      containers:
      - name: vllm-server
        image: vllm/vllm-openai:latest
        command: ["python", "-m", "vllm.entrypoints.openai.api_server"]
        args:
          - "--model=meta-llama/Meta-Llama-3-8B-Instruct"
          - "--tensor-parallel-size=2"   # Über 2 GPUs verteilen
          - "--max-model-len=8192"
          - "--gpu-memory-utilization=0.9"
          - "--port=8000"
        resources:
          requests:
            cpu: "4"
            memory: "32Gi"
            nvidia.com/gpu: "2"          # 2 GPUs anfordern
          limits:
            nvidia.com/gpu: "2"
        env:
          - name: HUGGING_FACE_HUB_TOKEN
            valueFrom:
              secretKeyRef:
                name: hf-credentials
                key: token
        volumeMounts:
          - name: model-cache
            mountPath: /root/.cache/huggingface
      volumes:
        - name: model-cache
          persistentVolumeClaim:
            claimName: model-weights-pvc  # Modell-Gewichte persistent halten
      nodeSelector:
        nvidia.com/gpu.product: "NVIDIA-A100-SXM4-80GB"
      tolerations:
        - key: "nvidia.com/gpu"
          operator: "Exists"
          effect: "NoSchedule"
\`\`\`

**KEDA Autoscaling für LLM-Inference:**

KEDA (Kubernetes Event-Driven Autoscaling) skaliert Pods basierend auf externen Metriken — z.B. Kafka-Lag oder Request-Queue-Länge:

\`\`\`yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: llm-inference-scaler
  namespace: ai-services
spec:
  scaleTargetRef:
    name: llama-3-inference
  minReplicaCount: 1             # Mindestens 1 GPU-Node warm halten
  maxReplicaCount: 4             # Maximal 4 GPU-Nodes
  cooldownPeriod: 300            # 5 Minuten Cooldown (GPU-Start dauert lange!)
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus:9090
        metricName: vllm_request_queue_length
        threshold: "10"          # 1 neue Replik je 10 wartende Anfragen
        query: |
          avg(vllm_request_queue_length{namespace="ai-services"})
    - type: kafka
      metadata:
        bootstrapServers: kafka:9092
        consumerGroup: llm-inference-workers
        topic: ai.inference-requests
        lagThreshold: "100"      # Skalieren wenn > 100 Events im Backlog
\`\`\`

**GPU-Kosten im Vergleich (AWS, Stand 2024):**

| Instance | GPU | VRAM | Stundensatz | Modelle bis |
|----------|-----|------|-------------|-------------|
| g4dn.xlarge | T4 | 16GB | $0.526 | 7B Parameter |
| g5.2xlarge | A10G | 24GB | $1.006 | 13B Parameter |
| p3.2xlarge | V100 | 16GB | $3.06 | 7B Parameter |
| p4d.24xlarge | 8×A100 | 320GB | $32.77 | 70B+ Parameter |

**Faustregel:** API-Nutzung (Claude Sonnet) kostet bei 1M Tokens ~$3-15. Self-Hosted lohnt sich ab ~10M Tokens/Monat bei mittleren Modellen (7B-13B Parameter).`,
        analogy: `GPU-Infrastruktur auf Kubernetes ist wie ein Hochleistungsrechenzentrum im eigenen Rechenzentrum: Du hast volle Kontrolle und bei hohem Volumen niedrigere Kosten — aber du brauchst Spezialisten für den Betrieb und trägst das volle Betriebsrisiko. Für die meisten Mittelstandskunden ist die Cloud-API der Firmenjet: teurer pro Stunde, aber ohne Betriebsaufwand.`,
        consultingRelevance: `Self-Hosted LLM ist ein häufiger Kundenwunsch aus Datenschutzgründen. Als Berater gibst du eine ehrliche Kosten-Nutzen-Einschätzung: Für Datenschutz gibt es einfachere Wege (Azure OpenAI in deutschen Rechenzentren, Anthropic Hosted-in-EU) als eigene GPU-Infrastruktur. Self-Hosting empfiehlst du nur bei > 10M Tokens/Monat oder bei Anforderungen die keine Cloud erfüllen kann (air-gapped Umgebungen, spezialisierte Branchenmodelle).`
      },
      {
        title: "Blue-Green und Canary Deployments für KI-Anwendungen",
        content: `KI-Anwendungen haben ein spezifisches Deployment-Problem: Die Qualität einer neuen Version ist schwer vorherzusagen. Ein neues Modell oder veränderter Prompt kann für 80% der Anfragen besser sein — und für 20% schlechter. Blue-Green und Canary Deployments ermöglichen kontrollierte Rollouts.

**Blue-Green Deployment für KI-Services:**

\`\`\`yaml
# Blue Environment (aktiv)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rag-service-blue
  labels:
    app: rag-service
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rag-service
      version: blue
  template:
    spec:
      containers:
      - name: rag-service
        image: rag-service:v1.2.3
        env:
          - name: EMBEDDING_MODEL
            value: "text-embedding-3-small"
          - name: PROMPT_VERSION
            value: "v2.1.0"
---
# Green Environment (neues Deployment)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rag-service-green
  labels:
    app: rag-service
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: rag-service
      version: green
  template:
    spec:
      containers:
      - name: rag-service
        image: rag-service:v1.3.0
        env:
          - name: EMBEDDING_MODEL
            value: "text-embedding-3-large"  # Neues Modell
          - name: PROMPT_VERSION
            value: "v2.2.0"
---
# Service switcht zwischen Blue und Green
apiVersion: v1
kind: Service
metadata:
  name: rag-service
spec:
  selector:
    app: rag-service
    version: blue        # Hier auf "green" ändern für Switch
  ports:
    - port: 80
      targetPort: 8080
\`\`\`

**Canary Deployment mit Argo Rollouts:**

\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: rag-service-rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
        - setWeight: 10           # 10% Traffic zur neuen Version
        - pause: {duration: 30m}  # 30 Min. beobachten
        - analysis:               # Automatische Qualitätsprüfung
            templates:
              - templateName: rag-quality-analysis
        - setWeight: 30           # 30% Traffic
        - pause: {duration: 1h}
        - setWeight: 60
        - pause: {duration: 2h}
        - setWeight: 100          # Vollständiger Rollout
      canaryMetadata:
        labels:
          deployment: canary
      stableMetadata:
        labels:
          deployment: stable
---
# Analyse-Template: Automatischer Rollback bei schlechter Qualität
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: rag-quality-analysis
spec:
  metrics:
    - name: faithfulness-score
      interval: 5m
      successCondition: result >= 0.85
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            avg(rag_faithfulness_score{deployment="canary"})

    - name: latency-p99
      successCondition: result <= 2.0  # Max 2 Sekunden P99
      provider:
        prometheus:
          query: |
            histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))
\`\`\`

**Feature Flags für KI-Features:**

\`\`\`python
from openfeature import api
from openfeature.provider.flagd import FlagdProvider

api.set_provider(FlagdProvider())
client = api.get_client()

async def handle_quality_check(request: dict) -> dict:
    # Feature Flag: neues Re-Ranking aktivieren
    use_reranking = client.get_boolean_value(
        "enable-cross-encoder-reranking",
        default_value=False,
        evaluation_context={"user_id": request["user_id"],
                            "plant": request["plant"]}
    )

    if use_reranking:
        results = await rag_with_reranking(request["query"])
    else:
        results = await rag_standard(request["query"])

    # A/B-Test-Ergebnis tracken
    await analytics.track("rag_method_used", {
        "method": "reranking" if use_reranking else "standard",
        "user_satisfaction": request.get("feedback")
    })

    return results
\`\`\`

**Rollback-Strategie:**

\`\`\`bash
# Sofortiger Rollback bei Qualitätsproblemen
kubectl argo rollouts undo rag-service-rollout

# Oder: direkt auf Blue zurückschalten (Blue-Green)
kubectl patch service rag-service -p '{"spec":{"selector":{"version":"blue"}}}'

# Smoke Test nach Rollback
curl -X POST http://rag-service/health/full \\
  -H "Content-Type: application/json" \\
  -d '{"run_eval": true, "sample_size": 10}'
\`\`\``,
        analogy: `Canary Deployment ist wie das Einführen eines neuen Produkts im Testmarkt: Erst in einer Region testen, Kundenfeedback sammeln, und erst bei positiven Ergebnissen bundesweit ausrollen. Bei schlechtem Feedback ziehst du das Produkt sofort zurück — ohne dass der Großteil der Kunden es bemerkt hat.`,
        consultingRelevance: `"Wie rollen wir neue KI-Modelle aus ohne das System zu destabilisieren?" ist eine konkrete Betriebsfrage die oft ungeklärt ist wenn Kunden von Pilot auf Production wechseln. Blue-Green mit Canary und automatischen Quality-Gates ist die Antwort — und zeigt, dass du nicht nur den Aufbau, sondern auch den dauerhaften Betrieb im Blick hast. Das ist ein starkes Argument für einen Managed-Service-Vertrag nach dem Piloten.`
      },
      {
        title: "Observability Stack: Prometheus, Grafana und OpenTelemetry für LLM-Metriken",
        content: `LLM-spezifische Observability geht über Standard-Webserver-Metriken hinaus. Du musst Token-Verbrauch, Modell-Latenz, RAG-Qualität und Kosten monitoren — nicht nur HTTP-Response-Codes.

**OpenTelemetry für LLM-Tracing:**

\`\`\`python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

# Tracing-Provider konfigurieren
provider = TracerProvider()
processor = BatchSpanProcessor(
    OTLPSpanExporter(endpoint="http://otel-collector:4317")
)
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

tracer = trace.get_tracer("rag-service")

# LLM-Aufrufe instrumentieren
async def traced_llm_call(prompt: str, context: str) -> str:
    with tracer.start_as_current_span("llm.generate") as span:
        # Span-Attribute für LLM-Monitoring
        span.set_attribute("llm.model", "claude-sonnet-4-5")
        span.set_attribute("llm.input_tokens", count_tokens(prompt + context))
        span.set_attribute("llm.temperature", 0.0)
        span.set_attribute("rag.context_chunks", 5)
        span.set_attribute("rag.retrieval_method", "hnsw+reranking")

        start_time = time.time()
        response = await anthropic_client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=500,
            messages=[{"role": "user", "content": f"{context}\n\n{prompt}"}]
        )

        latency_ms = (time.time() - start_time) * 1000
        output_tokens = response.usage.output_tokens

        span.set_attribute("llm.output_tokens", output_tokens)
        span.set_attribute("llm.latency_ms", latency_ms)
        span.set_attribute("llm.cost_usd",
            (response.usage.input_tokens * 3 + output_tokens * 15) / 1_000_000)

        return response.content[0].text
\`\`\`

**Prometheus Metriken für LLM-Services:**

\`\`\`python
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import prometheus_client

# Custom Metriken definieren
llm_requests_total = Counter(
    "llm_requests_total",
    "Total LLM API requests",
    ["model", "status"]
)

llm_latency_seconds = Histogram(
    "llm_latency_seconds",
    "LLM request latency in seconds",
    ["model"],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0]
)

llm_tokens_total = Counter(
    "llm_tokens_total",
    "Total tokens processed",
    ["model", "type"]  # type: input/output
)

llm_cost_usd_total = Counter(
    "llm_cost_usd_total",
    "Total LLM API cost in USD",
    ["model"]
)

rag_quality_score = Gauge(
    "rag_quality_score",
    "Current RAG quality score (rolling average)",
    ["metric"]  # faithfulness, relevancy, etc.
)

# Decorator für automatische Metrik-Erfassung
def track_llm_metrics(model: str):
    def decorator(func):
        async def wrapper(*args, **kwargs):
            with llm_latency_seconds.labels(model=model).time():
                try:
                    result = await func(*args, **kwargs)
                    llm_requests_total.labels(model=model, status="success").inc()
                    return result
                except Exception as e:
                    llm_requests_total.labels(model=model, status="error").inc()
                    raise
        return wrapper
    return decorator
\`\`\`

**Grafana Dashboard für LLM-Observability:**

\`\`\`json
{
  "panels": [
    {
      "title": "LLM Request Rate",
      "targets": [{"expr": "rate(llm_requests_total[5m])"}]
    },
    {
      "title": "LLM P99 Latency",
      "targets": [{"expr": "histogram_quantile(0.99, rate(llm_latency_seconds_bucket[5m]))"}]
    },
    {
      "title": "Daily API Cost (USD)",
      "targets": [{"expr": "increase(llm_cost_usd_total[24h])"}]
    },
    {
      "title": "RAG Faithfulness Score (7-day rolling)",
      "targets": [{"expr": "avg_over_time(rag_quality_score{metric='faithfulness'}[7d])"}]
    },
    {
      "title": "Token Cost Breakdown",
      "targets": [
        {"expr": "rate(llm_tokens_total{type='input'}[1h])", "legend": "Input"},
        {"expr": "rate(llm_tokens_total{type='output'}[1h])", "legend": "Output"}
      ]
    }
  ]
}
\`\`\`

**Alert Rules für Production:**

\`\`\`yaml
# prometheus-alerts.yaml
groups:
  - name: llm-service-alerts
    rules:
      - alert: LLMHighLatency
        expr: histogram_quantile(0.99, rate(llm_latency_seconds_bucket[5m])) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "LLM P99 latency above 10 seconds"

      - alert: DailyLLMCostExceeded
        expr: increase(llm_cost_usd_total[24h]) > 100
        labels:
          severity: critical
        annotations:
          summary: "Daily LLM cost exceeds $100"
          description: "Current daily spend: {{ $value | printf '%.2f' }}$"

      - alert: RAGQualityDegradation
        expr: rag_quality_score{metric="faithfulness"} < 0.75
        for: 30m
        annotations:
          summary: "RAG faithfulness score below threshold"
\`\`\``,
        analogy: `LLM-Observability ist wie das Cockpit-Instrumentarium eines Flugzeugs: Du brauchst nicht nur die Motordrehzahl (Requests/Sekunde), sondern auch Treibstoffverbrauch (Token-Kosten), Flugzeugposition (RAG-Qualität) und Außentemperatur (Modell-Latenz). Jedes Instrument zeigt einen anderen kritischen Aspekt — keines allein reicht für sichere Navigation.`,
        consultingRelevance: `"Wie viel kostet unser KI-System pro Monat?" ist eine Frage, die IT-Leiter und CFOs regelmäßig stellen. Ohne Observability ist die Antwort ein Schulterzucken. Mit Prometheus-Kosten-Metriken kannst du auf das Dashboard zeigen: "$847 im letzten Monat, 68% davon Output-Tokens, Haupttreiber ist das Qualitäts-Analyse-Feature." Das ist die Grundlage für informierte Budget-Entscheidungen und zeigt, dass du den Betrieb im Griff hast.`
      },
      {
        title: "Sicherheitshärtung: RBAC, Network Policies, Vault für Secret Management",
        content: `Security in Kubernetes-basierten KI-Systemen ist mehrschichtig. RBAC kontrolliert wer was tun darf, Network Policies begrenzen den Netzwerkverkehr, und HashiCorp Vault verwaltet Secrets sicher.

**RBAC für KI-Services:**

\`\`\`yaml
# Service Account für RAG-Service
apiVersion: v1
kind: ServiceAccount
metadata:
  name: rag-service
  namespace: ai-services
  annotations:
    # AWS: IAM Role für S3-Zugriff ohne statische Credentials
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/rag-service-role
---
# Minimale RBAC-Berechtigungen (Principle of Least Privilege)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: rag-service-role
  namespace: ai-services
rules:
  - apiGroups: [""]
    resources: ["configmaps"]
    verbs: ["get", "list", "watch"]
    resourceNames: ["rag-config"]    # Nur spezifische ConfigMap
  - apiGroups: [""]
    resources: ["secrets"]
    verbs: ["get"]
    resourceNames: ["rag-api-keys"]  # Nur spezifisches Secret
  # KEIN Zugriff auf Pods, Deployments, etc.
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: rag-service-binding
  namespace: ai-services
subjects:
  - kind: ServiceAccount
    name: rag-service
roleRef:
  kind: Role
  name: rag-service-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

**Network Policies — Netzwerkisolation:**

\`\`\`yaml
# RAG-Service darf nur mit Vector-DB und LLM-Service kommunizieren
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: rag-service-network-policy
  namespace: ai-services
spec:
  podSelector:
    matchLabels:
      app: rag-service
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: api-gateway  # Nur API Gateway darf rag-service erreichen
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: pgvector-db   # Vector-DB
      ports:
        - protocol: TCP
          port: 5432
    - to:
        - podSelector:
            matchLabels:
              app: redis-cache
      ports:
        - protocol: TCP
          port: 6379
    - to:                          # Externe APIs (Anthropic, OpenAI)
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 443
\`\`\`

**HashiCorp Vault für Secret Management:**

\`\`\`python
import hvac
import os
from functools import lru_cache
from datetime import datetime, timedelta

class VaultSecretManager:
    def __init__(self, vault_addr: str):
        self.client = hvac.Client(url=vault_addr)
        # Kubernetes-Auth: kein statisches Passwort nötig
        with open("/var/run/secrets/kubernetes.io/serviceaccount/token") as f:
            jwt_token = f.read()

        self.client.auth.kubernetes.login(
            role="rag-service",
            jwt=jwt_token
        )
        self._secret_cache = {}
        self._cache_expiry = {}

    def get_secret(self, path: str, key: str) -> str:
        """Secret aus Vault lesen mit lokalem Cache (5 Min. TTL)."""
        cache_key = f"{path}/{key}"
        now = datetime.now()

        if (cache_key in self._secret_cache and
                self._cache_expiry.get(cache_key, now) > now):
            return self._secret_cache[cache_key]

        secret = self.client.secrets.kv.v2.read_secret_version(path=path)
        value = secret["data"]["data"][key]

        self._secret_cache[cache_key] = value
        self._cache_expiry[cache_key] = now + timedelta(minutes=5)
        return value

# Nutzung statt Environment Variables
vault = VaultSecretManager("http://vault.vault.svc.cluster.local:8200")
anthropic_key = vault.get_secret("secret/ai-services/anthropic", "api_key")
db_password = vault.get_secret("secret/ai-services/database", "password")
\`\`\`

**Secret Rotation automatisieren:**

\`\`\`yaml
# Vault Agent Injector: Secrets als Files in Pod injizieren
# (Keine Vault-Bibliothek im App-Code nötig)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rag-service
spec:
  template:
    metadata:
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "rag-service"
        vault.hashicorp.com/agent-inject-secret-config: "secret/ai-services/api-keys"
        vault.hashicorp.com/agent-inject-template-config: |
          {{- with secret "secret/ai-services/api-keys" -}}
          ANTHROPIC_API_KEY={{ .Data.data.anthropic_key }}
          OPENAI_API_KEY={{ .Data.data.openai_key }}
          {{- end -}}
        vault.hashicorp.com/agent-pre-populate-only: "false"  # Hot-Reload bei Rotation
\`\`\`

**Security Checklist für KI-Kubernetes-Deployments:**
- Container läuft als non-root User (runAsNonRoot: true)
- Read-only Filesystem (readOnlyRootFilesystem: true)
- Keine privilegierten Capabilities (drop: ["ALL"])
- Image-Scanning in CI/CD (Trivy, Grype)
- Pod Security Standards: restricted
- Secrets niemals in Environment Variables sondern via Vault`,
        analogy: `Sicherheitshärtung in Kubernetes ist wie ein mehrschichtiges Schließsystem in einem Firmengebäude: Der Empfang (RBAC) prüft die Berechtigung, Türen zwischen Abteilungen (Network Policies) verhindern unkontrollierten Durchgang, und der Schlüsseltresor (Vault) verwaltet alle Zugänge zentral. Jede Schicht allein ist unzureichend — die Kombination macht das System sicher.`,
        consultingRelevance: `DSGVO und ISO 27001 sind für viele Mittelstandskunden Pflicht, nicht Kür. Mit einer konkreten Security-Architektur — RBAC, Network Policies, Vault — kannst du im Gespräch mit IT-Sicherheitsverantwortlichen und Datenschutzbeauftragten bestehen. Das ist oft das letzte Hindernis vor der Freigabe eines KI-Projekts: Nicht "kann die KI das?" sondern "ist das sicher genug?" Wenn du diese Frage pro-aktiv mit konkreten Maßnahmen beantwortest, beschleunigst du den Freigabeprozess erheblich.`
      },
      {
        title: "Multi-Region Deployment: Latenz, Datenresidenz und Failover",
        content: `Multi-Region-Deployment ist für Mittelstandskunden mit internationalen Standorten oder strengen Datenresidenz-Anforderungen relevant. Es ist deutlich komplexer als Single-Region — aber für bestimmte Use Cases unvermeidbar.

**Datenresidenz-Anforderungen (DSGVO):**

Personenbezogene Daten dürfen die EU nicht verlassen. Für KI-Anwendungen bedeutet das:
- Embedding-Vektoren von personenbezogenen Dokumenten: EU-only
- LLM-API-Calls mit personenbezogenen Daten: nur EU-Endpunkte
- Vector-DB: EU-Region

\`\`\`python
import boto3
from geopy.distance import geodesic

# Regionsauswahl basierend auf Nutzer-Standort
REGIONAL_ENDPOINTS = {
    "eu-central-1": {  # Frankfurt
        "vector_db": "https://qdrant-eu.internal:6333",
        "llm_api": "https://api.anthropic.com",   # Anthropic EU-Traffic-Routing
        "lat_lon": (50.1109, 8.6821)
    },
    "us-east-1": {    # N. Virginia
        "vector_db": "https://qdrant-us.internal:6333",
        "llm_api": "https://api.anthropic.com",
        "lat_lon": (37.7749, -77.0)
    }
}

def get_optimal_region(user_location: tuple[float, float],
                        data_classification: str) -> str:
    """Wählt optimale Region basierend auf Standort und Datenklassifizierung."""

    # DSGVO: Personenbezogene Daten nur in EU
    if data_classification in ["personal", "confidential"]:
        return "eu-central-1"

    # Latenz-Optimierung für nicht-personenbezogene Daten
    min_distance = float('inf')
    best_region = "eu-central-1"  # Default: EU

    for region, config in REGIONAL_ENDPOINTS.items():
        distance = geodesic(user_location, config["lat_lon"]).km
        if distance < min_distance:
            min_distance = distance
            best_region = region

    return best_region
\`\`\`

**Active-Active Multi-Region mit Konfliktauflösung:**

\`\`\`python
from enum import Enum
import asyncio

class ConflictResolutionStrategy(Enum):
    LAST_WRITE_WINS = "lww"
    REGIONAL_PRIMARY = "regional_primary"
    MERGE = "merge"

class MultiRegionVectorStore:
    def __init__(self, regions: list[str], primary_region: str):
        self.regions = regions
        self.primary = primary_region
        self.clients = {r: QdrantClient(url=REGIONAL_ENDPOINTS[r]["vector_db"])
                       for r in regions}

    async def write(self, document: dict,
                    strategy: ConflictResolutionStrategy = ConflictResolutionStrategy.LAST_WRITE_WINS):
        """Schreibt in alle Regionen asynchron."""
        document["last_modified"] = datetime.utcnow().isoformat()
        document["source_region"] = self.primary

        tasks = [
            self._write_to_region(region, document)
            for region in self.regions
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # Fehler in Nicht-Primär-Regionen tolerieren (eventual consistency)
        primary_result = results[self.regions.index(self.primary)]
        if isinstance(primary_result, Exception):
            raise primary_result  # Primär-Region muss erfolgreich sein

        failed_regions = [r for r, res in zip(self.regions, results)
                         if isinstance(res, Exception)]
        if failed_regions:
            await self._schedule_sync_retry(document, failed_regions)

        return {"status": "ok", "failed_regions": failed_regions}

    async def read(self, query_embedding: list[float],
                   user_region: str, k: int = 10) -> list:
        """Liest aus nächster gesunder Region."""
        # Primäre Quelle: Nutzer-Region
        try:
            client = self.clients[user_region]
            return await client.asearch(
                collection_name="knowledge_base",
                query_vector=query_embedding,
                limit=k
            )
        except Exception:
            # Fallback: andere Region
            for region in self.regions:
                if region != user_region:
                    try:
                        return await self.clients[region].asearch(
                            collection_name="knowledge_base",
                            query_vector=query_embedding,
                            limit=k
                        )
                    except Exception:
                        continue
            raise Exception("All regions unavailable")
\`\`\`

**Global Load Balancing mit Latenz-Routing:**

\`\`\`yaml
# AWS Route 53 Latency-based Routing (Terraform)
resource "aws_route53_record" "rag_api" {
  zone_id = var.hosted_zone_id
  name    = "rag-api.example.com"
  type    = "A"

  set_identifier = "eu-central-1"
  latency_routing_policy {
    region = "eu-central-1"
  }

  alias {
    name    = aws_lb.rag_eu.dns_name
    zone_id = aws_lb.rag_eu.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "rag_api_us" {
  # ... gleiches für US-East
  set_identifier = "us-east-1"
  latency_routing_policy {
    region = "us-east-1"
  }
  # Health Check für Failover
  health_check_id = aws_route53_health_check.rag_us.id
}
\`\`\`

**Kosten Multi-Region:**
- Datenreplikation: ~$0,02-0,09 per GB je nach Region-Paar
- Cross-Region-Traffic: Hauptkostentreiber bei viel Synchronisation
- Faustregel: Multi-Region verdoppelt Infrastructure-Kosten
- Für die meisten Mittelstandskunden: Single-Region EU + Read-Replika reicht`,
        analogy: `Multi-Region ist wie Filialen eines Unternehmens: Jede Filiale hat eigene Bestände (Datenkopien), bedient lokale Kunden schnell, und wenn eine Filiale schließt (Region-Ausfall), können andere einspringen. Aber die Synchronisation zwischen Filialen ist aufwändig und teuer — man eröffnet keine Filiale ohne klaren Kundenbedarf.`,
        consultingRelevance: `Multi-Region wird von Kunden oft als Standardanforderung formuliert ("wir brauchen globale Verfügbarkeit"), ist aber selten wirklich nötig. Als Berater fragst du: "Wie viele Ihrer Nutzer sind außerhalb der EU? Wie viele Stunden Ausfall könnten Sie tolerieren?" In 80% der Mittelstandsfälle ist die Antwort: wenige internationale Nutzer, und ein paar Stunden Ausfall wären akzeptabel. Single-Region mit gutem Disaster Recovery ist dann die richtige Empfehlung — einfacher und deutlich günstiger.`
      }
    ],
    gfSummary: `**Production Deployment — Zusammenfassung für Geschäftsführer:**

Selbst-gehostete KI-Modelle auf GPU-Infrastruktur lohnen sich erst ab sehr hohem Anfragevolumen (über 10 Millionen Tokens pro Monat). Für die meisten Mittelstandsanwendungen sind Cloud-APIs wie Anthropic oder Azure OpenAI die wirtschaftlichere Wahl — ohne Betriebsaufwand und mit voller Datenschutz-Compliance in europäischen Rechenzentren.

Kontrollierte Rollout-Strategien (Blue-Green, Canary) sind entscheidend für risikoarme Updates von KI-Systemen. Ein Deployment kann automatisch zurückgerollt werden wenn die KI-Qualität unter definierten Schwellenwerten fällt — das reduziert Betriebsrisiken erheblich.

Sicherheitshärtung (RBAC, Network Policies, HashiCorp Vault) ist keine optionale Ergänzung, sondern Voraussetzung für DSGVO-Konformität und ISO-27001-Zertifizierung. Diese Maßnahmen sind einmalig beim Setup zu implementieren und erhöhen den Aufwand kaum, schützen aber dauerhaft vor Datenpannen und Compliance-Verstößen.`
  }

};


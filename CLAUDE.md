# KI-Beratung LearningHub

## Was ist das?
Eine PWA-basierte Lernplattform für den Aufbau von KI-Beratungskompetenz 
für den industriellen Mittelstand. Entwickelt von Dean Dukic (SupplyConsult GmbH).

## Tech Stack
- React + Vite (Frontend)
- Supabase PostgreSQL (Backend/DB)
- Vercel (Hosting, Continuous Deployment)
- PWA (installierbar auf iPhone/iPad/Desktop)

## Projektstruktur
- src/App.jsx — Haupt-Komponente (UI + Supabase-Integration)
- src/App.css — Alle Styles
- src/data/curriculum.js — Curriculum-Daten (Module, Phasen, Stichpunkte)
- src/lib/supabase.js — Supabase-Client

## Aktueller Stand
- Grundgerüst steht: Dashboard, Curriculum-Übersicht, Moduldetails, Wissensnetz
- Supabase-Anbindung für Fortschritt und Notizen funktioniert
- PWA-Konfiguration vorhanden
- Live auf Vercel

## Was als nächstes kommt
- Vollständige Lerninhalte pro Modul einbauen (detaillierte Lektionen mit 
  Schritten, Analogien, Praxisbeispielen, GF-Zusammenfassungen)
- Datenstruktur erweitern: Jedes Modul bekommt ein "steps"-Array mit 
  ausführlichen Lerninhalten
- Moduldetail-Ansicht umbauen: Statt nur Stichpunkte die vollen Lektionen 
  anzeigen mit Schritt-für-Schritt-Navigation

## Design-Prinzipien
- Dunkles Theme (#0f1117 Background)
- Supply Consult Farben: Steel Blue #008CD1, Teal #5695AF, Deep Navy #002060
- Fonts: Newsreader (Serif, Headlines), DM Sans (Sans, Body), JetBrains Mono (Code)
- Responsive: Mobile-first für iPhone/iPad-Nutzung
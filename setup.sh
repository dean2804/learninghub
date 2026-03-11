#!/bin/bash
# LearningHub Setup Script
# Ausführen im Projektordner: ~/Claude/Projects/learninghub

echo "🧠 LearningHub Setup startet..."

# Alte Vite-Standard-Dateien entfernen
echo "→ Alte Standard-Dateien entfernen..."
rm -f src/App.css src/App.jsx src/main.jsx src/index.css
rm -rf src/assets
rm -f public/vite.svg

# Prüfen ob die neuen Dateien da sind
if [ ! -f src/data/curriculum.js ]; then
    echo "❌ Fehler: Die neuen Dateien wurden noch nicht entpackt!"
    echo "   Bitte erst den ZIP-Inhalt in den Projektordner kopieren."
    exit 1
fi

echo "→ Alles bereit!"
echo ""
echo "✅ Setup abgeschlossen. Jetzt ausführen:"
echo "   npm run dev"
echo ""
echo "   Dann im Browser: http://localhost:5173"

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./lib/supabase";
import { CURRICULUM, ALL_MODULES, NOTIFICATIONS, DIFFICULTY_LABELS, STATUS_LABELS, STATUS_COLORS } from "./data/curriculum";
import "./App.css";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleStatuses, setModuleStatuses] = useState(() => {
    const s = {};
    ALL_MODULES.forEach(m => { s[m.id] = "open"; });
    return s;
  });
  const [notes, setNotes] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveIndicator, setSaveIndicator] = useState("");
  const notifRef = useRef(null);
  const saveTimeout = useRef(null);

  // ============================================================
  // SUPABASE: Load data on mount
  // ============================================================
  useEffect(() => {
    async function loadData() {
      try {
        const { data: progressData } = await supabase.from("module_progress").select("*");
        if (progressData && progressData.length > 0) {
          const statuses = {};
          ALL_MODULES.forEach(m => { statuses[m.id] = "open"; });
          progressData.forEach(row => { statuses[row.module_id] = row.status; });
          setModuleStatuses(statuses);
        }

        const { data: notesData } = await supabase.from("module_notes").select("*");
        if (notesData && notesData.length > 0) {
          const n = {};
          notesData.forEach(row => { n[row.module_id] = row.content; });
          setNotes(n);
        }
      } catch (err) {
        console.log("Supabase not available, using local state:", err.message);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // ============================================================
  // SUPABASE: Save status
  // ============================================================
  const saveStatus = useCallback(async (moduleId, status) => {
    try {
      await supabase.from("module_progress").upsert(
        { module_id: moduleId, status, updated_at: new Date().toISOString() },
        { onConflict: "module_id" }
      );
      setSaveIndicator("Gespeichert ✓");
      setTimeout(() => setSaveIndicator(""), 2000);
    } catch (err) {
      console.log("Could not save status:", err.message);
    }
  }, []);

  // ============================================================
  // SUPABASE: Save notes (debounced)
  // ============================================================
  const saveNote = useCallback(async (moduleId, content) => {
    try {
      await supabase.from("module_notes").upsert(
        { module_id: moduleId, content, updated_at: new Date().toISOString() },
        { onConflict: "module_id" }
      );
      setSaveIndicator("Notiz gespeichert ✓");
      setTimeout(() => setSaveIndicator(""), 2000);
    } catch (err) {
      console.log("Could not save note:", err.message);
    }
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================
  const newNotifCount = NOTIFICATIONS.filter(n => n.isNew).length;
  const getModulesByStatus = (status) => ALL_MODULES.filter(m => moduleStatuses[m.id] === status);
  const completedCount = ALL_MODULES.filter(m => moduleStatuses[m.id] === "done").length;
  const activeCount = ALL_MODULES.filter(m => moduleStatuses[m.id] === "active").length;
  const totalHours = ALL_MODULES.reduce((sum, m) => sum + m.hours, 0);
  const completedHours = ALL_MODULES.filter(m => moduleStatuses[m.id] === "done").reduce((sum, m) => sum + m.hours, 0);

  const cycleStatus = (moduleId) => {
    setModuleStatuses(prev => {
      const current = prev[moduleId];
      const next = current === "open" ? "active" : current === "active" ? "done" : "open";
      saveStatus(moduleId, next);
      return { ...prev, [moduleId]: next };
    });
  };

  const handleNoteChange = (moduleId, value) => {
    setNotes(prev => ({ ...prev, [moduleId]: value }));
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveNote(moduleId, value), 1000);
  };

  const filteredModules = searchQuery.trim()
    ? ALL_MODULES.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const openModule = (mod) => {
    setSelectedModule(mod);
    setActiveView("module");
    setSearchQuery("");
  };

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon">🧠</div>
        <div className="loading-text">LearningHub lädt...</div>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="hub-container">
      {/* HEADER */}
      <header className="hub-header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">🧠</div>
            <span className="logo-text">KI-Beratung LearningHub</span>
          </div>
          <nav className="nav-buttons">
            <button className={`nav-btn ${activeView === "dashboard" ? "active" : ""}`}
              onClick={() => { setActiveView("dashboard"); setSelectedModule(null); }}>Dashboard</button>
            <button className={`nav-btn ${activeView === "curriculum" ? "active" : ""}`}
              onClick={() => { setActiveView("curriculum"); setSelectedModule(null); }}>Curriculum</button>
            <button className={`nav-btn ${activeView === "network" ? "active" : ""}`}
              onClick={() => { setActiveView("network"); setSelectedModule(null); }}>Wissensnetz</button>
          </nav>
        </div>
        <div className="header-right">
          {saveIndicator && <span className="save-indicator">{saveIndicator}</span>}
          <div className="search-wrapper">
            <span className="search-icon">⌕</span>
            <input className="search-input" placeholder="Module durchsuchen..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            {searchQuery && filteredModules.length > 0 && (
              <div className="search-results">
                {filteredModules.map(m => (
                  <div key={m.id} className="search-result-item" onClick={() => openModule(m)}>
                    <span className="search-dot" style={{ color: m.phaseColor }}>●</span>
                    {m.title}
                    <span className="search-preview">{m.summary.slice(0, 50)}...</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div ref={notifRef} className="notif-wrapper">
            <button className="notif-button" onClick={() => setShowNotifications(!showNotifications)}>
              🔔
              {newNotifCount > 0 && <span className="notif-badge">{newNotifCount}</span>}
            </button>
            {showNotifications && (
              <div className="notif-panel">
                <div className="notif-header">Hallo Dean, es gibt Neues zu lernen!</div>
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`notif-item ${n.isNew ? "notif-new" : ""}`}
                    onClick={() => { openModule(ALL_MODULES.find(m => m.id === n.module)); setShowNotifications(false); }}>
                    <div className="notif-area">{n.isNew && "🆕 "}{n.area}</div>
                    <div className="notif-message">{n.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="hub-main">

        {/* ============================================================ */}
        {/* DASHBOARD VIEW */}
        {/* ============================================================ */}
        {activeView === "dashboard" && !selectedModule && (
          <div>
            <div className="stats-grid">
              {[
                { label: "Fortschritt", value: `${Math.round((completedCount / ALL_MODULES.length) * 100)}%`, sub: `${completedCount} von ${ALL_MODULES.length} Modulen` },
                { label: "In Arbeit", value: activeCount, sub: "aktive Module" },
                { label: "Lernzeit gesamt", value: `${totalHours}h`, sub: `${completedHours}h abgeschlossen` },
                { label: "Phasen", value: `${CURRICULUM.phases.filter(p => p.modules.every(m => moduleStatuses[m.id] === "done")).length}/4`, sub: "abgeschlossen" },
              ].map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-sub">{stat.sub}</div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <h2>Deine Lern-Roadmap</h2>
              <p>12 Wochen zum KI-Transformationsberater</p>
            </div>
            <div className="phases-grid">
              {CURRICULUM.phases.map(phase => {
                const phaseCompleted = phase.modules.filter(m => moduleStatuses[m.id] === "done").length;
                const phaseTotal = phase.modules.length;
                const pct = Math.round((phaseCompleted / phaseTotal) * 100);
                return (
                  <div key={phase.id} className="phase-card"
                    onClick={() => { setActiveView("curriculum"); setSelectedPhaseFilter(phase.id); }}>
                    <div className="phase-accent" style={{ background: phase.color }} />
                    <div className="phase-top">
                      <div>
                        <div className="phase-label" style={{ color: phase.color }}>
                          Phase {phase.number} · {phase.weeks}
                        </div>
                        <h3 className="phase-title">{phase.icon} {phase.title}</h3>
                        <p className="phase-subtitle">{phase.subtitle}</p>
                      </div>
                      <span className="phase-pct" style={{ color: phase.color }}>{pct}%</span>
                    </div>
                    <p className="phase-description">{phase.description}</p>
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: phase.color }} />
                    </div>
                    <div className="phase-meta">{phaseCompleted}/{phaseTotal} Module · {phase.modules.reduce((s, m) => s + m.hours, 0)} Stunden</div>
                  </div>
                );
              })}
            </div>

            {getModulesByStatus("active").length > 0 && (
              <div className="active-section">
                <h3>Aktuell in Arbeit</h3>
                <div className="active-grid">
                  {getModulesByStatus("active").map(m => (
                    <div key={m.id} className="module-card active-card" onClick={() => openModule(m)}>
                      <div className="module-card-title">{m.title}</div>
                      <div className="module-card-summary">{m.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* CURRICULUM VIEW */}
        {/* ============================================================ */}
        {activeView === "curriculum" && !selectedModule && (
          <div>
            <div className="filter-bar">
              <button className={`nav-btn filter-btn ${!selectedPhaseFilter ? "active" : ""}`}
                onClick={() => setSelectedPhaseFilter(null)}>Alle Phasen</button>
              {CURRICULUM.phases.map(p => (
                <button key={p.id}
                  className={`nav-btn filter-btn ${selectedPhaseFilter === p.id ? "active" : ""}`}
                  onClick={() => setSelectedPhaseFilter(p.id)}
                  style={{ borderLeft: `3px solid ${p.color}` }}>
                  {p.icon} Phase {p.number}
                </button>
              ))}
            </div>
            {CURRICULUM.phases.filter(p => !selectedPhaseFilter || p.id === selectedPhaseFilter).map(phase => (
              <div key={phase.id} className="curriculum-phase">
                <div className="curriculum-phase-header">
                  <div className="curriculum-phase-icon" style={{ background: phase.color }}>{phase.icon}</div>
                  <div>
                    <h2>Phase {phase.number}: {phase.title}</h2>
                    <p>{phase.weeks} · {phase.subtitle}</p>
                  </div>
                </div>
                <div className="modules-grid">
                  {phase.modules.map(mod => (
                    <div key={mod.id} className="module-card" onClick={() => openModule(mod)}>
                      <div className="module-card-top">
                        <div className="module-card-left">
                          <span className="status-dot"
                            style={{ background: STATUS_COLORS[moduleStatuses[mod.id]] }}
                            onClick={e => { e.stopPropagation(); cycleStatus(mod.id); }}
                            title="Status ändern (klicken)" />
                          <span className="module-card-title">{mod.title}</span>
                        </div>
                        <span className="module-hours">{mod.hours}h</span>
                      </div>
                      <p className="module-card-summary">{mod.summary}</p>
                      <div className="tags-row">
                        {mod.tags.map(t => <span key={t} className="tag">{t}</span>)}
                        <span className="tag tag-difficulty" style={{ color: phase.color, background: `${phase.color}15` }}>
                          {DIFFICULTY_LABELS[mod.difficulty]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* NETWORK VIEW */}
        {/* ============================================================ */}
        {activeView === "network" && !selectedModule && (
          <div>
            <h2 className="network-title">Wissensnetz</h2>
            <p className="network-subtitle">Jedes Modul ist mit anderen verbunden. Klick auf ein Modul, um seine Verbindungen zu sehen.</p>
            <div className="network-grid">
              {ALL_MODULES.map(mod => (
                <div key={mod.id} className="module-card" onClick={() => openModule(mod)}
                  style={{ borderLeft: `3px solid ${mod.phaseColor}` }}>
                  <div className="module-card-left" style={{ marginBottom: 8 }}>
                    <span className="status-dot small" style={{ background: STATUS_COLORS[moduleStatuses[mod.id]] }} />
                    <span className="module-card-title">{mod.title}</span>
                  </div>
                  <div className="connections-mini">
                    {mod.connections.map(cid => {
                      const connected = ALL_MODULES.find(m => m.id === cid);
                      return connected ? (
                        <span key={cid} className="connection-mini">→ {connected.title.split(" ")[0]}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODULE DETAIL VIEW */}
        {/* ============================================================ */}
        {selectedModule && activeView === "module" && (() => {
          const mod = selectedModule;
          const phase = CURRICULUM.phases.find(p => p.id === mod.phaseId);
          return (
            <div>
              <button className="back-btn" onClick={() => { setSelectedModule(null); setActiveView("curriculum"); }}>
                ← Zurück zum Curriculum
              </button>

              <div className="module-header">
                <div className="module-meta-row">
                  <div className="module-phase-label" style={{ color: phase?.color }}>
                    Phase {phase?.number}: {phase?.title}
                  </div>
                  <span className="tag tag-difficulty" style={{ color: phase?.color, background: `${phase?.color}15` }}>
                    {DIFFICULTY_LABELS[mod.difficulty]}
                  </span>
                  <span className="tag">{mod.hours} Stunden</span>
                </div>
                <h1 className="module-title">{mod.title}</h1>
                <p className="module-summary">{mod.summary}</p>
                <div className="module-status-row">
                  <button className="status-button" onClick={() => cycleStatus(mod.id)}
                    style={{ background: STATUS_COLORS[moduleStatuses[mod.id]] }}>
                    {STATUS_LABELS[moduleStatuses[mod.id]]}
                  </button>
                  <span className="status-hint">Klicken zum Wechseln</span>
                </div>
              </div>

              <section className="content-section analogy-section">
                <h3 className="section-label analogy-label">💡 Analogie zum Verstehen</h3>
                <p className="section-text">{mod.analogy}</p>
              </section>

              <section className="content-section">
                <h3 className="section-label">Kernwissen</h3>
                {mod.keyPoints.map((point, i) => (
                  <div key={i} className="key-point">
                    <span className="key-point-number" style={{ color: phase?.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="key-point-text">{point}</p>
                  </div>
                ))}
              </section>

              <section className="content-section example-section">
                <h3 className="section-label example-label">🏭 Praxisbeispiel Mittelstand</h3>
                <p className="section-text">{mod.practicalExample}</p>
              </section>

              <section className="content-section">
                <h3 className="section-label">🔗 Verbundene Module</h3>
                <div className="connections-row">
                  {mod.connections.map(cid => {
                    const connected = ALL_MODULES.find(m => m.id === cid);
                    return connected ? (
                      <span key={cid} className="connection-link" onClick={() => openModule(connected)}>
                        <span style={{ color: connected.phaseColor, marginRight: 6 }}>●</span>
                        {connected.title}
                      </span>
                    ) : null;
                  })}
                </div>
              </section>

              <section className="content-section">
                <h3 className="section-label">📝 Deine Notizen & Erkenntnisse</h3>
                <textarea className="notes-area"
                  value={notes[mod.id] || ""}
                  onChange={e => handleNoteChange(mod.id, e.target.value)}
                  placeholder="Hier kannst du deine Gedanken, Erkenntnisse und To-Dos festhalten..."
                />
              </section>
            </div>
          );
        })()}
      </main>

      <footer className="hub-footer">
        SupplyConsult GmbH · KI-Beratung LearningHub · 12-Wochen-Programm
      </footer>
    </div>
  );
}

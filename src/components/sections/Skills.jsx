import { useState, useRef, useEffect } from 'react';
import { skillCategories } from '../../data/skills';

export function Skills() {
  const [openFolder, setOpenFolder] = useState(null);
  const [windowPos, setWindowPos] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0 });

  const trashFolder = {
    id: 'trash',
    name: 'Trash',
    icon: '🗑️',
    color: '#ef4444',
    skills: [
      { name: 'To-Do App', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'jQuery Script', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
      { name: 'Console.log()', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
      { name: 'PHP Login', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ]
  };
  const allFolders = [...skillCategories, trashFolder];

  // Web Audio click sounds
  const playClick = (type) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      }
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch(e) {}
  };

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openFolderWindow = (category) => {
    playClick('open');
    setIsClosing(false);
    setOpenFolder(category);
    setWindowPos({ x: 60, y: 30 });
  };

  const closeWindow = () => {
    playClick('close');
    setIsClosing(true);
    setTimeout(() => {
      setOpenFolder(null);
      setIsClosing(false);
    }, 250);
  };

  // Drag handling for the window title bar
  const onDragStart = (e) => {
    // Only grab if we didn't click a window control button
    if (e.target.closest('button')) return;
    
    if (e.type !== 'touchstart') {
      e.preventDefault();
    }

    const isTouch = e.type === 'touchstart';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    dragRef.current = {
      dragging: true,
      startX: clientX - windowPos.x,
      startY: clientY - windowPos.y,
    };

    const onMove = (ev) => {
      if (!dragRef.current.dragging) return;
      const cX = ev.type === 'touchmove' ? ev.touches[0].clientX : ev.clientX;
      const cY = ev.type === 'touchmove' ? ev.touches[0].clientY : ev.clientY;
      setWindowPos({
        x: cX - dragRef.current.startX,
        y: cY - dragRef.current.startY,
      });
    };

    const onUp = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  // Current time for the status bar
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <section ref={sectionRef} id="skills" className="skills-section" aria-label="Skills">
        {/* Section label */}
        <div className="skills-label-row">
          <span className={`skills-label ${visible ? 'skills-visible' : ''}`}>My Tech Stack</span>
        </div>

        {/* Desktop area */}
        <div className={`os-desktop ${visible ? 'skills-visible' : ''}`}>
          {/* Wallpaper / desktop surface */}
          <div className="os-wallpaper">
            {/* Grid pattern */}
            <div className="os-grid-pattern" />

            {/* Folder icons on the desktop */}
            <div className="os-icons-grid">
              {allFolders.map((cat, i) => (
                <button
                  key={cat.id}
                  className="os-folder"
                  onClick={() => openFolderWindow(cat)}
                  onDoubleClick={() => openFolderWindow(cat)}
                  style={{ animationDelay: `${i * 100 + 300}ms` }}
                >
                  <div className="os-folder-icon">
                    <svg viewBox="0 0 48 48" fill="none" className="folder-svg">
                      <path d="M4 12C4 9.79086 5.79086 8 8 8H18L22 12H40C42.2091 12 44 13.7909 44 16V36C44 38.2091 42.2091 40 40 40H8C5.79086 40 4 38.2091 4 36V12Z" fill={cat.color} fillOpacity="0.15" stroke={cat.color} strokeWidth="1.5"/>
                    </svg>
                    <span className="folder-emoji">{cat.icon}</span>
                  </div>
                  <span className="os-folder-name">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Open window */}
            {openFolder && (
              <div
                className={`os-window ${isClosing ? 'os-window-close' : 'os-window-open'}`}
                style={{
                  left: `${windowPos.x}px`,
                  top: `${windowPos.y}px`,
                }}
              >
                {/* Title bar */}
                <div className="os-titlebar" onMouseDown={onDragStart} onTouchStart={onDragStart}>
                  <div className="os-traffic-lights">
                    <button className="os-btn-close" onClick={closeWindow} aria-label="Close" />
                    <button className="os-btn-min" aria-label="Minimize" />
                    <button className="os-btn-max" aria-label="Maximize" />
                  </div>
                  <span className="os-titlebar-text">
                    {openFolder.icon} {openFolder.name}
                  </span>
                  <div style={{ width: '52px' }} />
                </div>

                {/* Toolbar */}
                <div className="os-toolbar">
                  <span className="os-breadcrumb">
                    Desktop &gt; {openFolder.name}
                  </span>
                  <span className="os-item-count">
                    {openFolder.skills.length} items
                  </span>
                </div>

                {/* Content grid */}
                <div className="os-content">
                  {openFolder.skills.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="os-skill-item"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="os-skill-icon-wrap">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="os-skill-icon"
                          loading="lazy"
                        />
                      </div>
                      <span className="os-skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* macOS-style dock */}
          <div className="os-dock">
            {allFolders.map((cat) => (
              <button
                key={cat.id}
                className={`os-dock-item ${openFolder?.id === cat.id ? 'os-dock-active' : ''}`}
                onClick={() => openFolderWindow(cat)}
                title={cat.name}
              >
                <span className="os-dock-emoji">{cat.icon}</span>
              </button>
            ))}
          </div>

          {/* Status bar (top) */}
          <div className="os-statusbar">
            <span className="os-statusbar-logo">⌘ SoumyaOS</span>
            <span className="os-statusbar-time">{timeStr}</span>
          </div>
        </div>
      </section>

      <style>{`
        .skills-section {
          padding: var(--section-gap) 0;
          background-color: #0a0a0a;
          overflow: hidden;
        }

        .skills-label-row {
          padding: 0 var(--margin-edge);
          margin-bottom: 32px;
        }

        .skills-label {
          font-family: var(--font-sans);
          font-size: clamp(0.6875rem, 0.9vw, 0.75rem);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .skills-label.skills-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== OS DESKTOP ===== */
        .os-desktop {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 80px rgba(0,0,0,0.5);
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          transition: opacity 0.8s ease, transform 0.8s ease;
          transition-delay: 0.2s;
        }
        .os-desktop.skills-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Wallpaper */
        .os-wallpaper {
          position: absolute;
          inset: 28px 0 52px 0;
          background: linear-gradient(145deg, #111 0%, #0a0a0a 50%, #0f0f0f 100%);
          overflow: hidden;
        }

        .os-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Desktop folder icons */
        .os-icons-grid {
          position: absolute;
          top: 32px;
          left: 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .os-folder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          animation: folderPop 0.4s ease both;
        }

        .os-folder:hover {
          background-color: rgba(255,255,255,0.06);
        }

        @keyframes folderPop {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }

        .os-folder-icon {
          position: relative;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .folder-svg {
          width: 100%;
          height: 100%;
        }

        .folder-emoji {
          position: absolute;
          font-size: 18px;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .os-folder-name {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.01em;
        }

        /* ===== WINDOW ===== */
        .os-window {
          position: absolute;
          width: clamp(300px, 55%, 520px);
          max-height: 75%;
          background: rgba(26, 26, 26, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 10px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .os-window-open {
          animation: windowOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .os-window-close {
          animation: windowClose 0.25s ease-in forwards;
        }

        @keyframes windowOpen {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes windowClose {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.9); }
        }

        /* Title bar */
        .os-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 36px;
          padding: 0 12px;
          background: #2a2a2a;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: grab;
          flex-shrink: 0;
          user-select: none;
        }

        .os-titlebar:active { cursor: grabbing; }

        .os-traffic-lights {
          display: flex;
          gap: 6px;
        }

        .os-btn-close, .os-btn-min, .os-btn-max {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: filter 0.2s;
        }

        .os-btn-close { background: #FF5F57; }
        .os-btn-min { background: #FEBC2E; }
        .os-btn-max { background: #28C840; }

        .os-btn-close:hover, .os-btn-min:hover, .os-btn-max:hover {
          filter: brightness(1.2);
        }

        .os-titlebar-text {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
        }

        /* Toolbar */
        .os-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          flex-shrink: 0;
        }

        .os-breadcrumb {
          font-family: var(--font-sans);
          font-size: 0.625rem;
          color: rgba(255,255,255,0.35);
        }

        .os-item-count {
          font-family: var(--font-sans);
          font-size: 0.625rem;
          color: rgba(255,255,255,0.25);
        }

        /* Skill items grid */
        .os-content {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
          gap: 12px;
          overflow-y: auto;
        }

        .os-skill-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 4px;
          border-radius: 6px;
          cursor: default;
          transition: background-color 0.2s ease;
          animation: skillPop 0.3s ease both;
        }

        .os-skill-item:hover {
          background-color: rgba(255,255,255,0.06);
        }

        @keyframes skillPop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }

        .os-skill-icon-wrap {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 6px;
        }

        .os-skill-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .os-skill-name {
          font-family: var(--font-sans);
          font-size: 0.5625rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 72px;
        }

        /* ===== DOCK ===== */
        .os-dock {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 52px;
          background: rgba(26,26,26,0.85);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0 16px;
        }

        .os-dock-item {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .os-dock-item:hover {
          transform: translateY(-4px) scale(1.15);
          background: rgba(255,255,255,0.1);
        }

        .os-dock-active {
          background: rgba(255,255,255,0.1);
        }

        .os-dock-active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #FF6B00;
        }

        .os-dock-item { position: relative; }

        .os-dock-emoji {
          font-size: 18px;
        }

        /* ===== STATUS BAR (top) ===== */
        .os-statusbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 28px;
          background: rgba(26,26,26,0.9);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
        }

        .os-statusbar-logo {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }

        .os-statusbar-time {
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .os-desktop {
            aspect-ratio: auto;
            height: clamp(500px, 75vh, 650px);
            margin: 0;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }

          .os-icons-grid {
            grid-template-columns: repeat(2, 1fr);
            top: 24px;
            left: 20px;
            gap: 16px;
          }

          .os-folder-icon {
            width: 44px;
            height: 44px;
          }

          .os-window {
            width: 90% !important;
            left: 5% !important;
            top: 40px !important; /* spacing below statusbar */
            max-height: calc(100% - 110px) !important; /* leave room for dock */
          }

          .os-content {
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
          }

          .os-dock {
            padding: 0 8px;
            gap: 6px;
            overflow-x: auto;
          }

          .os-dock-item {
            width: 34px;
            height: 34px;
            flex-shrink: 0;
          }

          .os-dock-emoji {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .os-icons-grid {
            gap: 12px;
            left: 16px;
          }

          .os-folder-name {
            font-size: 0.5625rem;
          }

          .os-window {
            width: 92% !important;
            left: 4% !important;
          }
        }
      `}</style>
    </>
  );
}

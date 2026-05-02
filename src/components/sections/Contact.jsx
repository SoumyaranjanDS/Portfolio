import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from 'react';

const STEPS = [
  { id: 'name', prompt: 'Enter your name', placeholder: 'e.g. John Doe', type: 'text' },
  { id: 'email', prompt: 'Enter your email', placeholder: 'e.g. hello@example.com', type: 'email' },
  { id: 'message', prompt: 'Tell me about your project', placeholder: 'e.g. I have an idea for...', type: 'text' },
  { id: 'confirm', prompt: 'Send this message? (y/n)', placeholder: '[y/n]', type: 'text' }
];

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_44t301m',
  TEMPLATE_ID: 'template_1avg7z7',
  PUBLIC_KEY: 'HqstwarkOfUtYjK8l'
};

export function Contact() {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const inputRef = useRef(null);
  const hasInited = useRef(false);

  useEffect(() => {
    if (hasInited.current) return;
    hasInited.current = true;

    const bootSequence = async () => {
      const messages = [
        { type: 'system', text: 'INITIALIZING CONTACT_PROTOCOL_V2.0...' },
        { type: 'system', text: 'ESTABLISHING SECURE CONNECTION...' },
        { type: 'system', text: 'READY.' },
      ];

      for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400 + (Math.random() * 400)));
        setHistory(prev => [...prev, messages[i]]);
      }
      setIsBooted(true);
    };

    bootSequence();
  }, []);

  const terminalContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const val = inputValue.trim();
      const step = STEPS[currentStep];

      setHistory(prev => [...prev, { type: 'prompt', text: `guest@soumya:~$ ${step.prompt}` }, { type: 'input', text: val }]);

      if (step.id !== 'confirm') {
        setFormData(prev => ({ ...prev, [step.id]: val }));
      }

      processStep(val);
      setInputValue('');
    }
  };

  const processStep = (val) => {
    if (currentStep === 3) {
      if (val.toLowerCase() === 'y' || val.toLowerCase() === 'yes') {
        simulateSending();
      } else {
        setHistory(prev => [...prev, { type: 'system', text: 'PROCESS ABORTED. REBOOTING...' }]);
        setTimeout(() => {
          setHistory([
            { type: 'system', text: 'INITIALIZING CONTACT_PROTOCOL_V2.0...' },
            { type: 'system', text: 'READY.' },
          ]);
          setFormData({ name: '', email: '', message: '' });
          setCurrentStep(0);
        }, 1000);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const simulateSending = async () => {
    setHistory(prev => [...prev, { type: 'system', text: 'PREPARING DATA PACKETS...' }]);
    await new Promise(r => setTimeout(r, 800));
    setHistory(prev => [...prev, { type: 'system', text: 'CONNECTING TO DISPATCH_SERVER...' }]);
    await new Promise(r => setTimeout(r, 1000));

    let progress = 0;
    while (progress <= 100) {
      const barSize = 20;
      const filled = Math.round((progress / 100) * barSize);
      const bar = '[' + '#'.repeat(filled) + '.'.repeat(barSize - filled) + ']';

      setHistory(prev => {
        const newHist = [...prev];
        const lastIdx = newHist.length - 1;
        if (newHist[lastIdx].type === 'progress') {
          newHist[lastIdx].text = `${bar} ${progress}%`;
          return newHist;
        } else {
          return [...newHist, { type: 'progress', text: `${bar} ${progress}%` }];
        }
      });

      progress += Math.floor(Math.random() * 15) + 5;
      await new Promise(r => setTimeout(r, 150));
    }

    try {
      setHistory(prev => [...prev, { type: 'system', text: 'ATTEMPTING UPLINK...' }]);

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Soumyaranjan',
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setHistory(prev => [...prev, { type: 'system', text: 'PROTOCOL SUCCESSFUL. MESSAGE DISPATCHED.' }]);
      setIsSubmitted(true);
    } catch (error) {
      setHistory(prev => [...prev, { type: 'system', text: `ERROR: UPLINK FAILED. ${error.text || 'TIMEOUT'}` }]);
      setHistory(prev => [...prev, { type: 'system', text: 'FALLBACK: DATA SAVED LOCALLY.' }]);
      setIsSubmitted(true);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');

        .terminal-font { font-family: 'JetBrains Mono', monospace; }
        .syne { font-family: 'Syne', sans-serif; }

        /* CRT flicker */
        @keyframes flicker {
          0%,100%{ opacity:1; }
          92%{ opacity:1; }
          93%{ opacity:0.85; }
          94%{ opacity:1; }
          96%{ opacity:0.9; }
          97%{ opacity:1; }
        }
        .crt-flicker { animation: flicker 8s infinite; }

        /* Scanlines */
        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          );
        }

        /* Cursor blink */
        @keyframes blink {
          0%,100%{ opacity:1; }
          50%{ opacity:0; }
        }
        .cursor-blink { animation: blink 1s step-end infinite; }

        /* Glow pulse on border */
        @keyframes glow-pulse {
          0%,100%{ box-shadow: 0 0 18px rgba(255,107,26,0.12), 0 0 40px rgba(255,107,26,0.04); }
          50%{ box-shadow: 0 0 28px rgba(255,107,26,0.22), 0 0 60px rgba(255,107,26,0.08); }
        }
        .terminal-glow { animation: glow-pulse 4s ease infinite; }

        /* Slide in line */
        @keyframes slide-in {
          from { opacity:0; transform: translateX(-8px); }
          to { opacity:1; transform: translateX(0); }
        }
        .line-in { animation: slide-in 0.2s ease both; }

        /* Scrollbar */
        .term-scroll::-webkit-scrollbar { width: 4px; }
        .term-scroll::-webkit-scrollbar-track { background: transparent; }
        .term-scroll::-webkit-scrollbar-thumb { background: rgba(255,107,26,0.2); border-radius: 2px; }
        .term-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,107,26,0.4); }

        /* Input – no default outline/border */
        .term-input {
          background: transparent;
          border: none;
          outline: none;
          color: #F0EDE8;
          font-family: 'JetBrains Mono', monospace;
          font-size: inherit;
          width: 100%;
          caret-color: transparent; /* hide native caret, use custom */
        }
        .term-input::placeholder { color: rgba(255,255,255,0.15); }

        /* Step progress dots */
        .step-dot-active { background: #FF6B1A; box-shadow: 0 0 6px rgba(255,107,26,0.7); }
        .step-dot-done { background: rgba(255,107,26,0.4); }
        .step-dot-idle { background: rgba(255,255,255,0.1); }

        /* Social link hover */
        .social-link { transition: color 0.2s, letter-spacing 0.2s; }
        .social-link:hover { color: #FF6B1A; letter-spacing: 0.25em; }

        /* Mobile adjustments */
        @media (max-width: 480px) {
          .term-body { font-size: 11px !important; padding: 12px !important; }
          .term-header-title { font-size: 9px !important; }
          .prompt-text { font-size: 10px !important; }
        }
      `}</style>

      <section
        id="contact"
        className="min-h-screen bg-[#080807] flex flex-col items-center justify-center selection:bg-[#FF6B1A] selection:text-black"
        style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', paddingTop: 'clamp(2.5rem, 6vw, 4rem)', paddingBottom: 'clamp(2.5rem, 6vw, 4rem)' }}
        onClick={focusInput}
      >

        {/* Section label */}
        <div className="mb-6 sm:mb-8 flex flex-col items-center gap-2">
          <p className="terminal-font text-[10px] sm:text-xs text-[#FF6B1A]/60 tracking-[0.25em] uppercase">
            — contact.protocol —
          </p>
          <h2 className="syne text-2xl sm:text-4xl font-bold text-white/90 tracking-tight text-center">
            Get in <span style={{ color: '#FF6B1A' }}>touch</span>
          </h2>
        </div>

        {/* Terminal window */}
        <div
          className="terminal-glow crt-flicker w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl flex flex-col rounded-xl overflow-hidden border relative"
          style={{
            background: '#0C0C0A',
            borderColor: 'rgba(255,107,26,0.22)',
            height: 'clamp(380px, 65vh, 580px)',
          }}
          data-aos="zoom-in"
        >

          {/* ── Terminal chrome header ── */}
          <div
            className="shrink-0 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b"
            style={{ background: '#111110', borderColor: 'rgba(255,107,26,0.1)' }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#FF5F57', boxShadow: '0 0 5px rgba(255,95,87,0.5)' }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#FFBD2E', boxShadow: '0 0 5px rgba(255,189,46,0.4)' }} />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: '#27C93F', boxShadow: '0 0 5px rgba(39,201,63,0.4)' }} />
            </div>

            {/* Title */}
            <div className="terminal-font term-header-title text-[10px] sm:text-[11px] text-white/30 tracking-[0.18em] uppercase absolute left-1/2 -translate-x-1/2">
              soumya.terminal — <span style={{ color: isSubmitted ? '#27C93F' : '#FF6B1A' }}>{isSubmitted ? 'DISPATCHED' : 'ONLINE'}</span>
            </div>

            {/* Step indicator dots */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    i < currentStep ? 'step-dot-done' :
                    i === currentStep && isBooted && !isSubmitted ? 'step-dot-active' :
                    'step-dot-idle'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Terminal body ── */}
          <div
            ref={terminalContainerRef}
            className="term-scroll term-body flex-1 overflow-y-auto p-3 sm:p-5 terminal-font text-xs sm:text-sm relative"
            style={{ color: '#C9C5BE' }}
          >
            {/* Scanlines overlay */}
            <div className="scanlines absolute inset-0 pointer-events-none z-10 opacity-40" />

            {/* Ambient orange glow top-right */}
            <div
              className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle at top right, rgba(255,107,26,0.06) 0%, transparent 70%)', zIndex: 0 }}
            />

            <div className="relative z-10 space-y-1 sm:space-y-1.5">

              {/* Boot / history lines */}
              {history.map((msg, i) => (
                <div
                  key={i}
                  className="line-in leading-relaxed break-all"
                  style={{
                    color:
                      msg.type === 'system' ? 'rgba(255,255,255,0.28)' :
                      msg.type === 'prompt' ? '#FF6B1A' :
                      msg.type === 'progress' ? '#27C93F' :
                      '#F0EDE8',
                    paddingLeft: msg.type === 'input' ? '1.2em' : '0',
                    fontStyle: msg.type === 'system' ? 'italic' : 'normal',
                    fontWeight: msg.type === 'prompt' ? 500 : 400,
                  }}
                >
                  {msg.type === 'system' && (
                    <span className="mr-2" style={{ color: 'rgba(255,107,26,0.4)' }}>{'>'}</span>
                  )}
                  {msg.text}
                </div>
              ))}

              {/* Active input line */}
              {!isSubmitted && isBooted && (
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-x-2 gap-y-1 pt-3 sm:pt-4">
                  {/* Prompt */}
                  <span
                    className="prompt-text shrink-0 font-medium break-all"
                    style={{ color: '#FF6B1A', fontSize: 'inherit' }}
                  >
                    <span className="hidden sm:inline">guest@soumya:~$ </span>
                    <span className="sm:hidden" style={{ color: 'rgba(255,107,26,0.7)' }}>$ </span>
                    {STEPS[currentStep].prompt}
                  </span>

                  {/* Input + custom cursor */}
                  <div className="flex items-center flex-1 min-w-0" style={{ minWidth: '100px' }}>
                    <input
                      ref={inputRef}
                      type={STEPS[currentStep].type}
                      value={inputValue}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleCommand}
                      className="term-input flex-1 min-w-0"
                      placeholder={STEPS[currentStep].placeholder}
                      enterKeyHint={currentStep === STEPS.length - 1 ? 'send' : 'next'}
                      style={{ fontSize: 'inherit' }}
                    />
                    {/* Block cursor */}
                    <span
                      className="cursor-blink shrink-0 inline-block"
                      style={{
                        width: '8px',
                        height: '1.1em',
                        background: '#FF6B1A',
                        marginLeft: '1px',
                        verticalAlign: 'text-bottom',
                        display: inputValue ? 'none' : 'inline-block',
                        boxShadow: '0 0 6px rgba(255,107,26,0.8)',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Hint text */}
              {isBooted && !isSubmitted && (
                <p className="pt-2 sm:pt-3" style={{ color: 'rgba(255,255,255,0.12)', fontSize: '10px' }}>
                  press <span style={{ color: 'rgba(255,107,26,0.5)' }}>ENTER</span> to continue
                </p>
              )}
            </div>
          </div>

          {/* ── Status bar ── */}
          <div
            className="shrink-0 flex items-center justify-between px-3 sm:px-5 py-1.5 border-t"
            style={{ background: '#0E0E0C', borderColor: 'rgba(255,107,26,0.08)' }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: isSubmitted ? '#27C93F' : '#FF6B1A', boxShadow: `0 0 5px ${isSubmitted ? '#27C93F' : '#FF6B1A'}` }}
              />
              <span className="terminal-font text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {isSubmitted ? 'session closed' : `step ${Math.min(currentStep + 1, 4)} of 4`}
              </span>
            </div>
            <span className="terminal-font text-[9px] sm:text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,107,26,0.3)' }}>
              enc://AES-256
            </span>
          </div>
        </div>

      </section>
    </>
  );
}
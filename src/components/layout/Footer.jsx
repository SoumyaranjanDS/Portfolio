import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white h-[50vh] w-full px-6 flex flex-col justify-center items-center relative overflow-hidden border-t border-white/5">
      {/* Massive Background Signature for that Editorial Feel */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[25vw] font-bold tracking-tighter leading-none">SOUMYA</h1>
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center gap-12 relative z-10">
        {/* Brand */}
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">SOUMYA<span className="text-[#FF6B00]">VERSE</span></h2>
          <p className="text-white/40 text-sm md:text-base tracking-widest uppercase">
            Designer & Full-Stack Architect
          </p>
        </div>

        {/* Simple Links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
            <li><a href="#hero" className="hover:text-[#FF6B00] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[#FF6B00] transition-colors">About</a></li>
            <li><a href="#projects" className="hover:text-[#FF6B00] transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-[#FF6B00] transition-colors">Contact</a></li>
            <li className="hidden md:block text-white/10">|</li>
            <li><a href="https://linkedin.com/in/soumyaranjansahoo97" target="_blank" rel="noreferrer" className="hover:text-[#FF6B00] transition-colors">LinkedIn</a></li>
            <li><a href="https://github.com/SoumyaranjanDS" target="_blank" rel="noreferrer" className="hover:text-[#FF6B00] transition-colors">GitHub</a></li>
            <li><a href="/DEV_Soumyaranjan.pdf" download className="text-[#FF6B00] hover:underline transition-all">CV</a></li>
          </ul>
        </nav>
      </div>

      {/* Bottom Copyright */}
      <div className="absolute bottom-10 w-full text-center px-6">
        <div className="w-full mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
          <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          <span>Developed By <span className="text-[#FF6B00]" >SOUMYA</span></span>
          <span>EST. ODISHA, INDIA</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
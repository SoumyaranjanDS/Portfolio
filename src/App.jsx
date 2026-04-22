import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { RoleMarquee } from './components/sections/RoleMarquee';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Metrics } from './components/sections/Metrics';
import { Contact } from './components/sections/Contact';
import { Loader } from './components/ui/Loader';
import { useParallax } from './hooks/useParallax';
import Footer from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const parallaxRef = useParallax();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Wipe Transition: Projects -> Services
      // We want Services to reveal itself by sliding over Projects
      ScrollTrigger.create({
        trigger: "#services",
        start: "top bottom",
        end: "top top",
        scrub: true,
        animation: gsap.fromTo("#services", 
          { y: 100, opacity: 0.8 }, 
          { y: 0, opacity: 1, ease: "none" }
        )
      });

      // Parallax Wipe Transition: Services -> Metrics
      ScrollTrigger.create({
        trigger: "#metrics",
        start: "top bottom",
        end: "top top",
        scrub: true,
        animation: gsap.fromTo("#metrics", 
          { y: 50 }, 
          { y: 0, ease: "none" }
        )
      });
      
      // Layering: Pinning the previous section for a brief moment
      // (Optional: can be added if a deeper 'wipe' is desired)
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Loader />
      <Navbar />
      <main id="main-content" ref={parallaxRef}>
        <Hero />
        <RoleMarquee />
        <About />

        <Skills />
        
        <Projects />
        
        <Services />
        
        <Metrics />
        
        <Contact />

        <Footer />
      </main>
    </>
  );
}

export default App;

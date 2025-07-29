import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Skill() {
  const skillProg = [
    { src: './html.png', alt: 'HTML' },
    { src: './css.png', alt: 'CSS' },
    { src: './javascript.png', alt: 'JAVASCRIPT' },
    { src: './angularjs.svg', alt: 'ANGULAR.JS' },
    { src: './react.png', alt: 'REACT.JS' },
    { src: './gsap.png', alt: 'GSAP' },
  ];

  const containerRef = useRef(null);
  const Robhand = useRef(null);
  const Procont = useRef(null);
  const bgImageRef = useRef(null); // ref for background image div

  useEffect(() => {
    if (!containerRef.current || !Robhand.current || !Procont.current || !bgImageRef.current) return;

    // Timeline for skill animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Animate skill panel slide and hand rotation
    tl.fromTo(
      Procont.current,
      { x: -60 },
      { x: 0, ease: 'power2.inOut' },
      0
    );
    tl.fromTo(
      Robhand.current,
      { rotate: -40 },
      { rotate: 40, transformOrigin: 'left center', ease: 'power2.inOut' },
      0
    );

    // Background image fade in/out synced with scroll
    gsap.fromTo(
      bgImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[120vh] p-3 bg-black text-white flex flex-col items-center relative overflow-hidden"
      style={{ position: 'relative',
       zIndex: 2, // increased
       }}
    >
      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="absolute top-0 left-0 w-full h-full bg-[url('/AIbgimg.jpg')] bg-center bg-cover opacity-0 pointer-events-none"
        style={{ zIndex: 0 }}
      ></div>

      <h1
        style={{ fontFamily: 'Papyrus, fantasy' }}
        className=" mb-2 text-4xl font-bold mt-18 ml-2 sm:ml-6 relative z-10"
      >
        My Skills
      </h1>

      <div className="flex flex-col md:flex-row w-full max-w-7xl min-h-[60vh] relative z-10">
        {/* Robot column */}
        <div
          className="flex items-end justify-center mb-8 md:mb-0"
          style={{
            width: '100%',
            maxWidth: '8cm',
            minWidth: '5cm',
            minHeight: '30rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <img
            src="./robotleft.jpg"
            alt="AI Profile"
            className="w-full h-[90%] object-contain"
            style={{
              minWidth: '5cm',
              maxWidth: '8cm',
              minHeight: '30rem',
              maxHeight: '80vh',
              zIndex: 1,
            }}
          />
          <img
            ref={Robhand}
            src="./ailefthand.jpg"
            alt="AI Hand"
            className="absolute"
            style={{
              left: '15%',
              top: '85%',
              width: '90%',
              height: '18%',
              zIndex: 2,
              transform: 'rotate(-15deg)',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Skills grid column */}
        <div
          ref={Procont}
          className="mt-100 flex-1 flex items-center justify-center ml-4 sm:ml-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 w-full max-w-[500px] border border-white rounded-xl shadow-lg backdrop-blur-md p-4">
            {skillProg.map((skill, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <img
                  src={skill.src}
                  alt={skill.alt}
                  className="p-2 w-16 h-16 sm:w-20 sm:h-20 border border-white rounded-xl shadow-lg backdrop-blur-md"
                />
                <span className="mt-2 text-xs sm:text-base">{skill.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skill;

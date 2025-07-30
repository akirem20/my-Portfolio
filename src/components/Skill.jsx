import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Skill() {
  const skillProg = [
    { src: "/html.png", alt: "HTML" },
    { src: "/css.png", alt: "CSS" },
    { src: "/javascript.png", alt: "JavaScript" },
    { src: "/angularjs.svg", alt: "Angular" },
    { src: "/react.png", alt: "React" },
    { src: "/gsap.png", alt: "GSAP" },
  ];

  const containerRef = useRef(null);
  const Robhand = useRef(null);
  const Procont = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !Robhand.current || !Procont.current || !bgImageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.fromTo(
      Robhand.current,
      { rotate: -45 },
      {
        rotate: 25,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      0
    ).fromTo(
      Procont.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.out" },
      0
    );

    gsap.fromTo(
      bgImageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-black text-white flex flex-col items-center px-4 py-32 overflow-hidden"
      style={{ zIndex: 2 }}
      aria-label="Skills Section"
    >
      {/* Background Layer */}
      <div
        ref={bgImageRef}
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 transition-opacity"
        style={{ backgroundImage: "url('/AIbgimg.jpg')", zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Title */}
      <h1 className="mr-150 relative z-10 mb-20 text-4xl font-bold font-[Papyrus,fantasy] select-none">
        My Skills
      </h1>

      {/* Content Block */}
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center w-full max-w-7xl">
        {/* Robot */}
        <div className="relative w-full max-w-[8cm] min-w-[5cm] min-h-[30rem] flex items-end justify-center">
          <img
            src="/robotleft.jpg"
            alt="Robot"
            className="w-full max-w-[8cm] object-contain"
          />
          <img
            ref={Robhand}
            src="/ailefthand.jpg"
            alt=""
            aria-hidden="true"
            className="absolute"
            style={{
              left: "15%",
              top: "85%",
              width: "90%",
              height: "18%",
              zIndex: 20,
              transform: "rotate(-15deg)",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* Skills Grid */}
        <div
          ref={Procont}
          className="flex-1 flex items-center justify-center opacity-0"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-[500px] border border-white rounded-xl shadow-xl backdrop-blur-md p-6">
            {skillProg.map((skill, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <img
                  src={skill.src}
                  alt={skill.alt}
                  className="w-16 h-16 sm:w-20 sm:h-20 border border-white rounded-xl shadow-lg backdrop-blur-md p-2"
                />
                <span className="mt-2 text-xs sm:text-sm">{skill.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

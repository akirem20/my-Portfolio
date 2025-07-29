import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Skill() {
  const skillProg = [
    { src: "/html.png", alt: "HTML" },
    { src: "/css.png", alt: "CSS" },
    { src: "/javascript.png", alt: "JAVASCRIPT" },
    { src: "/angularjs.svg", alt: "ANGULAR.JS" },
    { src: "/react.png", alt: "REACT.JS" },
    { src: "/gsap.png", alt: "GSAP" },
  ];

  const containerRef = useRef(null);
  const Robhand = useRef(null);
  const Procont = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !Robhand.current ||
      !Procont.current ||
      !bgImageRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(Procont.current, { x: -60 }, { x: 0, ease: "power2.inOut" }, 0);
    tl.fromTo(
      Robhand.current,
      { rotate: -40 },
      {
        rotate: 40,
        transformOrigin: "left center",
        ease: "power2.inOut",
      },
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
          start: "top center",
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
      className="relative w-full min-h-[150vh] bg-black text-white flex flex-col items-center overflow-hidden px-4 sm:px-4 py-32"
      style={{ zIndex: 2 }}
      aria-label="My Skills Section"
    >
      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="pointer-events-none absolute inset-0 bg-center bg-cover opacity-0"
        style={{ backgroundImage: "url('/AIbgimg.jpg')", zIndex: 0 }}
        aria-hidden="true"
      ></div>

       <h1
    className="relative z-10 mb-30 mr-60 text-4xl font-bold font-[Papyrus,fantasy] select-none"
  >
    My Skills
  </h1>
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl min-h-[60vh] gap-12 justify-center items-center">
        {/* Robot Column */}
        <div
          className="flex items-end justify-center"
          style={{
            width: "100%",
            maxWidth: "8cm",
            minWidth: "5cm",
            minHeight: "30rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
            src="/robotleft.jpg"
            alt="Robot Profile"
            className="w-full max-w-[8cm] min-w-[5cm] max-h-[80vh] object-contain"
          />
          <img
            ref={Robhand}
            src="/ailefthand.jpg"
            alt="Robot Left Hand"
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
            aria-hidden="true"
          />
        </div>

        {/* Skills Grid */}
        <div
          ref={Procont}
          className="mt-40 flex-1 flex items-center justify-center ml-0 sm:ml-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-[500px] border border-white rounded-xl shadow-lg backdrop-blur-md p-6">
            {skillProg.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <img
                  src={skill.src}
                  alt={skill.alt}
                  className="w-16 h-16 sm:w-20 sm:h-20 border border-white rounded-xl shadow-lg backdrop-blur-md p-2"
                />
                <span className="mt-2 text-xs sm:text-base select-none">
                  {skill.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Skill from "./Skill";
import Project from "./Project";
import Contact from "./Contact";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

function Hero() {
  const boxleft = useRef();
  const boxright = useRef();

  useEffect(() => {
    if (!boxleft.current || !boxright.current) return;

    const init = () => {
      const fadeIn = gsap.timeline();

      fadeIn.fromTo(
        [boxleft.current, boxright.current],
        { opacity: 0, y: -100, rotation: 0 },
        { opacity: 1, y: 0, rotation: 0, duration: 2, ease: "power2.out" }
      );

      if (window.innerWidth >= 1024) {
        fadeIn.to(
          boxleft.current,
          {
            motionPath: {
              path: "#arcPath",
              align: "#arcPath",
              alignOrigin: [0.5, 0.5],
            },
            rotation: 360,
            transformOrigin: "50% 50%",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: boxleft.current,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
          ">"
        );
      }
    };

    gsap.delayedCall(0.1, init);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Example image src, set to null or your real image path
  const developerImageSrc = '/picture.png'; // Replace null with your image URL or leave null

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-[#13161a] via-[#3b4540] to-[#020e14]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0"
        src="/bgvd.mov"
        type="video/mov"
      />

      {/* Navbar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 w-11/12 max-w-5xl flex items-center justify-between gap-3 px-6 py-4 z-30 backdrop-blur-md border border-white rounded-xl shadow-lg">
        <div
          style={{ fontFamily: "Papyrus, fantasy" }}
          className="text-white font-bold text-xl select-none"
        >
          Front-End Developer
        </div>
        <ul className="mr-[30%] flex space-x-8 gap-2">
    {["home", "skill", "projects", "contact"].map((link) => {
      if (link === "home") {
        return (
          <li key={link}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ fontFamily: "Papyrus, fantasy" }}
              className="text-white hover:text-black transition-colors bg-transparent border-none cursor-pointer"
            >
              Home
            </button>
          </li>
        );
      } else {
        return (
          <li key={link}>
            <a
              href={`#${link}`}
              style={{ fontFamily: "Papyrus, fantasy" }}
              className="text-white hover:text-black transition-colors"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          </li>
        );
      }
    })}
  </ul>
      </nav>

      {/* Animated Content Boxes */}
      <div className="relative z-20 flex flex-col lg:flex-row items-center justify-center gap-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-0 py-32 min-h-screen">
        {/* Left Box */}
        <div
          ref={boxleft}
          className="flex-shrink-0 flex-grow-0 max-w-[320px] w-full sm:w-4/5 md:w-3/5 lg:w-1/3 h-auto min-h-[15rem] mt-40 no-motion-path flex items-center justify-center border border-white rounded-xl shadow-lg backdrop-blur-md p-6"
          style={{ willChange: "transform" }}
        >
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white">
            {developerImageSrc ? (
              <img
                src={developerImageSrc}
                alt="Developer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white font-semibold text-lg select-none">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Right Box */}
        <div
          ref={boxright}
          className=" mt-25 w-full sm:w-11/12 md:w-3/4 lg:w-2/5 max-w-lg min-h-[15rem] border border-white/30 rounded-2xl shadow-2xl backdrop-blur-lg p-6 md:p-8 flex flex-col gap-6 bg-white/5"
        >
          <h1
            className="text-white text-3xl md:text-5xl font-extrabold tracking-wide select-none"
            style={{ fontFamily: "Papyrus, fantasy" }}
          >
            About Me
          </h1>
          <p
            className="text-white text-base md:text-lg leading-relaxed font-medium"
            style={{ fontFamily: "Papyrus, fantasy" }}
          >
           
 Hi, I’m Akirem Samuel, a passionate front-end developer skilled in React, Angular, GSAP, and Node.js. I specialize in building responsive, interactive web apps that focus on clean design and smooth user experience.

With a background in mechatronics engineering, I bring a unique mix of technical precision and creative problem-solving to every project. My goal is to create fast, functional, and visually engaging websites that make an impact.</p>
        </div>
      </div>

      {/* SVG Path for Motion Animation */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-visible z-10"
        aria-hidden="true"
      >
        <svg
          width="750"
          height="500"
          className="absolute"
          style={{ top: "490px", left: "270px", overflow: "visible" }}
          aria-hidden="true"
        >
          <g transform="rotate(15)">
            <path
              id="arcPath"
              d="M0,0 Q250,-100 600,300"
              fill="none"
              stroke="transparent"
              strokeWidth="3"
            />
          </g>
        </svg>
      </div>

      {/* Other Sections */}
      <div id="skill">
        <Skill />
      </div>
      <div id="projects">
        <Project />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default Hero;

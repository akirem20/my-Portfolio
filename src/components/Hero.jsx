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

  // Delay GSAP init slightly to ensure SVG is ready in DOM (fixes Netlify bug)
  const init = () => {
    const fadeIn = gsap.timeline();

    fadeIn.fromTo(
      [boxleft.current, boxright.current],
      { opacity: 0, y: -100, rotation: 0 },
      { opacity: 1, y: 0, rotation: 0, duration: 2, ease: "power2.out" }
    );

    // Motion path for large screens
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

  gsap.delayedCall(0.1, init); // short delay helps after deploy

  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf("*");
  };
}, []);


  return (
    <div>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0"
        src="/bgvd.mov"
        type="video/mov"
      ></video>

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        {/* Navbar */}
        <nav className=" absolute top-[2cm] left-1/2 transform -translate-x-1/2 gap-3 w-[85%] flex items-center justify-between px-7 py-4 z-20 backdrop-blur-md border border-white rounded-xl shadow-lg">
          <div
            style={{ fontFamily: "Papyrus, fantasy" }}
            className="text-white font-bold text-xl"
          >
            My Portfolio
          </div>
          <ul className="mr-[30%] flex space-x-8 gap-6">
            {["home", "skill", "projects", "contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  style={{ fontFamily: "Papyrus, fantasy" }}
                  className="text-white hover:text-black transition-colors"
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Animated Content Boxes */}
        <div className="absolute top-1/2 left-0 w-full px-6 sm:px-12 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-8 -translate-y-1/2 z-10 max-w-[1200px] mx-auto">
          {/* Box Left */}
          <div
            ref={boxleft}
            className="mt-40 no-motion-path w-full sm:w-4/5 md:w-3/5 lg:w-1/3 max-w-sm h-auto min-h-[15rem] flex items-center justify-center border border-white rounded-xl shadow-lg backdrop-blur-md z-20 p-6"
            style={{ willChange: "transform",
             flexShrink: 0,             // prevent resizing
            flexGrow: 0,
             }}
          >
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white">
              <img
                src=""
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Box Right */}
          <div
            ref={boxright}
            className="w-full sm:w-11/12 md:w-3/4 lg:w-2/5 max-w-lg min-h-[15rem] border border-white/30 rounded-2xl shadow-2xl backdrop-blur-lg p-6 md:p-8 flex flex-col gap-4 bg-white/5 z-10"
          >
            <h1
              className="text-white text-3xl md:text-5xl font-extrabold tracking-wide"
              style={{ fontFamily: "Papyrus, fantasy" }}
            >
              About Me
            </h1>
            <p
              className="text-white text-base md:text-lg leading-relaxed font-medium"
              style={{ fontFamily: "Papyrus, fantasy" }}
            >
              I'm a Front-End Developer skilled in React, JavaScript, and Tailwind
              CSS. I craft sleek, responsive, and user-friendly web applications with
              clean code and smooth animations. Passionate about transforming ideas
              into immersive digital experiences that captivate users and deliver
              real-world results.
            </p>
          </div>
        </div>

        {/* SVG Path for Motion Animation */}
       <svg
  width="750"
  height="500"
  style={{
    position: "absolute",
    top: "490px",
    left: "270px",
    overflow: "visible",
    zIndex: 1,
  }}
>
  <g transform="rotate(15)">
    <path
      id="arcPath"
      d="M1,1 Q400,-200 1000,400"
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

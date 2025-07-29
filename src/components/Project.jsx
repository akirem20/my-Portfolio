import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Project() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000', // Adjust as needed
        scrub: true,
        pin: true,
        
      }
    });

    imagesRef.current.forEach((img, index) => {
      tl.fromTo(
        img,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        index * 1
      ).set(img, { zIndex: index + 1 }, index * 1 + 0.01); // Slight offset to ensure it happens after fade-in
    });
  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <div ref={containerRef} 
    style={{
      backgroundImage: 'url(bgimg1.jpg)',
      backgroundSize: 'cover',
       zIndex: 1, // add this
    
    }}
    className="relative min-h-[100vh] bg-black text-white p-5">
      <h1 style={{ fontFamily: 'Papyrus, fantasy' }} className="mt-10 mb-10 text-4xl font-bold text-center">
        My Projects
      </h1>

      {/* Stacked Project Images */}
      <div className="relative w-full h-[600px] flex justify-center items-center overflow-hidden">
        {[
          { src: 'project1.png', alt: 'Flat Render Project' },
          { src: 'project2.png', alt: 'Mojito Project' },
          { src: 'project3.png', alt: 'Flatease Project' },
          { src: 'project4.png', alt: 'Movie Project' },
        ].map((project, index) => (
          <img
            key={index}
            ref={el => (imagesRef.current[index] = el)}
            src={project.src}
            alt={project.alt}
            className="absolute h-[87%] w-[95%] rounded-xl shadow-xl"
            style={{ zIndex: 10 - index }}
          />
        ))}
      </div>
    </div>
  );
}

export default Project;

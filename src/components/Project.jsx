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
          // Make pin duration shorter on small screens
          end: window.innerWidth < 768 ? '+=1500' : '+=3000',
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
        ).set(img, { zIndex: index + 1 }, index * 1 + 0.01);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: 'url(/bgimg1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
      }}
      className="relative min-h-screen bg-black text-white p-5 sm:p-10"
    >
      <h1
        style={{ fontFamily: 'Papyrus, fantasy' }}
        className=" mr-50 mb-5 text-center text-3xl sm:text-4xl font-bold px-4 sm:px-0 max-w-4xl mx-auto"
      >
        My Projects
      </h1>

      {/* Stacked Project Images */}
      <div
        className="relative w-full max-w-5xl mx-auto flex justify-center items-center overflow-hidden"
        // Use responsive height: smaller on mobile, bigger on desktop
        style={{
          height: window.innerWidth < 640 ? '350px' : window.innerWidth < 1024 ? '500px' : '600px',
        }}
      >
        {[
          { src: '/project1.png', alt: 'Flat Render Project' },
          { src: '/project2.png', alt: 'Mojito Project' },
          { src: '/project3.png', alt: 'Flatease Project' },
          { src: '/project4.png', alt: 'Movie Project' },
        ].map((project, index) => (
          <img
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            src={project.src}
            alt={project.alt}
            className="absolute rounded-xl shadow-xl"
            // Responsive sizing for images
            style={{
              height: window.innerWidth < 640 ? '80%' : '87%',
              width: window.innerWidth < 640 ? '90%' : '95%',
              zIndex: 10 - index,
              maxWidth: '100%',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Project;

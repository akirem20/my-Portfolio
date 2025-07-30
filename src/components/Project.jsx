import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Mojito App',
    description: 'Recipe and drink UI with Firebase backend.',
    tech: 'React, Firebase',
    src: '/project1.png',
    live: 'https://cocktail-app-g21u.vercel.app',
    github: 'https://github.com/akirem20/cocktail-app/tree/main/Coktail-app'
  },
  {
    title: 'Anime App',
    description: 'Browse, search, and favorite Anime with real-time data.',
    tech: 'React, HTML/CSS, JavaScript, Anime API',
    src: '/project4.png',
    live: '#',
    github: 'https://github.com/akirem20/anime-movie-project'
  },

  {
    title: 'FlatEase',
    description: 'Rental listing platform with filters and favorites.',
    tech: 'React, Firebase, Tailwind',
    src: '/project3.png',
    live: ' https://kanban-op.web.app/',
    github: 'https://github.com/renansouz/kanban-ng'
  },
  {
    title: 'Movie App',
    description: 'Browse, search, and favorite movies with real-time data.',
    tech: 'React, OMDb API',
    src: '/project2.png',
    live: '#',
    github: 'https://github.com/akirem20/Movie-website'
  }
];

function Project() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: window.innerWidth < 768 ? '+=1500' : '+=3000',
          scrub: true,
          pin: true,
        }
      });

      cardsRef.current.forEach((card, index) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          index * 1
        ).set(card, { zIndex: index + 1 }, index * 1 + 0.01);
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
        className="mb-10 text-center text-3xl sm:text-4xl font-bold px-4 sm:px-0 max-w-4xl mx-auto"
      >
        My Projects
      </h1>

      <div style={{ fontFamily: "Papyrus, fantasy" }} className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white text-black rounded-xl overflow-hidden shadow-xl transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={project.src}
              alt={project.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-sm mb-2 text-gray-700">{project.description}</p>
              <p className="text-xs text-gray-500 italic mb-4">Tech: {project.tech}</p>
              <div className="flex gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Live
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;

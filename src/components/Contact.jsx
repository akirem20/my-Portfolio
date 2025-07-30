import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const form = useRef();
  const containerRef = useRef(null);
  const imagesLRef = useRef(null);
  const imagesRRef = useRef(null);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_8xxmbkv',
        'template_wwtivh8',
        form.current,
        're76-GwB54Oie_pCj'
      )
      .then(() => {
        setSent(true);
        e.target.reset();
        setTimeout(() => setSent(false), 4000);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('❌ Failed to send message. Please try again.');
      });
  };

  useEffect(() => {
    if (!containerRef.current || !imagesLRef.current || !imagesRRef.current) return;

    gsap.fromTo(
      imagesLRef.current,
      { opacity: 0, y: -100, rotate: 0 },
      {
        opacity: 1,
        y: 0,
        rotate: 40,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imagesLRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      imagesRRef.current,
      { opacity: 0, y: -100, rotate: 0 },
      {
        opacity: 1,
        y: 0,
        rotate: -40,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imagesRRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -100 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(/bgimg2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 0,
      }}
      className="text-white px-4 py-10"
    >
      <h1
        className=" mr-150 text-4xl font-bold text-center mb-10 select-none relative z-20"
        style={{ fontFamily: 'Papyrus, fantasy' }}
      >
        Contact Me
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto relative z-20">
        {/* Left Images */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <img
            className="w-48 h-80 object-cover rounded-lg shadow-lg"
            src="/robotleft.jpg"
            alt="Left Robot"
          />
          <img
            ref={imagesLRef}
            className="w-60 h-20 object-cover rounded-lg shadow-lg"
            src="/ailefthand.jpg"
            alt="Left Hand"
          />
        </div>

        {/* Form Section */}
        <div
          ref={containerRef}
          style={{ fontFamily: 'Papyrus, fantasy' }}
          className="flex-1 max-w-xl w-full text-center space-y-6 bg-white bg-opacity-90 text-black p-6 rounded-2xl shadow-lg"
        >
          <p className="text-lg leading-relaxed px-4 lg:px-0">
            I’m currently open to <strong>job opportunities</strong> and <strong>freelance projects</strong>.<br />
            Feel free to reach out for <strong>collaborations</strong> or <strong>work inquiries</strong>!
          </p>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-5 text-left"
          >
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Send Message
            </button>

            {sent && (
              <p className="text-green-600 mt-3 text-sm text-center">
                ✅ Message sent successfully!
              </p>
            )}
          </form>
        </div>

        {/* Right Images */}
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <img
            className="w-48 h-80 object-cover rounded-lg shadow-lg"
            src="/robotright.jpg"
            alt="Right Robot"
          />
          <img
            ref={imagesRRef}
            className="w-60 h-20 object-cover rounded-lg shadow-lg"
            src="/airighthand.jpg"
            alt="Right Hand"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;

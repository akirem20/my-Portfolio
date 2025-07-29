import React, { useEffect ,useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_8xxmbkv',       // e.g., service_dfet9cq
        'template_wwtivh8',      // e.g., template_xxxxxxx
        form.current,
        're76-GwB54Oie_pCj'        // e.g., ZzYyXx123456
      )
      .then(() => {
        alert('✅ Message sent successfully!');
        e.target.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('❌ Failed to send message. Please try again.');
      });
  };

  const containerRef = useRef(null);
  const imagesLRef = useRef(null); 
  const imagesRRef = useRef(null);
 useEffect(() => {
   gsap.fromTo(
     imagesLRef.current,
     { opacity: 0, y: -100 ,rotate:0},
    {opacity: 1, y: 0, rotate: 40,  ease: 'power2.out',
     scrollTrigger: {
      trigger: imagesLRef.current,
      start: 'top bottom',    
      end: 'bottom top', 
      scrub: true,
     }});

      gsap.fromTo(
     imagesRRef.current,
     { opacity: 0, y: -100 ,rotate:0},
    {opacity: 1, y: 0, rotate: -40,  ease: 'power2.out',
     scrollTrigger: {
      trigger: imagesRRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
     }});

     gsap.fromTo(
  containerRef.current,
  { opacity: 0, y: -100 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);

    }, []);

  return (
  <div 
  style={{
      backgroundImage: 'url(bgimg2.jpg)',
      backgroundSize: 'cover'
    }}
  className="bg-black min-h-screen text-white px-4 py-10">
    {/* Title Centered */}
    <h1
      className="text-4xl font-bold text-center mb-10"
      style={{ fontFamily: 'Papyrus, fantasy' }}
    >
      Contact Me
    </h1>

    {/* Main Container */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* Left Images */}
<div className="flex flex-col items-center gap-4">
  <img
    className="w-48 h-84 object-cover rounded-lg"
    src="robotleft.jpg"
    alt="Left 1"
  />
  <img
    ref={imagesLRef}
    className="w-70 h-25 object-cover rounded-lg ml-16 sm:ml-20 md:ml-24 lg:ml-28 transition-all"
    src="ailefthand.jpg"
    alt="Left 2"
  />
</div>


      {/* Center Form Section */}
      <div
        ref={containerRef}
        style={{ fontFamily: 'Papyrus, fantasy' }}
        className="flex-1 max-w-xl text-center space-y-6"
      >
        <p className="text-lg leading-relaxed px-4 lg:px-0">
          I’m currently open to <strong>job opportunities</strong> and <strong>freelance projects</strong>.
          <br />
          Feel free to reach out for <strong>collaborations</strong> or <strong>work inquiries</strong>!
        </p>

        {/* Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-5 bg-white text-black p-6 rounded-2xl shadow-lg w-full border border-gray-200"
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
        </form>
      </div>

      {/* Right Images */}
<div className="flex flex-col items-center gap-4">
  <img
    className="w-48 h-84 object-cover rounded-lg"
    src="robotright.jpg"
    alt="Right 1"
  />
  <img
    ref={imagesRRef}
    className="w-70 h-25 object-cover rounded-lg mr-16 sm:mr-20 md:mr-24 lg:mr-28 transition-all"
    src="airighthand.jpg"
    alt="Right 2"
  />
</div>

    </div>
  </div>
);

}

export default Contact;


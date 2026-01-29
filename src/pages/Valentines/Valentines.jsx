import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Sun, Star, Moon, Camera } from 'lucide-react';
import Pic1 from '../../assets/pic-1.jpeg';
import Pic7 from '../../assets/pic-7.jpg';
import Pic9 from '../../assets/pic-9.jpg';
import Pic10 from '../../assets/pic-10.jpg';
import Pic11 from '../../assets/pic-11.jpg';
import Pic12 from '../../assets/pic-12.jpg';
import Pic13 from '../../assets/pic-13.jpg';
import Pic14 from '../../assets/pic-14.jpg';
import Pic15 from '../../assets/pic-15.jpg';
import Pic16 from '../../assets/pic-16.jpg';
import Pic17 from '../../assets/pic-17.jpeg';
import Pic18 from '../../assets/pic-18.jpg';
import Pic19 from '../../assets/pic-19.jpg';
import Pic20 from '../../assets/pic-20.jpg';
import Pic21 from '../../assets/pic-21.jpg';
import Pic22 from '../../assets/pic-22.jpg';
import Pic23 from '../../assets/pic-23.jpg';
import Pic24 from '../../assets/pic-24.jpg';
import Pic25 from '../../assets/pic-25.jpg';
import Pic26 from '../../assets/pic-26.jpg';
import Pic27 from '../../assets/pic-27.png';
import Pic28 from '../../assets/pic-28.png';
import Pic29 from '../../assets/pic-29.jpg';
import Pic30 from '../../assets/pic-30.jpg';
import Pic31 from '../../assets/pic-31.jpg';
import Pic32 from '../../assets/pic-32.jpg';
import Pic33 from '../../assets/pic-33.png';
import Pic34 from '../../assets/pic-34.jpg';
import Pic35 from '../../assets/pic-35.jpg';
import Pic36 from '../../assets/pic-36.jpg';
import Pic37 from '../../assets/pic-37.jpg';
import Pic38 from '../../assets/pic-38.jpg';
import Pic39 from '../../assets/pic-39.jpg';
import Pic40 from '../../assets/pic-40.jpg';
import Pic41 from '../../assets/pic-41.jpg';
import Pic42 from '../../assets/pic-42.jpg';
import Pic43 from '../../assets/pic-43.jpg';
import Pic44 from '../../assets/pic-44.jpg';
import Pic45 from '../../assets/pic-45.jpg';
import Pic46 from '../../assets/pic-47.jpg';

import { FaWineGlass } from 'react-icons/fa';

export default function ValentinesForMonica() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Smooth cursor trail effect */}
      <div
        className="fixed w-8 h-8 rounded-full bg-rose-400/20 pointer-events-none blur-xl z-50 transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />

      {/* Floating hearts background - optimized */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(25)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-400 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkle effects - optimized */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-amber-400 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 py-20">
        <div className="max-w-8xl w-full">
          <div className="text-center space-y-8 animate-fadeIn">
            <div className="inline-block">
              <Sparkles className="w-20 h-20 text-rose-500 mx-auto mb-6 animate-pulse-gentle" />
            </div>
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 animate-gradient leading-none mb-8">
              For Monica
            </h1>
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl text-rose-800 font-light tracking-wide">
                My Darling Wife, My Mami
              </p>
              <p className="text-4xl md:text-5xl text-pink-700 font-light tracking-wide flex items-center justify-center gap-4">
                <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
                My Sunshine
                <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-2xl text-rose-600 mt-8">
              <Heart className="w-8 h-8 fill-current animate-heartbeat-smooth" />
              <span className="text-3xl font-light flex gap-[10px]">
                A toast to the nine months I have spent with my highschool
                sweetheart
                <FaWineGlass />
              </span>
              <Heart
                className="w-8 h-8 fill-current animate-heartbeat-smooth"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
          </div>

          {/* Hero Image Grid */}
          <div
            className="mt-24 grid grid-cols-4 gap-6"
            data-animate
            id="hero-grid"
          >
            <div
              className={`col-span-2 row-span-1 transition-all duration-1000 ease-out ${
                isVisible['hero-grid']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img
                  src={Pic7}
                  alt="Description of photo"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <div
              className={`row-span-2 transition-all duration-1000 ease-out delay-100 ${
                isVisible['hero-grid']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative h-full rounded-3xl overflow-hidden shadow-xl border-6 border-white group">
                <img
                  src={Pic13}
                  alt="Description of photo"
                  className="h-full w-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible['hero-grid']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-6 border-white group">
                <img
                  src={Pic10}
                  alt="Description of photo"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {[Pic12, Pic14, Pic11].map((image, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ease-out ${
                  isVisible['hero-grid']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white group">
                  <img
                    src={image}
                    alt="Description of photo"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section 1: Before You */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid md:grid-cols-2 gap-16 items-center"
            data-animate
            id="story-1"
          >
            <div
              className={`space-y-8 transition-all duration-1000 ease-out ${
                isVisible['story-1']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="text-7xl font-bold text-rose-900 mb-8 leading-tight">
                Before You
              </h2>
              <div className="space-y-6">
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  Before you, my life had taught me more of endurance than joy.
                  I had to thrive, and strive toward the relentless pursuit of
                  my goals, even though I was breaking inside. Much as I never
                  smiled to many, I did it convincingly to those around me, and
                  no one could hear the ache beneath it. I was achieving that
                  which I yearned for, but I never gave myself the space to
                  enjoy it.
                </p>
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  I locked myself away in my ambition and "the grind", believing
                  that if I pushed myself hard enough, one day the pain of my
                  childhood would loosen its grip, that I might finally earn the
                  right to rest, to breathe, to simply be without fear.
                </p>
              </div>
            </div>

            <div
              className={`grid grid-cols-2 gap-6 transition-all duration-1000 ease-out delay-200 ${
                isVisible['story-1']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="space-y-6">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img
                    src={Pic1}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white group">
                  <img
                    src={Pic15}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white group">
                  <img
                    src={Pic16}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img
                    src={Pic17}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Moment We Met */}
      <section className="relative py-32 px-8 bg-gradient-to-br from-pink-100/60 to-rose-100/60">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-20" data-animate id="met-title">
            <h2
              className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-8 animate-gradient transition-all duration-1000 ease-out ${
                isVisible['met-title']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              Then I Met You
            </h2>
            <p className="text-4xl text-rose-800 font-light leading-relaxed">
              And everything shattered, beautifully
            </p>
          </div>

          <div
            className="grid grid-cols-5 gap-6 mb-12"
            data-animate
            id="met-grid"
          >
            {[
              { image: Pic18, id: 1 },
              { image: Pic19, id: 2 },
              { image: Pic20, id: 3 },
              { image: Pic21, id: 4 },
              { image: Pic22, id: 5 },
            ].map((i) => (
              <div
                key={i.id}
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white group transition-all duration-700 ease-out ${
                  isVisible['met-grid']
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${i.id * 100}ms` }}
              >
                <img
                  src={i.image}
                  alt="Description of photo"
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          <div
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-white mb-12"
            data-animate
            id="met-banner"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200" />
            <div
              className={`absolute inset-0 bg-gradient-to-r from-rose-400/30 via-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center transition-all duration-1000 ease-out ${
                isVisible['met-banner'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-center">
                <Sun className="w-28 h-28 text-white mb-8 mx-auto animate-spin-slow" />
                <p className="text-white text-5xl font-bold">
                  You shone bright like a diamond, and lit a new spark in me.
                </p>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-5 gap-6 mb-12"
            data-animate
            id="met-grid-2"
          >
            {[
              { image: Pic23, id: 1 },
              { image: Pic25, id: 2 },
              { image: Pic26, id: 3 },
              { image: Pic27, id: 4 },
              { image: Pic28, id: 5 },
            ].map((i) => (
              <div
                key={i.id}
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white group transition-all duration-700 ease-out ${
                  isVisible['met-grid-2']
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${i.id * 100}ms` }}
              >
                <img
                  src={i.image}
                  alt="Description of photo"
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Beauty Section */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid md:grid-cols-2 gap-16 items-center"
            data-animate
            id="beauty"
          >
            <div
              className={`grid grid-cols-3 gap-4 transition-all duration-1000 ease-out ${
                isVisible['beauty']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img
                    src={Pic24}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic29}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic35}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic33}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img
                    src={Pic34}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic36}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="space-y-4 mt-16">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic32}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white group">
                  <img
                    src={Pic31}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                  <img
                    src={Pic30}
                    alt="Description of photo"
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            <div
              className={`space-y-8 transition-all duration-1000 ease-out delay-200 ${
                isVisible['beauty']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="text-7xl font-bold text-rose-900 mb-8 leading-tight">
                You Are Stunning
              </h2>
              <div className="space-y-6">
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  It was impossible to ignore you, especially with how often our
                  eyes seemed to make contact 😂.
                  <br />
                  <br /> I noticed you from the moment you walked into the
                  school. Your beauty was impossible to ignore, your presence
                  was quietly magnetic. And every day I thank God that I fell in
                  love before leaving Uganda for the US. I thank God that my
                  heart found its forever home before distance ever tried to
                  test it.
                </p>
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  Your beauty may catch the eye, but it's your heart that
                  captivates mine. Every day. In every way. Quietly, completely,
                  and forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Other Half */}
      <section className="relative py-32 px-8 bg-gradient-to-br from-rose-100/60 to-pink-100/60">
        <div
          className="max-w-8xl mx-auto text-center"
          data-animate
          id="other-half"
        >
          <h2
            className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-16 animate-gradient transition-all duration-1000 ease-out ${
              isVisible['other-half']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            You Are My Other Half
          </h2>

          <div
            className={`relative aspect-[16/7] rounded-3xl overflow-hidden shadow-2xl border-8 border-white mb-16 transition-all duration-1000 ease-out delay-200 ${
              isVisible['other-half']
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-6xl font-bold mb-4">
                  The Water That Fills My Cup
                </p>
                <p className="text-white text-3xl">
                  When it runs dry (Leave these ones, you know what I mean Mémé
                  😂)
                </p>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-8 mb-12"
            data-animate
            id="moments"
          >
            {[
              { image: Pic38, id: 3 },
              { image: Pic39, id: 1 },
              { image: Pic40, id: 2 },
              { image: Pic41, id: 4 },
              { image: Pic43, id: 5 },
              { image: Pic44, id: 6 },
            ].map((i) => (
              <div
                key={i.id}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white group transition-all duration-700 ease-out ${
                  isVisible['moments']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i.id * 100}ms` }}
              >
                <img
                  src={i.image}
                  alt="Description of photo"
                  className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pepe & Meme Section */}
      <section className="relative py-32 px-8 bg-gradient-to-br from-rose-100/60 to-amber-100/60">
        <div
          className="max-w-8xl mx-auto text-center"
          data-animate
          id="pepe-meme"
        >
          <h2
            className={`text-9xl md:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-12 animate-gradient leading-none transition-all duration-1000 ease-out ${
              isVisible['pepe-meme']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            Pepe & Meme
          </h2>
          <p className="text-5xl text-rose-800 font-light mb-20">
            I cannot wait to spend the rest of my life with you boo boo!!
          </p>

          <div
            className={`grid md:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ease-out delay-200 ${
              isVisible['pepe-meme']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              <img
                src={Pic45}
                alt="Description of photo"
                className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              <img
                src={Pic46}
                alt="Description of photo"
                className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div
            className="grid grid-cols-6 gap-6"
            data-animate
            id="special-moments"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white group transition-all duration-700 ease-out ${
                  isVisible['special-moments']
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center transition-opacity duration-700 group-hover:opacity-0">
                  <Heart className="w-20 h-20 text-white fill-current" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Declaration */}
      <section className="relative py-40 px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-8xl mx-auto text-center" data-animate id="final">
          <div
            className={`space-y-16 transition-all duration-1000 ease-out ${
              isVisible['final']
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-[10rem] md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 animate-gradient leading-none">
              I Love You
            </h2>

            <div className="space-y-8 text-rose-800">
              <p className="text-5xl font-light">More than words</p>
              <p className="text-5xl font-light">More than time</p>
              <p className="text-5xl font-light">More than distance</p>
              <p className="text-6xl font-semibold">More than anything</p>
            </div>

            <div
              className={`mt-20 transition-all duration-1000 ease-out delay-500 ${
                isVisible['final']
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }`}
            >
              <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center px-8">
                    <Heart className="w-40 h-40 text-white fill-current mx-auto mb-12 animate-heartbeat-smooth" />
                    <p className="text-white text-5xl font-bold mb-6">
                      Forever Yours
                    </p>
                    <p className="text-white text-3xl">Joshua Mukisa</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-20 space-y-6 transition-all duration-1000 ease-out delay-1000 ${
                isVisible['final'] ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-3xl text-rose-700">
                Your husband, your boyfriend, your father, your son,
              </p>
              <p className="text-3xl text-rose-700">
                your protector, your biggest supporter,
              </p>
              <p className="text-3xl text-rose-700">
                the father of your unborn children,
              </p>
              <p className="text-4xl font-semibold text-rose-900">
                the love of your life, your DADDY
              </p>
            </div>

            <div className="mt-24 flex justify-center gap-6">
              <Heart className="w-12 h-12 text-rose-500 fill-current animate-heartbeat-smooth" />
              <Heart
                className="w-12 h-12 text-pink-500 fill-current animate-heartbeat-smooth"
                style={{ animationDelay: '0.2s' }}
              />
              <Heart
                className="w-12 h-12 text-rose-600 fill-current animate-heartbeat-smooth"
                style={{ animationDelay: '0.4s' }}
              />
            </div>

            <div
              className={`grid grid-cols-5 gap-6 mt-24 transition-all duration-1000 ease-out delay-1500 ${
                isVisible['final']
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-white group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 backdrop-blur-sm transition-opacity duration-700 group-hover:opacity-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-16 h-16 text-white/50 fill-current" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:wght@300;400;600&display=swap');

        * {
          font-family: 'Cormorant Garamond', serif;
        }

        h1,
        h2,
        h3 {
          font-family: 'Playfair Display', serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heartbeat-smooth {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.12);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.08);
          }
          56% {
            transform: scale(1);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-heartbeat-smooth {
          animation: heartbeat-smooth 2.5s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        /* Hardware acceleration for smoother animations */
        .group img,
        .group-hover\\:scale-110,
        .group-hover\\:scale-105,
        .transition-transform,
        .transition-all {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

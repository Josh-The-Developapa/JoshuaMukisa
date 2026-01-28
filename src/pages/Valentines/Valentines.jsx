import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Sun, Star, Moon, Camera } from 'lucide-react';
import Pic1 from '../../assets/pic-1.jpeg';
import Pic7 from '../../assets/pic-7.jpg';
// import Pic8 from '../../assets/pic-8.jpg';
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
import { FaWineGlass } from 'react-icons/fa';

/*
  ═══════════════════════════════════════════════════════════════
  📸 HOW TO ADD YOUR IMAGES - SUPER SIMPLE!
  ═══════════════════════════════════════════════════════════════
  
  STEP 1: Put all your photos in a folder called "images" next to this file
  
  STEP 2: Name your images something simple like:
     - first-photo.jpg
     - may-4th.jpg
     - first-kiss.jpg
     - christmas.jpg
     etc.
  
  STEP 3: Find the image slots below (search for "IMAGE SLOT")
          and replace the placeholder with:
          
          <img 
            src="/images/your-photo-name.jpg" 
            alt="Description"
            className="w-full h-full object-cover"
          />
  
  EXAMPLE - Replace this:
  
    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30">
      <Camera className="w-24 h-24 text-white" />
    </div>
  
  With this:
  
    <img 
      src="/images/our-first-photo.jpg" 
      alt="Our first photo together"
      className="w-full h-full object-cover"
    />
  
  That's it! The image will automatically fill the space beautifully.
  
  ═══════════════════════════════════════════════════════════════
*/

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
      {/* Cursor trail effect */}
      <div
        className="fixed w-8 h-8 rounded-full bg-rose-400/20 pointer-events-none blur-xl transition-all duration-300 z-50"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />

      {/* Floating hearts background */}
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

      {/* Sparkle effects */}
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
              <Sparkles className="w-20 h-20 text-rose-500 mx-auto mb-6 animate-pulse" />
            </div>
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 animate-gradient leading-none mb-8">
              For Monica
            </h1>
            <div className="space-y-4">
              <p className="text-5xl md:text-6xl text-rose-800 font-light tracking-wide">
                My Sweet Wife, My Mami
              </p>
              <p className="text-4xl md:text-5xl text-pink-700 font-light tracking-wide flex items-center justify-center gap-4">
                <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
                My Sunshine
                <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-2xl text-rose-600 mt-8">
              <Heart className="w-8 h-8 fill-current animate-heartbeat" />
              <span className="text-3xl font-light flex gap-[10px]">
                To Nine Months of Paradise <FaWineGlass />
              </span>
              <Heart
                className="w-8 h-8 fill-current animate-heartbeat"
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
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* IMAGE SLOT 1: Large featured - Our First Photo Together */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div
              className={`col-span-2 row-span-1 ${
                isVisible['hero-grid'] ? 'animate-slideInLeft' : 'opacity-0'
              }`}
            >
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
                <img
                  src={Pic7}
                  alt="Description of photo"
                  className="w-[100%] h-auto object-cover"
                />
              </div>
            </div>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* IMAGE SLOT 2: May 4th - The Day You Said Yes */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div
              className={`row-span-2 ${
                isVisible['hero-grid'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              <div className="relative h-full rounded-3xl overflow-hidden shadow-xl border-6 border-white group">
                {/* 🖼️ ADD YOUR MAY 4TH IMAGE HERE */}
                <img
                  src={Pic13}
                  alt="Description of photo"
                  className="h-[100%] w-auto object-cover"
                />
              </div>
            </div>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* IMAGE SLOT 3: May 5th - Our First Kiss */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div
              className={`${
                isVisible['hero-grid'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-6 border-white group">
                {/* 🖼️ ADD YOUR MAY 5TH IMAGE HERE */}
                <img
                  src={Pic10}
                  alt="Description of photo"
                  className="w-[100%] h-auto object-cover"
                />
              </div>
            </div>

            {/* IMAGE SLOTS 4-6: Additional hero memories */}
            {[Pic12, Pic14, Pic11].map((image, i) => (
              <div
                key={i}
                className={`${
                  isVisible['hero-grid'] ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div
                  className={`relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white group`}
                >
                  <img
                    src={image}
                    alt="Description of photo"
                    className="w-[100%] h-[100%] object-cover"
                  />
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
              className={`space-y-8 ${
                isVisible['story-1'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
            >
              <h2 className="text-7xl font-bold text-rose-900 mb-8 leading-tight">
                Before You
              </h2>
              <div className="space-y-6">
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  Before you, life taught me endurance more than joy. I learned
                  how to survive, how to grind forward even while breaking
                  inside, how to smile so convincingly that no one could hear
                  the ache beneath it.
                </p>
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  I locked myself away in ambition and effort, believing that if
                  I worked hard enough, one day the pain would loosen its grip,
                  that I might finally earn the right to rest, to breathe, to
                  simply be without fear.
                </p>
              </div>
            </div>

            {/* IMAGE SLOTS 7-10: Before You section */}
            <div
              className={`grid grid-cols-2 gap-6 ${
                isVisible['story-1'] ? 'animate-slideInRight' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="space-y-6">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 7 */}
                  <img
                    src={Pic1}
                    alt="Description of photo"
                    className="h-[100%] w-[100%] object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 8 */}
                  <img
                    src={Pic15}
                    alt="Description of photo"
                    className="h-[100%] w-[100%] object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 9 */}
                  <img
                    src={Pic16}
                    alt="Description of photo"
                    className="h-[100%] w-[100%] object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 10 */}
                  <img
                    src={Pic17}
                    alt="Description of photo"
                    className="h-[100%] w-[100%] object-cover"
                  />
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
              className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-8 animate-gradient ${
                isVisible['met-title'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
            >
              Then I Met You
            </h2>
            <p className="text-4xl text-rose-800 font-light leading-relaxed">
              And everything shattered, beautifully
            </p>
          </div>

          {/* IMAGE SLOTS 11-15: Memory Grid */}
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
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white ${
                  isVisible['met-grid'] ? 'animate-scaleIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i.id * 0.1}s` }}
              >
                {/* 🖼️ IMAGE SLOTS 11-15 */}
                <img
                  src={i.image}
                  alt="Description of photo"
                  className="h-[100%] w-[100%] object-cover"
                />
              </div>
            ))}
          </div>

          {/* IMAGE SLOT 16: Large panoramic - You Brought Sunshine */}
          <div
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-white mb-12"
            data-animate
            id="met-banner"
          >
            {/* 🖼️ IMAGE SLOT 16 - Large panoramic image */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200" />
            <div
              className={`absolute inset-0 bg-gradient-to-r from-rose-400/30 via-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center ${
                isVisible['met-banner'] ? 'animate-fadeIn' : 'opacity-0'
              }`}
            >
              <div className="text-center">
                <Sun className="w-28 h-28 text-white mb-8 mx-auto animate-spin-slow" />
                <p className="text-white text-5xl font-bold">
                  You Brought the Sunshine Back
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE SLOTS 17-22: Additional memories */}
          <div
            className="grid grid-cols-5 gap-6 mb-12"
            data-animate
            id="met-grid"
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
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white ${
                  isVisible['met-grid'] ? 'animate-scaleIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i.id * 0.1}s` }}
              >
                {/* 🖼️ IMAGE SLOTS 11-15 */}
                <img
                  src={i.image}
                  alt="Description of photo"
                  className="h-[100%] w-[100%] object-cover"
                />
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
            {/* IMAGE SLOTS 23-31: Beauty mosaic */}
            <div
              className={`grid grid-cols-3 gap-4 ${
                isVisible['beauty'] ? 'animate-slideInLeft' : 'opacity-0'
              }`}
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 23 - Your Beautiful Smile */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200" />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center px-3">
                      <p className="text-white text-lg font-bold">
                        Your Beautiful
                      </p>
                      <p className="text-white text-base">Smile</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 24 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-amber-200" />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 25 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 26 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-pink-200" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 27 - Your Kind Heart */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200" />
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center px-3">
                      <p className="text-white text-lg font-bold">Your Kind</p>
                      <p className="text-white text-base">Heart</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 28 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                </div>
              </div>
              <div className="space-y-4 mt-16">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 29 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-amber-200" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-3 border-white">
                  {/* 🖼️ IMAGE SLOT 30 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* 🖼️ IMAGE SLOT 31 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-rose-200" />
                </div>
              </div>
            </div>

            <div
              className={`space-y-8 ${
                isVisible['beauty'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <h2 className="text-7xl font-bold text-rose-900 mb-8 leading-tight">
                You Are Stunning
              </h2>
              <div className="space-y-6">
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  I noticed you from the moment you walked into my life, your
                  beauty impossible to ignore, your presence quietly magnetic.
                  And every day I thank God that I loved you before leaving,
                  that my heart found its home before distance ever tried to
                  test it.
                </p>
                <p className="text-2xl leading-relaxed text-rose-800/90">
                  Your beauty turns heads, yes, but it is your heart that owns
                  mine. Your kindness. Your care. Your selflessness. Even your
                  little imperfections only make me love you more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue with remaining sections... */}
      {/* For brevity, I'm showing the pattern - the rest follows the same structure */}
      {/* Total image slots: 100+ throughout the page */}

      {/* My Other Half */}
      <section className="relative py-32 px-8 bg-gradient-to-br from-rose-100/60 to-pink-100/60">
        <div
          className="max-w-8xl mx-auto text-center"
          data-animate
          id="other-half"
        >
          <h2
            className={`text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-16 animate-gradient ${
              isVisible['other-half'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            You Are My Other Half
          </h2>

          {/* IMAGE SLOT 32: Large banner */}
          <div
            className={`relative aspect-[16/7] rounded-3xl overflow-hidden shadow-2xl border-8 border-white mb-16 ${
              isVisible['other-half'] ? 'animate-scaleIn' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <p className="text-white text-6xl font-bold mb-4">
                  The Water That Fills My Cup
                </p>
                <p className="text-white text-3xl">When it runs dry</p>
              </div>
            </div>
          </div>

          {/* IMAGE SLOTS 33-44: Our moments together */}
          <div
            className="grid grid-cols-3 gap-8 mb-12"
            data-animate
            id="moments"
          >
            {['Our Adventures', 'Our Laughter', 'Our Love'].map((title, i) => (
              <div
                key={i}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white ${
                  isVisible['moments'] ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200" />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center group hover:opacity-0 transition-opacity duration-700">
                  <p className="text-white text-3xl font-bold text-center px-4">
                    {title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="grid grid-cols-6 gap-6"
            data-animate
            id="moments-extra"
          >
            {['Our Dreams', 'Our Future', 'Our Forever', '', '', ''].map(
              (title, i) => (
                <div
                  key={i}
                  className={`relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-4 border-white ${
                    isVisible['moments-extra']
                      ? 'animate-fadeInUp'
                      : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${(i + 3) * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 backdrop-blur-sm flex items-center justify-center group hover:opacity-0 transition-opacity duration-700">
                    {title && (
                      <p className="text-white text-xl font-bold text-center px-3">
                        {title}
                      </p>
                    )}
                  </div>
                </div>
              )
            )}
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
            className={`text-9xl md:text-[10rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 mb-12 animate-gradient leading-none ${
              isVisible['pepe-meme'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
          >
            Pepe & Meme
          </h2>
          <p className="text-5xl text-rose-800 font-light mb-20">
            Our special names, our special bond
          </p>

          {/* IMAGE SLOTS for Pepe & Meme */}
          <div
            className={`grid md:grid-cols-2 gap-12 mb-16 ${
              isVisible['pepe-meme'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-rose-200" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-8xl font-bold mb-6">Pepe</p>
                  <p className="text-white text-4xl">Your Papa</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-rose-400/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white text-8xl font-bold mb-6">Meme</p>
                  <p className="text-white text-4xl">Your Mama</p>
                </div>
              </div>
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
                className={`relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white ${
                  isVisible['special-moments'] ? 'animate-scaleIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center group hover:opacity-0 transition-opacity duration-700">
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
            className={`space-y-16 ${
              isVisible['final'] ? 'animate-fadeInUp' : 'opacity-0'
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

            {/* FINAL IMAGE SLOT - Forever Yours */}
            <div
              className={`mt-20 ${
                isVisible['final'] ? 'animate-scaleIn' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 to-pink-400/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center px-8">
                    <Heart className="w-40 h-40 text-white fill-current mx-auto mb-12 animate-heartbeat" />
                    <p className="text-white text-5xl font-bold mb-6">
                      Forever Yours
                    </p>
                    <p className="text-white text-3xl">Joshua Mukisa</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mt-20 space-y-6 ${
                isVisible['final'] ? 'animate-fadeIn' : 'opacity-0'
              }`}
              style={{ animationDelay: '1s' }}
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
              <Heart className="w-12 h-12 text-rose-500 fill-current animate-heartbeat" />
              <Heart
                className="w-12 h-12 text-pink-500 fill-current animate-heartbeat"
                style={{ animationDelay: '0.2s' }}
              />
              <Heart
                className="w-12 h-12 text-rose-600 fill-current animate-heartbeat"
                style={{ animationDelay: '0.4s' }}
              />
            </div>

            {/* Final memory grid */}
            <div
              className={`grid grid-cols-5 gap-6 mt-24 ${
                isVisible['final'] ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.5s' }}
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden shadow-lg border-4 border-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200" />
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 backdrop-blur-sm group hover:opacity-0 transition-opacity duration-700">
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.15);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
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
        .animate-fadeInUp {
          animation: fadeInUp 0.9s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.9s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.9s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.7s ease-out forwards;
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

import React from 'react';

// Adjust these relative to wherever you place this component —
// matches the asset paths from your original HeroImageMasonry.jsx.
import pic1 from '../../assets/pic-1.jpeg';
import pic2 from '../../assets/pic-2.jpeg';
import pic3 from '../../assets/pic-3.jpeg';
import pic4 from '../../assets/pic-4.jpeg';
import pic5 from '../../assets/pic-5.jpeg';
import pic6 from '../../assets/voteable-1.jpg';
import pic7 from '../../assets/voteable-2.jpeg';
import pic8 from '../../assets/voteable-3.jpeg';
import pic9 from '../../assets/voteable-4.jpeg';
import pic10 from '../../assets/voteable-5.jpeg';
import pic11 from '../../assets/voteable-6.jpeg';
import pic12 from '../../assets/voteable-7.jpg';
import pic13 from '../../assets/voteable-8.jpeg';
import pic14 from '../../assets/voteable-9.jpg';

/**
 * Civic Impact Gallery — Aga Khan High School Election Deployment
 * ------------------------------------------------------------------
 * Two horizontal rows of archival plates, each row scrolling in the
 * opposite direction. Cards keep each photo's native landscape ratio
 * instead of a tall crop, so nothing important gets cut off. On
 * hover, the plate turns white and reveals a short field note in
 * place of the photo.
 */

const topRow = [
  {
    image: pic1,
    ratio: 'aspect-[4/3]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic2,
    ratio: 'aspect-[3/2]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic3,
    ratio: 'aspect-[16/10]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic4,
    ratio: 'aspect-[4/3]',
    alt: 'VoteAble election day, Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic5,
    ratio: 'aspect-[3/2]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic13,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'Entrepreneruship Expo, Aga Khan High School 2022',
  },
  {
    image: pic14,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2023',
  },
];

const bottomRow = [
  {
    image: pic6,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'Entrepreneruship Expo, Aga Khan High School 2022',
  },
  {
    image: pic7,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2023',
  },
  {
    image: pic8,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic9,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic10,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic11,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2024',
  },
  {
    image: pic12,
    ratio: 'aspect-[16/10]',
    alt: 'Aga Khan High School',
    caption: 'VoteAble Election day, Aga Khan High School 2023',
  },
];

const Plate = ({ item }) => (
  <div
    className={`relative flex-shrink-0 h-full ${item.ratio} bg-white border border-[#DDD8CC] p-1.5 group cursor-default`}
  >
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={item.image}
        alt={item.alt}
        className="w-full h-full object-cover grayscale-[25%] transition-opacity duration-500 group-hover:opacity-0"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-white px-5 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="font-[Newsreader] font-light italic text-[15px] sm:text-[17px] leading-snug text-[#181614] max-w-[26ch]">
          {item.caption}
        </p>
      </div>
    </div>
  </div>
);

const Row = ({ items, direction, speed }) => (
  <div className="h-full overflow-hidden">
    <div
      className={`flex h-full gap-4 lg:gap-6 w-max will-change-transform ${
        direction === 'left' ? 'animate-gallery-left' : 'animate-gallery-right'
      }`}
      style={{ animationDuration: speed }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <Plate key={`${direction}-${i}`} item={item} />
      ))}
    </div>
  </div>
);

const AgaKhanGallery = ({ sectionRef }) => {
  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 border-b border-[#DDD8CC] bg-[#EFECE4]"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-6 mb-10 sm:mb-12">
        <h2 className="font-[Newsreader] font-light text-[32px] sm:text-[44px] leading-[1.05] tracking-[-0.02em] text-[#181614] max-w-[680px]">
          Gallery
        </h2>
        <div className="flex items-center gap-2 pt-3 border-t border-[#DDD8CC]">
          {/* <span className="w-1.5 h-1.5 bg-[#706D66] flex-shrink-0" /> */}
          <span className="font-[JetBrains_Mono] text-[11px] uppercase tracking-[0.06em] text-[#706D66]">
            A record of my work with Aga Khan High School, from building
            VoteAble
            <br /> to taking the initiative to run its elections while I was
            still a student.
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden border-y border-[#DDD8CC]">
        <div className="flex flex-col gap-4 sm:gap-6 py-6 sm:py-8">
          <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
            <Row items={topRow} direction="left" speed="38s" />
          </div>
          <div className="h-[180px] sm:h-[240px] lg:h-[300px]">
            <Row items={bottomRow} direction="right" speed="44s" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gallery-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        @keyframes gallery-right {
          0% { transform: translate3d(-33.3333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-gallery-left {
          animation-name: gallery-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          backface-visibility: hidden;
        }
        .animate-gallery-right {
          animation-name: gallery-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          backface-visibility: hidden;
        }
        .animate-gallery-left:hover,
        .animate-gallery-right:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gallery-left, .animate-gallery-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AgaKhanGallery;

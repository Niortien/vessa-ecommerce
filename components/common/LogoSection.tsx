'use client';

import { useEffect, useRef } from 'react';

type LogoItem = {
  name: string;
  logo: JSX.Element;
};

const logos: LogoItem[] = [
  {
    name: 'Acme Corp',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="currentColor"
          d="M7.5 6.75a2.25 2.25 0 100-4.5..."
        />
      </svg>
    ),
  },
  {
    name: 'Biosynthesis',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 8" className="w-full h-full">
        <path
          fill="currentColor"
          d="M0 0h24L18 8H6L0 0z M0 8h24L18 0H6L0 8z"
        />
      </svg>
    ),
  },
  {
    name: 'Logoipsum',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Nietzsche',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="currentColor"
          d="M2 4h2v16H2V4zm4 0h2v16H6V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4zm4 0h2v16h-2V4z"
        />
      </svg>
    ),
  },
  {
    name: 'Epicurious',
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          fill="currentColor"
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 6a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>
    ),
  },
];

const duplicatedLogos = [...logos, ...logos]; // To create a looping effect

const LogoSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const totalDuration = 20000; // ms
    const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % totalDuration) / totalDuration;
      const position = progress * totalWidth;

      scrollContainer.scrollLeft = position;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="w-full reative bg-[#f5f2ef] py-8 overflow-hidden  mx-14">
      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-16 min-w-max">
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="flex items-center text-black justify-center">
                <div className="w-36 h-12 text-black">
                  {logo.logo}
                  <span className="sr-only text-black">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;

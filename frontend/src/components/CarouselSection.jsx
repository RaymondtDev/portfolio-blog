import React, { useRef, useState, useEffect } from "react";

function CarouselSection({ sectionName, children, id="", additionalClasses="" }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const items = React.Children.toArray(children);

  // Calculate the number of visible items (3 at a time)
  const visibleCount = 3;

  // Scroll to item when dot is clicked
  const scrollToItem = (idx) => {
    if (carouselRef.current) {
      const child = carouselRef.current.children[idx];
      if (child) {
        child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }
    }
  };

  // Update active dot based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollLeft = carouselRef.current.scrollLeft;
        const itemWidth = carouselRef.current.children[0]?.offsetWidth || 1;
        const idx = Math.round(scrollLeft / (itemWidth + 16)); // 16px = 1rem margin
        setActiveIndex(idx);
      }
    };
    const node = carouselRef.current;
    node?.addEventListener("scroll", handleScroll, { passive: true });
    return () => node?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={`overflow-x-hidden full-width-content grid grid-cols-subgrid ${additionalClasses}`}>
      <h2 id={id} className="text-center text-[var(--text-color)]">{sectionName}</h2>
      <div className="flex overflow-x-auto snap-mandatory carousel hide-scrollbar" ref={carouselRef}>
        {items}
      </div>
      <div className="flex justify-center carousel-dots">
        {items.map((_, idx) => (
          <span
            key={idx}
            className={idx >= activeIndex && idx < activeIndex + visibleCount ? "active" : ""}
            onClick={() => scrollToItem(idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default CarouselSection;
import { useState, useEffect } from "react";

function ParallaxHero({ children, classname = "", image}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <div
      className={`${classname} full-width-content h-[50vh] sm:h-[80vh] relative -z-50`}
      style={{ 
        backgroundImage: `url(${image})`,
        backgroundSize: window.innerWidth > 640 ? "cover" : "auto 130%",
        backgroundPosition: `center -${offset * 0.2}px`,
        backgroundAttachment: window.innerWidth > 640 ? "scroll" : "initial",
        backgroundRepeat: "no-repeat",
        transition: "background-position 0.1s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxHero;
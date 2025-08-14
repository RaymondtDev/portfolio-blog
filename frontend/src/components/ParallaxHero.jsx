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
      className={`${classname} full-width-content h-[80vh] relative -z-50`}
      style={{ 
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: `center -${offset * 0.15}px`,
        backgroundAttachment: "scroll",
        backgroundRepeat: "no-repeat",
        transition: "background-position 0.1s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxHero;
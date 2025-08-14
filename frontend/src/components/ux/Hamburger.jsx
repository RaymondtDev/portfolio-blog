function Hamburger({ event, activeState }) {
  const handleClick = () => {
    event(state => !state);
  }

  return (
    <div className="w-[35px] aspect-square flex flex-col justify-evenly items-center relative cursor-pointer sm:hidden" onClick={handleClick}>
      <span className={`w-[80%] h-1 rounded bg-[var(--primary-color)] ${activeState && 'rotate-45'}`}></span>
      <span className={`w-[80%] h-1 rounded bg-[var(--primary-color)] ${activeState ? 'hidden' : 'block'}`}></span>
      <span className={`w-[80%] h-1 rounded bg-[var(--primary-color)] ${activeState && '-rotate-45 absolute'}`}></span>
    </div>
  );
}

export default Hamburger;
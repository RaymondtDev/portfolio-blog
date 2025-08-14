function Card({ children, additonalClasses = "", background }) {
  return (
    <div className={`w-[330px] aspect-square rounded-md relative bg-center bg-cover bg-no-repeat ${additonalClasses}`} style={{ backgroundImage: `url(${background})` }}>
      {children}
    </div>
  );
}

export default Card;
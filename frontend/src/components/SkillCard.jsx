function SkillCard({ icon,name, className="" }) {
  return (
    <div className={`flex items-center gap-1 h-fit ${className}`}>
      <span className="size-[40px]">
        <img src={icon} alt="skill-icon" />
      </span>
      <span>{name}</span>
    </div>
  );
}

export default SkillCard;
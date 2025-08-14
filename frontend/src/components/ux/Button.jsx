import { Link } from "react-router-dom"

function Button({ children, className="", link="", event, target }) {
  return (
    <Link to={link} target={target} className={`${className} px-2.5 py-1.5 rounded-md hover:scale-[102.5%] transition`} onClick={event}>
      {children}
    </Link>
  );
}

export default Button;
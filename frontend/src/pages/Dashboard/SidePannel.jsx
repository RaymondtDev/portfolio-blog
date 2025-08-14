import Button from "../../components/ux/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineArticle, MdOutlineMessage } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { RiHome9Line } from "react-icons/ri";


function SidePannel({ active }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`flex flex-col justify-between pb-4 h-full bg-[var(--primary-color)]`}>
      <nav className="py-2.5 px-1.5 flex flex-col">
        <Button link="/" className="flex items-center gap-2 text-white hover:bg-[var(--accent-color)] hover:text-orange-600 rounded-none">
          <RiHome9Line />
          Home
        </Button>
        <Button link="/dashboard" className="flex items-center gap-2 text-white hover:bg-[var(--accent-color)] hover:text-orange-600 rounded-none">
          <LuLayoutDashboard />
          Dashboard
        </Button>
        <Button className="flex items-center gap-2 text-white hover:bg-[var(--accent-color)] hover:text-orange-600 rounded-none">
          <MdOutlineArticle />
          My Articles
        </Button>
        <Button link="/dashboard/messages" className="flex items-center gap-2 text-white hover:bg-[var(--accent-color)] hover:text-orange-600 rounded-none">
          <MdOutlineMessage />
          Messages
        </Button>
      </nav>
      <Button event={handleLogout} className="flex items-center justify-center gap-2 bg-[var(--btn-color)] mx-1.5 text-[var(--secondary-text-color)]">
        <LuLogOut />
        Logout
      </Button>
    </aside>
  );
}

export default SidePannel;
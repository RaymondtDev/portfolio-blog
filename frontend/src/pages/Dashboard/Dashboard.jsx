import { useState } from "react";
import SidePannel from "./SidePannel";
import { useAuth } from "../../contexts/AuthContext";
import Hamburger from "../../components/ux/Hamburger";
import { Outlet } from "react-router-dom";
import WeatherWidget from "./WeatherWidget";
import TaskManger from "./TaskManager";

const Dashboard = () => {
  const { user } = useAuth();
  const [active, setActive] = useState(false);

  !user && <div>Error: user data not available.</div>;

  return (
    <main className="grid-layout h-screen max-w-none prose">
      <div className="full-width grid-layout w-full">
        <div
          className={`pannel h-screen absolute z-10 ${
            active ? "translate-x-0" : "-translate-x-full"
          } sm:static sm:w-full sm:translate-x-0 shadow-[2px_0px_5px_0px_rgba(0,0,0,0.5)]`}
        >
          <SidePannel active={active} />
          <Hamburger event={setActive} activeState={active} />
        </div>
        <div className="h-screen dashboard-main flex overflow-hidden">
          <div className="w-[70vw] overflow-y-auto py-3 pr-2.5">
            <Outlet />
          </div>
          <aside className="bg-gray-200 h-screen w-[30vw] relative border-l border-slate-400">
            <TaskManger />
            {/* <WeatherWidget /> */}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

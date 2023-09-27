import { BsPieChartFill, BsFillCalendarEventFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { MdSportsCricket } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  return (
    <aside
      id="default-sidebar"
      className={`top-0 left-0 z-40 h-screen transition-transform ${
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-slate-600 flex flex-col justify-between">
        <div className="my-10">
          <h1 className="text-white text-2xl font-semibold">CrickLab</h1>
          <p className="text-white text-lg font-medium">To The Game</p>
        </div>
        <ul className="space-y-2 font-medium ">
          <li>
            <NavLink
             activeClassName="custom-active-class"
              to="/admin/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BsPieChartFill />
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/series"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <MdSportsCricket />
              <span className="ml-3">Series</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/match"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BsFillCalendarEventFill />
              <span className="ml-3">Match</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/golive"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BsFillCalendarEventFill />
              <span className="ml-3">Go live</span>
            </NavLink>
          </li>
          <li>
            <NavLink
            
              to="/admin/news"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BsFillCalendarEventFill />
              <span className="ml-3">News</span>
            </NavLink>
          </li>
        </ul>

        <div className="">
          {" "}
          <button
            onClick={() => {
              navigate("/admin");
              localStorage.setItem("auth", JSON.stringify(false));
            }}
            className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <IoMdLogOut />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

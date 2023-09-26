import { BsPieChartFill,BsFillCalendarEventFill } from "react-icons/bs";
import { MdSportsCricket } from "react-icons/md";
import {RiTeamFill} from "react-icons/ri"
const ToggleSidebar = () => {
  return (
      <aside
        id="default-sidebar"
        className="top-0 left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <button>|||</button>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-400 ">
          <ul className="space-y-2 font-medium ">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsPieChartFill />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdSportsCricket />
                <span className="ml-3">Series</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsFillCalendarEventFill />
                <span className="ml-3">Match</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiTeamFill />
                <span className="ml-3">Team</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
  );
};

export default ToggleSidebar;

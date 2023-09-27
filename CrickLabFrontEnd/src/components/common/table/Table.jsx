import { useNavigate } from "react-router-dom";

const Table = ({ column, data, action, onAction, status, linked, link }) => {
  // Determine whether to enable vertical scrolling
  const navigate = useNavigate();
  const enableVerticalScroll = data.length > 7;
  function getTimeStatus(targetTime) {
    // Parse the target time as a Date object
    const targetDate = new Date(targetTime);

    // Get the current time
    const currentDate = new Date();

    // Compare the target time with the current time
    if (targetDate > currentDate) {
      return "upcoming";
    } else if (targetDate.getDate() === currentDate.getDate()) {
      return "live";
    } else {
      return "result";
    }
  }

  function fetchByDotOperator(object, value) {
    if (value === "datetime") {
      const timestamp = object[value];
      const date = new Date(timestamp);

      // Define the options for formatting the date and time
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      };

      // Convert the timestamp to a long format date and time
      return date.toLocaleString("en-US", options).slice(0, -5);
    }

    return value.split(".").reduce((acc, curr) => acc[curr], object);
  }

  return (
    <div
      className={`relative overflow-x-auto${
        enableVerticalScroll ? "max-h-[500px] overflow-y-auto" : ""
      } shadow-md sm:rounded-lg`}
    >
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {column.map((item, i) => {
              return (
                <th key={i} scope="col" className="px-6 py-3">
                  {item.name.split(".")[0]}
                </th>
              );
            })}
            {status && (
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
            )}
            {action && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="">
          {data.map((row, rowIndex) => (
            <tr
              className="hover:bg-gray-200 cursor-pointer"
              key={rowIndex}
              onClick={() => linked && navigate(`/admin/${link}/${row._id}`)}
            >
              {column.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line"
                >
                  {fetchByDotOperator(row, column.name)}
                </td>
              ))}
              {status && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeStatus(row.datetime)}
                </td>
              )}

              {action && (
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => onAction(row._id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Go live
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

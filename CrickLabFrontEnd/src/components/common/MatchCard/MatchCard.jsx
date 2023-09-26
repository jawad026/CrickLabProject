import { Link } from "react-router-dom";

function MatchCard({ key, match, teamA, teamB, status, dateTime, scorecard }) {
  const date = new Date(dateTime);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return (
    <Link
      key={key}
      to={status === "start" ? `/score/${match}` : `/matchscore/${match}`}
      className="relative block w-[18rem] p-6 bg-gray-50 border border-gray-600 rounded-lg shadow hover:bg-gray-400 "
    >
      <p className="absolute top-2 text-sm left-2 font-extralight  text-red-800 ">
        {status === "start"
          ? "live"
          : status === "pending"
          ? "upcoming"
          : status === "end"
          ? "End"
          : ""}
      </p>
      <p className="font-extralight text-sm text-gray-800 ">
        {date.toLocaleDateString("en-US", options).slice(0, -5)}
      </p>
      <h5 className="flex justify-between mb-2 text-2xl font-medium tracking-tight text-gray-900 ">
        {teamA.name}{" "}
        <span>
          {scorecard
            .filter((item) => item.batting === teamA._id)
            .map((item) => {
              return (
                <div key={item._id}>
                  {item.run}/
                  {Math.floor((item.ball + 1) / 6) + "." + (item.ball % 6)}
                </div>
              );
            })}
        </span>
      </h5>
      <h5 className="flex justify-between  mb-2 text-2xl font-medium tracking-tight text-gray-900 ">
        {teamB.name}
        <span>
          {scorecard
            .filter((item) => item.batting === teamB._id)
            .map((item) => {
              return (
                <div key={item._id}>
                  {item.run}/
                  {Math.floor((item.ball + 1) / 6) + "." + (item.ball % 6)}
                </div>
              );
            })}
        </span>
      </h5>
    </Link>
  );
}

export default MatchCard;

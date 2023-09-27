import { useEffect, useState } from "react";
import Heading from "../../components/common/heading/Heading";
import { io } from "socket.io-client";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useGetTeamPlayersQuery } from "../../Redux/Feature/playerApi";

function ScoreCard() {
  const param = useParams();
  const getScore = localStorage.getItem(`${param.id}score`);
  const [score, setscore] = useState(
    JSON.parse(getScore)
      ? JSON.parse(getScore)
      : {
          match: param.id,
          batting: "",
          balling: "",
          run: 0,
          ball: 0,
          active: [],
          out: [],
          baller: [],
          playerScore: [],
        }
  );
  const { data: bat = [] } = useGetTeamPlayersQuery(score.batting);
  const { data: balling = [] } = useGetTeamPlayersQuery(score.balling);
  const [over, setOver] = useState("0.0");

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Replace with your server URL

    // Listen for score updates from the server
    socket.on("scoreUpdated", (newScore) => {
      // Update the UI with the new score
      setscore(newScore);
    });
    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    const matchScore = param.id + "score";
    if (score.run > 0) localStorage.setItem(matchScore, JSON.stringify(score));
  }, [param.id, score, score.run]);
  useEffect(() => {
    const convertBallsToOvers = () => {
      const overs = Math.floor(score.ball / 6);
      const remainingBalls = score.ball % 6;
      setOver(`${overs}.${remainingBalls}`);
    };
    if (score.ball > 0) convertBallsToOvers();
  }, [score.ball]);
  return (
    <div>
      <div className="flex justify-center gap-20 mt-10">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Run -{" "}
          <span className="font-bold text-blue-700 text-2xl">{score.run}</span>
        </h4>
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Ball -{" "}
          <span className="font-bold text-blue-700 text-2xl">{score.ball}</span>
        </h4>
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Over -{" "}
          <span className="font-bold text-blue-700 text-2xl">{over}</span>
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="relative overflow-x-auto box-border rounded-lg">
          <Heading title={"Batting"} center />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              </tr>
            </thead>
            {bat.map((item, i) => {
              return (
                <tbody key={item._id}>
                  <tr
                    className={clsx(
                      `${
                        score.active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${score.out.includes(item._id) ? " text-red-500" : ""}`,

                      "bg-white border-b  dark:border-gray-700"
                    )}
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {i}
                    </td>
                    <td className="px-6 py-2 text-gray-800 ">
                      {item.name}{" "}
                      <span className="text-green-700 text-xl">{`${
                        score.active[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {score.playerScore[item._id]}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="relative overflow-x-auto box-border rounded-lg">
          <Heading title={"Balling"} center />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Baller
                </th>
              </tr>
            </thead>
            {balling.slice(-5).map((item, i) => {
              return (
                <tbody key={item._id}>
                  <tr
                    className={clsx(
                      `${
                        score.active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${score.out.includes(item._id) ? " text-red-500" : ""}`,

                      "bg-white border-b  dark:border-gray-700"
                    )}
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {i}
                    </td>
                    <td className="px-6 py-2 text-gray-800 ">
                      {item.name}{" "}
                      <span className="text-green-700 text-xl">{`${
                        score.baller[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {score.playerScore[item._id]}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;

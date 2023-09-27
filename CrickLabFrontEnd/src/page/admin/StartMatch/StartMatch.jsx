/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGetTeamPlayersQuery } from "../../../Redux/Feature/playerApi";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import { useAddScoreMutation } from "../../../Redux/Feature/scorecardApi";
import { useUpdateMatchStatusMutation } from "../../../Redux/Feature/matchApi";
import Loading from "../../../components/Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import BackButton from "../../../components/common/BackButton/BackButton";

const StartMatch = () => {
  const param = useParams();
  const [matchData, setMatchData] = useState(
    JSON.parse(localStorage.getItem(param.id))
  );
  const { data: bating = [], isLoading: batLoading } = useGetTeamPlayersQuery(
    matchData.bat
  );
  const { data: balling = [], isLoading: ballLoading } = useGetTeamPlayersQuery(
    matchData.ball
  );
  const [matchPlay, { isLoading: Match }] = useUpdateMatchStatusMutation();
  const [scorecard, { isLoading: Score }] = useAddScoreMutation();
  const [score, setScore] = useState({});
  const socket = io("http://localhost:3001");
  const [run, setRun] = useState(0);
  const [ball, setBall] = useState(0);
  const [out, setOut] = useState([]);
  const [playerScore, setPlayerScore] = useState([]);
  const [active, setActive] = useState([]);
  const [over, setOver] = useState("0.0");
  const [nextTobat, setNextToBat] = useState([]);
  const [baller, setBaller] = useState([]);
  const [disable, setDisable] = useState(false);
  const [inngins, setInnings] = useState(1);
  const neviagate = useNavigate();

  const incrementPlayerScore = (playerId, score) => {
    setPlayerScore((prevScores) => ({
      ...prevScores,
      [playerId]: (prevScores[playerId] || 0) + score, // Increment the score by 1 or set to 1 if undefined
    }));
  };
  const Swap = () => {
    const newArray = [...active];
    const temp = newArray[0];
    newArray[0] = newArray[1];
    newArray[1] = temp;
    setActive(newArray);
  };

  const convertBallsToOvers = () => {
    const overs = Math.floor((ball + 1) / 6);
    const remainingBalls = (ball + 1) % 6;
    setOver(`${overs}.${remainingBalls}`);
  };
  const handleScore = useCallback(
    (runs, balls) => {
      setRun((prev) => prev + runs);
      setBall((prev) => prev + balls);
      setTimeout(() => {
        convertBallsToOvers();
      }, 0);

      incrementPlayerScore(active[0], runs);
      if (runs === 1 && balls === 1) {
        Swap();
      } else if (runs === 3 && balls === 1) {
        Swap();
      }
    },
    [active, convertBallsToOvers, incrementPlayerScore, Swap]
  );

  useEffect(() => {
    socket.emit("scoreUpdated", {
      match: param.id,
      batting: matchData.bat,
      balling: matchData.ball,
      run: run,
      ball: ball,
      active: active,
      out: out,
      baller: baller,
      playerScore: playerScore,
      over: over,
    });
    setScore({
      match: param.id,
      batting: matchData.bat,
      balling: matchData.ball,
      run: run,
      ball: ball,
      active: active,
      out: out,
      baller: baller,
      playerScore: playerScore,
      over: over,
    });
    if (ball % 6 == 0) {
      setDisable(false);
      baller.pop();
    } else {
      setDisable(true);
    }
  }, [run, ball]);
  const handleOut = useCallback(
    (id) => {
      setOut((prev) => [...prev, id]);
      setActive((prev) => prev.filter((item) => item !== id));
      setActive((prev) => [nextTobat[0], ...prev]);

      setTimeout(() => {
        nextTobat.shift();
      }, 1000);
    },
    [nextTobat]
  );

  const handleBaller = (id) => {
    setDisable(false);
    setBaller((prev) => [id, ...prev]);
  };
  useEffect(() => {
    if (inngins === 2 || inngins === 3) {
      const bat = matchData.bat;
      const ball = matchData.ball;
      localStorage.setItem(
        param.id,
        JSON.stringify({
          match: param.id,
          bat: ball,
          ball: bat,
        })
      );
      setMatchData(JSON.parse(localStorage.getItem(param.id)));
      scorecard(score)
        .unwrap()
        .then((response) => {
          toast.success("Score card Saved");
          if (inngins === 3) {
            matchPlay({ id: response.match, status: "end" })
              .unwrap()
              .then(() => {
                toast.success("Play finished");
                neviagate("/admin/match");
                // Handle successful login response, e.g., store user token or redirect
                // Handle successful login response, e.g., store user token or redirect
              })
              .catch(() => {
                // Handle login error
                toast.error("Something went wrong");
              });
          }
        })
        .catch(() => {
          // Handle login error
          toast.error("Something went wrong");
          // toast.error(error);
        });
    }
  }, [inngins]);

  const resetState = () => {
    if ((inngins === 1 || inngins === 2) && !batLoading) {
      setRun(0);
      setBall(0);
      setOver(0);
      const playerScores = {};
      bating.forEach((bat) => {
        playerScores[bat._id] = 0;
      });
      setActive([bating[0]._id, bating[1]._id]);
      setNextToBat(bating.slice(2).map((item) => item._id));
      setPlayerScore(playerScores);
    }
  };
  useEffect(() => {
    resetState();
  }, [inngins, batLoading, bating]);

  const incrementInnings = useCallback(() => {
    setInnings((prevInnings) => prevInnings + 1);
  }, []); // An empty dependency array because there are no dependencies

  if (Score && Match && batLoading && ballLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      <BackButton jump={-2} />
      <Button
        label={inngins == 1 ? "2nd Innings" : "End Match"}
        onClick={() => incrementInnings()}
      />
      <Heading title={"Score Mointering System"} center />
      <div className="flex justify-center mt-10">
        <div className="grid auto-rows-max grid-cols-4 grid-rows-2  gap-1 w-1/2 ">
          <Button
            disabled={baller.length == 0 ? true : false}
            label={"+"}
            onClick={() => handleScore(1, 1)}
          />
          <Button
            disabled={baller.length == 0 ? true : false}
            label={"2"}
            onClick={() => handleScore(2, 1)}
          />
          <Button
            disabled={baller.length == 0 ? true : false}
            label={"3"}
            onClick={() => handleScore(3, 1)}
          />
          <Button
            disabled={baller.length == 0 ? true : false}
            label={"4"}
            onClick={() => handleScore(4, 1)}
          />
          <Button
            optional={"col-span-2"}
            label={"6"}
            disabled={baller.length == 0 ? true : false}
            onClick={() => handleScore(6, 1)}
          />
          <Button
            optional={"col-span-2"}
            label={"Wide"}
            disabled={baller.length == 0 ? true : false}
            onClick={() => handleScore(1, 0)}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mt-10">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Run - <span className="font-bold text-blue-700 text-2xl">{run}</span>
        </h4>
        <h4 className="text-lg font-semibold flex items-center gap-2">
          Ball -{" "}
          <span className="font-bold text-blue-700 text-2xl">{ball}</span>
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
                <th scope="col" className="px-6 py-3">
                  Out
                </th>
              </tr>
            </thead>
            {bating.map((item, i) => {
              return (
                <tbody key={item._id}>
                  <tr
                    className={clsx(
                      `${
                        active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${out.includes(item._id) ? " text-red-500" : ""}`,

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
                        active[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {playerScore[item._id]}
                    </td>
                    {active.includes(item._id) ? (
                      <td className="px-6 py-2">
                        <Button
                          optional={"bg-red-500"}
                          label={"Out"}
                          onClick={() => handleOut(item._id)}
                        />
                      </td>
                    ) : (
                      ""
                    )}
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
                  Score
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
                        active.includes(item._id)
                          ? "bg-green-100 text-slate-500"
                          : ""
                      }`,
                      `${out.includes(item._id) ? " text-red-500" : ""}`,

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
                        baller[0] === item._id ? "*" : ""
                      }`}</span>
                    </td>
                    <td className="px-6 py-2 text-gray-800">
                      {playerScore[item._id]}
                    </td>
                    {!baller.includes(item._id) ? (
                      <td className="px-6 py-2">
                        <Button
                          optional={"bg-red-500"}
                          label={"Baller"}
                          disabled={disable}
                          onClick={() => handleBaller(item._id)}
                        />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default StartMatch;

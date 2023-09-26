import Heading from "../../components/common/heading/Heading";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useGetTeamPlayersQuery } from "../../Redux/Feature/playerApi";
import { useGetScoreByIdQuery } from "../../Redux/Feature/scorecardApi";
import { useGetTeamAllQuery } from "../../Redux/Feature/teamApi";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
function AfterMatchCard() {
  const param = useParams();
  const { data: scorecard = [], isLoading: Score } = useGetScoreByIdQuery(
    param.id
  );

  const { data: teamData = [], isLoading: Team } = useGetTeamAllQuery();
  const { data: battingOne = [], isLoading: Player } = useGetTeamPlayersQuery(
    scorecard[0]?.batting
  );
  const { data: battingTwo = [], isLoading: PlayerTwo } =
    useGetTeamPlayersQuery(scorecard[1]?.batting);
  const [battings, setBatting] = useState([[], []]);

  useEffect(() => {
    if (
      !Score &&
      !Team &&
      !Player &&
      !PlayerTwo &&
      battingOne.length > 3 &&
      battingTwo.length > 3
    ) {
      setBatting([battingOne, battingTwo]);
    }
  }, [Player, PlayerTwo, Score, Team, battingOne, battingTwo]);

  if (Score && Team && Player && PlayerTwo) {
    return <Loading />;
  }

  if (scorecard.length < 2) {
    return <>Not Found</>;
  }
  return (
    <div className="grid md:grid-cols-2 gap-2">
      {battings &&
        scorecard.map((items, i) => {
          const topFiveBattings = battings[i]
            .filter((batting) => items.playerScore[batting._id] !== undefined)
            .sort((a, b) => items.playerScore[b._id] - items.playerScore[a._id])
            .slice(0, 5);
          return (
            <>
              <div className="grid gap-5">
                <div className="flex justify-center gap-20 mt-10">
                  <h4 className="text-lg font-semibold flex items-center md:gap-2">
                    Run -{" "}
                    <span className="font-bold text-blue-700 text-2xl">
                      {items.run}
                    </span>
                  </h4>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    Ball -{" "}
                    <span className="font-bold text-blue-700 text-2xl">
                      {items.ball}
                    </span>
                  </h4>
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    Over -{" "}
                    <span className="font-bold text-blue-700 text-2xl">
                      {Math.floor((items.ball + 1) / 6) +
                        "." +
                        (items.ball % 6)}
                    </span>
                  </h4>
                </div>

                <div className="mt-3">
                  <div className="relative overflow-x-auto box-border rounded-lg">
                    <Heading
                      title={teamData
                        .filter((item) => item._id === items.batting)
                        .map((item) => item.name)}
                      center
                    />
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
                      {topFiveBattings.map((item, i) => {
                        return (
                          <tbody key={item._id}>
                            <tr
                              className={clsx(
                                `${
                                  items.active.includes(item._id)
                                    ? "bg-green-100 text-slate-500"
                                    : ""
                                }`,
                                `${
                                  items.out.includes(item._id)
                                    ? " text-red-500"
                                    : ""
                                }`,
                                "bg-white border-b  dark:border-gray-700"
                              )}
                            >
                              <td
                                scope="row"
                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                              >
                                {i}
                              </td>
                              <td className="px-6 py-2 text-gray-800 ">
                                {item.name}{" "}
                                <span className="text-green-700 text-xl">{`${
                                  items.active[0] === item._id ? "*" : ""
                                }`}</span>
                              </td>
                              <td className="px-6 py-2 text-gray-800">
                                {items.playerScore[item._id]}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default AfterMatchCard;

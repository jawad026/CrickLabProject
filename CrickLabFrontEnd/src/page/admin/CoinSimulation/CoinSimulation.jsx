import { useEffect, useState } from "react";
import {
  useGetMatchAllQuery,
  useUpdateMatchStatusMutation,
} from "../../../Redux/Feature/matchApi";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../../../components/common/heading/Heading";
import Button from "../../../components/common/button/Button";
import toast from "react-hot-toast";
import BackButton from "../../../components/common/BackButton/BackButton";

function CoinTossSimulator() {
  const id = useParams();
  const nevigate = useNavigate();
  const [matchPlay] = useUpdateMatchStatusMutation();
  const { data } = useGetMatchAllQuery();
  const [isDisabled, setIsDisabled] = useState(false);
  const [teamChoice, setTeamChoice] = useState(""); // To store the team's choice
  const [result, setResult] = useState(""); // To store the result of the toss
  const [filteredData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(data.filter((item) => item._id === id.id));
  }, [data.length]);

  // Function to simulate a coin toss
  const tossCoin = () => {
    const randomNum = Math.random();
    const tossResult = randomNum < 0.5 ? "Heads" : "Tails";

    // Determine the winning team based on the toss result
    const winningTeam =
      tossResult === teamChoice
        ? filteredData.map((item) => item.teamA)
        : filteredData.map((item) => item.teamB);

    const lossingTeam =
      tossResult !== teamChoice
        ? filteredData.map((item) => item.teamA)
        : filteredData.map((item) => item.teamB);
    setResult(winningTeam[0]);

    localStorage.setItem(
      id.id,
      JSON.stringify({
        match: id.id,
        bat: winningTeam[0]._id,
        ball: lossingTeam[0]._id,
      })
    );
  };
  const UpdateStatus = () => {
    matchPlay({ id: id.id, status: "start" })
      .unwrap()
      .then(() => {
        toast.success("Match Sheduled");
        nevigate(`/admin/startmatch/${id.id}`, {
          state: { match: id.id, team: result._id },
        });
        // Handle successful login response, e.g., store user token or redirect
      })
      .catch((error) => {
        // Handle login error
        toast.error(error);
      });
  };
  return (
    <>
      <BackButton />
      <div className="grid place-content-center">
        <Heading center={true} title={"Toss"} subtitle={"Tosses win matches"} />
        {/* Team selection */}
        <p className="text-xl text-slate-800 text-center my-10">
          {filteredData.map((item) => item.teamA.name)} calls for the toss.
          Select which side they choose:
        </p>
        <div className="flex ">
          <Button
            label={"Heads"}
            disabled={isDisabled}
            onClick={() => {
              setTeamChoice("Heads");
              setIsDisabled(true);
            }}
          />
          <Button
            label={"Tails"}
            disabled={isDisabled}
            onClick={() => {
              setTeamChoice("Tails");
              setIsDisabled(true);
            }}
          />
        </div>

        {/* Coin toss */}
        {teamChoice && (
          <div className="my-10 grid place-content-center">
            <p className="text-lg text-center my-5">
              {teamChoice} chosen by TeamA:
            </p>
            <Button label={"Toss Coin"} onClick={tossCoin} />
          </div>
        )}

        {/* Result */}
        {result && (
          <div>
            <p className="text-lg font-semibold text-center">
              {result.name + " wins the toss!"}
            </p>
          </div>
        )}

        {result && (
          <Button label={"Let Game Begins"} onClick={() => UpdateStatus()} />
        )}
      </div>
    </>
  );
}

export default CoinTossSimulator;

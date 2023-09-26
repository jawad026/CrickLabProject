import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetMatchAllQuery,
  useGetMatchSeriesQuery,
} from "../../../Redux/Feature/matchApi";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";
import Loading from "../../../components/Loading/Loading";
import { useEffect, useState } from "react";

const Match = () => {
  const location = useLocation();
  var parts = location.pathname.split("/");
  const { data: Matches = [], isLoading: matches } = useGetMatchAllQuery();
  const { data: MatchesSeries = [], isLoading: matchseries } =
    useGetMatchSeriesQuery(parts[3]);
  const [data, setData] = useState([]);
  const nevigate = useNavigate();
  const column = [
    { name: "teamA.name" },
    { name: "teamB.name" },
    { name: "datetime" },
  ];
  useEffect(() => {
    if (parts.length === 4) {
      setData(MatchesSeries);
    } else {
      setData(Matches);
    }
  }, [Matches, MatchesSeries, matches, matchseries, parts.length]);
  if (matches && matchseries) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading title={"Match"} subtitle={"Winner Winner Chiken Dinner"} />
        <div>
          <div className="flex justify-end">
            <div className="w-36 py-2">
              <Button
                label={"Create New"}
                small
                optional={"flex gap-1"}
                onClick={() => nevigate("/admin/addmatch")}
                Icon={<IoIosAddCircle size={24} className="px-1" />}
              />
            </div>
          </div>
          <Table
            column={column}
            data={data}
            action={false}
            status={true}
            link={`matchscore`}
            linked={true}
          />
        </div>
      </div>
    </>
  );
};

export default Match;

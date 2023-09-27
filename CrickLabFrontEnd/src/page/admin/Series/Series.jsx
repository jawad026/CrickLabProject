import { useNavigate } from "react-router-dom";
import { useGetSeriesAllQuery } from "../../../Redux/Feature/seriesApi";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";
import Loading from "../../../components/Loading/Loading";
import BackButton from "../../../components/common/BackButton/BackButton";
const Series = () => {
  const { data = [], isLoading } = useGetSeriesAllQuery();
  const nevigate = useNavigate();

  const column = [
    { name: "name" },
    { name: "type" },
    { name: "over" },
    { name: "teams" },
  ];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
    <BackButton />
      <div className="flex gap-y-10 flex-col justify-end">
        <Heading title={"Series"} subtitle={"World Cricket Club"} />
        <div>
          <div className="flex justify-end">
            <div className="w-36 py-2">
              <Button
                label={"Create New"}
                small
                optional={"flex gap-1"}
                onClick={() => nevigate("/admin/addseries")}
                Icon={<IoIosAddCircle size={24} className="px-1" />}
              />
            </div>
          </div>
          <Table
            column={column}
            data={data}
            action={false}
            linked={"true"}
            link={"match"}
          />
        </div>
      </div>
    </>
  );
};

export default Series;

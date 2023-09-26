import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/button/Button";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import { IoIosAddCircle } from "react-icons/io";
import { useGetAllNewsQuery } from "../../../Redux/Feature/newsApi";
import Loading from "../../../components/Loading/Loading";

const News = () => {
  const { data = [], isLoading } = useGetAllNewsQuery();
  const nevigate = useNavigate();
  const column = [{ name: "title" }, { name: "subtitle" }];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading title={"News"} subtitle={"Winner Winner Chiken Dinner"} />
        <div>
          <div className="flex justify-end">
            <div className="w-36 py-2">
              <Button
                label={"Create New"}
                small
                optional={"flex gap-1"}
                onClick={() => nevigate("/admin/addnews")}
                Icon={<IoIosAddCircle size={24} className="px-1" />}
              />
            </div>
          </div>
          <Table column={column} data={data} action={false} status={false} />
        </div>
      </div>
    </>
  );
};

export default News;

import { useNavigate } from "react-router-dom";
import { useGetMatchAllQuery } from "../../../Redux/Feature/matchApi";
import Heading from "../../../components/common/heading/Heading";
import Table from "../../../components/common/table/Table";
import Loading from "../../../components/Loading/Loading";

const Golive = () => {
  const { data = [], isLoading } = useGetMatchAllQuery();
  const nevigate = useNavigate();
  const today = new Date();
  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.datetime);
    return itemDate.getDate() === today.getDate();
  });
  const column = [
    { name: "teamA.name" },
    { name: "teamB.name" },
    { name: "datetime" },
  ];
  const handleRowSelect = (rowNumber) => {
    const localstorage = localStorage.getItem(rowNumber);
    if (localstorage) {
      nevigate(`/admin/startmatch/${rowNumber}`);
    } else {
      nevigate(`/admin/toss/${rowNumber}`);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (filteredData.filter((item) => item.status !== "end").length === 0) {
    return (
      <>
        <Heading
          title={"Go live"}
          subtitle={"Please select match to go live"}
        />
        <h1 className="mt-10 text-3xl font-semibold">No Match Today</h1>
      </>
    );
  }
  return (
    <>
      <div className="flex gap-y-10 flex-col">
        <Heading
          title={"Go live"}
          subtitle={"Please select match to go live"}
        />
        <Table
          column={column}
          data={filteredData.filter((item) => item.status !== "end")}
          action={true}
          status={true}
          onAction={(id) => handleRowSelect(id)}
        />
      </div>
    </>
  );
};
export default Golive;

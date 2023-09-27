import { useParams } from "react-router-dom";
import { useGetTeamPlayersQuery } from "../../Redux/Feature/playerApi";
import Table from "../../components/common/table/Table";
import Loading from "../../components/Loading/Loading";
import BackButton from "../../components/common/BackButton/BackButton";

const Players = () => {
  const params = useParams();
  const { data: Player, isLoading } = useGetTeamPlayersQuery(params.id);
  const column = [{ name: "name" }];
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-4">
      <BackButton />
      <div className="grid place-content-center">
        <Table data={Player} column={column} />
      </div>
    </div>
  );
};

export default Players;

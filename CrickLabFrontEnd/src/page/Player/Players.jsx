import { useParams } from "react-router-dom";
import { useGetTeamPlayersQuery } from "../../Redux/Feature/playerApi";
import Table from "../../components/common/table/Table";

const Players = () => {
  const params = useParams();
  const { data: Player, isLoading } = useGetTeamPlayersQuery(params.id);
  const column = [{ name: "name" }];
console.log(Player)
  return (
    <div>
      Players
      <Table data={Player} column={column} />
    </div>
  );
};

export default Players;

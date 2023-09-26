import { useGetMatchAllQuery } from "../../../Redux/Feature/matchApi";
import { useGetTopPlayerQuery } from "../../../Redux/Feature/scorecardApi";
import { useGetSeriesAllQuery } from "../../../Redux/Feature/seriesApi";
import { useGetTeamAllQuery } from "../../../Redux/Feature/teamApi";
import Loading from "../../../components/Loading/Loading";
import PlayerScores from "../../../components/common/LeadingPlayers/LeadingPlayers";
import PieChart from "../../../components/common/PIeChart/PieChart";
import Card from "../../../components/common/card/Card";
import BarChart from "../../../components/common/chart/Chart";

const Dashboard = () => {
  const { data: series = [], isLoading: seriesLoading } =
    useGetSeriesAllQuery();
  const { data: match = [], isLoading: matchLoading } = useGetMatchAllQuery();
  const { data: teams = [], isLoading: teamLoading } = useGetTeamAllQuery();
  const { data: scorecard = [], isLoading: scoreLoading } =
    useGetTopPlayerQuery();
  if (scoreLoading && seriesLoading && matchLoading && teamLoading) {
    return <Loading />;
  }

  const seriesCounts = {};

  match.forEach((match) => {
    const seriesId = match.seriesId || "No Series";
    seriesCounts[seriesId] = (seriesCounts[seriesId] || 0) + 1;
  });
  const filteredSeriesNames = series
    .filter((item) => seriesCounts[item._id])
    .map((item) => item.name);

  const data = {
    labels: filteredSeriesNames.concat("Other"),
    datasets: [
      {
        data: Object.values(seriesCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          // Add more colors as needed
        ],
      },
    ],
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-3 md:gap-y-16 mt-8">
      <Card label={"Series"} data={series.length} />
      <Card label={"Match"} data={match.length} />
      <Card label={"Teams"} data={teams.length} />
      <PlayerScores data={scorecard} />
      <PieChart data={data} />
      <BarChart />
    </div>
  );
};

export default Dashboard;

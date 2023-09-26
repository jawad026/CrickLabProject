import { useGetMatchSeriesQuery } from "../../Redux/Feature/matchApi";
import Loading from "../../components/Loading/Loading";
import MatchCard from "../../components/common/MatchCard/MatchCard";
import { useParams } from "react-router-dom";
import { useGetScoreAllQuery } from "../../Redux/Feature/scorecardApi";

const MatchesView = () => {
  const param = useParams();
  const { data: matchBySeries = [], isLoading } = useGetMatchSeriesQuery(
    param.id
  );
  const { data: scoreData = [], isLoading: Score } = useGetScoreAllQuery();
  if (isLoading && Score) {
    return <Loading />;
  }
  return (
    <div className="w-screen grid place-content-center mt-10">
      <h1 className="text-4xl font-bold my-10">Matches of Series</h1>
      {matchBySeries.length > 0 ? (
        matchBySeries.map((item) => {
          return (
            <MatchCard
              key={item._id}
              status={item.status}
              scorecard={scoreData.filter((score) => score.match === item._id)}
              match={item._id}
              teamA={item.teamA}
              teamB={item.teamB}
              dateTime={item.datetime}
            />
          );
        })
      ) : (
        <div>Not Found</div>
      )}
    </div>
  );
};

export default MatchesView;

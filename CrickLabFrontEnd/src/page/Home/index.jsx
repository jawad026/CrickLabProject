import { useEffect, useState } from "react";
import { useGetMatchAllQuery } from "../../Redux/Feature/matchApi";
import { useGetSeriesAllQuery } from "../../Redux/Feature/seriesApi";
import Search from "../../components/common/Search/Search";
import Carousel from "../../components/common/crousel/Crousel";
import { useGetAllNewsQuery } from "../../Redux/Feature/newsApi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useGetScoreAllQuery } from "../../Redux/Feature/scorecardApi";
import NewsCard from "../../components/common/NewsCard/NewsCard";
import Loading from "../../components/Loading/Loading";
function Home() {
  const { data: scoreData = [], isLoading: Score } = useGetScoreAllQuery();
  const { data: matchData = [], isLoading: Match } = useGetMatchAllQuery();
  const { data: news = [], isLoading: News } = useGetAllNewsQuery();
  const { data: seriesData = [], isLoading: ScoreAll } = useGetSeriesAllQuery();
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(matchData);
  }, [matchData]);
  const handleSeries = (id) => {
    if (id === "") {
      // If the ID is empty, set the filterData to matchData (return all values)
      setFilterData(matchData);
    } else {
      // If the ID is not empty, filter the data based on the ID
      const filter = matchData.filter((item) => item.seriesId === id);
      setFilterData(filter);
    }
  };
  if (Score && Match && News && ScoreAll) {
    return <Loading />;
  }
  const ConvertData = (targetTime) => {
    const date = new Date(targetTime);
    return date;
  };
  return (
    <div className="">
      <div className="bg-blue-400 h-full">
        <Search data={seriesData} onClick={(id) => handleSeries(id)} />
        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-6 p-10 ">
          <Carousel
            cards={filterData
              .slice()
              .sort(
                (a, b) => ConvertData(b.datetime) - ConvertData(a.datetime)
              )}
            scorecard={scoreData}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 h-screen mt-2 px-4">
        <div className="col-span-1 h-full hidden md:block">
          <h1 className="text-lg ml-5">Hot News</h1>
          {news.map((item) => {
            return (
              <h1 key={item._id} className="flex w-full items-center gap-x-4">
                <FaLongArrowAltRight /> <span>{item.title}</span>
              </h1>
            );
          })}
        </div>
        <div className="col-span-4 md:col-span-2  mt-2 ">
          {news.map((item) => {
            return (
              <div className="grid gap-3" key={item._id}>
                <NewsCard
                  id={item._id}
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;

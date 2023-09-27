import { Link } from "react-router-dom";
import { useGetSeriesAllQuery } from "../../Redux/Feature/seriesApi";
import Loading from "../../components/Loading/Loading";

const SeriesView = () => {
  const { data: series = [], isLoading } = useGetSeriesAllQuery();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid place-content-center w-screen">
      <h1 className="text-5xl my-10 font-bold text-center">Series</h1>
      <div className="grid grid-cols-2 gap-4">
        {series.map((item) => {
          return (
            <Link key={item._id} to={`match/${item._id}`}>
              <h4 className="mt-2 font-semibold text-xl w-52 text-gray-600 bg-gray-200 p-4 rounded-lg hover:bg-gray-300 hover:text-gray-700">
                {item.name}
              </h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesView;

import { useGetAllNewsQuery } from "../../Redux/Feature/newsApi";
import Loading from "../../components/Loading/Loading";
import NewsCard from "../../components/common/NewsCard/NewsCard";
import Heading from "../../components/common/heading/Heading";

const NewsPanel = () => {
  const { data: news = [], isLoading } = useGetAllNewsQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid place-items-center w-full">
      <div className=" bg-gray-50 rounded-lg w-1/2 p-4 mt-10">
        <Heading title={"Cricket News"} />
        <div className="">
          {news.map((item) => {
            return (
              <div className="" key={item._id}>
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
};

export default NewsPanel;

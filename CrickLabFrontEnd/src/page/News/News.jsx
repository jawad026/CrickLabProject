import { useParams } from "react-router-dom";
import { useGetAllNewsQuery } from "../../Redux/Feature/newsApi";
import Loading from "../../components/Loading/Loading"
const NewsView = () => {
  const param = useParams();
  const { data = [], isLoading } = useGetAllNewsQuery();
  console.log(data.filter((item) => item._id === param.id));
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        {data
          .filter((item) => item._id === param.id)
          .map((item) => {
            return (
              <>
                <h1 className="text-3xl font-bold text-gray-800">
                  {item.title}
                </h1>
                <h2 className="text-xl text-gray-600">{item.subtitle}</h2>
                <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden  transform origin-top-left">
                  <img
                    src={item.image}
                    alt="Your Image"
                    className="object-cover rounded-lg object-center w-full h-full hover:scale-125 transition-transform z-0"
                  />
                </div>
                <div
                  className="mt-4 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default NewsView;

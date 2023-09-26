import { Link } from "react-router-dom";

const NewsCard = ({ id, image, title, subtitle }) => {
  return (
    <div>
      <Link
        to={`/news/${id}`}
        className="flex flex-col items-center my-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 "
      >
        <div className="md:w-1/3 h-1/2 p-3 overflow-hidden transform origin-top-left">
          <img
            src={image}
            alt="Your Image"
            className="object-cover rounded-lg w-full h-full hover:scale-125 transition-transform z-0"
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">{subtitle}</p>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;

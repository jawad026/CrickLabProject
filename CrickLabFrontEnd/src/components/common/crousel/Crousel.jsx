// src/components/Carousel.js
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MatchCard from "../MatchCard/MatchCard";
import RightArrow from "../Arrow/RightArrow";
import LeftArrow from "../Arrow/LeftArrow";

const Carousel = ({ cards, scorecard }) => {
  const settings = {
    slidesToShow: 4, // Show 4 cards at a time
    slidesToScroll: 4, // Scroll 4 cards at a time
    infinite: false, // Disable infinite scrolling
    nextArrow: <LeftArrow />,
    prevArrow: <RightArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="w-[90vw]">
      <Slider {...settings}>
        {cards
          .map((item) => {
            return (
              <MatchCard
                key={item._id}
                status={item.status}
                scorecard={scorecard.filter(
                  (score) => score.match === item._id
                )}
                match={item._id}
                teamA={item.teamA}
                teamB={item.teamB}
                dateTime={item.datetime} // And here as well
              />
            );
          })}
      </Slider>
    </div>
  );
};

export default Carousel;

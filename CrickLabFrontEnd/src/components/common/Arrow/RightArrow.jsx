import { FaArrowAltCircleLeft } from "react-icons/fa";
const RightArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowAltCircleLeft
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
};

export default RightArrow;

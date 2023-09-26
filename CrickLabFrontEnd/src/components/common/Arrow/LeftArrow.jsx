import { FaArrowAltCircleRight } from "react-icons/fa";
const LeftArrow = ({ className, style, onClick }) => {
  return (
    <FaArrowAltCircleRight
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    />
  );
};

export default LeftArrow;

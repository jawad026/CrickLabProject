import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = ({ jump }) => {
  let navigate = useNavigate();
  return (
    <>
      <button className="px-4" onClick={() => navigate(jump || -1)}>
        <FaArrowLeftLong />
      </button>
    </>
  );
};

export default BackButton;

import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="grid place-content-center h-screen">
      <ClipLoader
        color={"lightBlue"}
        cssOverride={""}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;

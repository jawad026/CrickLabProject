
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  return (
    <div className="col-span-3 md:col-span-1 grid place-content-center">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;

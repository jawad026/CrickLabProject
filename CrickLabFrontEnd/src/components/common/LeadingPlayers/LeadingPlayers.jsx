import { Bar } from "react-chartjs-2";

function PlayerScores({ data }) {
  const customColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(50, 205, 50, 0.6)",
    "rgba(255, 0, 0, 0.6)",
    "rgba(0, 128, 128, 0.6)",
    "rgba(128, 0, 128, 0.6)",
  ];
  const ChartData = {
    labels: data.length > 0 && data.map((item) => item.playerName),
    datasets: [
      {
        label: "Top PLayers",
        data: data.length > 0 && data.map((item) => item.totalScore),
        backgroundColor: customColors,
        borderColor: customColors,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="col-span-3 md:col-span-2">
      <Bar data={ChartData} />
    </div>
  );
}

export default PlayerScores;

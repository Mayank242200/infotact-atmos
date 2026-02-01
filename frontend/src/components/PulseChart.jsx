import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PulseChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Team Pulse",
        data: [3, 4, 2, 5, 4],
        borderColor: "blue",
      },
    ],
  };

  return (
    <div>
      <h3>Pulse Chart</h3>
      <Line data={data} />
    </div>
  );
}

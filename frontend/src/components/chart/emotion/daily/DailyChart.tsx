import BarChart from "./BarChart";
import LineChart from "./LineChart";
import TotalEmotion from "./TotalEmotion";

const DailyChart = () => {
    return (
        <div>
            <LineChart />
            <BarChart />
            <TotalEmotion />
        </div>
    )
}

export default DailyChart;
import DynamicBarChart from "../../../components/chart/DynamicBarChart";
import DynamicLineChart from "../../../components/chart/DynamicLineChart";

const chartData = [
  { name: "Yanvar", Ayollar: 400, Erkaklar: 240 },
  { name: "Fevral", Ayollar: 300, Erkaklar: 139 },
  { name: "Mart", Ayollar: 200, Erkaklar: 980 },
  { name: "Aprel", Ayollar: 278, Erkaklar: 390 },
  { name: "May", Ayollar: 189, Erkaklar: 480 },
  { name: "Iyun", Ayollar: 239, Erkaklar: 380 },
  { name: "Iyul", Ayollar: 349, Erkaklar: 430 },
];

const chartData2 = [
  { name: "January", value: -1000 },
  { name: "February", value: -500 },
  { name: "March", value: -700 },
  { name: "April", value: -600 },
  { name: "May", value: -300 },
  { name: "June", value: -600 },
  { name: "July", value: 0 },
];

function Statistika() {
  return (
    <div className="container w-full flex justify-center items-center">
      <div className="grid grid-cols-2 gap-10">
        
        <div className="App">
          <h1 style={{ textAlign: "center" }}>Dynamic Line Chart</h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={chartData2} lineColor="#7b68ee" />
        </div>
        <div className="App">
          <h1 style={{ textAlign: "center" }}>Dynamic Line Chart</h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={chartData2} lineColor="#7b68ee" />
        </div>
        <div className="App">
          <h1 style={{ textAlign: "center" }}>Dynamic Bar Chart</h1>
          <DynamicBarChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Statistika;

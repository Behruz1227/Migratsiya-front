import DynamicBarChart from "../../../components/chart/DynamicBarChart";
import DynamicLineChart from "../../../components/chart/DynamicLineChart";
import DynamicPieChart from "../../../components/chart/DynamicPieChart";

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
  { name: "January", value: 100 },
  { name: "February", value: 500 },
  { name: "March", value: 700 },
  { name: "April", value: 800 },
  { name: "May", value: 1300 },
  { name: "June", value: 1600 },
  { name: "July", value: 0 },
];

const chartData4 = [
    { name: "January", value: 1000 },
    { name: "February", value: 500 },
    { name: "March", value: 700 },
    { name: "April", value: 600 },
    { name: "May", value: 300 },
    { name: "June", value: 600 },
    { name: "July", value: 0 },
  ];

const chartData3 = [
    { name: "O'zbekistonda", value: 33 },
    { name: "Xorijda", value: 67 },
  ];

function Statistika() {
  return (
    <div className="bg-[#EBF8FF] w-full flex justify-center items-center">
      <div className="container w-full grid lg:grid-cols-2 gap-10">
        <div className="App">
          <h1 className="my-10" style={{ textAlign: "center" }}>Ketganlar</h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={chartData2} lineColor="#7b68ee" />
        </div>
        <div className="App">
          <h1 className="my-10" style={{ textAlign: "center" }}>Kelganlar</h1>
          {/* LineChart komponentiga ma'lumot va rang yuboriladi */}
          <DynamicLineChart data={chartData4} lineColor="#B9ADFF" />
        </div>
        <div className="App">
          <h1 className="my-10" style={{ textAlign: "center" }}>Jami migrantlar</h1>
          {/* PieChart komponentiga ma'lumotlar yuboriladi */}
          <DynamicPieChart data={chartData3} />
        </div>
        <div className="App">
          <h1 className="my-10" style={{ textAlign: "center" }}>Oylik statistika</h1>
          <DynamicBarChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Statistika;

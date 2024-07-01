
import { Chart } from "react-google-charts";
const  SaleAndExpand = ()=>{
    const data = [
        ["Month", "Sales", "Expenses", "Profit"],
        ["01-23", 1000, 400, 200],
        ["02-23", 1170, 460, 250],
        ["03-23", 660, 1120, 300],
        ["04-23", 1030, 540, 350],
      ];
    const options = {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2024-2025",
        },
      };
    return(
        <div>
         <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
        </div>
    )
}
export default SaleAndExpand
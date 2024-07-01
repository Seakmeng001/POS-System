import { useEffect } from "react";
import { Chart } from "react-google-charts";
import  {request} from "../../../share/request"
const  CustomerChart = ()=>{
    // useEffect(()=>{
    //  getList();

    // },[])
    // const getList = async()=>{
    //   const  res = await ("report/customerActive","get");

    // }
    const data = [
        ["Month", "Active"],
        ["01-23", 1000],
        ["02-23", 1170],
        ["03-23", 1150],
        ["04-23", 2000],
      ];
    const options = {
        chart: {
          title: "Customer Active",
          subtitle: "Customer Active From 01-24/ 12-24",
        },
      };
    return(
        <div>
         <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
        </div>
    )
}
export default CustomerChart
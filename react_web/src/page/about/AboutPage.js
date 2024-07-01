import { Button,Input } from "antd"
import {list, PI,getProductName, getProductByID} from "../../share/products"


const AboutPage = () =>{
   console.log(getProductName())
   const item = getProductByID(101)
    // if(item.length != 0){
    //     strProduct= item[0].id + " - " + item[0].name

    // }else{
    //     strProduct = "Product id ("+id+") not found in list!"
    // }
     
    return(
        <div>
            {/* <h4>Product: {strProduct}</h4> */}
            <h4> Product: {item.id ="-"+item.name}</h4>
            <h1>{PI}</h1>
            <h1>{list[0].name}</h1>
             
             <h1>Function: {getProductName()}</h1>
            <hr/>
           

            <h1>AboutPage</h1>
            <input/>
            <Button type="primary">Button Antd</Button>
            <Input placeholder="username"/>
        </div>
    )
}
export default AboutPage
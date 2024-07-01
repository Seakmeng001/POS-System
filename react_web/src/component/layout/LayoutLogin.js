import { Outlet } from "react-router-dom"


const LayoutLogin = () =>{
    
        return(
            <div>
                <div style={{backgroundColor:'darkblue'}}>
                    <h1 style={{color:'#FFF',padding:5}}>Barnd Name</h1>
                </div>
                <div style={{padding:20}}>
                    <Outlet/>
                </div>
            </div>
        )
    
}
export default LayoutLogin
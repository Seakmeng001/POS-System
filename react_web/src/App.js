import {BrowserRouter,Routes,Route,} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //from bootstrap
import HomePage from "./page/home/HomePage"
import AboutPage from "./page/about/AboutPage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import Layout from "./component/layout/Layout";
import CategoryPage from "./page/category/CategoryPage";
import CustomerPage from "./page/customer/CustomerPage";
import EmployeePage from "./page/employee/EmployeePage";
import LayoutLogin from "./component/layout/LayoutLogin";
import PaymentMethod from "./page/payment/PaymentMethod";
import InvoiceStatus from "./page/invoice/InvoiceStatus";
import RolePage from "./page/role/RolePage";
import ShiftdetailPage from "./page/shift/ShiftdetailPage";
import ShiftPage from "./page/shift/ShiftPage";
import Invoice from "./page/invoice/invoice";
import Product from "./page/product/product";
import DashboardPage from "./component/chart/Dashboard/DashbaordPage";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/" element={<Layout/>}>
     
    
    </Route>
    <Route path="/" element ={<Layout/>}>
    <Route path="dashboard" element={<DashboardPage />} />
     <Route path="category" element={<CategoryPage />} />
     <Route path="customer" element={<CustomerPage />} />
     <Route path="employee" element={<EmployeePage />} />
     <Route path="payment_method" element={<PaymentMethod />} />
     <Route path="role" element={<RolePage />} />
     <Route path="invoice_status" element={< InvoiceStatus />} />
     <Route path="invoice" element={< Invoice />} />
     <Route path="shift" element={<ShiftPage/>} />
     <Route path="shift_details" element={< ShiftdetailPage/>} />
     <Route path="product" element={<Product/>} />
     <Route path="about" element={<AboutPage/>} />
     <Route path="*" element={<h1>Route Not Found</h1>}/>
    </Route>

    <Route path="/" element={<LayoutLogin/>}>
    <Route path="login" element={<LoginPage/>} />
    <Route path="register" element={<RegisterPage/>} />
    </Route>
   </Routes>
   </BrowserRouter>




  );
}

export default App;
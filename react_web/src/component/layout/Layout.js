import { Outlet, useNavigate, Link } from "react-router-dom";

// const Layout = () =>{
//     const navigate= useNavigate;
//     const onClickMenu = (param) =>{
//           navigate(param)
//         //   window.location.href=param
//     }
//     return(
//         <div>
//             {/* {header block} */}
//             <div style={{padding:10, backgroundColor:"pink"}}>
//                 <h1>Header</h1>
//                 <button onClick={()=>onClickMenu("/")}>Home</button>
//                 <button onClick={()=>onClickMenu("/about")}>About</button>
//                 <button onClick={()=>onClickMenu("/login")}>Login</button>
//                 <button onClick={()=>onClickMenu("/register")}>Register</button>
//                 <br/>
//                 <Link to="/">Home</Link>
//                 <Link to="/about">About</Link>
//                 <Link to="/login">login</Link>
//                 <Link to="/register">Register</Link>
//                 <br/>
//                 <a href="/">Home</a>
//                 <a href="/about">About</a>
//                 <a href="/login">Login</a>
//                 <a href="/register">Register</a>

//             </div >
//              {/* {content block} */}
//             <div style={{padding:10, backgroundColor:"#888",minHeight:"80vh"}} >
//                <Outlet/>
//             </div>
//              {/* {footer block} */}
//             <div style={{padding:10, backgroundColor:"pink"}}>
//                 <h1>Footer</h1>
//             </div>
//         </div>
//     )
// }
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DownOutlined,
  
} from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { MdProductionQuantityLimits,MdOutlinePayment } from "react-icons/md";
import { FaRegUser, FaFileInvoiceDollar,FaRecordVinyl } from "react-icons/fa";
import { PiInvoiceBold } from "react-icons/pi";
import { LiaUserCogSolid } from "react-icons/lia";
import { Avatar, Badge, Button, Dropdown, Layout, Menu, Space, theme} from "antd";
import { useEffect, useState } from "react";
import { getCurrentUser, isLogin,config} from "../../share/helper";
import styles from "./Layout.module.css"

const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const user= getCurrentUser()
  useEffect(() =>{
    if(!isLogin()){
      window.location.href="/login"

    }
  //  window.location.href="/login"
  },[])
  if(!isLogin()){
    return null
  }
  
const onLinkpage = (routeName) =>{ //link page
     navigate(routeName)
}

const onLogout= ()=>{
  localStorage.setItem("isLogin", null)
  window.location.href = "/login"
}
  

  return (
    <div> 
     
      <Layout>
        
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <AiOutlineDashboard />,
                label: "Dashboard",
                onClick:()=> onLinkpage("/dashboard")
              },
              {
                key: "2",
                icon: <TbCategory />,
                label: "Category",
                onClick:()=> onLinkpage("/category")
              },
              {
                key: "11",
                icon: <MdProductionQuantityLimits />,
                label: "Product",
                onClick: () =>onLinkpage("/product")
              },
              {
                key: "3",
                icon: <FaRegUser />,
                label: "Customer",
                onClick:()=> onLinkpage("/customer")
              },
              {
                key: "4",
                icon: <UserOutlined />,
                label: "Employee",
                onClick: () =>onLinkpage("/employee")
              },
              {
                key: "5",
                icon: <MdOutlinePayment />,
                label: "Payment method",
                onClick: () =>onLinkpage("/payment_method")
              },
              {
                key: "6",
                icon: <PiInvoiceBold />,
                label: "Invoice status",
                onClick: () =>onLinkpage("/invoice_status")
              },
              {
                key: "7",
                icon: <FaFileInvoiceDollar />,
                label: "Invoice ",
                onClick: () =>onLinkpage("/invoice")
              },
              {
                key: "8",
                icon:<LiaUserCogSolid />,
                label: "Role",
                onClick: () =>onLinkpage("/role")
              },
              {
                key: "9",
                icon: < VideoCameraOutlined />,
                label: "Shift",
                onClick: () =>onLinkpage("/shift")

              },
              {
                key: "10",
                icon: <FaRecordVinyl />,
                label: "Shift Details",
                onClick: () =>onLinkpage("/shift_details")
              },
              
            ]}
          />
        </Sider>
        {/* <img src ="http://localhost/POS/image_1/image_emp-1717750897832-162904135"
      width={100}
      height={100}
      /> */}
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className={styles.containHeader}>

              <div>
              <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
              </div>
            <div>
            <div>
              </div>
            
           
           <Space>
          <div style={{marginRight:15}}>
          {/* <Badge size ="small" count={5}>
                  <Avatar shape="square" size ="small"/>
                </Badge> */}
          </div>
            
           <Dropdown
              menu={{
                   items:[
                    {
                      key:"1",
                      label:"profile"
                    },
                    // {
                    //   key:"2",
                    //   label:"Change Password"
                    // },
                    {
                      key:"3",
                      label:"Setting",
                      
                    },
                    {
                      key:"4",
                      label:"Layout",
                      onClick:()=> onLogout(),
                      danger: true
                    }
                   ]
               }}
              >
                
            <a onClick={(e) => e.preventDefault()}>
             <Space>
              {/* <UserOutlined/> */}
              {user.image== "" ||user.image == null ?
              <div 
              style={{
                width:40, 
                height:40, 
                borderRadius:20,
                backgroundColor:"#eee"}}
                />
                  
             
              :
              <img
              src={config.image_path+user.image}
              style={{windows:40, height:40,borderRadius:20}}
              />
              }
              

             {user.firstname+"-"+user.lastname}
           <DownOutlined/>
      </Space>
    </a>
  </Dropdown>
           </Space>
            </div>
            </div>
           
           
            {/* <Button onClick={()=>setCollapsed(!collapsed)}>Toggle</Button> */}
          
           
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
             <Outlet/> 
          </Content>
        </Layout>
      </Layout>
     
       
    
    </div>
  );
}
export default MainLayout;

  /* <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
        <Outlet/>
    </div> */


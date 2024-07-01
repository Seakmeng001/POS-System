import {Table,Button,Stack,Carousel} from "react-bootstrap"
import {Button as ButtonAntd,Form} from "antd"
import {listProduct,PI} from "./data"
import {useState} from "react"
import SaleAndExpand from "../../component/chart/Dashboard/SaleAndExpand"
import CustomerChart from "../../component/chart/Dashboard/CustomerChart"
import Layout from "../../component/layout/Layout";
import { Link } from "react-router-dom"
const HomePage = () =>{

  // //variable, function, ...
  // var x="Meng";
  // var y=20;
  // var name="MengCuite";
  // var isActie="true";
  // var arrPrice= [10,20,30,40,7,9]
  // var arrName=["Sok","Som"]
  // var arrName1=[[1,2,3,5,6,["Som","So"]],"10","Som"]
  // var objperson = {
  //   id: 1,
  //   name:"MengCuite",
  //   gender: "male", 
  //   children: ["Bora","Jon"]

  // }
  // //condition
  // var a=1000;
  // var b="";
  // if(a>100){
  //   b = "A geater than 100"
  // }else{
  //   b="A less than 100"
  // }
  
  //functions
  //loop


  //rect state
  // Declear state
  // const [name,setName]= useState("SOK") //name is state  setName is setter of state name  useState(10) allow create state inreact 10 intailize value to name
  // const [gender,setGender]= useState("male")
  // const [tel,setTel] = useState("061572951")
  // const [count,setCount] = useState("100")
  // const [course,setCourse] = useState("C++","C#","java")
  
  // var x= 100;
  //change state

  // const onClickMe1 = () =>{
    // console.log("You have clicked me1 button")
    // body function when we click button "Click Me1"

    //change state
  //   setName("Jon")
  //   setGender("Male")
  //   setTel("099999999")

  // }
  // const onClickMe2 =() =>{
  //   setName("Meng")
  //   setGender("Female")
  //   setTel("0888888888")

  // }
  // const onInscrease = () =>{
  //   if(count == 105){
  //     setCount(10000)
  //    }else{
  //     setCount(count+1)
  //    }
  //    x=x+1
  // }
  // const onDescrease= () =>{
  //  setCount(count-1)
  //  x=x-1
  // }
  
    return(
      <div>
        {/* using state in view */}
       {/* <h1>name: {name} </h1>
       <h1>gender: {gender} </h1>
       <h1>tel: {tel} </h1>
       <h1>Course: {course}</h1>
       <button onClick={onClickMe1}>Click me1</button>
       <Button onClick={onClickMe2}>Click Me2</Button>
       <h1>cont state: {count}</h1>
       <h1>x variable:{x}</h1>
       <Button onClick={onInscrease}>+</Button>
       <Button onClick={onDescrease}>-</Button> */}












        {/* <h1>PI={PI}</h1>
        <h1>{listProduct[0]}</h1>
        <h2>{b}</h2>
        <h2>{objperson.children[0]+" "+objperson.children[0]}</h2>
        <h2>{arrName1[0][2]}</h2>
        <h2>{objperson.id}-{objperson.name}-{objperson.gender}</h2>
        <h2>{objperson.id+""+objperson.name+""+objperson.gender}</h2>
        <h1>{arrPrice[0]}</h1>
        <h1>{arrPrice.length}</h1>
        <h1>{arrPrice[arrPrice.length-1]}</h1>
        <h1>{x}</h1>
        <h1>{y}</h1>
        <div>{name}</div>
        <div>{isActie+""}</div>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
          </thead>
          
          <tbody>
            <tr>
              <td>101</td>
              <td>Sok</td>
              <td>male</td>
              <td style={{width:200, textAlign:"right"}}>
                <Button size="sm" variant="outline-primary">Edit</Button>
                <Button  size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>101</td> 
              <td>Sok</td>
              <td>male</td>
              <td style={{width:200, textAlign:"right"}}>
                
                <Button  size="sm" variant="outline-primary">Edit</Button>
                <Button  size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>

          </tbody>
        </Table> */}
        
        <div style={styles.container}>
        <h1 style={styles.header}>Welcome to Our POS System</h1>
        <p style={styles.subHeader}>Efficient. Reliable. Secure.</p>
        <a href="/dashboard">Getting started</a>
      </div>
     



{/* 
      // {/* <SaleAndExpand />
      // <CustomerChart/> */} 
      </div>
    )
  }
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: '3em',
      color: '#333',
    },
    subHeader: {
      fontSize: '1.5em',
      color: '#666',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1em',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };
  export default HomePage;
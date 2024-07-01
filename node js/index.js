// http 

const express = require ("express");
const app = express(); // extend from express
const cors = require ("cors");
app.use(express.json())//req.body //get params json body
app.use(express.json())
//need to allow cross origin
app.use(cors({origin:"*"}))

app.get("/", (req, res) =>{
    res.json({
        message: "Home is me"
    })

})
const employee = require("./src/route/employee.route")  //only import
const customer = require("./src/route/customer.route") 
const category = require("./src/route/category.route")
const payment_method = require("./src/route/payment_method.route")
const invoice_status = require("./src/route/invoice_status.route")
const role = require("./src/route/role.route")
const invoice = require("./src/route/invoice.route")
const product = require("./src/route/product.route")
const shift = require("./src/route/shift.route")
const shift_details= require("./src/route/shift_details.route")


//call route
employee(app)
customer(app)
category(app)
payment_method(app)
invoice_status(app)
role(app)
shift(app)
shift_details(app)
product(app)
invoice(app)

//defind port to serve 
const port = 8081;
app.listen(8081,()=>{
    console.log("http:localhost:"+port);
})
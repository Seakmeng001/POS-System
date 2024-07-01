const e = require("express")
const db =require("../util/db")

const getAll = (req,res) =>{
     db.query("SELECT * FROM `customer`",(error,rows)=>{
        if(!error){  // mean no error 
            res.json({
                customer_list:rows
            })
        }else{            //mean some worng
            res.json({
                error:true,
                message:error
            })
        }

     })
    // res.json({
    //     message:"List all customers"
    // })
}
const create = (req,res) =>{
    ///data //get from client 
    //sql insert
    // req.body ={
    //     firstname:"",
    //     lastname:"",
    //     gender : "",
    // }
    var {
        firstname,
        lastname,
        gender,
        dob,
        tel,
        email
    } = req.body
    // res.json({
    //     firstname:firstname,
    //     lastname:lastname,
    //     gender:gender,
    //     dob:dob,
    //     tel:tel,
    //     email:email

    // })
    // res.json({
    //     dataToInsert: rep.body
    // })
    // return false;
    var sqlInsert = " INSERT INTO customer ( firstname, lastname, gender, dob, tel, email) VALUES(?, ?, ?,?, ?, ?)"

    db.query(sqlInsert, [firstname, lastname, gender, dob, tel, email],(error,rows)=>{
        if(!error){  // mean no error 
            res.json({
               message: "Insert successfully",
               data:rows
            })
        }else{            //mean some worng
            res.json({
                error:true,
                message:error
            })
        }
        
    })

    
    // res.json({
    //     message:"Create all customers"
    // })

}
const remove = (req,res) =>{
    var {id} = req.params
    var sql = "DELETE FROM customer WHERE customer_id= ?"
    db.query(sql,[id],(error,rows)=>{
        if(!error){  // mean no error 
            res.json({
               message: (rows.affectedRows !=0 ? "Customer removed!": "Customer not found"),
               data:rows
            })
        }else{            //mean some worng
            res.json({
                error:true,
                message:error
            })
        }

    })

    // res.json({
    //     message:"Remove all customer"
    // })

}
const update = (req,res) =>{
    var {
        customer_id, 
        firstname,
        lastname,
        gender,
        dob,
        tel,
        email
    } = req.body
    // var sqlInsert = " INSERT INTO customer ( firstname, lastname, gender, dob, tel, email) VALUES(?, ?, ?,?, ?, ?)"
    var sqlUpdate = " UPDATE customer SET  firstname=?, lastname=?, gender=?, dob=?, tel=?, email=? WHERE customer_id= ?"
    var sqlParam= [firstname, lastname, gender, dob, tel, email,customer_id]
    db.query(sqlUpdate,sqlParam,(error,rows)=>{
        if(!error){  // mean no error 
            res.json({
               message: "Updated successfully",
               data:rows
            })
        }else{            //mean some worng
            res.json({
                error:true,
                message:error
            })
        }
        
    })
    // res.json({
    //     message:"Update all customer"
    // })

}
module.exports ={
    getAll,
    create,
    remove,
    update
}
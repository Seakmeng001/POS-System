
const db= require("../util/db")
const bcrypt = require("bcrypt")
const { removeFile} = require("../util/herper")
const getAll = async(req,res) =>{
    // var sqlEmployee= "SELECT * FROM employee";
    // var sqlcustomer= "SELECT * FROM customer";
    // const listEmployee = await db.query(sqlEmployee);
    // const listCustomer = await db.query(sqlcustomer);
    // res.json({
    //     customer:listCustomer,
    //     employee:listEmployee
    // })

    // const sqlInsert ="INSERT INTO ...."
    // var param = ["soke",....]
    // const data= await db.query(sqlInsert, param)
    // res.json({
    //     message:"insert sucess"
    // })
//   req.query, req.params  , req.body
  const {textSearch}= req.query;
  var sqlSelect = "SELECT * FROM employee ";
  if(textSearch !=null && textSearch != ""){
    sqlSelect += "WHERE firstname LIKE '%"+textSearch+"%' OR lastname LIKE '%"+textSearch+"%' OR tel LIKE '%"+textSearch+"%'"

  }
//   sqlSelect += " ORDER BY id DESC"

  const listEmployee = await db.query(sqlSelect);
  const total = await db.query("SELECT COUNT(id) as Total FROM employee; ")
  res.json({
    list:listEmployee,
    total:total,
  })


}
const getOne = (req,res) => {
    const {id} = req.params;
    var sql = "SELECT * FROM employee WHERE id = ?";
    var param = [id];
    db.query(sql,param,(error,rows)=>{
        if(!error){
            res.json({
                list:rows
            })
        }else{
            res.json({
                error:true,
                message:error
            })
        }
    })
}
const getAll1 = (req,res) =>{
    var sql = "SELECT * FROM employee"
    var sqlCusomer = "SELECT * FROM customer"
    db.query(sql,(error,rows)=>{
        if(!error){  // mean no error 
            db.query(sqlCusomer,(error1,rows1)=>{
                if(!error1){
                    res.json({
                        list_employee:rows,
                        list_customer:rows1,
                    })
                }else{
                    res.json({
                        error:true,
                        message:error1
                    })
                }

            })
        }else{            //mean some worng
            res.json({
                error:true,
                message:error
            })
        }


    })

    // res.json({
    //     message:"List all employees"
    // })
}
const create = async (req, res) => {
    const {
      firstname, lastname, gender, dob, email, tel, address, role, password
    } = req.body;
  
    let filename = null;
    if (req.file) {
      filename = req.file.filename;
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const sql = "INSERT INTO employee (firstname, lastname, gender, dob, image, email, tel, address, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const params = [firstname, lastname, gender, dob, filename, email, tel, address, role, hashedPassword];
  
      db.query(sql, params, (error, results) => {
        if (!error) {
          res.json({
            message: results.affectedRows != 0 ? "Insert successfully" : "Something went wrong",
            list: params
          });
        } else {
          res.json({
            error: true,
            message: error
          });
        }
      });
    } catch (error) {
      res.json({
        error: true,
        message: error.message
      });
    }
  };
const setPassword = async(req,res) =>{
    // update column  password
    const {
        tel,
        password,
        confirmPassword

    }= req.body; 
    //validate param object
    var message = {}; //empty object
    if(tel== null || tel == " "){
        message.tel = "Tel required!"

    }
    if(password== null || password == ""){
        message.password = "Password required"
        
    }else{
        if(password != confirmPassword){
            message.password = "Password not match"
            
        }

    }
    if(Object.keys(message).length >0){
        res.json({
            message: message
        })
        return false
    }
    

    // bcrypt : hash password
    const user = await checkIsExistUser(tel);
    if(!user){
        res.json({
            message: "User doesn't exist!",
        })
    }else{
        const hashPassword = await bcrypt.hashSync(password,10)
            var sql = "UPDATE employee SET password = ? WHERE tel =?";
            const data = await db.query(sql,[hashPassword,tel]);
            delete user.password
           
            res.json({
                message: data.affectedRows ? "Password set success! ": "Somthing worng!",
                profile:user
               
         })

    }
   
   


}
const checkIsExistUser = async(tel)=>{
    const user = await db.query("SELECT * FROM employee WHERE tel =?",[tel])

    if(user){
        // delete user[0].password // remove password from api
        return user[0]
        
    }else{
        return null
    }
}
const login = async(req,res) =>{
    const{
        tel,
        password
    }= req.body;
    var message = {}; //empty object
    if(tel== null || tel == " "){
        message.tel = "Please input Username!"

    }
    if(password== null || password == ""){
        message.password = "Please input Password!"
        
    }
    if(Object.keys(message).length >0){
        res.json({
            message: message
        })
        return false
    }
    const user = await checkIsExistUser(tel);
    if(!user){
        res.json({
            message: " User or Password incorrect! ",
        })
    }else{
        const isCorrectPassword= await bcrypt.compareSync(password, user.password)
        delete user.password
        res.json({
            isSuccess: isCorrectPassword ? true : false,
            message:isCorrectPassword ?" Login success! ": " User or password incorrect",
            user: isCorrectPassword ? user : null
        })
    }
}
const remove = (req,res) =>{
    const {
        id,
        image
    }= req.body;
    var sql = "DELETE FROM employee WHERE id=?";
    var param= [id]
    db.query(sql,[param],(error,rows)=>{
        if(!error){  // mean no error 
            if(rows.affectedRows !=0){
              removeFile(image)
            }
            res.json({
                message:rows.affectRow !=0? "Remove successfully": "Employee not found",
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
    //     message:"Remove all employees"
    // })

}
const update = (req,res) => {
    const {
      firstname,lastname,gender,dob,email,tel,address,role,id,image,is_remove_file
    } = req.body;
    var filename = null
    if(req.file){
      filename = req.file.filename
    }else{
      filename = image
    }
  
    db.query("SELECT * FROM employee WHERE id = ?",[id],(error1,row1)=>{
      if(!error1){
          var sql = "UPDATE employee SET Firstname=?, Lastname=?, Gender=?, Dob=?, Image=?, Email=?, Tel=?, Address=?, Role=? WHERE Id=?"
          var param = [firstname,lastname,gender,dob,filename,email,tel,address,role,id]
          db.query(sql,param,(error,rows)=>{
              if(!error){
                  if(rows.affectedRows !=0 ){
                      if(req.file || (image == null)){
                          if(row1[0].image != null && row1[0].image != ""){
                              removeFile(row1[0].image)  // remove image in server that updated
                          }
                      }
                      
                  }
                  res.json({
                      message:rows.affectedRows != 0 ? "Update success!" : "Employee not found!",
                      data:rows,
                      is_remove_file:is_remove_file
                  })
              }else{
                  res.json({
                      error:true,
                      message:error
                  })
              }
          })
      }
    })
  }
module.exports ={
    getAll,
    getAll1,
    create,
    remove,
    update,
    getOne,
    setPassword,
    login
}
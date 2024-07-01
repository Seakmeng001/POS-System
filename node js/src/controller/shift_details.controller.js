
const db= require("../util/db");

const getAll = async(req,res)=>{
   try{
    var sqlSelect = "SELECT * FROM  shift_details";
    const list = await db.query(sqlSelect)
    res.json({
        list: list
       
    })
   } catch(err){

   }
    
}
const getOne = async(req,res)=>{
    const {Id}= req.params;
    var sqlSelect= "SELECT * FROM shift_details WHERE Id=?";
    var param=[Id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async(req,res)=>{
    const {
       Id,ShiftId,EmployeeId,OpenningBalance,IsClose

    }=req.body
    var sqlcreate= "INSERT INTO shift_details (Id,ShiftId,EmployeeId,OpenningBalance,IsClose) VALUES (?, ?, ?,?,?)";
    var param=[Id,ShiftId,EmployeeId,OpenningBalance,IsClose];
    var data = await db.query(sqlcreate,param);
    res.json({
        list:"Insert successfully",
        data: data
    })
    
}
const update =async (req,res)=>{
    const {
        ShiftId,EmployeeId,OpenningBalance,IsClose,Id

    }= req.body;
    var sqlupdate= "UPDATE shift_details  SET ShiftId=?, EmployeeId=?, OpenningBalance=?, IsClose=? WHERE Id =?";
    var param=[ ShiftId,EmployeeId,OpenningBalance,IsClose,Id];
    var data = await db.query(sqlupdate,param);
    res.json({
        message:"updated successfully",
        data: data
    })
    
}
const remove = async (req,res)=>{
    const {Id} = req.params;
    var sqldelete= "DELETE FROM shift_details  WHERE Id =?";
    var param=[Id];
    const data = await db.query(sqldelete,param);
    res.json({
        message: data.affectedRows !=0 ? "Remove successfully" : "not successfully"
        
    })
    
}
module.exports ={
    getAll,
    getOne,
    create,
    update,
    remove
}

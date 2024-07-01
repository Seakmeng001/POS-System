
const db= require("../util/db");

const getAll = async(req,res)=>{
   try{
    var sqlSelect = "SELECT * FROM  payment_method ORDER BY id DESC";
    const list = await db.query(sqlSelect)
    res.json({
        list: list
       
    })
   } catch(err){

   }
    
}
const getOne = async(req,res)=>{
    const {Id}= req.params;
    var sqlSelect= "SELECT * FROM payment_method WHERE id=?";
    var param=[Id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async(req,res)=>{
    const {
        Id,name,code,description

    }=req.body
    var sqlcreate= "INSERT INTO  payment_method (Id,name,code,description) VALUES (?, ?, ?,?)";
    var param=[Id,name,code,description];
    var data = await db.query(sqlcreate,param);
    res.json({
        list:"Insert successfully",
        data: data
    })
    
}
const update =async (req,res)=>{
    const {
        name,code,description,Id
    } = req.body;
    var sqlUpdate = "UPDATE payment_method  SET name = ?, code=?, description=? WHERE Id = ?";
    var param = [ name, code, description, Id];
    const data = await db.query(sqlUpdate,param);
    res.json({
        message : "Update success!",
        data:data
    })
    
}
const remove = async (req,res)=>{
    const {Id} = req.params;
    var sqldelete= "DELETE FROM payment_method WHERE Id =?";
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

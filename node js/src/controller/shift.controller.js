
const db= require("../util/db");

const getAll = async(req,res)=>{
   try{
    var sqlSelect = "SELECT * FROM  shift";
    const list = await db.query(sqlSelect)
    res.json({
        list: list
       
    })
   } catch(err){

   }
    
}
const getOne = async(req,res)=>{
    const {id}= req.params;
    var sqlSelect= "SELECT * FROM shift WHERE id=?";
    var param=[id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async(req,res)=>{
    const {
       id,name,description

    }=req.body
    var sqlcreate= "INSERT INTO shift ( id,name,description) VALUES (?, ?, ?)";
    var param=[ id,name,description];
    var data = await db.query(sqlcreate,param);
    res.json({
        list:"Insert successfully",
        data: data
    })
    
}
const update =async (req,res)=>{
    const {
        name,description,id

    }= req.body;
    var sqlupdate= "UPDATE shift SET name=?, description=? WHERE id =?";
    var param=[name,description,id];
    var data = await db.query(sqlupdate,param);
    res.json({
        message:"updated successfully",
        data: data
    })
    
}
const remove = async (req,res)=>{
    const {id} = req.params;
    var sqldelete= "DELETE FROM shift WHERE id =?";
    var param=[id];
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

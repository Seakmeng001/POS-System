
const db= require("../util/db");

const getAll = async(req,res)=>{
   try{
    var sqlSelect = "SELECT * FROM  role ORDER BY id DESC";
    const list = await db.query(sqlSelect)
    res.json({
        list: list
       
    })
   } catch(err){
    res.message(500).send({
        message: "Could not delete the file"+ err,
    });

   }
    
}
const getOne = async(req,res)=>{
    const {id}= req.params;
    var sqlSelect= "SELECT * FROM role WHERE id=?";
    var param=[id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async(req,res)=>{
    const {
        id,name,code,description

    }=req.body
    var sqlcreate= "INSERT INTO role (id,name,code,description) VALUES (?, ?, ?,?)";
    var param=[ id,name,code,description];
    var data = await db.query(sqlcreate,param);
    res.json({
        list:"Insert successfully",
        data: data
    })
    
}
const update =async (req,res)=>{
    const {
        name,code,description,id
    } = req.body;
    var sqlUpdate = "UPDATE role  SET name = ?, code=?, description=? WHERE id = ?";
    var param = [ name, code, description, id];
    const data = await db.query(sqlUpdate,param);
    res.json({
        message : "Update success!",
        data:data
    })
    
}
const remove = async (req,res)=>{
    const {id} = req.params;
    var sqldelete= "DELETE FROM role WHERE id =?";
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

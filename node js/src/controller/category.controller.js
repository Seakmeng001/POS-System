
const db= require("../util/db");

const getAll = async(req,res)=>{
    try{
    var sqlSelect = "SELECT * FROM category ORDER BY id DESC";
    var sqlTotals = "SELECT COUNT (id) as Total FROM category";
    const list = await db.query(sqlSelect)
    const total = await db.query(sqlTotals)
    res.json({
        list: list,
        total: total
    }) 
    }catch(err){
        
    }

    
}
const getOne = async(req,res)=>{
    const {id}= req.params;
    var sqlSelect= "SELECT * FROM category WHERE id=?";
    var param=[id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async(req,res)=>{
    const {
        Name,Description,Parent,Status
   } = req.body;
   var filename = null
   if(req.file){
    filename = req.file.filename
   }
   var sql = "INSERT INTO category (Name,Description,Parent,Status) VALUES (?,?,?,?)"
   var param = [Name,Description,Parent,Status];
   db.query(sql,param,(error,rows)=>{
     if(!error){
        res.json({
            message: (rows.affectedRows != 0 ? "Insert success!" : "Something wrong!"),
            data:rows
        })
     }else{
        res.json({
            error:true,
            message:error
        })
     }
   })


    };
const update =async (req,res)=>{
    const {
        Name, Description, Parent, Status, Id
    } = req.body;
    var sqlUpdate = "UPDATE category SET Name = ?, Description=?, Parent=?, Status=? WHERE Id = ?";
    var param = [ Name, Description, Parent, Status,Id];
    const data = await db.query(sqlUpdate,param);
    res.json({
        message : "Update success!",
        data:data
    })
    
}
const remove = async (req,res)=>{
    const {Id} = req.params;
    var sqlDelete = "DELETE FROM category WHERE Id = ?";
    var param = [Id];
    const data = await db.query(sqlDelete,param);
    res.json({
        message : data.affectedRows != 0 ? "Remove sucess!" : "Not found!"
    })
    
}
module.exports ={
    getAll,
    getOne,
    create,
    update,
    remove
}

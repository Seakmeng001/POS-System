
const db= require("../util/db");

const getAll = async(req,res)=>{
   try{
    var sqlSelect = "SELECT * FROM  invoice";
    const list = await db.query(sqlSelect)
    res.json({
        list: list
       
    })
   } catch(err){

   }
    
}
const getOne = async(req,res)=>{
    const {Id}= req.params;
    var sqlSelect= "SELECT * FROM invoice WHERE Id=?";
    var param=[Id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list
        
    })


    
}
const create = async(req,res)=>{
    const {
       Id,InvoiceNo,ShiftDetailId,CustomerId,PaymentMethodId,TotalAmount,InvoiceStatusId,TotalPaid
    }=req.body
    var sqlcreate= "INSERT INTO invoice ( Id,InvoiceNo,ShiftDetailId,CustomerId,PaymentMethodId,TotalAmount,InvoiceStatusId,TotalPaid) VALUES (?, ?, ?,?,?,?,?,?)";
    var param=[Id,InvoiceNo,ShiftDetailId,CustomerId,PaymentMethodId,TotalAmount,InvoiceStatusId,TotalPaid];
    var data = await db.query(sqlcreate,param);
    res.json({
        list:"Insert successfully",
        data: data
    })
    
}
const update =async (req,res)=>{
    const {
        Id,InvoiceNo,ShiftDetailId,CustomerId,PaymentMethodId,TotalAmount,InvoiceStatusId,TotalPaid
    } = req.body;
    var sqlUpdate = "UPDATE invoice SET InvoiceNo=?,ShiftDetailId=?,CustomerId=?,PaymentMethodId=?,TotalAmount=?,InvoiceStatusId=?,TotalPaid=? WHERE Id = ?";
    var param = [ InvoiceNo,ShiftDetailId,CustomerId,PaymentMethodId,TotalAmount,InvoiceStatusId,TotalPaid,Id];
    const data = await db.query(sqlUpdate,param);
    res.json({
        message : "Update success!",
        data:data
    })
    
}
const remove = async (req,res)=>{
    const {Id} = req.params;
    var sqldelete= "DELETE FROM invoice  WHERE Id =?";
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

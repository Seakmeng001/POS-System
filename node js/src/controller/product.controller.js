
const db= require("../util/db");
const { removeFile} = require("../util/herper")
const pageSize = 3;

const getAll = async (req, res) => {
    try {
        var {
            txtSearch,
            page = 1 // Default to page 1 if not provided
        } = req.query;

        page = parseInt(page);
        if (isNaN(page) || page < 1) page = 1; // Ensure page is a valid number and at least 1

        var offset = (page - 1) * pageSize; // Calculate offset

        var param = [];
        var sqlSelect = "SELECT * FROM product";
        var sqlWhere = "";

        if (txtSearch && txtSearch.trim() !== "") {
            sqlWhere = " WHERE name LIKE ?";
            param.push(`%${txtSearch.trim()}%`);
        }

        var orderBy = " ORDER BY id DESC";
        var limit = ` LIMIT ${pageSize} OFFSET ${offset}`;
        var sql = `${sqlSelect}${sqlWhere}${orderBy}${limit}`;

        const list = await db.query(sql, param);

        var total = 0;
        if (page === 1) {
            var sqlCount = "SELECT COUNT(id) as Total FROM product";
            var countSql = `${sqlCount}${sqlWhere}`;
            const totalResult = await db.query(countSql, param);
            total = totalResult[0].Total;
        }

        res.json({
            list: list,
            total: total
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

// const getAll = async(req,res)=>{
//     try{
//     var sqlSelect = "SELECT * FROM product ORDER BY id DESC";
//     var sqlTotals = "SELECT COUNT (id) as Total FROM product";
//     const list = await db.query(sqlSelect)
//     const total = await db.query(sqlTotals)
//     res.json({
//         list: list,
//         total: total
//     }) 
//     }catch(err){
        
//     }

    
// }

   
    

const getOne = async(req,res)=>{
    const {id}= req.params;
    var sqlSelect= "SELECT * FROM product WHERE id=?";
    var param=[id]
    const list = await db.query(sqlSelect,param)
    res.json({
        list: list,
        
    })


    
}
const create = async (req,res) => {
    try{
        const {
            name, description, categoryId, status, price,id
        } = req.body;
        var filename = null;
        if(req.file){
            filename = req.file.filename
        }
        var sqlInsert = "INSERT INTO product ( name, image , description, categoryId, status, price,id) VALUES (?,?,?,?,?,?,?) ";
        var param = [  name,filename, description, categoryId, status, price,id];
        const data = await db.query(sqlInsert,param);
        res.json({
            message : "Insert success!",
            data:data
        })
    }catch(error){
        res.status(500).send({
            message : error.message
        })
    }
}
const update = (req, res) => {
    const {
        name, description, categoryId, status, price, image, is_remove_file, id
    } = req.body;
    
    var filename = image;
    if (req.file) {
        filename = req.file.filename;
    }
  
    db.query("SELECT * FROM product WHERE id = ?", [id], (error1, row1) => {
        if (error1) {
            console.error("Error selecting product:", error1);
            return res.json({ error: true, message: "Error selecting product" });
        }
        
        if (row1.length === 0) {
            return res.json({ error: true, message: "Product not found!" });
        }

        var sql = "UPDATE product SET name=?, description=?, categoryId=?, status=?, price=?, image=? WHERE id=?";
        var params = [name, description, categoryId, status, price, filename, id];

        db.query(sql, params, (error, rows) => {
            if (error) {
                console.error("Error updating product:", error);
                return res.json({ error: true, message: "Error updating product" });
            }

            if (rows.affectedRows !== 0) {
                if (req.file || image === null) {
                    if (row1[0].image != null && row1[0].image !== "") {
                        removeFile(row1[0].image); // Remove old image if it exists
                    }
                }
            }

            res.json({
                message: rows.affectedRows !== 0 ? "Update success!" : "No changes made to the product",
                data: rows,
                is_remove_file: is_remove_file
            });
        });
    });
}






const remove = async (req,res)=>{
    const {id} = req.params;
    var sqldelete= "DELETE FROM product WHERE id =?";
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

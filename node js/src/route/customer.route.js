const customerController = require("../controller/customer.controller")

const customer= (app)=>{
    
    app.get("/api/customer",customerController.getAll)
    app.post("/api/customer",customerController.create)
    app.delete("/api/customer/:id",customerController.remove)
    app.put("/api/customer",customerController.update)

}
module.exports = customer
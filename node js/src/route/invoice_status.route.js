
const controller = require("../controller/invoice_status.controller")
const invoice_status = (app)=>{
    app.get("/api/invoice_status",controller.getAll);
    app.get("/api/invoice_status/:id",controller.getOne);
    app.post("/api/invoice_status",controller.create);
    app.put("/api/invoice_status",controller.update);
    app.delete("/api/invoice_status/:id",controller.remove);
}
module.exports = invoice_status
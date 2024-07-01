
const controller = require("../controller/payment_method.controller")
const payment_method = (app)=>{
    app.get("/api/payment_method",controller.getAll);
    app.get("/api/payment_method/:Id",controller.getOne);
    app.post("/api/payment_method",controller.create);
    app.put("/api/payment_method",controller.update);
    app.delete("/api/payment_method/:Id",controller.remove);
}
module.exports = payment_method
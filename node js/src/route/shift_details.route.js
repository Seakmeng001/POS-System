
const controller = require("../controller/shift_details.controller")
const shift_details= (app)=>{
    app.get("/api/shift_details",controller.getAll);
    app.get("/api/shift_details/:Id",controller.getOne);
    app.post("/api/shift_details",controller.create);
    app.put("/api/shift_details",controller.update);
    app.delete("/api/shift_details/:Id",controller.remove);
}
module.exports = shift_details
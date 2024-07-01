
const controller = require("../controller/role.controller")
const role = (app)=>{
    app.get("/api/role",controller.getAll);
    app.get("/api/role/:id",controller.getOne);
    app.post("/api/role",controller.create);
    app.put("/api/role",controller.update);
    app.delete("/api/role/:id",controller.remove);
}
module.exports = role
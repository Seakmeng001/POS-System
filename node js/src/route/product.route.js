
const controller = require("../controller/product.controller")
const {upload} = require("../util/herper")
const product = (app)=>{
    app.get("/api/product",controller.getAll);
    app.get("/api/product/:id",controller.getOne);
    app.post("/api/product",upload.single("image_pro"),controller.create);
    app.put("/api/product",upload.single("image_pro"),controller.update)
    app.delete("/api/product/:id",controller.remove);
    
}
module.exports = product
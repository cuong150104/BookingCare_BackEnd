import express from "express"
import homeController from "../controllers/homeControllers.js";
let router = express.Router();

const initWebRoutes = (app) =>{
    router.get('/',homeController.getHomePage);

    return app.use("/", router);
}

module.exports = initWebRoutes;
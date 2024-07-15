import express from "express"
import homeController from "../controllers/homeControllers.js";
let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/getCRUD', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    
    return app.use("/", router);
}

module.exports = initWebRoutes;
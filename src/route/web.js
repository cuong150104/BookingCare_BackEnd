import express from "express"
import homeController from "../controllers/homeControllers.js";
import userController from '../controllers/userController.js';
let router = express.Router();

const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/getCRUD', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handelLogin);
    router.get('/api/get-all-user', userController.handleGetAllUsers)
    return app.use("/", router);
}

module.exports = initWebRoutes;
import db from "../models/index";
import CRUDServices from '../services/CRUDServices';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }
}

const getCRUD = (req, res) => {
    try {
        return res.render('crud.ejs');
    } catch (e) {
        console.log(e);
    }
}

const postCRUD = async (req, res) => {
    console.log(req.body);
    let message = await CRUDServices.createNewUser(req.body);
    return res.send("xin chao post crud");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();

    console.log(data);

    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        let dataUser = await CRUDServices.userInfoByUserId(userId);
        console.log(dataUser);
        return res.render('editCRUD.ejs', {
            user: dataUser
        });
    } catch (error) {
        console.log(error);
    }

}

let putCRUD = async (req, res) => {
    try {
        let data = req.body;

        let newData = await CRUDServices.putCRUD(data)

        return res.render('displayCRUD.ejs', {
            dataTable: newData
        });
    } catch (error) {
        console.log(error);

    }

}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD
}
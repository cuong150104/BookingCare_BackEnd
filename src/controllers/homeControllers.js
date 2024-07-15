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

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
}
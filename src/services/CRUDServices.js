import bcrypt from 'bcryptjs';
import db from "../models/index";
import { raw } from 'body-parser';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);


let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                roleId: data.roleId
            })
            resolve('ok create a new user seccess');
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let userInfoByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                let dataUserById = await db.User.findOne({
                    where: { id: userId },
                    raw: true
                })
                console.log(dataUserById);
                resolve(dataUserById);
            } else {

            }
        } catch (error) {
            reject(error)
        }
    })
}

let putCRUD = (data) => {
    return new Promise(async (sesolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.User.findAll();
                sesolve(allUsers);
            } else {
                sesolve(await db.User.findAll());
            }
        } catch (error) {
            console.log(error);
        }
    })
}

let deleteUserById = async (id) => {
    
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await user.destroy();
        }


    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createNewUser,
    getAllUser,
    userInfoByUserId,
    putCRUD,
    deleteUserById
}
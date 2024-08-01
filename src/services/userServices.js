import bcrypt from 'bcryptjs';
import db from "../models/index";
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let handelUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's Email isn't exist in your system. Plase try other email!`
            }
            resolve(userData);


        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(">>check id services", userId)
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== 'ALL') {
                users =  await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users);
        } catch (error) {
            reject(error)
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

let  createNewUser = (data) =>{
    return new Promise(async (resolve, reject) => {
        let check = await checkUserEmail(data.email);
        if(check === true)
        {
            resolve({
                errCode: 1,
                message: 'your email is already is used, plase try another email'
            })
        }
        try{
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
            resolve({
                errCode: 0,
                message: 'OK'
            });
        }catch(e)
        {
            reject(e);
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            console.log(">>check id", user);

            if (!user) {
                console.log(">>User not found", user);
                resolve({
                    errCode: 2,
                    errMessage: `The user doesn't exist`
                });
                return;
            }

            await db.User.destroy({ where: { id: id } });
            resolve({
                errCode: 0,
                message: 'The user is deleted'
            });
        } catch (error) {
            reject({
                errCode: 1,
                errMessage: 'An error occurred'
            });
        }
    });
}

module.exports = {
    handelUserLogin,
    checkUserEmail,
    getAllUsers,
    createNewUser,
    deleteUser
}
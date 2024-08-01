import userServices from '../services/userServices'

let handelLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input parameter',

        })
    }

    let userData = await userServices.handelUserLogin(email, password);

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing required parrameters',
            users: []
        })
    }

    let users = await userServices.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userServices.createNewUser(req.body);
    console.log(req.body);
    return res.status(200).json({
        message
    })
}

let handelDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing requied parameter"
        })
    }
    let message = await userServices.deleteUser(req.body.id);

    return res.status(200).json(
        message
    )
}

let handelEdiUser = (req, res) => {

}
module.exports = {
    handelLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handelDeleteUser,
    handelEdiUser

}
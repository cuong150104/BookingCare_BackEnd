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
    let id = req.body.id;

    if(!id)
    {
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

module.exports = {
    handelLogin,
    handleGetAllUsers

}
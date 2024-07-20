

let handelLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email)
    return res.status(200).json({
        message: 'hello word',
        email: email,
        password: password
    })
}

module.exports = {
    handelLogin,

}
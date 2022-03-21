const User = require('../users/model')
const {StatusCodes} = require('http-status-codes')

const signup = async(req, res, next) => {
    try {
        const {email, password, name, role} = req.body;
        const result = new User({email, password,name,role});
        await result.save();
        delete result._doc.password;
        res.status(StatusCodes.CREATED).json({data: result});
    } catch (error) {
        next(error)
    }
}

module.exports ={signup};
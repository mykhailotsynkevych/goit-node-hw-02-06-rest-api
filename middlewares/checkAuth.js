const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const  createError = require('../helpers/createError');
const User = require('../models/userModel');

async function checkAuth(req, res, next) {
    try {
        const { authorization = '' } = req.headers;
        // console.log(authorization);
        const [bearer, token] = authorization.split(' ');
        // console.log(token);

        if (bearer !== 'Bearer') {
            throw createError(401, 'Not authorized');
        }

        const { id } = jwt.verify(token, jwtSecret);
        // console.log(id);
        // const user = await User.findById(id);

        // if (!user || !user.token || token !== user.token) {
        //     throw createError(401, 'Not authorized');
        // }

        // req.user = user

        next();
    } catch (error) {
        const authError = createError(
            error.status || 401,
            error.message || 'Not authorized'
        );
        next(authError);
    }
}

module.exports = checkAuth;
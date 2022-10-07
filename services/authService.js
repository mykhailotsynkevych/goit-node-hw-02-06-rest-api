const User = require('../models/userModel');
// const { createError } = require('../helpers');
// const { notValidCredentials } = require('../constants');
// const bcrypt = require('bcryptjs');

async function register(body) {
    const { email, password, subscription } = body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Error (409, 'Email in use');
    }

    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(password, salt);

    const result = await User.create({
        email,
        password,
        subscription
    });

    const { password: newUserPassword, ...newUser } = result.toObject()

    return newUser;
}

// async function login(body) {
//     const { email, password } = body;
//     const user = await User.findOne({ email });

//     if (!user) {
//         throw createError(401, notValidCredentials);
//     }

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) {
//         throw createError(401, notValidCredentials);
//     }

//     const { password: existingUserPassword, ...existingUser } = user.toObject()

//     return {
//         user: existingUser,
//         token: '4gg5g5g55g56g5',
//     };
// }

module.exports = {
    register,
    // login
};
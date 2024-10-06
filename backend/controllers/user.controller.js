const User = require('../models/user.model');
const shortId = require('shortid');

const findUser = async (searchParam, type) => {
    try {
        let user;
        if (type === 'emailId') {
            user = await User.findOne({ emailId: searchParam }).exec()
        } else {
            user = await User.findById(searchParam).exec();
        } 
        return user;
    } catch (error) {
        console.log(error);
    }
}

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const userDetails = req.body;

        const userById = await findUser(userDetails.userId, "userId");
        const userByEmail = await findUser(userDetails.emailId, "emailId");
        if(!userByEmail && !userById) {
            const newUser = new User({
                userId: shortId.generate(),
                emailId: userDetails.emailId,
                userName: userDetails.userName,
                role: userDetails.role,
                numberOfQueries: userDetails.role=='customer' ? 0 : undefined,
            });
            const user = await newUser.save();
            res.status(200).json(user)
        } else {
            return res.status(200).json({ message: "User exists", user: userByEmail });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    } 
}

module.exports = { findUser, createUser };
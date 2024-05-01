"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.getUserById = exports.loginUser = exports.getAllUsers = exports.createUser = void 0;
const crypto_1 = require("crypto");
const user_model_1 = require("../models/user.model");
const email_util_1 = require("../utils/email-util");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.find({})
        .then((u) => res.status(200).send({ data: u }))
        .catch((err) => res.send({ msg: err.message }));
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // Validate request
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Name, email, and password are required' });
    }
    try {
        const existingUser = yield user_model_1.User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({ message: 'User with the same email already exists' });
        }
        const hashedPassword = (0, crypto_1.createHash)('sha256').update(password).digest('hex');
        const newUser = new user_model_1.User({
            name: name,
            email: email,
            password: hashedPassword,
            user_type: 1
        });
        const savedUser = yield newUser.save();
        user_model_1.User.find({ user_type: 0 }).then((u) => {
            (0, email_util_1.prepareEmail)(u[0].email, 'user', `<b>A new User has been added to the Application with email ${email} </b>`);
        });
        res.status(201).send({ message: 'User created successfully', data: savedUser });
    }
    catch (err) {
        res.status(500).send({ message: 'Failed to create user', error: err.message });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        return res.status(200).send({ msg: 'The user with the email not present' });
    }
    if (user.password != (0, crypto_1.createHash)('sha256').update(password).digest('hex')) {
        return res.status(200).send({ msg: 'Incorrect password' });
    }
    else {
        let _user = {
            email: user.email,
            id: user._id,
            user_type: user.user_type,
            name: user.name
        };
        res.status(200).send({ msg: 'login successfully', data: _user });
    }
});
exports.loginUser = loginUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getUserById = getUserById;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const updateData = req.body;
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (updateData.password !== '')
            if ((0, crypto_1.createHash)('sha256').update(updateData.password).digest('hex') != user.password) {
                updateData.password = (0, crypto_1.createHash)('sha256').update(updateData.password).digest('hex');
            }
            else {
                res.status(500).json({ msg: 'Old Password does not match' });
            }
        Object.assign(user, updateData);
        yield user.save();
        res.status(200).json({ message: 'User updated successfully', data: user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateUserById = updateUserById;

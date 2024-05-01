import {Request, Response} from "express";
import {createHash} from 'crypto';

import {User} from '../models/user.model'
import {prepareEmail} from "../utils/email-util";

const getAllUsers = async (req: Request, res: Response) => {
    await User.find({})
        .then((u) =>
            res.status(200).send({data: u}))
        .catch((err) => res.send({msg: err.message}))
}

const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    // Validate request
    if (!name || !email || !password) {
        return res.status(400).send({message: 'Name, email, and password are required'});
    }

    try {
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(409).send({message: 'User with the same email already exists'});
        }

        const hashedPassword = createHash('sha256').update(password).digest('hex');

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            user_type: 1
        });

        const savedUser = await newUser.save();

        User.find({user_type: 0}).then((u: any) => {
            prepareEmail(u[0].email, 'user',`<b>A new User has been added to the Application with email ${email} </b>`)
        })

        res.status(201).send({message: 'User created successfully', data: savedUser});
    } catch (err: any) {
        res.status(500).send({message: 'Failed to create user', error: err.message});
    }
};

const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if (!user) {
        return res.status(200).send({msg: 'The user with the email not present'})
    }

    if (user.password != createHash('sha256').update(password).digest('hex')) {
        return res.status(200).send({msg: 'Incorrect password'})
    } else {
        let _user = {
            email: user.email,
            id: user._id,
            user_type: user.user_type,
            name: user.name
        }
        res.status(200).send({msg: 'login successfully', data: _user})
    }
}

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({data: user});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

const updateUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updateData = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        if (updateData.password !== '')
            if (createHash('sha256').update(updateData.password).digest('hex') != user.password) {
                updateData.password = createHash('sha256').update(updateData.password).digest('hex');
            } else {
                res.status(500).json({msg: 'Old Password does not match'});
            }

        Object.assign(user, updateData);

        await user.save();

        res.status(200).json({message: 'User updated successfully', data: user});
    } catch (err: any) {
        res.status(500).json({message: err.message});
    }
};

export {createUser, getAllUsers, loginUser, getUserById, updateUserById}

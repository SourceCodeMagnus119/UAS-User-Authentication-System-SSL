import * as mongoose from 'mongoose';
import { createSecretToken } from '../util/sercretToken';
import { Request, Response } from 'express';
import userSchema from '../models/userModel';
import bcrypt from 'bcrypt';

const User = mongoose.model("User", userSchema);
export class userController {
    public static async createUser(req: Request, res: Response) {
        const newUser = new User();

        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: `Error creating user` });
        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!email) {
                res.status(400).json({ message: `Email does not exist on database` });
            }
            const check = await bcrypt.compare(password, user.password);
            if(!check) {
                res.status(400).json({ message: `Invalid email or password. Please try again.`});
            }
            const token = createSecretToken({ id: user._id.toString() });
            res.send({
                id: user._id,
                username: user.username,
                token: token
            });
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: err });
        }
    }

    public static async getAllUsers(req: Request, res: Response) {
        try {
            User.find({}, (err, User) => {
                if(err) {
                    res.send(err);
                }
                res.json(User);
            });
        } catch(err) {
            res.status(500).json({ message: `Error getting all users` });
        }
    }

    public static async getUserById(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            if(!user) {
                res.status(200).json({ message: `User does not exists`});
            }
            res.json(user);
        } catch(err) {
            console.error(err);
            res.status(500).json({ message: `Error fetching User ${req.params.id}` });
        }
    }

    public static async changePassword(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const cryptedPassword = await bcrypt.hash(password, 12);
            await User.findOneAndUpdate(
                { email },
                {
                    password: cryptedPassword
                }
            );
            res.status(200).json({ message: `Ok` });
        } catch(err) {
            res.status(500).json({ message: `Error changing password` });
        }
    }

    public static async deleteAcc(req: Request, res: Response) {
        try {
            const deleteUser = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(deleteUser);
        } catch(err) {
            res.status(500).json({ message: `Error deleting account. Please try again later` });
        }
    }
}
import {model, Schema} from "mongoose";

interface IUser extends Document {
    id?: number;
    name: string;
    email: string;
    password: string;
    user_type: number
}

const userSchema: Schema = new Schema<IUser>({
    name: String,
    user_type: Number,
    email: {type: String, unique: true},
    password: String,
})

const User = model<IUser>('users', userSchema)

export {User, IUser}

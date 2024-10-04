import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';


export interface UserInterface extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    password: string;
    email: string;
    phone: number;
    isBlocked: boolean;
    role: 'Manager' | 'Employee';
    profile_picture: string;
    isAdmin?:boolean;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}


const userSchema: Schema<UserInterface> = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['Manager', 'Employee'],
        default: 'Employee'
    },
    profile_picture: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png"
    },

}, {
    timestamps: true,
});

userSchema.pre('save', async function (this: UserInterface, next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
});

userSchema.methods.matchPassword = async function (this: UserInterface, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<UserInterface> = mongoose.model<UserInterface>('User', userSchema);
export default userModel;
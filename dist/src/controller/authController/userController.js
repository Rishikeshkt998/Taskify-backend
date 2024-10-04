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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.authUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../../models/auth/userModel"));
const generateToken_1 = __importDefault(require("../../helper/generateToken"));
// const registerUser = async (req: Request, res: Response) => {
//     const { name, email, phone, password, role } = req.body;
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password,
//     role,
//   });
//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone:user.phone,
//       role: user.role,
//       token: generateToken(user._id, user.role),
//       success: true,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Error occurred');
//   }
// };
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password, role } = req.body;
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const isAdmin = role === "Manager" ? true : false;
    const user = yield userModel_1.default.create({
        name,
        email,
        phone,
        password,
        role,
        isAdmin,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id, user.role),
            success: true,
        });
    }
    else {
        res.status(400);
        throw new Error('Error occurred');
    }
});
exports.registerUser = registerUser;
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.default)(user._id, user.role),
            success: true,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});
exports.authUser = authUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find({ isAdmin: false });
        console.log(users);
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getUsers = getUsers;

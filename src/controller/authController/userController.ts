
import { Request, Response } from 'express';
import User from '../../models/auth/userModel';
import generateToken from '../../helper/generateToken';

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
const registerUser = async (req: Request, res: Response) => {
    const { name, email, phone, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const isAdmin = role === "Manager" ? true : false;
    const user = await User.create({
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
            token: generateToken(user._id, user.role),
            success: true,
        });
    } else {
        res.status(400);
        throw new Error('Error occurred');
    }
};

const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin:user.isAdmin,
      token: generateToken(user._id, user.role),
      success: true,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
};


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ isAdmin: false }); 
        console.log(users)

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({
            success: true,
            users, 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

export { registerUser, authUser, getUsers };
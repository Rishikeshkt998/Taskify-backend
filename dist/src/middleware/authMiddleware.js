"use strict";
// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import asyncHandler from 'express-async-handler';
// import User from "../models/auth/userModel";
// interface DecodedToken {
//   id: string;
// }
// const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//   let token: string | undefined;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       console.log(token, 'hiii');
//       const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as DecodedToken;
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });
// export { protect };

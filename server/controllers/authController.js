const User = require('../models/userModel');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
exports.singup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError('User already exists!', 400));
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
           ...req.body,
              password: hashPassword

        });

        // JWT: Json Web Token
        const token = jwt.sign({_id: newUser._id }, 'secretkey123', {
            expiresIn: '90d'
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully!',
            token
        });

    } catch (err) {
        next(err);
    }
};
// LOGIN USER
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new createError('Please provide email and password!', 400));
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new createError('Incorrect email or password!', 401));
        }

        const token = jwt.sign({ _id: user._id }, 'secretkey123', {
            expiresIn: '90d'
        });

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        next(err);
    }
};
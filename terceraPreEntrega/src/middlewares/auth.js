import __dirname from '../utils.js';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    } else {
        res.redirect('/profile');
    }
};

export const isAdmin = (req, res, next) => {
    console.log(req.session.user)
    if (!req.session.user) {
        if (req.session.user.email == process.env.ADMIN_EMAIL) {
            return next();
        }
    } else {
        res.redirect('/profile');
    }
};

export const isUser = (req, res, next) => {
    if (!req.session.user) {
        if (req.session.user.email != process.env.ADMIN_EMAIL) {
            return next();
        }
    } else {
        res.redirect('/profile');
    }
};
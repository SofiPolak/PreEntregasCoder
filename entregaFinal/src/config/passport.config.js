import passport from "passport";
import local from 'passport-local'
import userService from '../dao/models/users.model.js'
import cartService from '../dao/models/cart.model.js'
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2';
import path from 'path';
import __dirname from '../utils.js';
import dotenv from 'dotenv'

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                let user = await userService.findOne({ email: username })
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                let cart = await cartService.create({ products: [] });
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart
                }
                let result = await userService.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy({
        clientID: "Iv23liyy5dDp25mioyfc",
        clientSecret: "2eade64c4c72cd3cdf2fe603e279a3168bf6294a",
        //clientID: process.env.clientID,
        //clientSecret: process.env.clientSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 20,
                    email: profile._json.email,
                    password: ""
                }
                let result = await userService.create(newUser)
                done(null, result)
            }
            else {
                done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id)
        done(null, user)
    })


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userService.findOne({ email: username })
            if (!user) {
                console.log("El usuario no existe")
                return done(null, user)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
    /*
        passport.use('changePass', new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' }, async (req, username, newPassword, done) => {
                const { newPassword } = req.body;
                console.log(newPassword)
                console.log(username)
    
                try {
                    let user = await userService.findOne({ email: username })
                    console.log(user)
                    if (!user) {
                        console.log("El usuario no existe")
                        return done(null, false)
                    }
    
                    // Verificar que la nueva contraseña no sea igual a la antigua
                    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    
                    if (isNewPasswordSame) {
                        console.log("La nueva contraseña no puede ser la misma que la antigua");
                        return done(null, false, { message: 'La nueva contraseña no puede ser la misma que la antigua' });
                    }
    
                    // Actualizar la contraseña del usuario
                    user.password = createHash(newPassword);
                    await user.save();
    
                    return done(null, user);
    
                } catch (error) {
                    return done("Error al cambiar contraseña del usuario" + error)
                }
            }
        ))*/

}


export default initializePassport
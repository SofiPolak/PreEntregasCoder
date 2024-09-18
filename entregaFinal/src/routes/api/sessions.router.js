import { Router } from 'express';
import passport from 'passport';
import __dirname from '../../utils.js';
import dotenv from 'dotenv';
import path from 'path';
import userModel from '../../dao/models/users.model.js';

const envPath = path.resolve(__dirname, 'src', '.env');
dotenv.config({ path: envPath });

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: 'failregister' }), async (req, res) => {
    res.redirect('/login');
});

router.get('/failregister', async (req, res) => {
    console.log("Estrategia fallida")
    //req.logger.fatal("Hubo un fallo en el registro del usuario");
    res.send({ error: "Falló" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'faillogin' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: "error", error: "Datos incompletos" })
    try {
        let role = "user";
        if (req.user.email == process.env.ADMIN_EMAIL) {
            role = "admin";
        }

        await userModel.findByIdAndUpdate(req.user._id, {
            last_connection: new Date()
        });

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role,
            cart: req.user.cart
        };
        //req.logger.info("Se muestra la cookie");
        console.log(req.headers.cookie.replace("connect.sid=", ""));
        res.redirect('/products');

    } catch (err) {
        //req.logger.error("Se produjo un error al iniciar sesion");
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/faillogin', (req, res) => {
    res.send({ error: "Login fallido" })
})

router.post('/logout', async (req, res) => {
    const userId = req.session.passport.user;
    await userModel.findByIdAndUpdate(userId, {
        last_connection: new Date()
    });
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => { })


router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    let role = "user";
    if (req.user.email == process.env.ADMIN_EMAIL) {
        role = "admin";
    }
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role,
        cart: req.user.cart
    };
    //req.logger.info("Se inicia sesion y se redirige a productos");
    res.redirect("/products")
})
/*
router.post('/changePass', passport.authenticate('changePass', { failureRedirect: 'failregister' }), async (req, res) => {
    res.redirect('/login');
});*/

export default router;
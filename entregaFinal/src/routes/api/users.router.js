import { Router } from "express";
import nodemailer from "nodemailer";
import { createHash } from "../../utils.js";
import userService from '../../dao/models/users.model.js'
import bcrypt from 'bcryptjs';
import {upload} from '../../utils.js';
const router = Router();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "sofiadanielapolak@gmail.com",
        pass: "anwz yeiy dana cvso"
    },
});

router.get('/mailPass', async (req, res) => {

    await transport.sendMail(
        {
            from: "sofiadanielapolak@gmail.com",
            to: "sofi_polak@hotmail.com",
            subject: "Restablecer contraseña",
            html: `<div>
                <h2>Para restablecer su contraseña haga click en el boton.</h2>
                <a href="http://localhost:8080/changePass">Restablecer contraseña</a>
                </div>`
        }
    )
    res.send("Se le ha enviado un mail para restablecer la contraseña")
})

router.post('/changePass', async (req, res) => {

    const { email, newPassword } = req.body;
    let user = await userService.findOne({ email: email })

    if (!user) {
        res.send({ message: "El usuario no existe" })
        return
    }

    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame) {
        res.send({ message: 'La nueva contraseña no puede ser la misma que la antigua' });
        return
    }

    user.password = createHash(newPassword);
    await user.save();
    res.redirect('/login');
});

router.put('/admin/:uid', async (req, res) => {
    let { uid } = req.params
    let { role } = req.body
    const user = await userService.findById(uid);
    if (user.documents.length < 3 && role === 'premium') {
        return res.status(400).json({ message: 'User must have at least 3 documents to be upgraded to premium.' });
    }
    const result = await userService.updateOne({ _id: uid }, { role: role })
    res.send({ result: "success", payload: result });
})

router.post('/admin/:uid', async (req, res) => {
    let { uid } = req.params
    let { role } = req.body
    /*const user = await userService.findById(uid);
    if (user.documents.length < 3 && role === 'premium') {
        return res.status(400).json({ message: 'User must have at least 3 documents to be upgraded to premium.' });
    }*/
    const result = await userService.updateOne({ _id: uid }, { role: role })
    res.send({ result: "success", payload: result });
})

router.post('/:uid/documents', upload.array('documents'), async (req, res) => {
    const userId = req.params.uid;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    try {
        const documents = files.map(file => ({
            name: file.originalname,
            reference: file.path
        }));

        const user = await userService.findByIdAndUpdate(
            userId,
            {
                $push: { documents: { $each: documents } },
                last_connection: new Date()
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Documents uploaded and user updated.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
    }
});

router.get('/', async (req, res) => {
    const users = await userService.find();

    const result = users.map(user => ({
        nombre: user.first_name,
        apellido: user.last_name,
        email: user.email,
        rol: user.role
    }));
    
    res.send({ result: "success", payload: result });
})

router.delete('/', async (req, res) => {
    const users = await userService.find();

    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - 2));
    
    const inactiveUsers = users.filter(user => new Date(user.last_connection) < cutoffDate);

    for (const user of inactiveUsers) {
        await transport.sendMail({
            from: "sofiadanielapolak@gmail.com",
            to: user.email,
            subject: "Su cuenta ha sido eliminada por inactividad",
            html: `<div>
                <h2>Su cuenta en el ecommerce ha sido eliminada por inactividad.</h2>
                </div>`
        });
    }
    
    if (inactiveUsers.length > 0) {
        await Promise.all(inactiveUsers.map(user => userService.deleteOne({ _id: user.id })));
    }
    
    res.send({ result: "success", message: `${inactiveUsers.length} usuarios inactivos eliminados.` });

})

router.post('/delete/:uid', async (req, res) => {

    const userId = req.params.uid;
    const result = await userService.deleteOne({ _id: userId });
    res.send({ result: "success", payload: result });

})

export default router;
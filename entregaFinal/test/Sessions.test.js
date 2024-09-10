import mongoose from "mongoose";
import assert from "assert";
import * as chai from "chai";
import { expect } from 'chai';
import supertest from "supertest";
import dotenv from 'dotenv'

dotenv.config({ path: './src/.env' });

const requester = supertest("http://localhost:8080")

mongoose.connect(process.env.MONGODB);

describe("Testing Sessions",()=>{

    let cookie;

    it("Debe registrar correctamente un usuario", async function(){

        let mockUser = {
            first_name: "newUser",
            last_name: "lastName",
            email: "c@c.com",
            age: 10,
            password: "hola",
            role: "user"
        }

        const response = await requester.post('/api/sessions/register').send(mockUser)
         // Verificar el código de estado de redirección
        expect(response.statusCode).to.be.oneOf([302, 303]);

        // Verificar el encabezado Location para asegurarse de que la redirección es correcta
        // Cambia la URL esperada a la que corresponde con tu aplicación
        expect(response.headers.location).to.equal('/login');
    })

    it("Debe loguear correctamente al usuario y devolver una cookie", async function(){

        let mockUser = {
            email: "c@c.com",
            password: "hola"
        }

        const result = await requester.post('/api/sessions/login').send(mockUser)
        const cookieResult = result.headers['set-cookie'][0]
        expect(cookieResult).to.be.ok;
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.ok;
        expect(cookie.value).to.be.ok;
    })

    it("Debe cerrar sesión", async function(){

        const response = await requester.post('/api/sessions/logout');

        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal('/login');
    })

})
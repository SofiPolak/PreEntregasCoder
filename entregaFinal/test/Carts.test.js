import mongoose from "mongoose";
import Cart from "../src/dao/db/cartManager.js"
import assert from "assert";
import * as chai from "chai";
import { expect } from 'chai';
import supertest from "supertest";
import dotenv from 'dotenv'

dotenv.config({ path: './src/.env' });

const requester = supertest("http://localhost:8080")

//mongoose.connect(process.env.MONGODB);

mongoose.connect("mongodb+srv://mibase:mibase@codercluster.ovjhyvw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster");

describe("Testing Carts",()=>{

    before(function(){
    
        this.CartsDao = new Cart();
    
    })
    
    it("Debería retornar carritos desde la DB", async function(){
    
        this.timeout(5000)
    
        try {
    
            const result = await this.CartsDao.checkCarts()
    
            assert.strictEqual(Array.isArray(result) && result.length > 0, true)
    
        } catch (error) {
    
            console.error("Error durante el test", error)
    
            assert.fail("Test fallido con errores")
    
        }
    
    })

    it("Debería agregar un carrito a la DB", async function(){

        this.timeout(5000)

        const result = await this.CartsDao.addCart();
        assert.ok(result._id)

    })
    
    describe('SuperTest de carritos', () => {

        it('El enpoint DELETE /api/carts/:cid debe eliminar los productos de un carrito', async () => {

            let idCart = "66c21908985517434d66663c";

            const { statusCode, ok, _body } = await requester.delete(`/api/carts/:${idCart}`)
            expect(statusCode).to.equal(200);
        })
    })
     
    /*
    beforeEach(function(){
    
        mongoose.connection.collections.carts.drop()
    
        this.timeout(5000)
    
    })*/
    
    })
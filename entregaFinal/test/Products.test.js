import mongoose from "mongoose";
import Product from "../src/dao/db/productManager.js"
import assert from "assert";
import * as chai from "chai";
import { expect } from 'chai';
import supertest from "supertest";
import dotenv from 'dotenv'

dotenv.config({ path: './src/.env' });

const requester = supertest("http://localhost:8080")

//mongoose.connect(process.env.MONGODB);

mongoose.connect("mongodb+srv://mibase:mibase@codercluster.ovjhyvw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster");

describe("Testing Products",()=>{

    before(function(){
    
        this.productsDao = new Product();
    
    })

        it("Debería agregar un producto a la DB", async function(){

            this.timeout(5000)

            let mockProduct = {
                title: "newProductTest",
                description: "newProductTest",
                price: 150,
                thumbnail: "newProductTest",
                code: "newProductTest",
                stock: 150,
                available: true,
                category: "newProductTest",
                owner: "admin"
            }

            const result = await this.productsDao.addProduct(mockProduct.title, mockProduct.description, mockProduct.price, mockProduct.thumbnail, mockProduct.code, mockProduct.stock, mockProduct.available, mockProduct.category, mockProduct.owner);
            assert.ok(result._id)

        })

        it("Debería obtener un producto por id de la DB", async function(){

            this.timeout(5000)

            const idProducto = "664e767da1604d347baf79d3";

            const result = await this.productsDao.getProductById(idProducto);
            assert.strictEqual( typeof result, 'object');

        })

        describe('SuperTest de productos', () => {

            it('El enpoint POST /api/products debe crear un producto correctamente', async () => {
    
                let mockProduct = {
                    title: "newProductTest2",
                    description: "newProductTest2",
                    price: 150,
                    thumbnail: "newProductTest2",
                    code: "newProductTest2",
                    stock: 150,
                    available: true,
                    category: "newProductTest2",
                    owner: "admin"
                }
    
                const { statusCode, ok, _body } = await requester.post('/api/products').send(mockProduct)
                expect(_body.payload).to.have.property('_id')
            })
        })
     
    /*
    beforeEach(function(){
    
        mongoose.connection.collections.products.drop()
    
        this.timeout(5000)
    
    })*/
    
    })
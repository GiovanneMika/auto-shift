import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

let connection: Connection;



describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX-XXXX')`
        );
        // await new Promise(resolve => setTimeout(resolve, 1500));
    });

    afterAll(async () => {
        // await new Promise(resolve => setTimeout(resolve, 1500));
        // await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@email.com",
            password: "admin"
        });
        // await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Response Token:", responseToken.body);
        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send(
            {
                name: "Category Supertest34",
                description: "Category Supertest24"
            }
        ).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    });

    it("should not be able to create a duplicate category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@email.com",
            password: "admin"
        });
        // await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Response Token:", responseToken.body);
        const { token } = responseToken.body;

        await request(app).post("/categories").send(
            {
                name: "Category Supertest Duplicate",
                description: "Category Supertest"
            }
        ).set({
            Authorization: `Bearer ${token}`
        });
        // await new Promise(resolve => setTimeout(resolve, 500));
        const response = await request(app).post("/categories").send(
            {
                name: "Category Supertest Duplicate",
                description: "Category Supertest"
            }
        ).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(400);
    });
});
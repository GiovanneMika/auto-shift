import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

let connection: Connection;



describe("List Categories Controller", () => {
    let token: string;

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXX-XXXX')`
        );

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@email.com",
            password: "admin"
        });
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log("Response Token:", responseToken.body);
        token = responseToken.body.token;
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list categories", async () => {
        //cadastro de categorias para listagem
        await request(app).post("/categories").send(
            {
                name: "Category Supertest List",
                description: "Category Supertest List"
            }
        ).set({
            Authorization: `Bearer ${token}`
        });

        await request(app).post("/categories").send(
            {
                name: "Category Supertest List2",
                description: "Category Supertest List2"
            }
        ).set({
            Authorization: `Bearer ${token}`
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await request(app).get("/categories");
        console.log("List Categories Response:", response.body);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

});
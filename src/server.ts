import express from "express";

import "reflect-metadata";

import { router } from "./routes";

import swaggerUI from 'swagger-ui-express';

import swaggerFile from "./swagger.json";

import "./shared/container";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3333, () => console.log('Server is running on port 3333'));

app.get("/", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.use(router);
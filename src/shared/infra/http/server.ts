import express, { NextFunction, Request, Response } from "express";

import "reflect-metadata";

import { router } from "./routes";

import swaggerUI from 'swagger-ui-express';

import swaggerFile from "../../../swagger.json";

import "@shared/container";

import "../typeorm";
import { AppError } from "@shared/errors/AppError";

const app = express();

app.use(express.json());



app.get("/", (request, response) => {
    return response.json({ message: "Hello World" });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    })
})

app.listen(3333, () => console.log('Server is running on port 3333'));
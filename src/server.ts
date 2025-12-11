import express from 'express';

import { router } from './routes';

const app = express();

app.use(express.json());

app.listen(3333, () => console.log('Server is running on port 3333'));

app.get("/", (request, response)=> {
    return response.json({message: "Hello World"});
});

app.use(router);
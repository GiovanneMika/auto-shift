import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

import { specificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.listen(3333, () => console.log('Server is running on port 3333'));

app.post('/courses', (request, response)=> {
    const {name} = request.body;
    return response.status(201).json({
        message: name,
    })

})

app.get("/", (request, response)=> {
    return response.json({message: "Hello World"});
});

app.use("/categories", categoriesRoutes);

app.use("/specifications", specificationsRoutes);
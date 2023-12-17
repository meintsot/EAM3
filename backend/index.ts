import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

app.listen(8888, () => {
    console.log('Server started on port 8888');
})

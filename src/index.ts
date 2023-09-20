import express from 'express';
import postsRouter from './routes/posts.routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3005;

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`BC posts API running on port ${PORT}`);
});

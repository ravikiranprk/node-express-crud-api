import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', usersRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
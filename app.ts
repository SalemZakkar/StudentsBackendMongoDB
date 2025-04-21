import * as express from "express";

import * as dotenv from "dotenv";

import student_route from "./src/routes/student_route";

dotenv.config();

const app = express.default();

app.use(express.json());

app.use('/api/students', student_route)

export default app;
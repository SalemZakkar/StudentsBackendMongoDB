import * as express from "express";

import * as dotenv from "dotenv";

import student_route from "./src/students/router/student_route";
import qs from "qs";
import {errorHandlerMiddleWare} from "./src/errors/middleware/errorHandlerMiddleWare";

dotenv.config();

const app = express.default();

app.set('query parser', (str: string) => qs.parse(str));
app.use(express.json());

app.use('/api/students', student_route)

app.use(errorHandlerMiddleWare);

export default app;
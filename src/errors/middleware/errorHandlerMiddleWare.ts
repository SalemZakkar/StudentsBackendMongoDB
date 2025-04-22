import {ErrorRequestHandler} from "express";
import mongoose from "mongoose";
import {AppError} from "../model/AppErrorModel";

export const errorHandlerMiddleWare: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: "${err.value}"`;
    }

    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(', ');
    }
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        message = `Duplicate value for "${field}": "${value}"`;
    }

    if(err instanceof AppError){
        statusCode = err.code;
        message = err.message;

    }

    res.status(statusCode).json({status: 'Error', error: message, 'stack': err.stack,});
};
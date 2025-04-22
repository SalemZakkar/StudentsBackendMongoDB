import * as studentSchema from "../model/student_model";
import {Request, Response,} from "express";
import {BaseApiGet} from "../utils/BaseApiGet";
import {StudentModel} from "../model/student_model";

export function save(req: Request, res: Response,) {
    new studentSchema.StudentModel(req.body).save().then(() => {
        res.status(200).send({
            message: "Student saved successfully",
            data: req.body
        },)
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            stack: err.stack,
        })
    })

}


export function remove(req: Request, res: Response,) {
    studentSchema.StudentModel.findByIdAndDelete(req.params.id,).then(() => {
        res.status(200).send({
            message: "Student Delete successfully",
        })
    }).catch((e => {
        res.status(500).send({
            message: e.message,
            stack: e.stack,
        })
    }))
}


export function update(req: Request, res: Response,) {
    console.log(req.params)
    studentSchema.StudentModel.findByIdAndUpdate(req.params.id, req.body,).then(() => {
        res.status(200).send({
            message: "Student Edited successfully",
            data: req.body
        },)
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            stack: err.stack,
        })
    })

}


export async function get(req: Request, res: Response,) {
    let query = StudentModel.find();
    let params = new BaseApiGet(query, req,).paginate().filter();
    let students = await params.query;
    res.status(200).send({
        message: "Student Get Successfully",
        itemCount: await StudentModel.countDocuments(),
        data: students
    })

}

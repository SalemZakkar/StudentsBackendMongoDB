import {Request, Response} from "express";
import {StudentModel} from "../model/student_model";
import {BaseApiGet} from "../../core/model/BaseApiGet";
import {handler} from "../../errors/utils/handler";
import {NotFoundError} from "../../errors/model/AppErrorModel";

export const save = handler(async (req: Request, res: Response) => {
    const student = await new StudentModel(req.body).save();

    res.status(200).json({
        message: "Student saved successfully",
        data: student,
    });
});

export const remove = handler(async (req: Request, res: Response) => {
    await StudentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Student deleted successfully",
    });
});

export const update = handler(async (req: Request, res: Response) => {
    const updated = await StudentModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updated) {
        throw new NotFoundError("Student not found");
    }

    res.status(200).json({
        message: "Student updated successfully",
        data: updated,
    });
});

export const get = handler(async (req: Request, res: Response) => {
    const query = StudentModel.find();
    const params = new BaseApiGet(query, req).paginate().filter();
    const students = await params.query;

    res.status(200).json({
        message: "Students fetched successfully",
        itemCount: await StudentModel.countDocuments(),
        data: students,
    });
});

import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'Name is unique'],
    },
    school: String,
    mark: {type: Number, default: 0},
    age: Number,
});

export const StudentModel = mongoose.model("Student", studentSchema);

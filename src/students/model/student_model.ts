import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    school: {
        type: String,
        required: true,
    },
    mark: {type: Number, default: 0},
    age: Number,

}, {
    versionKey: false, toJSON: {
        virtuals: true,
        transform(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const StudentModel = mongoose.model("Student", studentSchema);

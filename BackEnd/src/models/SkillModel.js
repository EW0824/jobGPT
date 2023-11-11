import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        tag: {
            type: String,
            unique: true,
            required: true
        }
    }, {
        timestamps: true
    }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill
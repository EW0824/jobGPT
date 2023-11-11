import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
    {
        tag: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

const Skill = mongoose.model('Skill', skillSchema)

export default Skill
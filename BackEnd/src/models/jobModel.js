import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
    {
        jobName: {
            type: String,
            required: true
        },
        jobCompany: {
            type: String,
            required: true
        },
        jobDescription: {
            type: String,
            required: true
        },
        jobStatus: {
            type: String,
            enum: ['Applying','Accepted','Rejected','Waitlisted'],
            required: true
        },
        relevantExperiences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Experience'}],
        relevantSkills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill'}],
        generatedColdEmail: {
            type: String,
            required: false
        },
        generatedCoverLetter: {
            type: String,
            required: false
        },
    }, {
        timestamps: true
    }
)

const Job = mongoose.model("Job", jobSchema);

export default Job;
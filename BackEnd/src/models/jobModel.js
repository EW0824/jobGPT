const mongoose = require('mongoose');


// Please just finish this
const jobSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required, true,
            trim: true,
            validate: {

            }
        }
    }
)

const Job = mongoose.model("Job", jobSchema);

export default Job;
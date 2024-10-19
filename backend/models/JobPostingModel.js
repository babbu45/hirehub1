const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    expiry:{
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
jobPostingSchema.index({title: 'text', description: 'text', location: 'text'});
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  position: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
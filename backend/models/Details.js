// const mongoose = require("mongoose");

// const detailSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   salary: String,
//   birth: String,
// });

// module.exports = mongoose.model("Details", detailSchema);

const mongoose = require("mongoose")

const detailSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  birth: {
    type: Date,
    required: true,
  },

  // Employee Details
  employeeId: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },

  // Work Information
  workingHours: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance"],
    required: true,
  },
  experience: {
    type: Number,
    min: 0,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },

  // Resume
  resumeFileName: {
    type: String,
  },
  resumePath: {
    type: String,
  },

  // Additional Preferences
  preferredOptions: [
    {
      type: String,
    },
  ],
  additionalNotes: {
    type: String,
    trim: true,
  },

  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Approved", "Rejected"],
    default: "Pending",
  },
})

module.exports = mongoose.model("Details", detailSchema)

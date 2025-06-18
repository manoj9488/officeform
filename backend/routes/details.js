// const express = require("express");
// const router = express.Router();
// const Details = require("../models/Details");

// router.post("/submit", async (req, res) => {
//   const { name, phone, salary, birth } = req.body;
//   try {
//     const detail = new Details({ name, phone, salary, birth });
//     await detail.save();
//     res.send("Details saved");
//   } catch {
//     res.status(500).send("Error saving details");
//   }
// });

// module.exports = router;

const express = require("express")
const multer = require("multer")
const path = require("path")
const router = express.Router()
const Details = require("../models/Details")

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, "resume-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  // Accept only PDF, DOC, and DOCX files
  const allowedTypes = /pdf|doc|docx/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype =
    allowedTypes.test(file.mimetype) ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"))
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
})

// Submit application details
router.post("/submit", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      birth,
      employeeId,
      department,
      position,
      workingHours,
      experience,
      salary,
      preferredOptions,
      additionalNotes,
    } = req.body

    // Validate required fields
    if (!name || !email || !phone || !birth || !workingHours || !experience || !salary) {
      return res.status(400).json({
        error: "Please fill in all required fields",
      })
    }

    // Parse preferred options if it's a string
    let parsedPreferredOptions = []
    if (preferredOptions) {
      parsedPreferredOptions = typeof preferredOptions === "string" ? JSON.parse(preferredOptions) : preferredOptions
    }

    // Create new detail entry
    const detailData = {
      name,
      email,
      phone,
      birth: new Date(birth),
      employeeId,
      department,
      position,
      workingHours,
      experience: Number.parseInt(experience),
      salary,
      preferredOptions: parsedPreferredOptions,
      additionalNotes,
    }

    // Add resume information if file was uploaded
    if (req.file) {
      detailData.resumeFileName = req.file.originalname
      detailData.resumePath = req.file.path
    }

    const detail = new Details(detailData)
    await detail.save()

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: detail._id,
    })
  } catch (error) {
    console.error("Error saving details:", error)
    res.status(500).json({
      error: "Error saving application details",
      details: error.message,
    })
  }
})

// Get all applications (for admin)
router.get("/applications", async (req, res) => {
  try {
    const applications = await Details.find().sort({ submittedAt: -1 })
    res.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    res.status(500).json({ error: "Error fetching applications" })
  }
})

// Get single application by ID
router.get("/application/:id", async (req, res) => {
  try {
    const application = await Details.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ error: "Application not found" })
    }
    res.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    res.status(500).json({ error: "Error fetching application" })
  }
})

// Update application status
router.patch("/application/:id/status", async (req, res) => {
  try {
    const { status } = req.body
    const application = await Details.findByIdAndUpdate(req.params.id, { status }, { new: true })

    if (!application) {
      return res.status(404).json({ error: "Application not found" })
    }

    res.json({ message: "Status updated successfully", application })
  } catch (error) {
    console.error("Error updating status:", error)
    res.status(500).json({ error: "Error updating status" })
  }
})

module.exports = router

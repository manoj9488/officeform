const Details = require("../models/Details")
const path = require("path")
const fs = require("fs")

class DetailsController {
  // Submit new application
  static async submitApplication(req, res) {
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
  }

  // Get all applications
  static async getAllApplications(req, res) {
    try {
      const applications = await Details.find().sort({ submittedAt: -1 })
      res.json(applications)
    } catch (error) {
      console.error("Error fetching applications:", error)
      res.status(500).json({ error: "Error fetching applications" })
    }
  }

  // Get single application by ID
  static async getApplicationById(req, res) {
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
  }

  // Update application status
  static async updateApplicationStatus(req, res) {
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
  }

  // Delete application
  static async deleteApplication(req, res) {
    try {
      const application = await Details.findById(req.params.id)

      if (!application) {
        return res.status(404).json({ error: "Application not found" })
      }

      // Delete resume file if exists
      if (application.resumePath && fs.existsSync(application.resumePath)) {
        fs.unlinkSync(application.resumePath)
      }

      await Details.findByIdAndDelete(req.params.id)
      res.json({ message: "Application deleted successfully" })
    } catch (error) {
      console.error("Error deleting application:", error)
      res.status(500).json({ error: "Error deleting application" })
    }
  }
}

module.exports = DetailsController

// import { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   Box,
// } from "@mui/material";

// export default function DetailsForm() {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     salary: "",
//     birth: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/submit", form);
//       alert("Details Submitted");
//     } catch {
//       alert("Submission Failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to top right, #fbc2eb, #a6c1ee)", // 🌈 gradient background
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: 4,
//             backgroundColor: "#ffffffdd", // semi-transparent white for modern look
//             backdropFilter: "blur(6px)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: 600 }}
//           >
//             Submit Details
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               label="Name"
//               fullWidth
//               margin="normal"
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             <TextField
//               label="Phone"
//               fullWidth
//               margin="normal"
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             />
//             <TextField
//               label="Salary"
//               fullWidth
//               margin="normal"
//               onChange={(e) => setForm({ ...form, salary: e.target.value })}
//             />
//             <TextField
//               label="Birth Date"
//               type="date"
//               InputLabelProps={{ shrink: true }}
//               fullWidth
//               margin="normal"
//               onChange={(e) => setForm({ ...form, birth: e.target.value })}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }



"use client"

import { useState } from "react"
import axios from "axios"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material"
import { CloudUpload, Person, Work, Description } from "@mui/icons-material"

const PREFERRED_OPTIONS = [
  "Remote Work",
  "Flexible Hours",
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "Retirement Plan",
  "Paid Time Off",
  "Professional Development",
  "Gym Membership",
  "Transportation Allowance",
]

export default function DetailsForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birth: "",
    employeeId: "",
    department: "",
    position: "",
    workingHours: "",
    experience: "",
    salary: "",
    preferredOptions: [],
    additionalNotes: "",
  })

  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, type: "", message: "" })

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message })
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000)
  }

  const handleInputChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handlePreferredOptionsChange = (event) => {
    const value = event.target.value
    setForm({ ...form, preferredOptions: typeof value === "string" ? value.split(",") : value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(file.type)) {
        showAlert("error", "Please upload only PDF, DOC, or DOCX files")
        return
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        showAlert("error", "File size should be less than 5MB")
        return
      }

      setResume(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      const requiredFields = ["name", "email", "phone", "birth", "workingHours", "experience", "salary"]
      const missingFields = requiredFields.filter((field) => !form[field])

      if (missingFields.length > 0) {
        showAlert("error", `Please fill in all required fields: ${missingFields.join(", ")}`)
        setLoading(false)
        return
      }

      // Create FormData for file upload
      const formData = new FormData()

      // Append all form fields
      Object.keys(form).forEach((key) => {
        if (key === "preferredOptions") {
          formData.append(key, JSON.stringify(form[key]))
        } else {
          formData.append(key, form[key])
        }
      })

      // Append resume file if selected
      if (resume) {
        formData.append("resume", resume)
      }

      const response = await axios.post("http://localhost:5000/api/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      showAlert("success", "Application submitted successfully!")

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        birth: "",
        employeeId: "",
        department: "",
        position: "",
        workingHours: "",
        experience: "",
        salary: "",
        preferredOptions: [],
        additionalNotes: "",
      })
      setResume(null)

      // Reset file input
      const fileInput = document.getElementById("resume-upload")
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Submission error:", error)
      showAlert("error", error.response?.data?.error || "Submission failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={12}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Employee Application Form
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please fill in all the required information below
            </Typography>
          </Box>

          {alert.show && (
            <Alert severity={alert.type} sx={{ mb: 3 }}>
              {alert.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <Box mb={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <Person sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Personal Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name *"
                    fullWidth
                    value={form.name}
                    onChange={handleInputChange("name")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address *"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={handleInputChange("email")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number *"
                    fullWidth
                    value={form.phone}
                    onChange={handleInputChange("phone")}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Birth *"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={form.birth}
                    onChange={handleInputChange("birth")}
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Employee Details Section */}
            <Box mb={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <Work sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Employee Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Employee ID"
                    fullWidth
                    value={form.employeeId}
                    onChange={handleInputChange("employeeId")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    fullWidth
                    value={form.department}
                    onChange={handleInputChange("department")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position/Role"
                    fullWidth
                    value={form.position}
                    onChange={handleInputChange("position")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Working Hours *</InputLabel>
                    <Select
                      value={form.workingHours}
                      onChange={handleInputChange("workingHours")}
                      label="Working Hours *"
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Freelance">Freelance</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Years of Experience *"
                    type="number"
                    fullWidth
                    value={form.experience}
                    onChange={handleInputChange("experience")}
                    inputProps={{ min: 0 }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Expected Salary *"
                    fullWidth
                    value={form.salary}
                    onChange={handleInputChange("salary")}
                    placeholder="e.g., $50,000 - $60,000"
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Resume Upload Section */}
            <Box mb={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <Description sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Resume Upload
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box>
                <input
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  id="resume-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="resume-upload">
                  <Button variant="outlined" component="span" startIcon={<CloudUpload />} sx={{ mr: 2 }}>
                    Upload Resume
                  </Button>
                </label>
                {resume && (
                  <Chip label={resume.name} onDelete={() => setResume(null)} color="primary" variant="outlined" />
                )}
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                </Typography>
              </Box>
            </Box>

            {/* Preferences Section */}
            <Box mb={4}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Additional Preferences
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Preferred Benefits & Options</InputLabel>
                    <Select
                      multiple
                      value={form.preferredOptions}
                      onChange={handlePreferredOptionsChange}
                      input={<OutlinedInput label="Preferred Benefits & Options" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {PREFERRED_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={form.preferredOptions.indexOf(option) > -1} />
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Additional Notes"
                    multiline
                    rows={4}
                    fullWidth
                    value={form.additionalNotes}
                    onChange={handleInputChange("additionalNotes")}
                    placeholder="Any additional information you'd like to share..."
                  />
                </Grid>
              </Grid>
            </Box>

            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                  },
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}


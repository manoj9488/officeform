// import { useState } from "react";
// import axios from "axios";
// import {
//   Box, TextField, Button, Typography, Paper, Container,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function LoginForm() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/login", form);
//       alert(res.data);
//       navigate("/submit");
//     } catch {
//       alert("Login Failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//       <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField label="Username" fullWidth margin="normal"
//             onChange={(e) => setForm({ ...form, username: e.target.value })} />
//           <TextField label="Password" type="text" fullWidth margin="normal"
//             onChange={(e) => setForm({ ...form, password: e.target.value })} />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
//             Login
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }



import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      alert(res.data);
      navigate("/submit");
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #76b2fe, #b69efe)", // 🎨 gradient background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#ffffffdd", // slightly transparent white
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Password"
              type="text"
              fullWidth
              margin="normal"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

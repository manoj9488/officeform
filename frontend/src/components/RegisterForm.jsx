
// import { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function RegisterForm() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/register", form);
//       alert("User Registered");
//       navigate("/login");
//     } catch {
//       alert("Registration Failed");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #667eea, #764ba2)", // 💡 You can change this to a solid color or an image
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
//             borderRadius: 3,
//             backgroundColor: "#ffffffdd", // slightly transparent white
//             backdropFilter: "blur(5px)", // soft blur effect
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: 600 }}
//           >
//             Register
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               label="Username"
//               fullWidth
//               margin="normal"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//             />
//             <TextField
//               label="Password"
//               type="text"
//               fullWidth
//               margin="normal"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 2 }}
//             >
//               Register
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }


import { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { username, email, password } = form; // exclude confirmPassword
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });
      alert("User Registered");
      navigate("/login");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #667eea, #764ba2)",
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
            borderRadius: 3,
            backgroundColor: "#ffffffdd",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

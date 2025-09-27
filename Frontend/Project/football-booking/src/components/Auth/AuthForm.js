import React, { useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { login } from "../../features/loginAuth/authThunk";
import { signIn } from "../../features/loginAuth/authThunk";
import { isUserNameAvailable, isEmailAvailable } from "../../utils/userHelpers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfoByID } from "../../features/user/userThunk";
import logo from "../../imgs/logo.png";

export default function AuthForm() {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const refs = {
    identifier: useRef(),
    password: useRef(),
    username: useRef(),
    email: useRef(),
    confirmPassword: useRef(),
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    setErrors({});
  };

  // ✅ Login inputs
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Register inputs
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateLogin = () => {
    if (!loginData.identifier.trim()) {
      setErrors({ identifier: "Email or Username is required" });
      refs.identifier.current?.focus();
      return false;
    }

    if (loginData.identifier.includes("@")) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(loginData.identifier)) {
        setErrors({ identifier: "Invalid email format" });
        refs.identifier.current?.focus();
        return false;
      }
    }

    if (!loginData.password) {
      setErrors({ password: "Password is required" });
      refs.password.current?.focus();
      return false;
    } else if (loginData.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      refs.password.current?.focus();
      return false;
    }

    return true;
  };

  const validateRegister = async () => {
    if (!registerData.username.trim()) {
      setErrors({ username: "Username is required" });
      refs.username.current?.focus();
      return false;
    } else if (
      !/^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/i.test(
        registerData.username
      )
    ) {
      setErrors({
        username:
          "Username can only contain letters, numbers, and underscores. It must be 3–15 characters long.",
      });
      refs.username.current?.focus();
      return false;
    }
    const isAvailable = await isUserNameAvailable(
      registerData.username.trim(),
      null
    );
    if (!isAvailable) {
      setErrors({ username: "Username isn't available" });
      refs.username.current?.focus();
      return false;
    }
    if (!registerData.email.trim()) {
      setErrors({ email: "Email is required" });
      refs.email.current?.focus();
      return false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(registerData.email)
    ) {
      setErrors({ email: "Invalid email format" });
      refs.email.current?.focus();
      return false;
    }

    const emailAvailable = await isEmailAvailable(
      registerData.email.trim(),
      null
    );
    if (!emailAvailable) {
      setErrors({
        email:
          "This email is already registered. Please log in or use a different email.",
      });
      refs.email.current?.focus();
      return false;
    }

    if (!registerData.password) {
      setErrors({ password: "Password is required" });
      refs.password.current?.focus();
      return false;
    } else if (registerData.password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      refs.password.current?.focus();
      return false;
    }

    if (!registerData.confirmPassword) {
      setErrors({ confirmPassword: "Please confirm password" });
      refs.confirmPassword.current?.focus();
      return false;
    } else if (registerData.password !== registerData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      refs.confirmPassword.current?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === 0) {
      if (!validateLogin()) return;
      Login();
    } else {
      const isValid = await validateRegister();
      if (!isValid) return;

      Register();
    }
  };

  async function Login() {
    try {
      const action = await dispatch(
        login({
          identifier: loginData.identifier,
          password: loginData.password,
        })
      );

      if (login.fulfilled.match(action)) {
        const token = action.payload.token;
        if (loginData.remember) {
          localStorage.setItem("stadiumsApp.accessToken", token);
        } else {
          localStorage.removeItem("stadiumsApp.accessToken");
        }

        sessionStorage.setItem("stadiumsApp.accessToken", token);
        const result = await dispatch(getUserInfoByID());

        navigate("/");
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {}
  }

  async function Register() {
    const addUserAction = await dispatch(
      signIn({
        name: registerData.username,
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      })
    );

    if (signIn.fulfilled.match(addUserAction)) {
      const token = addUserAction.payload.token;
      sessionStorage.setItem("stadiumsApp.accessToken", token);
      const result = await dispatch(getUserInfoByID());

      navigate("/");
    }
  }
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        p: 1.5,
        borderRadius: 3,
        boxShadow: 6,
      }}
    >
      <CardContent>
        {/* شعار */}
        <Box textAlign="center" mb={2}>
          <img src={logo} alt="Logo" style={{ width: 100, margin: "auto" }} />
          <Typography variant="h6" fontWeight="bold">
            {tab === 0 ? "Welcome Back 👋" : "Create Account 🚀"}
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {/* الفورم */}
        <Box
          component="form"
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          {/* Login */}
          {tab === 0 && (
            <>
              <TextField
                label="Email or Username"
                name="identifier"
                value={loginData.identifier}
                onChange={handleLoginChange}
                inputRef={refs.identifier}
                fullWidth
                error={!!errors.identifier}
                helperText={errors.identifier}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                inputRef={refs.password}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />
              {showErrorMessage ? (
                <label style={{ color: "red", fontSize: "13px" }}>
                  Invalid username, email, or password. Please try again.
                </label>
              ) : (
                <></>
              )}

              {/* ✅ Remember me */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={loginData.remember}
                    onChange={handleLoginChange}
                    name="remember"
                  />
                }
                label="Remember me"
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Login
              </Button>

              <Button variant="text" color="secondary" size="small">
                Forgot Password?
              </Button>
            </>
          )}

          {/* Register */}
          {tab === 1 && (
            <>
              <TextField
                label="Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                inputRef={refs.username}
                fullWidth
                error={!!errors.username}
                helperText={errors.username}
              />

              <TextField
                label="Email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                inputRef={refs.email}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                inputRef={refs.password}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                inputRef={refs.confirmPassword}
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

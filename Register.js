import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("phoneNumber", phoneNumber);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await axios.post("http://localhost:5000/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.message || "An error occurred"));
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>REGISTER</h1>
        <form className="register-form" onSubmit={handleRegister}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>BIO</label>
          <textarea
            placeholder="Explain yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
          <label>PHONE NUMBER</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <label>UPLOAD YOUR PICTURE</label>
          <input type="file" onChange={handleFileUpload} accept="image/*" />
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

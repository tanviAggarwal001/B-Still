import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (data.success) {
                   handleSuccess("Login Successful");
                   const jwtToken = data.token;
                   if (jwtToken) {
                     localStorage.setItem("admintoken", jwtToken);
           
                     setTimeout(() => {
                       navigate("/admin/dashboard");
                     }, 1000);
                   } else {
                     handleError("Login failed. No token received.");
                   }
                }
        } catch (error) {
            setError("Login failed");
        }

    };
        const handleUserLogin = () => {
            navigate("/login");
          };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input className="w-full p-2 border rounded mb-4" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="w-full p-2 border rounded mb-4" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
                </form>
                        <ToastContainer />

                        <button className="w-full bg-blue-500 text-white p-2 rounded"
                            onClick={handleUserLogin}>
                        Return to User Login
                        </button>
                
            </div>
        </div>
    );
}

export default AdminLogin;

import { useState } from "react";
import authService from "../services/authService";
import workspaceService from "../services/workspaceService";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        console.log("Button clicked");

        try {

            const response = await authService.login({
                email,
                password,
            });

            console.log("Login Success", response);

        // Get all workspaces
          let workspaces = await workspaceService.getWorkspaces();

          let workspace;

        // If user has no workspace, create one
        if (workspaces.length === 0) {

        workspace = await workspaceService.createWorkspace("My Workspace");

       console.log("Workspace Created:", workspace);

       } else {

       workspace = workspaces[0];

       console.log("Workspace Found:", workspace);
    }

    // Save workspace id
       localStorage.setItem("workspaceId", workspace.id);

       alert("Login Successful!");

        } catch (error) {

            console.error("Login Error:", error);
            console.log("Response:", error.response);
            console.log("Data:", error.response?.data);

            alert("Login Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card">

                        <div className="card-header text-center">

                            <h3>Login</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}
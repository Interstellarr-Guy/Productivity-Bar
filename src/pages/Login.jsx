import { useState } from "react";
import authService from "../services/authService"
import workspaceService from "../services/workspaceService";
import productivityWorkspaceService from "../services/ProductivityWorkspaceService";

import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {

    e.preventDefault();
    console.log("Button clicked");

    try {
            const response = await authService.login({
            email,
            password,
        });

        console.log("Login Success", response);

        // Fetch the logged-in user's productivity workspace
        //Login issue check 
        // const workspace =await workspace.getWorkspace();
         const workspace =
             await productivityWorkspaceService.getWorkspace();
        
         console.log("Workspace:", workspace);
         localStorage.setItem("workspaceId", workspace.id);
           
        //alert("Login Successful!");
        navigate("/");
        
    } catch (error) {

    console.error("FULL ERROR:", error);

    console.log("name:", error.name);
    console.log("message:", error.message);
    console.log("stack:", error.stack);

    console.log("status:", error.response?.status);
    console.log("data:", error.response?.data);

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
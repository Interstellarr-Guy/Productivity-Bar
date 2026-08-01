import { useState } from "react";
import authService from "../services/authService"
import workspaceService from "../services/workspaceService";
import productivityWorkspaceService from "../services/ProductivityWorkspaceService";

import { useNavigate } from "react-router-dom";

export default function Login() {
    
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //Handle Register
    const handleRegister = async (e) => {

    e.preventDefault();

    try {

        await authService.register({
            name,
            email: registerEmail,
            password: registerPassword,
        });

        alert("Registration Successful!");

        //To clear form field
        setName("");
        setRegisterEmail("");
        setRegisterPassword("");
        

        setIsRegister(false);

    } catch (err) {

        alert("Registration Failed");

    }

};


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

        <div className="container mt-5 bg-[#412a4c]">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card">

                        <div className="card-header text-center">

                          <h3>{isRegister ? "Register" : "Login"}</h3>

                        </div>

                        <div className="card-body">
                         
                        {
           isRegister ? ( 
               
            <form onSubmit={handleRegister}>

    <div className="mb-3">
        <label>Name</label>

        <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    </div>

    <div className="mb-3">
        <label>Email</label>

        <input
            type="email"
            className="form-control"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
        />
    </div>

    <div className="mb-3">
        <label>Password</label>

        <input
            type="password"
            className="form-control"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
        />
    </div>

    <button
        className="btn btn-success w-100"
        type="submit"
    >
        Register
    </button>

            </form>
           ) : (

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
           ) }

           {/* Conditional Form */}
           <div className="text-center mt-3">

    {isRegister ? (

        <p>
            Already have an account?{" "}
            <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => {
                     setName("");
                     setRegisterEmail("");
                     setRegisterPassword("");
                     setIsRegister(false);
                    }}
            >
                Login
            </button>
        </p>

    ) : (

        <p>
            Don't have an account?{" "}
            <button
                type="button"
                className="btn btn-link p-0"
                onClick={() =>{ 
                    setEmail("");
                    setPassword("");
                    setIsRegister(true);
                }}
            >
                Register
            </button>
        </p>

    )}

</div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}
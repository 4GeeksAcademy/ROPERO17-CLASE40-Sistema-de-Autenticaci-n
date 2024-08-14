import react, { useState } from "react";

export const Login = () => {

const[email, setEmail] = useState("");
const[password, setPassword] = useState("");



return (
    <>
        <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword" />
            </div>
        </div>
    </>
);
};
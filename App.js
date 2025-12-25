import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      setEmail("");
      setUsername("");
      setPassword("");

    } catch (err) {
      console.error(err);
      alert("Server not responding");
    }
  };

  return (
    <div className="box">
      <div className="signup">
        <h1>Sign up</h1>
        <p className="para">
          Create an account or <a href="#">Sign in</a>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="user">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="checkbox">
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            I do not want to receive marketing emails.
          </label>
        </div>

        <button type="submit">Sign up</button>
      </form>

      <div id="para2">
        <p>
          By signing up, you accept our terms of services and privacy policy
        </p>
      </div>
    </div>
  );
}

export default App;

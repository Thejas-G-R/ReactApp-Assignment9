import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
function App(props) {
  const [emailIdErr, setEmailIdErr] = useState("valid");
  const [passwordErr, setPasswordErr] = useState("valid");
  const [loginErr, setLoginErr] = useState("untested");
  const [emailIdValue, setEmailIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isloggedIn, setIsLoggeIn] = useState(false);
  return (
    <>
      {
        isloggedIn ? <Router>
          < Routes >
            <Route path="/" element={<Navigate replace to="/Home" />} />
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/Contact" element={<Contact />}></Route>
            <Route path="/Jobs" element={<Jobs />}></Route>
          </Routes ></Router >
          :
          <div className='container loginContainer'>
            <form>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailId" aria-describedby="emailId" onChange={(e) => { handleEmail(e) }} value={emailIdValue} />
                {emailIdErr === "empty" ? <div className="errMessage">
                  Email Id can't be empty
                </div> : emailIdErr === "invalid" ? <div className="errMessage">
                  Please enter a valid email id
                </div> : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => { handlePassword(e) }} value={passwordValue} />
                {passwordErr === "empty" ? <div className="errMessage">
                  Password can't be empty
                </div> : passwordErr === "invalid" ? <div className="errMessage">
                  Please enter a valid password with minimum 8 characters, atleast 1 upper case, 1 lower case, 1 digit and 1 special character
                </div> : null}
              </div>
              <button type="submit" className="btn btn-primary" onClick={(e) => { handleSubmit(e) }}>Submit</button>
              {loginErr === "invalid" ? <div className="errMessage">
                Wrong credentials
              </div> : null}
            </form>
          </div>
      }

    </>


  );

  function handleEmail(e) {
    let val = e.target ? e.target.value ? e.target.value : null : e;
    setEmailIdValue(val)
    const EmailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    if (!val) {
      setEmailIdErr("empty")
    } else if (!EmailRegex.test(val)) {
      setEmailIdErr("invalid")
    } else if (EmailRegex.test(val)) {
      setEmailIdErr("valid");
      return true
    } else {
      setEmailIdErr("untested");
    }
    return false
  }

  function handlePassword(e) {
    let val = e.target ? e.target.value ? e.target.value : null : e;
    setPasswordValue(val);
    const PasswordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
    if (!val) {
      setPasswordErr("empty")
    } else if (!PasswordRegex.test(val)) {
      setPasswordErr("invalid")
    } else if (PasswordRegex.test(val)) {
      setPasswordErr("valid");

      return true;
    } else {
      setPasswordErr("untested");
    }
    return false;
  }
  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    let isEmailValid = handleEmail(emailIdValue);
    let isPasswordValid = handlePassword(passwordValue);
    if (isEmailValid && isPasswordValid) {
      setLoginErr("valid")
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId: emailIdValue, password: passwordValue })
      };

      fetch("http://localhost:3000/user/login", requestOptions)
        .then(res => res.json())
        .then((result => {
          if (result && result.errCode === 0) {
            setIsLoggeIn(true)
            console.log("success")
          } else {
            setLoginErr("invalid")
          }
        }))
    }
  }
}

export default App;

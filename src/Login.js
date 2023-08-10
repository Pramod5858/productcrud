import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const HandleSubmit = async ({ email, password }) => {

    if (!email && !password) {
      return console.log("it should not be empty")
    }
    const url = "http://localhost:5500/login";
    const result = await fetch(url, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { "content-Type": "application/json" }
    })
    let respond = await result.json();
    console.log(respond);
    if (respond.authtoken) {
      localStorage.setItem("user", JSON.stringify(respond.userr));
      localStorage.setItem("token", JSON.stringify(respond.authtoken));
      alert("You have successfully logged in");
      window.location.href = "/";
    } else {

      alert("Not able to logged in, email or password is not correct");
      window.location.href = "/login";
    }
    return (
      <div>
        <div>hi {email}</div>
        <div>hello {password}</div>
      </div>
    )

  }
  return (
    <div className="alert alert-primary" role="alert">
      <div className='row'>
        <div className='col'>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="./images/image3.jpg" className="h-100 d-inline-block w-100" alt="Not found image1" />
              </div>
              <div className="carousel-item">
                <img src="./images/image4.jpg" className="h-100 d-inline-block w-100" alt="Not found image2" />
              </div>
              <div className="carousel-item">
                <img src="./images/image5.jpg" className="h-100 d-inline-block w-100" alt="Not found image3" />
              </div>
              <div className="carousel-item">
                <img src="./images/image6.jpg" className="h-100 d-inline-block w-100" alt="Not found image3" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='col'>

          <Form>
            <Form.Group className="mb-3" >

              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label >Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button className="btn btn-success" variant="primary" type="button" disabled={email === "" || password === ""} onClick={() => HandleSubmit({ email, password })}>
              Submit
            </Button>

            <button type="button" className="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal1">Forgotten password?</button>

            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create New Account</button>
          </Form>

        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Sign Up</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <HandleModal />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <p><a href="/signup" className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Create Free Bussiness Account</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="btn modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Find Your Account</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Forgottenpassword />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-primary" onClick={()=>HandleForgottenpassword()}>Save changes</button> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;

// This is SignUp Modal function

function HandleModal() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const HandleSignupRegisteration = async ({ name, email, password }) => {
    console.log("You click:- " + name, email, password);

    const url = "http://localhost:5500/signup";
    const result = await fetch(url, {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    let respond = await result.json()
    if (!respond) {
      alert("Something missing or try again")
      window.location.href = "/login";
    } else {
      alert("Otp sent to registered emailId it is valid for just 5min")
      window.location.href = "/OtpVerify";
    }
  }
  return (
    <div className="alert alert-primary" role="alert">
      <Form>

        <h1>Register</h1>
        <Form.Group className="mb-3" >

          <Form.Label>Name1</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />   {/* //Here value ={name}, so name is state over here */}


          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">

          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className="btn btn-success" type="button" disabled={name === "" || email === "" || password === ""} onClick={() => { HandleSignupRegisteration({ name, email, password }) }} >
          OTP Sent to your emailId
        </Button>
      </Form>
    </div>
  );
}

// FOrgotten password Modal

function Forgottenpassword() {
  const [email, setEmail] = useState("")

  const HandleForgottenpassword = ({ email }) => {
    console.log("YouClicked:- " + email);
  }
  return (
    <div>
      <Form>

        <h1>Register</h1>
        <Form.Group className="mb-3" >

          <Form.Label>Please enter your email address to search for your account.</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Button className="btn btn-success" type="button" onClick={() => { HandleForgottenpassword({ email }) }} >
          Submit
        </Button>
      </Form>
    </div>
  )
}


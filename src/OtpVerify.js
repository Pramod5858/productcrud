
import React, { useState } from 'react'

export default function OtpVerify() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    const myStyle = {
        padding: 5, margin: 10
    }

    const HandleSubmit = async ({ otp, email }) => {
        console.log(otp, email);
        let url = "http://localhost:5500/otpVerify";

        let result = await fetch(url, {
            method: "post",
            body: JSON.stringify({ email, otp }),
            headers: { "Content-Type": "application/json" }
        })

        let respond = await result.json()

        if (!respond.result) {
            alert("There is some mistake")

        } else {
            alert("Successfully verified, Now you can Do Login")
            window.location.href = "/login"

        }

        // await axios({
        //     method: "post",
        //     url: url,
        //     body: ( {otps} ),
        //     headers: { "Content-Type": "application/json" }
        // })
        // .then(res=>{
        //     console.log(res);
        // })
        // .catch(error=>{console.log(error)})





    }

    return (
        <div className='container-fluid' style={{ width: 300, height: 200, backgroundColor: "lightgray", borderRadius: 10, justifyItems: "center" }}>
            <div><p className="font-monospace">Enter OTP</p></div>
            <div><p className="font-monospace">Check Your email for OTP</p></div>
            <div><input type='text' style={myStyle} placeholder='Email Id' name='email' value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><input type='text' style={myStyle} placeholder='One time Password' name='otps' value={otp} onChange={(e) => setOtp(e.target.value)} /></div>
            <div><button type="button" className="btn btn-success" onClick={() => HandleSubmit({ otp, email })} >Submit</button></div>
        </div>
    )
}

import { useRef, useState } from 'react';
import {SignUpButton} from '../components/Buttons'
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

const SIGNUP_URL = import.meta.env.VITE_SIGNUP_URL;
const SEND_OTP_URL=import.meta.env.VITE_SEND_OTP_URL;
export function SignUp() {
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState(false);
  const [password, setPassword] = useState(false);
  const [mail, setMail] = useState(false);
  const navigate = useNavigate();
  const userRef = useRef();
  const passRef = useRef();
  const mailRef = useRef();
  async function signup(){
    try{
      if(user&&password&&mail){
        const username = (userRef.current.value)
        const password = (passRef.current.value)
        const email = (mailRef.current.value)       
          
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'React POST Example', 
            content: 'This is a new post.',
            username,
            password,
            email
          })
        };
        const response = await fetch(SIGNUP_URL,requestOptions)
        const data = await response.json()

        if(data.Success){
          
          try{
            const params = new URLSearchParams({ email });
            alert("Sending OTP, you will be redirected")
            const response = await fetch(`${SEND_OTP_URL}?${params.toString()}`); 
            const data = await response.json()
            navigate('/verify', { state: { email,otp:data.otp,username} });
          }catch(e){
            alert("Some internal Error")
          }
        } else if(data.Existing){
          let errors = ""
          if (data.Existing.includes("Email")){
            errors+="Email already in use\n"
          }
          if(data.Existing.includes("Username")){
            errors+="Username already in use"
          }
          alert(errors)
        }
        else {
          let pretty = "";
          const message = (data.error[0] + "::" + data.error[1] + "::"+data.error[2]);
          if (message.includes("email")) {
            pretty += "Invalid Email or already used\n";
          }
          if (message.includes("Username already exists")) {
            pretty += "Username is already taken\n";
          }
          if (message.includes("5")) {
            pretty += "Username must be at least 5 chars long\n";
          }
          if (message.includes("10")) {
            pretty += "Password should be at least 10 chars long\n";
          }
          alert(pretty);
        }

      }
      else{
        alert("Please put valid credentials")
      }
    }catch(e){
      return
    }
  
  }


  function checkAllFields() {
    setDisable(!(user && password && mail));
  }

  return (
    <div className="bg-blue-700 h-screen">
      <br /><br /><br /><br />
      <div className='flex justify-center'>
        <Card>Join Us Now</Card>
      </div>
      
      <br /><br />
      <div className="flex justify-center">
        <Input
          type="text"
          ref={userRef}
          placeholder="Username"
          className="text-2xl px-4 py-3"
          onInput={(e) => {
            setUser(e.target.value.trim() !== '');
            checkAllFields();
          }}
        />
      </div>
      <br />
      <div className="flex justify-center">
        <Input
          type="text"
          ref={mailRef}
          placeholder="Email"
          className="text-2xl px-4 py-3"
          onInput={(e) => {
            setMail(e.target.value.trim() !== '');
            checkAllFields();
          }}
        />
      </div>
      <br />
      <div className="flex justify-center">
        <Input
          type="password"
          ref={passRef}
          placeholder="Password"
          className="text-2xl px-4 py-3"
          onInput={(e) => {
            setPassword(e.target.value.trim() !== '');
            checkAllFields();
          }}
        />
      </div>
      <br />
      <div className='flex justify-center'>Back to&nbsp; <Link className='text-blue-800' to={"/signin"}> Sign In </Link></div>
      <br />
      <div className="flex justify-center">
        <SignUpButton checker={checkAllFields} onClick={signup} disabled={disable}>Create Account</SignUpButton>
      </div>
    </div>
  );
}

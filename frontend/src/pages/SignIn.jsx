import { useRef, useState } from 'react';
import {SignUpButton} from '../components/Buttons'
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';

const SIGNIN_URL=import.meta.env.VITE_SIGNIN_URL
export function SignIn() {
  const [disable, setDisable] = useState(true);
  const [user, setUser] = useState(false);
  const [password, setPassword] = useState(false);
  const [mail, setMail] = useState(false);
  const navigate = useNavigate();
  const userRef = useRef();
  const passRef = useRef();
  const mailRef = useRef();

  function checkAllFields() {
    setDisable(!(user && password && mail));
  }
  async function signIn(){
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
        const response = await fetch(SIGNIN_URL,requestOptions)
        const data = await response.json()
        
        if(data.token){
          sessionStorage.setItem("token",data.token)
          sessionStorage.setItem("username",username)
          alert("Logged In")
          navigate('/home', { state: { email,otp:data.otp,username} });
        }
        else{
          alert(data.error)
 
        }

      }
      else{
        alert("Please put valid credentials")
      }
    }catch(e){
      return
    }
  
  }

  return (
    <div className="bg-blue-700 h-screen">
      <br /><br /><br /><br />
      <div className='flex justify-center'>
        <Card>Get Yourself In</Card>
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
      <div className='flex justify-center'>Don't have account.&nbsp;<Link className='text-blue-800' to={"/signup"}>Create one </Link></div>
      <br />
      <div className="flex justify-center">
        <SignUpButton checker={checkAllFields} onClick={signIn} disabled={disable}>Sign In</SignUpButton>
      </div>
    </div>
  );
}

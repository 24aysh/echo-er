import { useState } from 'react';
import { Button } from '../components/Buttons';
import { Otp } from '../components/Otp';
import { Card } from '../components/Card';
import { useLocation, useNavigate } from 'react-router-dom';
const VERIFY_OTP_URL=import.meta.env.VITE_VERIFY_OTP_URL;
export function Verify() {
  const [disable, setDisable] = useState(true);
  const location = useLocation();
  const [inputOtp,setInputOtp] = useState(0);
  const navigate = useNavigate()
  
  const email = location.state?.email;
  const username = location.state?.username;
  
  
  function handleOtpActivation(enabled) {
    setDisable(!enabled); 
  }
  function handleOtp(n){
    setInputOtp(n)
   
  }
  async function verify(){
    const params = new URLSearchParams({ username, otp:inputOtp,email });
    const response = await fetch(`${VERIFY_OTP_URL}?${params.toString()}`);
    const data = await response.json()
    if(data.success){
      alert("Verified")
      navigate('/signin')
    }else{
      navigate('/signup')
      alert("Wrong OTP")
    }

  }
  
  
  return (
    <div className='bg-blue-700 h-screen'>
      <br /><br /><br /><br /><br /><br />
      <div className='flex justify-center'>
        <Card>Verify Your OTP sent to your Email</Card>
      </div>
      <br />
      <Otp number={6} handler={handleOtp} toggle={handleOtpActivation} />
      <div className='flex justify-center m-5'>
        <Button disabled={disable} onClick={verify} >VERIFY</Button>
      </div>
      
    </div>
  );
}

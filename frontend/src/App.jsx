import { BrowserRouter,Route,Routes,Link,useNavigate, Outlet} from 'react-router-dom'
import { Verify } from './pages/VerifyOtp';
import { Error } from './pages/Error'; 
import {SignUp} from './pages/SignUp'
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import {Revoked} from './pages/Revoked';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/verify' element={<Verify/>}></Route> 
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/revoked' element={<Revoked/>}></Route>
        
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App


      
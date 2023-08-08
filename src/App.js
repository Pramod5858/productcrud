
import './App.css';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Component/Navbar';
import Add from './Component/Add';
import Login from './Component/Login';
import Check from './Component/Check';
import SignUp from "./Component/SignUp";
import Admin from './Component/Admin';
import Forgottenpassword from './Component/Forgottenpassword';
import PrivateComponent from './Component/PrivateComponent';

//import Demo from './Component/Demo';

function App() {
  return (
    <div className="App" style={{ backgroundColor: "skyblue", padding: 10, margin: 10, borderRadius: 20, borderWidth: 2, borderColor: "black", fontWeight: "normal" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/check' element={<Check />} />
            <Route path='/admin' element={<Admin />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/forgottenpassword' element={<Forgottenpassword />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path='/demo' element={<Demo />} /> */}

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;

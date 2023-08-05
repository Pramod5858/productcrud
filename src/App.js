
import './App.css';
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Component/Navbar';
import Add from './Component/Add';
import Login from './Login';


function App() {
  return (
    <div className="App"style={{backgroundColor:"skyblue", padding:10,margin:10,borderRadius:20, borderWidth:2, borderColor:"black", fontWeight: "normal" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/login' element={<Login />} />

        </Routes>






      </BrowserRouter>


    </div>
  );
}

export default App;

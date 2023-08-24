import {BrowserRouter, Routes, Route} from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import './styles.css';

function App() {


  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/edit/:id" element={<Edit />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

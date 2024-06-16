import {Routes , Route , Navigate} from "react-router-dom"
import Chat from "./pages/Chat.jsx"
import Register from "./pages/register.jsx"
import Login from "./pages/Login.jsx"


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Chat />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="*" element={<Navigate to="/" />}/>
      
    </Routes>
  )
}

export default App

import {Routes , Route , Navigate} from "react-router-dom"
import Chat from "./pages/Chat.jsx"
import Register from "./pages/register.jsx"
import Login from "./pages/Login.jsx"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext.jsx"


function App() {
  
const {user} = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={user ? <Chat />:<Login/>}/>
      <Route path="/register" element={user ? <Chat />:<Register/>}/>
      <Route path="/login" element={user ? <Chat />:<Login/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
      
    </Routes>
  )
}

export default App

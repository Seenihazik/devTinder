import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter baseName='/'>
    <Routes>
    <Route path='/' element={<Body/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>
    
    </Route>
    

      
    </Routes>
    </BrowserRouter>
    
     <h1>Hi</h1>
    </>
  )
}

export default App

import { useEffect } from "react"
import Navbar from "./components/Navbar"
import Posts from "./components/posts"
import { Routes, Route } from 'react-router-dom'
import Play from "./components/Play"
import NewPost from "./components/NewPost"

function App() {

  useEffect(() => {

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Posts/>}/>
        <Route path='play' element={<Play/>}/>
        <Route path='/new' element={<NewPost/>}/>
    </Routes>
    </>
  )
}

export default App

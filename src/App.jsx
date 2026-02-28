import BookingPage from "./pages/BookingPage"
import Home from "./pages/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/booking/:id' element={<BookingPage/>}/>
      </Routes>
    </BrowserRouter>
 
    </>
  )
}

export default App

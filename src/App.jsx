import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Cv } from "./page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Portfolio />}/>
        <Route path='/cv' element={<Cv />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
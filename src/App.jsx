import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Cv, Test } from "./page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Portfolio />}/>
        <Route path='/cv' element={<Cv />}/>
        <Route path='/test' element={<Test />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
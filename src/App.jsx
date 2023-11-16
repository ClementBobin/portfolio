import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Cv, Test } from "./page";
import KBar from './components/KBar'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <KBar />
        <Routes>
          <Route path='/' element={<Portfolio />}/>
          <Route path='/cv' element={<Cv />}/>
          <Route path='/test' element={<Test />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
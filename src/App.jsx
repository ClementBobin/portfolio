import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Portfolio, Cv, Test } from "./page";
import KBar from './components/sub/KBar'

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

function MyApp({ Component, pageProps }) {
  // Get the location from react-router-dom's useLocation
  const location = useLocation();

  return (
      <Layout>
          <AnimatePresence>
              {/* Use location.pathname instead of router.route */}
              <motion.div key={location.pathname} className='h-full'>
                  <Transition />
                  <Component {...pageProps} />
              </motion.div>
          </AnimatePresence>
      </Layout>
  )
}

export default App
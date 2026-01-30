
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Home from './pages/home';
import Login from "./pages/login";
import MainLayout from "./layout/MainLayout";
import Create from "./pages/create";
import NotFound from "./pages/NotFound";
import DetailUser from "./pages/DetailUser";
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/:userID" element={<DetailUser/>}/>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
      
  );
}

export default App;

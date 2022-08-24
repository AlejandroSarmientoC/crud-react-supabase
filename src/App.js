
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { MethodContextProvider } from "./crud/method";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


function App() {
  return (
    <div className="App">
      <MethodContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </MethodContextProvider>

    </div>
  );
}

export default App;

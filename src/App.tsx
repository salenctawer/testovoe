import './App.css';
import Header from './components/Header/Header';
import { Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DispatchContainer from './components/Dispatch/DispathContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/dispatch' element={<DispatchContainer />}/>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
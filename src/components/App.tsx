import './App.css';
import MenuAppBar from './MenuAppBar/MenuAppBar';
import {WildersComponent} from './Wilders/Wilders';

function App() {

  return (
    <div className="App">
      <MenuAppBar/>
      <div className='content'>
        <WildersComponent/>
      </div>
    </div>
  );
}

export default App;

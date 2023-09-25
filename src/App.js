import './CSS/global/App.css';
import Autograph from './components/autograph';
import Footer from './components/footer';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Footer/>
      <Autograph/>
    </div>
  );
}

export default App;

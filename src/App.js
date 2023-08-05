import './CSS/global/App.css';
import Autograph from './components/autograph';
import Body from './components/body.jsx';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Body/>
      <Footer/>
      <Autograph/>
    </div>
  );
}

export default App;

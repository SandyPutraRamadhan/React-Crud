import './App.css';
import NavigationBar from './component/NavigationBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <NavigationBar />
      {/* BrowserRouter digunakan sebagai router yang menggunakan API history dari HTML5, sehingga dapat menggunakan location untuk mensingkronasi UI dengan url */}
      <BrowserRouter>
      <main>
        {/*Switch digunakan untuk membungkus node Route, yang mana hanya akan merender satu Route saat pathnya cocok dengan URL */}
        <Switch>
          {/*Route digunakan untuk merender UI saat path cocok dengan URL saat ini. Di dalam Component Route ini kita menggunakan exact, yang mana bertugas untuk memastikan Route hanya merender component yang memiliki path dan location.pathname yang cocok */}
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/edit/:id" component={Edit} exact/>
        </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

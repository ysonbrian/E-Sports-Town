import { useEffect } from 'react';
import './App.css';
import Header from './MenuBar/Header';
import Home from './components/Home';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Artist from './components/Artist';
import Normal from './components/Nomal';
import Showme from './components/Showme';
import LogIn from './components/LogIn';
import Mypage from './components/Mypage';
import Minting from './components/Minting';

import { useStore } from './utils/store';
import { getCurrentUser, logout, parseJwt } from './utils/auth';

function App() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);

  let history = createBrowserHistory();
  history.listen((location, action) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("토큰 만료 검사");

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        logout();
        setUser({});
      }
    }
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
      console.log('User logged in!', user);
    }
  }, [setUser]);

  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/nomal" element={<Normal />} />
          <Route path="/showme" element={<Showme />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;

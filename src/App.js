import './App.css';
import { SearchProvider } from './context/useSearchResult';
import { ApiProvider } from './context/useStoreApi';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './page/Home';
import CreatePlaylist from './page/CreatePlaylist';
import { useSelector } from 'react-redux';


function App() {
  const token = useSelector(state => state.auth.token)
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create-playlist" exact>
          {
            token === null
              ? <Redirect to="/" />
              : <CreatePlaylist />
          }
        </Route>
      </Switch>
    </Router>
  )
}

const AppContainer = () => {
  return (
    <ApiProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </ApiProvider>
  )
}

export default AppContainer;
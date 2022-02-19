import './App.css';
import { PostList } from './components/PostList';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>{<PostList />}</div>
    </Provider>
  );
}

export default App;

import { Provider } from 'react-redux';
import {store} from './redux/store/store'; // Importa tu store de Redux aquí
import Rutas from './routes/Routes';

const App = () => {
  return (
    <Provider store={store}>
      <Rutas />
    </Provider>
  );
}

export default App;


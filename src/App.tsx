// Autor: RunFixTeam
import { UserProvider } from './context/Context';
import RoutesApp from './routes/Router';

function App() {
  return (
    <UserProvider>
      <RoutesApp />
    </UserProvider>
  );
}

export default App;

import './App.css';
import { Jobs } from './components/Jobs.js';
import { DataContextProvider } from './contexts/DataContextProvider.js';

function App() {
  return (
    <DataContextProvider>{/* Provides job data */}
      <Jobs></Jobs>
    </DataContextProvider>
  )
}

export default App;

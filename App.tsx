import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Router from './src/routes';

function App() {
    return (
        <PaperProvider>
            <Router />
        </PaperProvider>
    );
}

export default App;
import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {ContactProvider} from './src/utils/ContactContext';
import AppNavigator from './src/navigation/AppNavigator';
import {Colors} from './src/styles/globalStyles';

const App = () => {
    return (
        <ContactProvider>
            <StatusBar 
                backgroundColor={Colors.primary} 
                barStyle="light-content" 
            />
            <AppNavigator />
        </ContactProvider>
    );
};

export default App;
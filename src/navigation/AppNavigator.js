import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ContactListScreen from '../screens/ContactList/ContactListScreen';
import AddContactScreen from '../screens/AddContact/AddContactScreen';
import {Colors} from '../styles/globalStyles';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="ContactList"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerBackTitle: 'Back',
                }}
            >
                <Stack.Screen 
                    name="ContactList" 
                    component={ContactListScreen}
                    options={{
                        title: 'Contacts',
                    }}
                />
                <Stack.Screen 
                    name="AddContact" 
                    component={AddContactScreen}
                    options={{
                        title: 'Add Contact',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, TaskScreen, AddTaskScreen } from '../';

//Composant qui permet de créer la navigation entre les pages de la stack(notament pour revenir en arrière) pour les tâches générales
const Stack = createNativeStackNavigator();

//Composant qui permet de créer la stack de navigation pour les tâches générales
export const HomeStackScreen = ({ navigation }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}
            // options={{ headerShown: false }}
            />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
        </Stack.Navigator>
    );
}
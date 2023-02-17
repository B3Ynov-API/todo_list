import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailyScreen, TaskScreen, AddDailyTaskScreen } from '../';

//Composant qui permet de créer la navigation entre les pages de la stack(notament pour revenir en arrière) pour les tâches journalières
const Stack = createNativeStackNavigator();

//Composant qui permet de créer la stack de navigation
export const DailyStackScreen = ({ navigation }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Daily" component={DailyScreen}
            // options={{ headerShown: false }}
            />
            <Stack.Screen name="AddDailyTask" component={AddDailyTaskScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
        </Stack.Navigator>
    );
}
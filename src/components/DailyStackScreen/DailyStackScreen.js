import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, TaskScreen, AddTaskScreen } from '../';

const Stack = createNativeStackNavigator();

export const DailyStackScreen = ({ navigation }) => {

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
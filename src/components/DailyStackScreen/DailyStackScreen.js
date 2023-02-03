import * as React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailyScreen, TaskScreen, AddDailyTaskScreen } from '../';

const Stack = createNativeStackNavigator();

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
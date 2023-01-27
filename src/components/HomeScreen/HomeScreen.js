import { StyleSheet, Text, View } from "react-native";
import { Task } from "../";

export const HomeScreen = () => {
    return (
        <View>
            <Task name="Tâche 1" />
            <Task name="Tâche 2" />
            <Task name="Tâche 3" />
        </View>
    );
}
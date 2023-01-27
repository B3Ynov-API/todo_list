import { StyleSheet, Text, View } from "react-native";
import Task from "../Task/Task";

export default function HomeScreen() {
    return (
        <View>
        <Text>HomeScreen</Text>
        <Task name="Tâche 1" />
        <Task name="Tâche 2" />
        <Task name="Tâche 3" />
        </View>
    );
}
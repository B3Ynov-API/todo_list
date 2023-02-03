import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Task = ({ task, navigation }) => {

    const [checked, setChecked] = useState(task.state);

    const handlePress = async () => {
        setChecked(!checked);

        try {
            const updatedTask = task;
            updatedTask.state = !checked;
            if (task.doneDate) {
                updatedTask.doneDate = new Date().toJSON().slice(0, 10);
                await AsyncStorage.setItem(`dailyTask-${task.id}`, JSON.stringify(updatedTask));
            }
            else {
                await AsyncStorage.setItem(`task-${task.id}`, JSON.stringify(updatedTask));
            }
        } catch (e) {
            console.clear();
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Task", { task: task });
            }}>
                <Text>{task.name ? task.name : "Tâche"}</Text>
            </TouchableOpacity>
            <CheckBox checked={checked} onPress={handlePress}>
            </CheckBox>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

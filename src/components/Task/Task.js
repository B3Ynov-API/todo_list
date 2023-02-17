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
                <Text style={styles.text}>{task.name ? task.name : "Tâche"}</Text>
            </TouchableOpacity>
            <CheckBox checked={checked} onPress={handlePress}>
            </CheckBox>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    text: {
        fontSize: 20,
    }
});

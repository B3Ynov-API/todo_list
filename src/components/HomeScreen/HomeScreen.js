import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({ navigation, route }) => {

    const [tasksIds, setTasksIds] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);

    // Récupère les tâches stockées dans le storage quand la page est chargée ou quand navigation ou route change (passer un paramètre en appelant la page comme dans AddTaskScreen afin de update)
    React.useEffect(() => {
        async function fetchData() {
            try {
                const jsonValue = await AsyncStorage.getItem('tasksIds')
                jsonValue != null ? setTasksIds(JSON.parse(jsonValue)) : null;

                if (jsonValue != null) {
                    JSON.parse(jsonValue).map(async (id) => {
                        const task = await AsyncStorage.getItem(`task-${id}`);
                        const newTasks = [...tasks, JSON.parse(task)];
                        setTasks(newTasks);
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [navigation, route])

    // Ajoute un bouton à la barre de navigation
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("AddTask", { tasks: tasks, tasksIds: tasksIds });
                }}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation, route])

    return (
        <View style={styles.container}>
            {
                tasks.length === 0 ?
                    <Text>Aucune tâche</Text> :
                    tasksIds.map((id, index) => (
                        <Task key={id} task={tasks[index]} />
                    ))
            }
            {console.log(tasks)}
            {console.log(tasksIds)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    addButton: {
        fontSize: 30,
    }
})
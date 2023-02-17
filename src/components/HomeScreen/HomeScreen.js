import * as React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [navigation, route])

    //Insère les tâches dans le state
    React.useEffect(() => {
        try {
            if (tasksIds.length > 0) {
                const newTasks = [];
                //récupération des tasks pour chaque id
                tasksIds.forEach(async (id) => {
                    const jsonValue = await AsyncStorage.getItem(`task-${id}`)
                    newTasks.push(JSON.parse(jsonValue));
                    if(newTasks.length === tasksIds.length)
                        setTasks(newTasks);
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [tasksIds])

    // Ajoute un bouton pour rajouter une tache en haut à droite
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
    }, [navigation, route, tasksIds, tasks])

    // console.log(tasks);
    // console.log(tasksIds);

    return (
        <ScrollView style={styles.container}>
            {
                tasks.length === 0 ?
                    <Text>Aucune tâche</Text> :
                    tasks.map((task) => (
                        <Task key={task.id} task={task} navigation={navigation} />
                    ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    addButton: {
        fontSize: 30,
    }
})
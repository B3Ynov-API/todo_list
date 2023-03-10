import * as React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../";
import AsyncStorage from "@react-native-async-storage/async-storage";

//page qui affiche les tâches journalières
export const DailyScreen = ({ navigation, route }) => {

    const [tasksIds, setTasksIds] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);

    // Récupère les tâches stockées dans le storage quand la page est chargée ou quand navigation ou route change (passer un paramètre en appelant la page comme dans AddTaskScreen afin de update)
    React.useEffect(() => {
        //fetchData est une fonction asynchrone qui récupère les tâches stockées dans le storage
        async function fetchData() {
            try {
                const jsonValue = await AsyncStorage.getItem('dailyTasksIds')
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
                tasksIds.forEach(async (id) => {
                    const jsonValue = await AsyncStorage.getItem(`dailyTask-${id}`);
                    const task = JSON.parse(jsonValue);
                    //on récupère la date de la tâche  la dernière fois qu'elle a été check et on la compare à la date d'aujourd'hui
                    // Si la tâche n'a pas été check aujourd'hui, on la remet à false(on la décoche)
                    if (task.doneDate !== new Date().toJSON().slice(0, 10)) {
                        task.state = false;
                        await AsyncStorage.setItem(`dailyTask-${id}`, JSON.stringify(task));
                    }
                    newTasks.push(task);
                    if (newTasks.length === tasksIds.length)
                        setTasks(newTasks);
                })
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [tasksIds])

    // Ajoute un bouton à la barre de navigation
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("AddDailyTask", { tasks: tasks, tasksIds: tasksIds });
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
                    <Text>Aucune tâche journalière</Text> :
                    tasks.map((task) => (
                        <Task  key={task.id} type="daily" task={task} navigation={navigation} />
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
import * as React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskScreen = ({ navigation, route }) => {

    const { task } = route.params;

    //change le titre de la page en fonction de la tâche
    React.useEffect(() => {
        
        navigation.setOptions({ title: task.name });
    })

    //supprime la task de la liste des tâches
    const deleteTask = async () => {
        try {
            //si la tâche est une tâche quotidienne, on la supprime de la liste des tâches quotidiennes
            if (task.doneDate) {
                await AsyncStorage.removeItem(`dailyTask-${task.id}`);
                const ids = JSON.parse(await AsyncStorage.getItem('dailyTasksIds'));
                const newIds = ids.filter(id => id !== task.id);
                await AsyncStorage.setItem('dailyTasksIds', JSON.stringify(newIds));
                navigation.navigate('Daily', { 'task.id': task });
            }
            //sinon on sait que c'est une tâche normale et on supprime la tâche normale
            else {
                await AsyncStorage.removeItem(`task-${task.id}`);
                const ids = JSON.parse(await AsyncStorage.getItem('tasksIds'));
                const newIds = ids.filter(id => id !== task.id);
                await AsyncStorage.setItem('tasksIds', JSON.stringify(newIds));
                navigation.navigate('Home', { 'task.id': task });
            }

        } catch (e) {
            console.clear();
            console.log(e);
        }
    }

console.log(task);
    return (
        <View style={styles.container}>
            <Text>{task.details}</Text>
            {task.date ? <Text>Date de fin: {new Date(task.date).getDate() + "/" + (new Date(task.date).getMonth() + 1) + "/" + new Date(task.date).getFullYear()}</Text> : null}
            <Button title="Supprimer la tâche" onPress={deleteTask}></Button>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
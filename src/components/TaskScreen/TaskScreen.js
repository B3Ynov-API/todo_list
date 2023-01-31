import * as React from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskScreen = ({ navigation, route }) => {

    const { task } = route.params;

    React.useEffect(() => {
        navigation.setOptions({ title: task.name });
    })

    const deleteTask = async () => {
        try {
            await AsyncStorage.removeItem(`task-${task.id}`);
            const ids = JSON.parse(await AsyncStorage.getItem('tasksIds'));
            const newIds = ids.filter(id => id !== task.id);
            await AsyncStorage.setItem('tasksIds', JSON.stringify(newIds));
            navigation.navigate('Home', { 'task.id' : task });
        } catch (e) {
            console.clear();
            console.log(e);
        }
    }


    return (
        <View style={styles.container}>
            <Text>{ task.details }</Text>
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
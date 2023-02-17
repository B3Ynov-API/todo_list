import { Button } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//page d'ajout de tâche journalière
export const AddDailyTaskScreen = ({ navigation, route }) => {

    //les usesStates pour les inputs
    //usestate pour le changement du nom de la tâche
    const [name, setName] = React.useState("");
    //usestate pour le changement du descriptif de la page de la tâche
    const [details, setDetails] = React.useState("");
    //usestate pour la gestion des erreurs
    const [error, setError] = React.useState("");

    //sauvegarde la tâche dans le storage
    const save = async () => {
        try {
            const newId = route.params.tasks.length > 0 ? route.params.tasks[route.params.tasks.length - 1].id + 1 : 0;
            const updatedIds = [...route.params.tasksIds, newId];

            //on crée la nouvelle tâche avec les infos entrées dans les inputs
            const newTask = {
                id: newId,
                name: name,
                details: details,
                state: false,
                //date de création de la tâche
                doneDate: "null",
            };
            //sauvegarde la tâche dans le storage en json
            await AsyncStorage.setItem('dailyTasksIds', JSON.stringify(updatedIds));
            await AsyncStorage.setItem(`dailyTask-${newId}`, JSON.stringify(newTask));
            //navigation vers la page des tâches journalières
            navigation.navigate("Daily", { ids : updatedIds });

        } catch (e) {
            console.clear();
            console.log(e);
            setError(e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.margin, styles.text]}>Ajouter une tâche journalière</Text>
            <TextInput onChangeText={setName} value={name} style={[styles.input, styles.margin]} label="Nom de la tâche" />
            <TextInput onChangeText={setDetails} value={details} style={[styles.input, styles.margin]} label="Détails de la tâche" />
            <Button style={styles.margin} title="Ajouter" onPress={() => {
                save();
            }}></Button>

            {/* Affiche les erreurs s'il y en a */}
            {error ? <Text style={styles.margin}>{error.toString()}</Text> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
    },
    text: {
        fontSize: 20,
    },
    margin: {
        margin: 10,
    },
})
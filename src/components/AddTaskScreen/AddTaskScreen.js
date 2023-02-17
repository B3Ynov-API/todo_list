import { Button } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

//page d'ajout de tâche tâche générales
export const AddTaskScreen = ({ navigation, route }) => {

    const [name, setName] = React.useState("");
    const [details, setDetails] = React.useState("");
    const [selectedDay, setSelectedDay] = React.useState("");
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
                date: selectedDay,
            };
            //sauvegarde la tâche dans le storage en json
            await AsyncStorage.setItem('tasksIds', JSON.stringify(updatedIds));
            await AsyncStorage.setItem(`task-${newId}`, JSON.stringify(newTask));
            //une fois que la tâche est créee, on navigue vers la page Home qui est la main page de l'app avec les tâches
            navigation.navigate("Home", { ids: updatedIds });

        } catch (e) {
            console.clear();
            console.log(e);
            setError(e)
        }
    }

    console.log(new Date().toJSON().slice(0, 10))
    return (
        <View style={styles.container}>
            <Text style={[styles.margin, styles.text]}>Add task screen</Text>
            <TextInput onChangeText={setName} value={name} style={[styles.input, styles.margin]} label="Nom de la tâche" />
            <TextInput onChangeText={setDetails} value={details} style={[styles.input, styles.margin]} label="Détails de la tâche" />
            <Calendar
            style={styles.calendar}

                // Initially visible month. Default = now
                initialDate={new Date().toJSON().slice(0, 10)}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={day => {
                    setSelectedDay(day.dateString);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}
                // Hide month navigation arrows. Default = false
                hideArrows={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}

                markedDates={{
                    [selectedDay]: {selected: true, marked: true, selectedColor: 'blue'},
                  }}
            />
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
    calendar: {
        width: 300,
        // paddingTop: 50,
    },
})
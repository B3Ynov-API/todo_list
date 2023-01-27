import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../";

export const HomeScreen = ({navigation, route}) => {
    
    useEffect (() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.navigate("AddTask");
                }}>
                    <Text style={styles.addButton}>+</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation])

    return (
        <View style={styles.container}>
            <Task name="Tâche 1" />
            <Task name="Tâche 2" />
            <Task name="Tâche 3" />
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
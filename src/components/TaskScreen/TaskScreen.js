import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TaskScreen = ({ navigation, route }) => {

    const { task } = route.params;

    React.useEffect(() => {
        navigation.setOptions({ title: task.name });
    })


    return (
        <View style={styles.container}>
            <Text>{ task.details }</Text>
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
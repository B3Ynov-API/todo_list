import { Button } from '@rneui/base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const AddTaskScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Add task screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
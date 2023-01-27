import { CheckBox } from "@rneui/themed";
import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export const Task = (props) => {

    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                alert("Task pressed");
            }}>
                <Text>{props.name ? props.name : "Tâche"}</Text>
            </TouchableOpacity>
            <CheckBox checked={checked} onPress={() => {
                setChecked(!checked);
            }}>
            </CheckBox>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

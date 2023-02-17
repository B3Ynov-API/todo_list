import * as React from 'react';
import { StyleSheet } from 'react-native';
import { HomeStackScreen, DailyStackScreen } from './src/components/';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faCalendar } from '@fortawesome/free-solid-svg-icons'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: () => {
          let icon;

          if (route.name === 'HomeStack') {
            icon = faHouse;
          } else if (route.name === 'DailyStack') {
            icon = faCalendar;
          }
          return <FontAwesomeIcon icon={icon} />;
        }
      })}>
        <Tab.Screen name="HomeStack" component={HomeStackScreen} />
        <Tab.Screen name="DailyStack" component={DailyStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

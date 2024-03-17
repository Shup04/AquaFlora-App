import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../Screens/HomeScreens/Dashboard'; // Adjust the import paths
import { FishScreen } from '../Screens/HomeScreens/Fish';
import { PlantsScreen } from '../Screens/HomeScreens/Plants';
import { TanksScreen } from '../Screens/HomeScreens/Tanks';

import { Colors } from '../Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesomeIcon } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';


const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator 
    initialRouteName='Tanks'
    screenOptions={({ route }) => ({
        
        tabBarActiveTintColor: '#888888', // Active icon color
        tabBarInactiveTintColor: '#555555', 
        tabBarStyle: {
            backgroundColor: Colors.height3, // Semi-transparent background
            position: 'absolute', // Needed to apply custom styles
            elevation: 0, // Remove shadow on Android
            borderRadius: 8, // Rounded corners
            height: 60, // Height of the tab bar
            borderTopWidth: 0, // Remove top border
            borderColor: "transparent",
            paddingBottom: 5,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName = 'fish';
            let size = focused ? 35 : 30;
      
            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tanks') {
              iconName = focused ? 'fishbowl' : 'fishbowl-outline';
            } else if (route.name === 'Fish') {
              iconName = focused ? 'fish' : 'fish';
            } else if (route.name === 'Plants') {
              iconName = focused ? 'chat' : 'chat-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />
          },
          tabBarIconStyle: {
            fontSize: 20, // Adjust the size as needed
            color: Colors.textMarine, // Color of the icon
          },
          tabBarLabelStyle: {
            //fontSize: 12, // Adjust the size as needed
            //fontWeight: 'bold',
          },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primaryPastel, // Color of the indicator (underline)
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}
      >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tanks" component={TanksScreen} />
      <Tab.Screen name="Fish" component={FishScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
    </Tab.Navigator>
  );
}

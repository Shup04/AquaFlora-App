import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../Screens/HomeScreens/Dashboard'; // Adjust the import paths
import { FishScreen } from '../Screens/HomeScreens/Fish';
import { PlantsScreen } from '../Screens/HomeScreens/Plants';
import { TanksScreen } from '../Screens/HomeScreens/Tanks';

import { Colors } from '../Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesomeIcon } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primaryPastel, // Active icon color
        tabBarInactiveTintColor: Colors.secondaryPastel, // Inactive icon color
        tabBarStyle: {
            backgroundColor: Colors.height3, // Semi-transparent background
            position: 'absolute', // Needed to apply custom styles
            bottom: 5, // Distance from the bottom of the screen
            left: 5, // Distance from the left edge of the screen
            right: 5, // Distance from the right edge of the screen
            elevation: 0, // Remove shadow on Android
            borderRadius: 8, // Rounded corners
            height: 60, // Height of the tab bar
            borderTopWidth: 0, // Remove top border
            borderColor: "transparent",
            paddingBottom: 5,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
      
            if (route.name === 'H_Dashboard') {
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            } else if (route.name === 'H_Tanks') {
              iconName = focused ? 'fishbowl' : 'fishbowl-outline';
            } else if (route.name === 'H_Fish') {
              iconName = focused ? 'fish' : 'fish-outline';
            } else if (route.name === 'H_Plants') {
              iconName = focused ? 'flower' : 'flower-outline';
            }
      
            // You can return any component that you like here!
            return <MaterialCommunityIcons name="fishbowl" size={35} color={Colors.textWhite} />
          },
          tabBarIconStyle: {
            fontSize: 20, // Adjust the size as needed
            color: Colors.textMarine, // Color of the icon
          },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust the size as needed
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primaryPastel, // Color of the indicator (underline)
        },
        headerShown: false, // Optionally hide the header
      })}
      >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tanks" component={TanksScreen} />
      <Tab.Screen name="Fish" component={FishScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
    </Tab.Navigator>
  );
}

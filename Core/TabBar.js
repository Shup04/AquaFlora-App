import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../Screens/HomeScreens/Dashboard'; // Adjust the import paths
import { FishScreen } from '../Screens/HomeScreens/Fish';
import { PlantsScreen } from '../Screens/HomeScreens/Plants';
import { TanksScreen } from '../Screens/HomeScreens/Tanks';

import { Colors } from '../Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor: Colors.primary, // Active icon color
        tabBarInactiveTintColor: Colors.secondary, // Inactive icon color
        tabBarStyle: {
          backgroundColor: Colors.height2, // Tab bar background color
          borderTopColor: 'transparent', // Hide the top border of the tab bar
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust the size as needed
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary, // Color of the indicator (underline)
        },
        headerShown: false, // Optionally hide the header
      }}
      >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tanks" component={TanksScreen} />
      <Tab.Screen name="Fish" component={FishScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
    </Tab.Navigator>
  );
}

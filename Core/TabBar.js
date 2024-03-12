import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../Screens/HomeScreens/Dashboard'; // Adjust the import paths
import TanksScreen from '../Screens/HomeScreens/Tanks';
import FishScreen from '../Screens/HomeScreens/Fish';
import PlantsScreen from '../Screens/HomeScreens/Plants';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tanks" component={TanksScreen} />
      <Tab.Screen name="Fish" component={FishScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
    </Tab.Navigator>
  );
}

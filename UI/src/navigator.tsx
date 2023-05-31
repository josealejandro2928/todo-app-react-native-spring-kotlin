import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './pages/home.page';
import { DetailsScreen } from './pages/details.page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import { UserContext } from './context/user.context';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const theme = useTheme();
  const { user} = useContext(UserContext);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name='account'
                size={18}
                color={theme['color-primary-default']}
              />
            ),
          }}
          name='Users'
          component={HomeScreen}
        />
        {user && (
          <Tab.Screen
            name='Tasks'
            component={DetailsScreen}
            options={{
              tabBarIcon: () => (
                <FontAwesome name='tasks' size={18} color={theme['color-primary-default']} />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

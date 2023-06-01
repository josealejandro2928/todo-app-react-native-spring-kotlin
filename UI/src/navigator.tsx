import React, { useCallback, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './pages/home.page';
import { DetailsScreen } from './pages/details.page';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@ui-kitten/components';
import { UserContext } from './context/user.context';
import { StackView, createStackNavigator } from '@react-navigation/stack';
import { CreateUser } from './pages/create-user.page';
import TodoList from './pages/todos.page';
import CreateTodo from './pages/create-todo.page';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const AppNavigator = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='CREATE USER' component={CreateUser} />
        <Stack.Screen name='CREATE TODO' component={CreateTodo} />
        <Stack.Screen
          name='Home'
          component={useCallback(
            () => (
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
                    name='Todo'
                    component={TodoList}
                    options={{
                      tabBarIcon: () => (
                        <FontAwesome
                          name='tasks'
                          size={18}
                          color={theme['color-primary-default']}
                        />
                      ),
                    }}
                  />
                )}
              </Tab.Navigator>
            ),
            [user]
          )}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

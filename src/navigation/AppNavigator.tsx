import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen 
        name="UserList" 
        component={UserListScreen} 
        options={{ title: 'Users', headerLargeTitle: true }} 
      />
      <Stack.Screen 
        name="UserDetail" 
        component={UserDetailScreen} 
        options={({ route }) => ({ title: route.params.user.name })} 
      />
    </Stack.Navigator>
  );
};

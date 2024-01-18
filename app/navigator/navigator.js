import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { primary } from '../style/style.js';

import { 
  History, 
  Info, 
  Settings, 
  Login,
  ForgotPassword,
  Register, 
  Questionnaire, 
  Test, 
  Credit,
  Report, 
  EditProfile, 
  ResetEmail, 
  ResetPassword,
  TestInstruction,
  TestType,
  TestSide,
  TestVolume,
  TrialTest,
  NarrowbandTest,
  NotchedNoiseTest,
  LabTest,
  CompleteTest,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const SettingStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const TestStack = createStackNavigator();

function TestsStack() {
  return (
    <TestStack.Navigator screenOptions={{headerShown: false}}>
      <TestStack.Screen name="Index" component={LoggedIn} />
      <TestStack.Screen name="TestInstruction" component={TestInstruction} />
      <TestStack.Screen name="TestType" component={TestType} />
      <TestStack.Screen name="TestSide" component={TestSide} />
      <TestStack.Screen name="TestVolume" component={TestVolume} />
      <TestStack.Screen name="TrialTest" component={TrialTest} />
      <TestStack.Screen name="NarrowbandTest" component={NarrowbandTest} />
      <TestStack.Screen name="NotchedNoiseTest" component={NotchedNoiseTest} />
      <TestStack.Screen name="CompleteTest" component={CompleteTest} />
      <TestStack.Screen name="Report" component={Report} />
      <TestStack.Screen name="Credit" component={Credit} screenOptions={{headerShown: true}}/>
    </TestStack.Navigator>
  );
}

function SettingsStack() {
  return (
    <SettingStack.Navigator screenOptions={{headerBackTitleVisible: false}}>
      <SettingStack.Screen options={{headerShown: false}} name="Settings Main" component={Settings} />
      <SettingStack.Screen name="Edit Profile" component={EditProfile} />
      <SettingStack.Screen name="Reset Email" component={ResetEmail} />
      <SettingStack.Screen name="Reset Password" component={ResetPassword} />
    </SettingStack.Navigator>
  );
}

function HistoriesStack() {
  return (
    <HistoryStack.Navigator screenOptions={{headerBackTitleVisible: false}} initialRouteName="History Main">
      <HistoryStack.Screen options={{headerShown: false}} name="History Main" component={History} />
      <HistoryStack.Screen name="Report" component={Report} />
    </HistoryStack.Navigator>
  );
}

function LoggedIn() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: primary,
      }}
    >
      <Tab.Screen 
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="ear-hearing" color={color} size={size} />
        ),}}
        name="Test" 
        component={Test} 
      />
      <Tab.Screen 
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" color={color} size={size} />
        ),}}
        name="History" component={HistoriesStack}
      />
      <Tab.Screen
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book-outline" color={color} size={size} />
        ),}}
        name="Info" component={Info} 
      />
      <Tab.Screen 
        options={{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
        ),}}
        name="Settings" component={SettingsStack} 
      />
    </Tab.Navigator>
  );
}

function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{headerShown: true, headerBackTitleVisible: false, title: ""}} name="Register" component={Register} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        <Stack.Screen name="Home" component={TestsStack} />
    </Stack.Navigator>
  );
}

export default Navigator;
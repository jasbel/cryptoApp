
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import CoinsStack from 'initial/src/components/coins/CoinsStack';
import CoinsStack from './src/components/coins/CoinsStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Image } from 'react-native';
import colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: "#fefefe",
          style: {
            backgroundColor: colors.blackPearl
          }
        }}
      >
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options= {{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('initial/src/assets/bank.png')} 
              />
            )
          }}
        />
      </Tabs.Navigator>
      {/* <CoinsStack /> */}
    </NavigationContainer>
  );
};

export default App;

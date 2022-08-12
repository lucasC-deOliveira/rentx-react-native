import React from "react"
import { Home } from "../screens/Home"
import { MyCars } from "../screens/MyCars"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppStackRoutes } from "./app.stack.routes"
const { Navigator, Screen } = createBottomTabNavigator()

import HomeSvg from "../assets/home.svg"
import CarSvg from "../assets/car.svg"
import PeopleSvg from "../assets/people.svg"
import { useTheme } from "styled-components"
import { Platform } from "react-native"

export function AppTabRoutes() {
  const theme = useTheme()
  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (<HomeSvg fill={color} width={24} height={24} />)
          }
          if (route.name === 'Profile') {
            return (<PeopleSvg fill={color} width={24} height={24}  />)
          }
          if(route.name === 'MyCars'){
            return (<CarSvg fill={color} width={24} height={24}  />)
          }
        }
      })}

    >

      <Screen
        name="Home"
        component={AppStackRoutes}

      />
      <Screen
        name="Profile"
        component={Home}
      />

      <Screen
        name="MyCars"
        component={MyCars}
      />

    </Navigator>

  )
}
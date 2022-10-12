import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, Button } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { Ionicons } from "@expo/vector-icons"
import Logo from "../../assets/logo.svg";
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from "../../services/api"
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';
import { synchronize } from "@nozbe/watermelondb/sync"
import { database } from "../../database"
import { Car as ModelCar } from "../../database/model/car"

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from './styles'
import { useNetInfo } from '@react-native-community/netinfo';




//lottiefiles site de animações

export function Home() {

  const [cars, setCars] = useState<ModelCar[]>([])

  const [loading, setLoading] = useState(true)

  const netInfo = useNetInfo()

  const navigation = useNavigation<any>()

  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car })
  }

  async function offlineSynchronize() {

    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = data

        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const { user } = changes
        await api.post("/user/sync", user)
      }

    })

  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')

        const cars = await carCollection.query().fetch()

        if (isMounted) {
          setCars(cars)
        }
      }
      catch (error) {
        console.log(error)
      }
      finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    fetchCars()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize()
    }
    else {
      Alert.alert("Você esta of-line")
    }
  }, [netInfo.isConnected])


  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {!loading && (
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          )}

        </HeaderContent>
      </Header>

      {loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }


    </Container>
  );
}


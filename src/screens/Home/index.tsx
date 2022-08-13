import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"
import { Ionicons } from "@expo/vector-icons"
import Logo from "../../assets/logo.svg";
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import api from "../../services/api"
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';


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

  const [cars, setCars] = useState<CarDTO[]>([])

  const [loading, setLoading] = useState(true)

  const netInfo = useNetInfo()

  const navigation = useNavigation<any>()

  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        if (isMounted) {
          setCars(response.data)
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

  useEffect(()=>{
    if(netInfo.isConnected){
      Alert.alert("Você esta on-line")
    }
    else{
      Alert.alert("Você esta of-line")
    }
  },[netInfo.isConnected])


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


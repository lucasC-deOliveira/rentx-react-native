import React, { useState, useEffect } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { StatusBar, StyleSheet } from 'react-native';
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon"
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Car as ModelCar } from '../../database/model/car';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles'
import { useTheme } from 'styled-components';
import api from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';


interface Params {
  car: ModelCar;
}

export function CarDetails() {
  const [carUpdated, setCatUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo()

  const navigation = useNavigation<any>()

  const route = useRoute()

  const { car } = route.params as Params;

  const theme = useTheme()

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {
      car
    })
  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);

      setCatUpdated(response.data)
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated()
    }
  }, [netInfo.isConnected])
  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
          <Animated.View style={sliderCarsStyleAnimation}>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ?
                  carUpdated.photos
                  :
                  [
                    {
                      id: car.thumbnail,
                      photo: car.thumbnail
                    }
                  ]
              }
            />
          </Animated.View>
        </CarImages>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {
              netInfo.isConnected === true ?
                car.price : '...'
            }</Price>
          </Rent>
        </Details>
        <Accessories>
          {
            carUpdated.accessories &&
            carUpdated.accessories.map(accessory => (

              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />

            ))
          }

        </Accessories>
        <About>
          {car.about}

        </About>
      </Animated.ScrollView>
      <Footer>
        <Button 
        title="Escolher período do aluguel" 
        onPress={handleConfirmRental}
        enabled={netInfo.isConnected === true}
         />
         {
          <OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
         }
      </Footer>
    </Container >
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1
  },
})
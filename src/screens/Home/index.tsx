import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles'

import Logo from "../../assets/logo.svg";
import { Car } from '../../components/Car';



export function Home() {
  const carData = {
    brand: "AUDI",
    name: "RS Coupé",
    rent: {
      period: "AO DIA",
      price: 120
    },
    thumbnail: "https://img2.gratispng.com/20171202/1b1/audi-png-picture-5a228075ee1b68.9154536215122105499753.jpg"
  }

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
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1, 2, 3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />

    </Container>
  );
}
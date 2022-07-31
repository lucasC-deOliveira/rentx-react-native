import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize"

import {
  Container,
  Header,
  TotalCars,
  HeaderContent
} from './styles'

import Logo from "../../assets/logo.svg";
import { Car } from '../../components/Car';



export function Home() {
  const carData = {
    brand:"AUDI",
    name:"RS Coupé",
    rent:{
      period:"AO DIA",
      price:120
    },
    thumbnail:"https://img2.gratispng.com/20171202/1b1/audi-png-picture-5a228075ee1b68.9154536215122105499753.jpg"
  }

  const carData2 = {
    brand:"Renault",
    name:"Logan",
    rent:{
      period:"AO DIA",
      price:345
    },
    thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRAsBrhku1yXY8FTUVSfKRMLAfZzce_kZdaw&usqp=CAU"
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
      <Car data={carData}/>
      <Car data={carData2}/>
    </Container>
  );
}
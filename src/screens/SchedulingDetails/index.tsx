import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from "../../assets/speed.svg"
import AccelerationSvg from "../../assets/acceleration.svg"
import ForceSvg from "../../assets/force.svg"
import GasolineSvg from "../../assets/gasoline.svg"
import ExchangeSvg from "../../assets/exchange.svg"
import PeopleSvg from "../../assets/people.svg"
import {Feather} from "@expo/vector-icons"


import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,

} from './styles'
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

export function SchedulingDetails() {
  
  const theme = useTheme()
  
  const navigation = useNavigation<any>()

  function handleConfirm(){
    navigation.navigate("SchedulingComplete")
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={['https://img2.gratispng.com/20171202/1b1/audi-png-picture-5a228075ee1b68.9154536215122105499753.jpg']} />
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 Hp" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Accessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>
              De
            </DateTitle>
            <DateValue>06/08/2022</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
            />
            <DateInfo>
            <DateTitle>
              Ate
            </DateTitle>
            <DateValue>06/08/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota> 3 x R$ 500,00 diárias</RentalPriceQuota>
            <RentalPriceTotal> R$ 1.500,00 </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button title="Alugar agora" color={theme.colors.success} onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
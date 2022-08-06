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
  About,
  Accessories,
  Footer,
} from './styles'
import { Button } from '../../components/Button';

export function CarDetails() {
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
        <About>
          Este é um automovel desportivo. surgiu do lendario
          touro de lide indultado na praça Real Maestranza de Sevilla.
          É um belissimo carro para quem gosta de acelerar
        </About>
      </Content>
      <Footer>
        <Button title="confirmar" />
      </Footer>
    </Container>
  );
}
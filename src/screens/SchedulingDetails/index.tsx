import React, { useEffect, useState } from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { getAccessoryIcon } from "../../Utils/getAccessoryIcon";
import { Feather } from "@expo/vector-icons";
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from "date-fns"

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
import { getPlatformDate } from '../../Utils/getPlataformDate';
import api from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';


interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const [loading, setLoading] = useState(false)

  const [carUpdated, setCatUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo()

  const route = useRoute()

  const { car, dates } = route.params as Params;

  const theme = useTheme()

  const navigation = useNavigation<any>()

  const rentTotal = Number(dates.length * car.price)

  async function handleConfirm() {
    setLoading(true)


    await api.post("rentals", {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    }).then(response => {
      navigation.navigate("Confirmation", {
        nextScreenRoute: "Home",
        title: "Carro alugado",
        message: "Agora é so você ir\n até uma concessionaria da Rentx\npegar o seu automóvel"
      })
    }).catch(err => {
      setLoading(false)
      Alert.alert("Não foi possivel confirmar o agendamento")
    })


  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), "dd/MM/yyyy")
    })
  }, [])

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
      <Header>
        <BackButton onPress={handleBack} />
      </Header>
      <CarImages>
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
      </CarImages>
      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
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
            <DateValue>{rentalPeriod.start}</DateValue>
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
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota> R$ {car.price} x {dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal> R$ {rentTotal} </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirm}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
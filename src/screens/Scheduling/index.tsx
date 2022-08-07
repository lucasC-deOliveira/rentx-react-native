import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Alert, StatusBar } from 'react-native';
import ArrowSvg from '../../assets/arrow.svg'
import { Button } from '../../components/Button';
import { format } from "date-fns"
import { Calendar, DayProps, generateInterval } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CalendarProps } from 'react-native-calendars';
import { getPlatformDate } from '../../Utils/getPlataformDate';
import { CarDTO } from '../../dtos/CarDTO';


import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateValue,
  DateTitle,
  Content,
  Footer,

} from './styles'

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const route = useRoute()

  const { car } = route.params as Params;
  
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)

  const [markedDates, setMarkedDates] = useState<CalendarProps["markedDates"]>({} as CalendarProps["markedDates"])

  const [rentalPeriod, setRentPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme()

  const navigation = useNavigation<any>()

  function handleConfirm() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar.")
    } else {
      navigation.navigate("SchedulingDetails",{
        car,
        dates:Object.keys(markedDates)
      })
    }
  }

  function handleBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;

    let end = date;

    if (start.timestamp > end.timestamp) {
      let aux = start;
      start = end;
      end = aux;
    }

    setLastSelectedDate(end)

    const interval = generateInterval(start, end)
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]

    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), "dd/MM/yyyy"),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy")
    })

  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />
        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>
      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>
      <Footer>
        <Button
          title='Confirmar'
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
}
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { StatusBar } from 'react-native';
import ArrowSvg from '../../assets/arrow.svg'
import { Button } from '../../components/Button';

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
import { Calendar, DayProps, generateInterval } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';
import { CalendarProps } from 'react-native-calendars';



export function Scheduling() {

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)

  const [markedDates, setMarkedDates] = useState<CalendarProps["markedDates"]>({} as CalendarProps["markedDates"])

  const theme = useTheme()

  const navigation = useNavigation<any>()

  function handleConfirm() {
    navigation.navigate("SchedulingDetails")
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
    console.log(interval)

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
            <DateValue selected={true}>06/08/2022</DateValue>
          </DateInfo>
          <ArrowSvg />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}></DateValue>
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
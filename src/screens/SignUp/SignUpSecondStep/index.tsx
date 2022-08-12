import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'

export function SignUpSecondStep() {

  const navigation = useNavigation<any>()

  const theme = useTheme()

  function handleBack() {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>
          <Title>
            Crie sua {'\n'} conta
          </Title>
          <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rapida e facil
          </SubTitle>
          <Form>
            <FormTitle>
              2. Senha
            </FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder='Senha'
            />
            <PasswordInput
              iconName="lock"
              placeholder='Repetir senha'
            />
          </Form>
          <Button
            color={theme.colors.success}
            title='Cadastrar'
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
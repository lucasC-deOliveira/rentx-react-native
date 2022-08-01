import styled from 'styled-components/native'

export const Container = styled.View`
margin-top: 45px;
 flex:1;
 background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
align-items: center;
`
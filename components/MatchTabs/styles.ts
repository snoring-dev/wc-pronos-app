import styled, { css } from 'styled-components/native';

export const TabContainer = styled.View`
    background-color: white;
    margin: auto;
    padding: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    border-radius: 100px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Tab = styled.View<{ active?: boolean }>`
    min-width: 150px;
    padding: 10px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ active = false }) => active && css`
        background-color: #415dbe;
        border-radius: 100px;
    `}
`;

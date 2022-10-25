import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    margin: auto;
    width: 85%;
    min-height: 80px;
    background-color: white;
    border-radius: 15px;
    position: relative;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.07);
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const LiveLabel = styled.View`
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 100px;
    width: 50px;
    background-color: #fd4030;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    position: absolute;
    top: -13px;
    left: 42%;
`;
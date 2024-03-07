import styled from "styled-components"

export const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 40px 30px;

    display: flex;
    flex-direction: column;
    color: #010101;

    .title{
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 40px;
    }
`

export const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    gap: 5%;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column-reverse;
    background-color: var(--primary-color);
    height: 40vh;
    width: 20%;
    border-radius: 25px;

    padding-bottom: 20px;

    span{
        color: #fff;
    }

    span:nth-child(1){
        font-size: 12px;
        font-weight: 5600;
        padding: 5px 20px 0px 20px;
    }

    span:nth-child(2){
        font-size: 18px;
        font-weight: 600;
        padding-left: 20px;
    }
`

export const Trade = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 40vh;
    width: 50%;
    gap: 20px;

    .balance{
        display: flex;
        flex-direction: column;
        span:nth-child(1){
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
        }

        span:nth-child(2){
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 10px;
        }
    }

`

export const Info = styled.div`
    display: flex;
    flex-direction: row;

    height: 40vh;
    width: 20%;

    .separator{
        width: 2px;
        margin-top: 40px;
        height: calc(100% - 40px * 2);
        background-color: #01010130;
    }

    .info-content{
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        height: 100%;
        width: 100%;

        padding: 20px;

    }
`

export const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
`

export const NavMenu = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    margin-bottom: 40px;
    gap: 2%;

    span{
        color: #01010160;
        font-size: 22px;
        font-weight: 600;
        
        cursor: pointer;

        &.selected{
            color: #010101;
        }
    }
`

export const DataSection =  styled.div`
    display: flex;
    flex-direction: column;
    
    max-height: 40vh;
`
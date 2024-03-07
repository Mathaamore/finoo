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
    height: 10vh;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    gap: 2%;
`

export const TopBlock = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;

    border: 1px solid var(--primary-color);
    border-radius: 10px;
    background-color: #FFFFFF;

    .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        aspect-ratio: 1/1;
        

        svg{
            width: 50%;
            height: 50%;
            padding: 12%;
            border-radius: 10px;
            background-color: var(--primary-color);
            color: white;
        }
    }

    .info{
        width: 60%;
        display: flex;
        flex-direction: column;

        span:nth-child(1){
            font-size: 20px;
            font-weight: 600;
        }

        span:nth-child(2){
            font-size: 12px;
            font-weight: 500;
            color: #01010160;
        }
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
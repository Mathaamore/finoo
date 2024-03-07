import styled from "styled-components"

export const Main = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0px;
    right: 0px;
`

export const Loader = styled.div`
    width: 100%;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    }

    span{
      width: 48px;
      height: 48px;
      border: 5px solid var(--primary-color);
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
`

export const PageWrapper = styled.div<{ $hasPadding?: boolean; }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction:row;
  color: #333333;
`

export const Content = styled.div`
  width: 100%;
  padding-left: var(--sidebar-width);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #FAFAFD;;
  color: white;
`
import Link from "next/link";
import styled from "styled-components"

export const Container = styled.div`
    height: 100%;
    width: var(--sidebar-width);
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 10px 0px 10px -5px rgba(0, 0, 0, 0.15);
    background: #FFFFFF;
    color: #010101;
    z-index: 2;
`

export const NavItems = styled.div`
  width: 100%;
  padding-left: 14%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30%;

  @media only screen and (max-width: 460px) {
    padding: 0 5% 0 5%;
    flex-direction: row;
    padding: 1%;
    gap: 0px;
    justify-content: space-evenly;
  }
`;

export const NavItem = styled(Link)`
  width: 100%;
  height: 65px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;

  &.selected{
    color: var(--primary-color);
  }

  svg{
    width: 22px;
    height: 22px;
  }

  :hover{
    color: var(--primary-color);
    cursor: pointer;
  }

  @media only screen and (max-width: 460px) {
    justify-content: center;
    padding-left: 0%;

    span{
      display: none;
    }

    svg{
      width: 22px;
      height: 22px;
    }
  }
`;
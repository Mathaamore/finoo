import { useEffect } from 'react';

//Components
import { Main, Loader } from "../components/MainElements"

//Context
import { useAuth } from '../context/auth';

//Custom Elements
const SimpleLoader = () => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
      <Loader>
        <span />
      </Loader>
    </div>);
}


export default function GeneralLayout({ children }) {
  const { loading } = useAuth();

  return (
    <>
      <Main>{(loading) ? <SimpleLoader /> : children}</Main>
    </>
  )
}
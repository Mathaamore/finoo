import type { AppProps } from 'next/app'

//Layout
import GeneralLayout from '../layouts/general_layout';
import { AuthProvider } from '../context/auth';

//GlobalTheme
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { GlobalStyle } from '../components/globalstyles'
import '../styles/primereact.css'


//PrimereactCore
import "primereact/resources/primereact.min.css";

//Icons
import "primeicons/primeicons.css";
import Head from 'next/head';

const theme: DefaultTheme = {
  colors: {
    primary: '#232323',
    secondary: 'var(--primary-color)'
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Finoo</title>
        <meta name='description' content="Finoo! Infinite Trading" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GeneralLayout>
            <Component {...pageProps} />
          </GeneralLayout>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

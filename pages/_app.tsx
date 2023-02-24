import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Loader from '../components/loader/loader'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true)
    });
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading && <Loader></Loader>}<Component {...pageProps} /></>
}

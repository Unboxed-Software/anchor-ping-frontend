import "../styles/globals.css"
import type { AppProps } from "next/app"
import WalletContextProvider from "../components/WalletContextProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  )
}

export default MyApp

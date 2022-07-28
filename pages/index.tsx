import { NextPage } from "next"
import styles from "../styles/Home.module.css"
import WalletContextProvider from "../components/WalletContextProvider"
import { AppBar } from "../components/AppBar"
import { IncrementButton } from "../components/IncrementButton"
import Head from "next/head"

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <IncrementButton />
        </div>
      </WalletContextProvider>
    </div>
  )
}

export default Home

import { NextPage } from "next"
import styles from "../styles/Home.module.css"
import { AppBar } from "../components/AppBar"
import { useWallet } from "@solana/wallet-adapter-react"
import { Increment } from "../components/Increment"
import { Initialize } from "../components/Initialize"
import { useState } from "react"
import Head from "next/head"

const Home: NextPage = (props) => {
  const [counter, setCounter] = useState("")
  const wallet = useWallet()

  return (
    <div className={styles.App}>
      <Head>
        <title>Anchor Frontend Example</title>
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        {wallet.connected ? (
          <Initialize setCounter={setCounter} />
        ) : (
          <>Connect Wallet</>
        )}
        {counter && <Increment counter={counter} />}
      </div>
    </div>
  )
}

export default Home

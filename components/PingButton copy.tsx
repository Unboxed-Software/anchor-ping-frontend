import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useState } from "react"
import styles from "../styles/PingButton.module.css"
import idl from "../idl.json"

const PROGRAM_ID = `3ycJzxn4Akd2A3G2EDAW5RrM5V5DeRWt84MWHJ1ctLUr`
const DATA_ACCOUNT_PUBKEY = `4EgPRavdTMXD42zssM74oAFR8Ea6Upjt2snyNdsiUaFw`

export const PingButton: FC = () => {
  const { connection } = useConnection()
  const { sendTransaction } = useWallet()
  const wallet = useAnchorWallet()

  const [url, setUrl] = useState("")

  const onClick = async () => {
    if (!connection || !wallet) {
      return
    }

    const provider = new anchor.AnchorProvider(connection, wallet, {})
    anchor.setProvider(provider)

    const programId = new anchor.web3.PublicKey(PROGRAM_ID)
    const programDataAccount = new anchor.web3.PublicKey(DATA_ACCOUNT_PUBKEY)
    const program = new anchor.Program(idl as anchor.Idl, programId)

    const transaction = new anchor.web3.Transaction()

    const instruction = await program.methods
      .increment()
      .accounts({
        counter: programDataAccount,
        user: wallet.publicKey,
      })
      .signers([])
      .instruction()

    transaction.add(instruction)
    sendTransaction(transaction, connection).then((sig) => {
      console.log(
        `Transaction: https://explorer.solana.com/tx/${sig}?cluster=devnet`
      )
      setUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`)
    })
  }

  return (
    <div>
      <div className={styles.buttonContainer} onClick={onClick}>
        <button className={styles.button}>Ping!</button>
      </div>
      {url && <a href={url}>View Transaction</a>}
    </div>
  )
}

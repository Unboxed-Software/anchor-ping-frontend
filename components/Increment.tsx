import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useState } from "react"
import styles from "../styles/Button.module.css"
import idl from "../idl.json"

const PROGRAM_ID = `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`

export interface Props {
  counter
}

export const Increment: FC<Props> = ({ counter }) => {
  const [url, setUrl] = useState("")
  const { connection } = useConnection()
  const { sendTransaction } = useWallet()
  const wallet = useAnchorWallet()

  const provider = new anchor.AnchorProvider(connection, wallet, {})
  anchor.setProvider(provider)

  const programId = new anchor.web3.PublicKey(PROGRAM_ID)
  const program = new anchor.Program(idl as anchor.Idl, programId)

  const onClick = async () => {
    if (!connection || !wallet) {
      return
    }
    const transaction = new anchor.web3.Transaction()
    const instruction = await program.methods
      .increment()
      .accounts({
        counter: counter,
        user: wallet.publicKey,
      })
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
        <button className={styles.button}>Increment Counter</button>
      </div>
      {url && (
        <a href={url} target="_blank">
          View Transaction
        </a>
      )}
    </div>
  )
}

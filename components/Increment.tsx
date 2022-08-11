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

  const onClick = async () => {}

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

import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useEffect, useState } from "react"
import idl from "../idl.json"
import { Button } from "@chakra-ui/react"

const PROGRAM_ID = new anchor.web3.PublicKey(
  `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`
)

export interface Props {
  setCounter
  setTransactionUrl
}

export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
  const onClick = async () => {}

  return <Button onClick={onClick}>Initialize Counter</Button>
}

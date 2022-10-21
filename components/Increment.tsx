import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react"
import * as anchor from "@project-serum/anchor"
import { FC, useCallback, useEffect, useState } from "react"
import idl from "../idl.json"
import { Button, HStack, VStack, Text } from "@chakra-ui/react"

const PROGRAM_ID = `9pbyP2VX8Rc7v4nR5n5Kf5azmnw5hHfkJcZKPHXW98mf`

export interface Props {
  counter
  setTransactionUrl
}

export const Increment: FC<Props> = ({ counter, setTransactionUrl }) => {
  const [count, setCount] = useState(0)
  const [program, setProgram] = useState<anchor.Program>()

  const incrementCount = async () => {}

  const refreshCount = async (program) => {}

  return (
    <VStack>
      <HStack>
        <Button onClick={incrementCount}>Increment Counter</Button>
        <Button onClick={() => refreshCount(program)}>Refresh count</Button>
      </HStack>
      <Text color="white">Count: {count}</Text>
    </VStack>
  )
}

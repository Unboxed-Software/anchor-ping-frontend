import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { FC, useCallback, useEffect, useState } from "react";
import idl from "../idl.json";
import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import { AnchorCounter } from "../types/AnchorContract";

export interface Props {
  counter;
  setTransactionUrl;
}

export const Increment: FC<Props> = ({ counter, setTransactionUrl }) => {
  const [count, setCount] = useState(0);
  const [program, setProgram] = useState<anchor.Program<AnchorCounter>>();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    let provider: anchor.Provider;

    try {
      provider = anchor.getProvider();
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
    }

    const program = new anchor.Program(idl as AnchorCounter);
    setProgram(program);
    refreshCount(program);
  }, []);

  const incrementCount = useCallback(async () => {
    const sig = await program.methods
      .increment()
      .accounts({
        counter: counter,
      })
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  }, [program]);

  const decrementCount = useCallback(async () => {
    const sig = await program.methods
      .decrement()
      .accounts({
        counter: counter,
      })
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
  }, [program]);

  const refreshCount = async (program) => {
    const counterAccount = await program.account.counter.fetch(counter);
    setCount(counterAccount.count.toNumber());
  };

  return (
    <VStack>
      <HStack>
        <Button onClick={incrementCount}>Increment</Button>
        <Button onClick={decrementCount}>Decrement</Button>
        <Button onClick={() => refreshCount(program)}>Refresh count</Button>
      </HStack>
      <Text color="white">Count: {count}</Text>
    </VStack>
  );
};

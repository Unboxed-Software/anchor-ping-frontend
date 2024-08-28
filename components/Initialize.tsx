import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { FC, useEffect, useState } from "react";
import idl from "../idl.json";
import { Button } from "@chakra-ui/react";
import { AnchorCounter } from "../types/AnchorCounter";

export interface Props {
  setCounter;
  setTransactionUrl;
}

export const Initialize: FC<Props> = ({ setCounter, setTransactionUrl }) => {
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
  }, []);

  const onClick = async () => {
    const newAccount = anchor.web3.Keypair.generate();

    const sig = await program.methods
      .initialize()
      .accounts({
        counter: newAccount.publicKey,
      })
      .signers([newAccount])
      .rpc();

    setTransactionUrl(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    setCounter(newAccount.publicKey);
  };

  return <Button onClick={onClick}>Initialize Counter</Button>;
};

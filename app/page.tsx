"use client"
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "@/components/EthWallet";
import { SolanaWallet } from "@/components/SolanaWallet";
import Button from "@/components/Button";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="my-2">
        <Button onClickFn={async function() {
          const mn = await generateMnemonic();
          setMnemonic(mn)
        }} text="Create Seed Phrase" />
      </div>
      <div className="flex flex-col justify-center items-center my-2 p-4 border boder-white rounded">
        <h2 className="text-lg"><b>Mneumonic</b></h2>
        {mnemonic}
      </div>
      <div className="my-2">
        <EthWallet mnemonic={mnemonic} />
      </div>
      <div className="my-2">
        <SolanaWallet mnemonic={mnemonic} />
      </div>
    </div>
  );
}

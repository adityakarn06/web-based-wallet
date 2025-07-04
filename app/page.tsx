"use client"
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "@/components/EthWallet";
import { SolanaWallet } from "@/components/SolanaWallet";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="my-2">
        <button className="border border-white p-1"
         onClick={async function() {
          const mn = await generateMnemonic();
          setMnemonic(mn)
        }}>
          Create Seed Phrase
        </button>
      </div>
      <div className="my-2">
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

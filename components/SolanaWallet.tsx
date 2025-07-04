import { useCallback, useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl"
import Button from "./Button";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);

    const addWallet = useCallback(async () => {
        try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        } catch (error) {
            console.error("Error generating wallet:", error);
        }
    }, [mnemonic, currentIndex, publicKeys])

    return <div className="flex flex-col justify-center items-center gap-1 border border-white rounded p-5">
        <Button onClickFn={addWallet} text="Add Solana wallet" />
        
        {publicKeys.map((publicKey) => (
            <div key={publicKey.toBase58()}>
                {publicKey.toBase58()}
            </div>
        ))}
    </div>
}
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import Button from "./Button";

export const EthWallet = ({ mnemonic }: { mnemonic: string}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState<string[]>([]);

    const addEthWallet = async function() {
        const seed = await mnemonicToSeed(mnemonic);
        const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
         const hdNode = HDNodeWallet.fromSeed(seed);
         const child = hdNode.derivePath(derivationPath);
         const privateKey = child.privateKey;
         const wallet = new Wallet(privateKey);
         setCurrentIndex(currentIndex + 1);
        setAddresses([...addresses, wallet.address]);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-1 border border-white rounded p-5">
            <Button onClickFn={addEthWallet} text="Add ETH wallet" />

            {addresses.map((p) => (
                <div key={p}>
                    Eth - {p}
                </div>))}
        </div>
    )
}
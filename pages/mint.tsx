import {
    Button,
    Grid,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Moralis from "moralis";
import Web3 from "web3";
import { pinFileToIPFS } from "@/contracts/FileToIPFS";
import { pinJSONToIPFS } from "@/contracts/JSONToIPFS";
import { contractABI, contractAddress } from "@/contracts/nft-contract";
import { useSession } from "next-auth/react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { Create, Surfing, Upload, UploadFile } from "@mui/icons-material";

function Mint() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState(false);
    const { data: session }: any = useSession();

    const [nftAddress, setNftAddress] = useState("");
    const [isminted, setisminted] = useState(false);
    const [isMinting, setisMinting] = useState(false);
    const [mintingStatus, setmintingStatus] = useState("");

    // const web3 = new Web3(
    //   "https://eth-goerli.g.alchemy.com/v2/vhbFH4QoOvNMZTs4gTynmGHuxe7tK2b6"
    // );
    const web3 = createAlchemyWeb3(
        process.env.NEXT_PUBLIC_ALCHEMY_API_URL ?? ""
    );

    const mintNft = async (file: File) => {
        //   e.preventDefault();
        setisMinting(true);
        try {
            setmintingStatus("Fazendo Upload da sua Imagem...");
            const nftFile = await pinFileToIPFS(file);
            if (!nftFile) {
                setisMinting(false);
                setmintingStatus("Error");
                setError(false);
                return;
            }
            const fileId = nftFile.IpfsHash;

            const pinataGateWayIPFAddress =
                "https://silver-rainy-boar-253.mypinata.cloud/ipfs";
            const gatewayFileUrlAddress = `${pinataGateWayIPFAddress}/${fileId}`;

            const nftMetaData = {
                name: name,
                description: description,
                image: fileId,
                metadata: `${name}Metadata.json`,
            };

            const metaDataFile = await pinJSONToIPFS(nftMetaData);
            if (!metaDataFile) {
                setisMinting(false);
                setmintingStatus("Error");
                setError(false);
                return;
            }

            const metaDataFileId = metaDataFile.IpfsHash;

            const metaDataGatewayFileUrlAddress = `${pinataGateWayIPFAddress}/${metaDataFileId}`;

            setmintingStatus("Criando sua NFT...");
            const nftMinterContract = new web3.eth.Contract(
                contractABI as any,
                contractAddress
            );

            const nftMintResponse = await nftMinterContract.methods
                .mintToken(metaDataGatewayFileUrlAddress)
                .send({ from: session.user.address });
            console.log(nftMintResponse);

            const nftAddress = nftMintResponse?.events?.Transfer.address;
            const nftTokenId =
                nftMintResponse?.events?.Transfer.returnValues.tokenId;

            setNftAddress(`${nftAddress}/${nftTokenId}`);
            setisminted(true);
            setisMinting(false);
        } catch (error) {
            console.log(error);
            setisMinting(false);
        }
    };

    if (isminted) {
        return (
            <Grid
                container
                direction="column"
                spacing={3}
                justifyContent="center"
                alignItems="center"
                mt={15}
            >
                <Grid item>
                    <Link
                        href={`https://testnets.opensea.io/assets/goerli/${nftAddress}`}
                    >
                        Veja sua nova NFT no OpenSea!
                    </Link>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setName("");
                            setDescription("");
                            setFile(null);
                            setisminted(false);
                        }}
                    >
                        Criar uma nova NFT
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} gap={2}>
            <Stack textAlign={"center"}>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    textTransform={"uppercase"}
                >
                    Preencha os Campos e Crie sua NFT
                </Typography>
                <Typography variant="body2" fontWeight={400}>
                    Apenas para Testes na Goerli
                </Typography>
            </Stack>

            <TextField
                value={name}
                error={error && name === ""}
                onChange={(e) => setName(e.target.value)}
                label="Nome"
                variant="outlined"
                required
                sx={{ maxWidth: 512, width: "100%" }}
            />
            <TextField
                value={description}
                error={error && description === ""}
                onChange={(e) => setDescription(e.target.value)}
                label="Descrição"
                variant="outlined"
                required
                sx={{ maxWidth: 512, width: "100%" }}
            />

            <input
                hidden
                type="file"
                accept="image/*"
                id="raised-button-file"
                onChange={(e) => {
                    const file = e.target.files;
                    if (file && file.length > 0) {
                        setFile(file[0]);
                    }
                }}
            />
            <label htmlFor="raised-button-file">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadFile />}
                >
                    {file ? file.name : "Adicionar Arquivo"}
                </Button>
            </label>
            {file && (
                <Image
                    alt="preview image"
                    src={URL.createObjectURL(file)}
                    width={300}
                    height={300}
                />
            )}
            <Button
                onClick={() => {
                    if (name === "" || description === "" || file === null) {
                        setError(true);
                    } else {
                        mintNft(file);
                    }
                }}
                startIcon={<Surfing />}
                variant="contained"
                color="primary"
                sx={{ maxWidth: 512, width: "100%" }}
                disabled={isMinting}
            >
                {isMinting ? mintingStatus : "Criar NFT"}
            </Button>
        </Stack>
    );
}

export default Mint;

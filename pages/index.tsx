import MetamaskButton from "@/components/metamaskButton/metamaskButton";
import {
    Alert,
    AlertTitle,
    Button,
    Container,
    Grid,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function HomePage() {
    const { data: session }: any = useSession();
    const { push } = useRouter();

    useEffect(() => {
        if (session) {
            push("/mint");
        }
    }, [session, push]);

    return (
        <Container>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                gap={2}
            >
                <Stack>
                    <Typography
                        variant="h5"
                        textTransform={"uppercase"}
                        fontWeight={600}
                    >
                        Crie Suas NFTs e Associe com sua Conta MetaMask
                    </Typography>
                    <Typography variant="body1" fontWeight={200}>
                        O MintThis é o jeito mais prático de fazer seu NFT
                    </Typography>
                </Stack>
                {!session ? (
                    <div>
                        <MetamaskButton />
                    </div>
                ) : (
                    <div>
                        <Button
                            variant="contained"
                            onClick={() => push("/mint")}
                        >
                            Mint NFT
                        </Button>
                    </div>
                )}
            </Stack>
            <div>
                <Alert severity="info" sx={{ mt: 2 }}>
                    <AlertTitle>Extensão do MetaMask necessária</AlertTitle>
                    <Link href="https://metamask.io/download/" target="_blank">
                        Baixe a extensão do MetaMask
                    </Link>
                </Alert>
            </div>
        </Container>
    );
}

export default HomePage;

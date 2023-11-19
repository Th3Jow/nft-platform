import MetamaskButton from "@/components/metamaskButton/metamaskButton";
import { Button, Grid, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function HomePage() {
  const { data: session }: any = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session) {
      push("/mint");
    }
  }, [session, push]);

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      mt={20}
    >
      <Typography variant="h6">
        Crie Suas NFTs e Associe com sua Conta MetaMask
      </Typography>
      {!session ? (
        <MetamaskButton />
      ) : (
        <Button variant="contained" onClick={() => push("/mint")}>
          Mint NFT
        </Button>
      )}
    </Grid>
  );
}

export default HomePage;

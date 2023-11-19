import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import Image from "next/image";
import { Button, Grid } from "@mui/material";

function MetamaskButton() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push, pathname } = useRouter();

  // useEffect(() => {
  //   if (session && pathname === '/') {
  //     push("/mint");
  //   }
  // }, [session, push, pathname]);

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const { message } = (await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    })) ?? { message: "" };

    const signature = await signMessageAsync({ message }).catch(() => null);

    // redirect user after success authentication to '/user' page
    if (signature) {
      signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        // callbackUrl: "/user",
      }).catch(() => null);
    }
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    // push(url);
  };

  return (
    <Button color="secondary" variant="contained" onClick={handleAuth}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Image
            src={"../../metamask.svg"}
            alt="Metamask logo"
            width={20}
            height={20}
          />
        </Grid>
        <Grid item>{"Conectar com o Metamask"}</Grid>
      </Grid>
    </Button>
  );
}

export default MetamaskButton;

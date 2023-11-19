import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import { goerli } from "wagmi/chains";
import { AppProps } from "next/app";
import Header from "@/components/header/header";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WagmiConfig config={config}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;

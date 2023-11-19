import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import MetamaskButton from "../metamaskButton/metamaskButton";
import { Button, Grid, Typography } from "@mui/material";
import PageButtons from "../pageButtons/pageButtons";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const { data: session }: any = useSession();

  return (
    <header>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        px={4}
      >
        <Typography variant="h3">NFT Platform</Typography>
        {session && <PageButtons />}
        {!session && <MetamaskButton />}
        {session && (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => signOut({ redirect: false })}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Image
                  src={"../../metamask.svg"}
                  alt="Metamask logo"
                  width={20}
                  height={20}
                />
              </Grid>
              <Grid item>
                <Typography variant="button">
                  {` ${session.user.address
                    .slice(0, 4)
                    .toUpperCase()}...${session.user.address
                    .slice(-4)
                    .toUpperCase()} `}
                </Typography>
              </Grid>
              <Grid item>
                <LogoutIcon sx={{ fontSize: 16 }} />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  fill="currentColor"
                  className="bi bi-power"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.5 1v7h1V1h-1z" />
                  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg> */}
              </Grid>
            </Grid>
          </Button>
        )}
      </Grid>
    </header>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default Header;

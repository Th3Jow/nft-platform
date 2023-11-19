import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

function PageButtons() {
  const { push } = useRouter();

  return (
    <Grid container direction="row" maxWidth="20%">
      <Grid item>
        <Button variant="outlined" onClick={() => push("/mint")}>
          {"Mint NFT"}
        </Button>
      </Grid>
      <Grid item ml={2}>
        <Button variant="outlined" onClick={() => push("/explore")}>
          {"Explorar"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageButtons;

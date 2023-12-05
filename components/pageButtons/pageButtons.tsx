import { Button, Grid, Stack } from "@mui/material";
import { useRouter } from "next/router";

function PageButtons() {
    const { push } = useRouter();

    return (
        <Stack direction="row" gap={2}>
            <Button variant="outlined" onClick={() => push("/mint")}>
                {"Mint NFT"}
            </Button>
            <Button variant="outlined" onClick={() => push("/explore")}>
                {"Explorar"}
            </Button>
        </Stack>
    );
}

export default PageButtons;

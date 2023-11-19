import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { contractAddress } from "@/contracts/nft-contract";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface imageMetadata {
  url: string;
  title: string;
  description: string;
}

function Explore() {
  const [myNFT, setMyNFT] = useState<imageMetadata[]>([]);
  const [openModal, setOpenModal] = useState<imageMetadata | null>(null);
  const { data: session }: any = useSession();
  const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_URL ?? "");

  useEffect(() => {
    if (session) {
      web3.alchemy
        .getNfts({
          owner: session.user.address,
          contractAddresses: [contractAddress],
        })
        .then((v) =>
          v.ownedNfts.map((i) => ({
            url: `https://gateway.pinata.cloud/ipfs/${i.metadata?.image?.replace(
              "ipfs://",
              ""
            )}`,
            title: i.title,
            description: i.description,
          }))
        )
        .then((v) => setMyNFT(v));
    }
  }, [session]);

  const handleClose = () => {
    setOpenModal(null);
  };

  const MoreDialog = (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal !== null}
    >
      <Grid container direction="row" justifyContent="space-between" px={1}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {`NFT: ${openModal?.title}`}
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
          <Close />
        </IconButton>
      </Grid>

      <DialogContent dividers sx={{ pt: 0 }}>
        <CardMedia
          sx={{ height: 140, mb: 2 }}
          image={openModal?.url}
          title={openModal?.title}
        />
        <Typography gutterBottom>{`Nome: ${openModal?.title}`}</Typography>
        <Typography gutterBottom>
          {`Descrição: ${openModal?.description}`}
        </Typography>
      </DialogContent>
      {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Salvar
          </Button>
        </DialogActions> */}
    </Dialog>
  );

  return (
    <Grid direction="row" container mt={5} px={5} spacing={2}>
      {myNFT.map((nft) => (
        <Grid key={nft.url.split("/")[-1]} item xs={6} md={4} lg={3}>
          <Card sx={{ width: "auto" }}>
            <CardActionArea onClick={() => setOpenModal(nft)}>
              <CardMedia
                sx={{ height: 140 }}
                image={nft.url}
                title={nft.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {nft.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      {MoreDialog}
    </Grid>
  );
}

export default Explore;

// //imports needed for this function
// const axios = require("axios");
// // const fs = require("fs");
// const FormData = require("form-data");
// export const pinFileToIPFS = (file: File) => {
//   console.log(process.env.PINATA_API_KEY);

//   const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//   let data = new FormData();
//   data.append("file", file.stream());

//   const pinataMetadata = JSON.stringify({
//     name: file.name,
//   });
//   data.append("pinataMetadata", pinataMetadata);

//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//   });
//   data.append("pinataOptions", pinataOptions);

//   return axios
//     .post(url, data, {
//       maxBodyLength: "Infinity",
//       headers: {
//         "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
//       },
//     })
//     .then((response: any) => response.data)
//     .catch((error: any) => error);
// };

export const pinFileToIPFS = (file: File) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`
  );

  var formdata = new FormData();
  formdata.append("file", file, file.name);

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions)
    .then((response) => response.json())
    .catch((error) => null);
};

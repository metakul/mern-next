import { AddAPhoto as AddAPhotoIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { convertFileToBase64 } from "../../scripts/fileConverter";

export default function ImageUploader(props) {
  const { register } = props;
  const [file, setFile] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const base64Image=await convertFileToBase64(file)
      register(base64Image);
      setFile({ preview: URL.createObjectURL(file) });
    },
  });

  const preview = (
    <Box key={file.name}>
      <div>
        <img
          style={{
            display: "block",
            height: 150,
            width: 150,
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          alt={file.name}
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </Box>
  );

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        borderRadius: 4,
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px dashed #eaeaea",
            height: 150,
            width: 150,
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          <Box
            {...getRootProps({ className: "dropzone" })}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#eaeaea75",
              height: 120,
              width: 120,
              cursor: "pointer",
              borderRadius: "50%",
              p: 1,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <input {...getInputProps()} />
            <AddAPhotoIcon
              sx={{
                mb: 2,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: 12,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              Import an image
            </Typography>
            {preview}
          </Box>
        </Box>
        <Typography
          mt={2}
          textAlign={"center"}
          color={"text.secondary"}
          sx={{
            fontSize: 12,
          }}
        >
          Click to import or drag and drop JPEG, JPG, PNG, SVG, or GIF.
        </Typography>
      </Container>
    </Paper>
  );
}
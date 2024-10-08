import { AddAPhoto as AddAPhotoIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function Previews(props: { onFileChange: any; }) {
  const { onFileChange } = props;
  const [file, setFile] = useState<any>(null);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile({
        ...selectedFile,
        webkitRelativePath: selectedFile.webkitRelativePath || "",
        preview: URL.createObjectURL(selectedFile),
      });

      if (onFileChange) {
        onFileChange(selectedFile);
      }
    },
  });

  const preview = file && (
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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        {...getRootProps({ className: "dropzone" })}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed #eaeaea",
          height: 175,
          width: 175,
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

      <Typography
        mt={2}
        width={300}
        textAlign={"center"}
        color={"text.secondary"}
        sx={{
          fontSize: 12,
        }}
      >
        Click to import or drag and drop JPEG, JPG, PNG, SVG, or GIF.
      </Typography>
    </Container>
  );
}

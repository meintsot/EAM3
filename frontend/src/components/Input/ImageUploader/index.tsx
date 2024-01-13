import { useState } from "react";
import cloudUpload from "../../../assets/img/CloudUpload.png";
import Typography from "@mui/material/Typography";
import { ImageUploaderProps } from "../../../model";

import "./ImageUploader.css";

// TODO: event types !!!!!!!

export default function ImageUploader({
  id,
  onChange,
  placeholder = "",
}: ImageUploaderProps) {
  const [file, setFile] = useState(cloudUpload);
  const [showRemove, setShowRemove] = useState(false);

  const handleChange = (e: any) => {
    let target = e.target as HTMLInputElement;
    let image: any;
    if (target.files) image = target.files[0];
    setFile(URL.createObjectURL(image));
    setShowRemove(true);

    const reader = new FileReader();

    reader.onload = (e: any) => {
      onChange(id, { ...image, binary: e?.target?.result });
    };

    reader.readAsText(image);
  };

  const handleRemove = (e: any) => {
    setFile(cloudUpload);
    setShowRemove(false);
  };

  return (
    <div className="imageUploader" id={id}>
      <div className="imageContainer">
        <img alt="" src={file} className="image" />
        <input type="file" onChange={handleChange} className="hidden" />
      </div>
      {showRemove ? (
        <Typography
          variant="caption"
          className="removeImageButton"
          onClick={handleRemove}
        >
          Αφαίρεση εικόνας προφίλ
        </Typography>
      ) : (
        <></>
      )}
    </div>
  );
}

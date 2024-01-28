import { useState } from "react";
import { useLocation } from "react-router-dom";
import cloudUpload from "../../../assets/img/CloudUpload.png";
import cloudUploadWhite from "../../../assets/img/CloudUploadWhite.png";
import Typography from "@mui/material/Typography";
import { ImageUploaderProps } from "../../../model";

import "./ImageUploader.css";

// TODO: event types !!!!!!!

export default function ImageUploader({ id, onChange }: ImageUploaderProps) {
  const location = useLocation();
  const { pathname } = location;
  const defaultPicture =
    pathname === "/register" ? cloudUpload : cloudUploadWhite;
  const [file, setFile] = useState(defaultPicture);
  const [showRemove, setShowRemove] = useState(false);

  const handleChange = (e: any) => {
    let target = e.target as HTMLInputElement;
    let image: any;
    if (target.files) image = target.files[0];
    setFile(URL.createObjectURL(image));
    onChange("image", image);
    setShowRemove(true);
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

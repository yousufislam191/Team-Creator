import { useState } from "react";

export default function PreviewSignupImage({ file }) {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    // <>src={preview}</>
    <img
      src={preview}
      //   src="https://avatars.githubusercontent.com/u/63366048?v=4"
      className="rounded-circle img-fluid me-3"
      name="image"
      alt="loading..."
      style={{ maxHeight: "150px", maxWidth: "150px" }}
    />
  );
}

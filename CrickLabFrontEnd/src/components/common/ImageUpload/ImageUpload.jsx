import { CloudinaryUploadWidget } from "react-cloudinary-uploader";
import toast, { Toaster } from "react-hot-toast";

const CloudinaryWidget = ({ onChange }) => {
  const handleUploadSuccess = (info) => {
    toast.success("Upload Success")
    onChange(info.secure_url);
  };

  const handleUploadFailure = (error) => {
    console.error("Upload error:", error);
  };

  return (
    <div>
      <CloudinaryUploadWidget
        cloudName="dixynhi69"
        uploadPreset="xzgztzmt"
        onUploadSuccess={handleUploadSuccess}
        onUploadFailure={handleUploadFailure}
      >
        <button
          style={{
            color: "white",
            border: "none",
            width: "120px",
            backgroundColor: "#bbb",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          className="custom-class"
        >
          Upload Picture
        </button>
      </CloudinaryUploadWidget>
      <Toaster/>
    </div>
  );
};

export default CloudinaryWidget;

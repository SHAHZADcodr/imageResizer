import React from "react";
import imageCompression from "browser-image-compression";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./image.css"; // Import the CSS file
// Import your CSS file

class ImageCompressor extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
    };
  }

  handle = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      this.setState({
        originalLink: URL.createObjectURL(imageFile),
        originalImage: imageFile,
        outputFileName: imageFile.name,
        uploadImage: true,
      });
    }
  };

  click = (e) => {
    e.preventDefault();

    // If no image is uploaded, show toast notification
    if (!this.state.originalImage) {
      toast.error("Please upload an image first!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme:"dark"
      });
      return;
    }

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 200,
      useWebWorker: true,
    };

    imageCompression(this.state.originalImage, options).then((output) => {
      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
        clicked: true,
      });

      toast.success("Image compressed successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    });
  };

  render() {
    return (
        <>
        <h2 style={{textAlign:"center"}}>Image Compressor</h2>
      <div className="image-compressor-container">
       
        <ToastContainer />

        <div className="card-container">
          {/* Original Image Upload Section */}
          <div className="image-box">
            <Card.Img
              variant="top"
              src={
                this.state.uploadImage
                  ? this.state.originalLink
                  : "https://testersdock.com/wp-content/uploads/2017/09/file-upload-1280x640.png"
              }
            />
            <input
              type="file"
              accept="image/*"
              className="upload-btn"
              onChange={this.handle}
            />
          </div>

          {/* Compress Button */}
          <button className="compress-btn" onClick={this.click}>
            Compress Image
          </button>

          {/* Compressed Image & Download Section */}
          <div className="image-box">
            <Card.Img variant="top" src={this.state.compressedLink} />
            {this.state.clicked && (
              <a
                href={this.state.compressedLink}
                download={this.state.outputFileName}
                className="download-btn"
              >
                Download Image
              </a>
            )}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default ImageCompressor;

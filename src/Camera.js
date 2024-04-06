import React, { useRef, useState } from 'react';
import { ref as storageRef, uploadBytes } from 'firebase/storage'; 
import { storage } from './firebase-config'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true); 
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const handleCaptureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob(blob => {
        setCapturedImage(URL.createObjectURL(blob)); 
        const imageRef = storageRef(storage, `images/${new Date().toISOString()}.png`); 
        uploadBytes(imageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
        }).catch((error) => {
          console.error("Error uploading file", error);
        });
      }, 'image/png');
    }
  };
  return (
    <div className="container text-center d-flex flex-column justify-content-between align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        {capturedImage && <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%' }} />}
      </div>
      <div>
        {!capturedImage && isCameraActive && <button className="btn btn-primary mt-3" onClick={handleCaptureImage}>Capture Image</button>}
        <button className="btn btn-primary" onClick={handleStartCamera}>Start Camera</button>
        <video ref={videoRef} autoPlay style={{ maxWidth: '100%', height: 'auto' }}></video>
        <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '640px', height: 'auto', display: 'none' }}></canvas>
      </div>
    </div>
  );
}

export default Camera;

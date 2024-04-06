import React, { useRef } from 'react';
import { ref as storageRef, uploadBytes } from 'firebase/storage'; // Import necessary functions from Firebase storage
import { storage } from './firebase-config'; // Import the pre-configured storage instance

function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  };

  const handleCaptureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Convert canvas to blob for upload
      canvasRef.current.toBlob(blob => {
        const imageRef = storageRef(storage, `images/${new Date().toISOString()}.png`); // Create a reference to upload the file to Firebase Storage

        // Upload the file
        uploadBytes(imageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
        }).catch((error) => {
          console.error("Error uploading file", error);
        });
      }, 'image/png');
    }
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      <video ref={videoRef} autoPlay style={{display: 'none'}}></video>
      <canvas ref={canvasRef} style={{width: '640px', height: '480px', display: 'none'}}></canvas>
      <button onClick={handleCaptureImage}>Capture Image</button>
    </div>
  );
}

export default Camera;

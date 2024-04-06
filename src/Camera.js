import React, { useRef } from 'react';

// CameraComponent definition
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
      
      // To save the image, you can then extract it from the canvas
      const imageSrc = canvasRef.current.toDataURL('image/png');
      
      // For example, to download the image you could do:
      const a = document.createElement('a');
      a.href = imageSrc;
      a.download = 'captured-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
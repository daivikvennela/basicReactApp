import React, { useState, useRef } from 'react';

const API_URL = 'http://0.0.0.0:8000'; 

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    
    setError(null);
    setApiResponse(null);
  
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        
        // Prepare form data for API call
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          setIsLoading(true);
          const response = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log(data);
          setApiResponse(data);
        } catch (err) {
          setError('Error processing image: ' + err.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {selectedImage && (
        <div style={{ marginTop: '20px' }}>
          <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '300px', borderRadius: '8px' }} />
        </div>
      )}
      {apiResponse && (
        <div style={{ marginTop: '20px' }}>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
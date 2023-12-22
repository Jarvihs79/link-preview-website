// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setPreview(null);
  };

  const handlePreview = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getLinkPreview?url=${url}`, {
        headers: {
          'User-Agent': 'Googlebot', // Set the desired User-Agent here
        },
      });
      setPreview(response.data);
    } catch (error) {
      console.error('Error fetching link preview:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Link Preview App</h1>
      <div>
        <input
          type="text"
          placeholder="Paste a URL..."
          value={url}
          onChange={handleInputChange}
        />
        <button onClick={handlePreview}>Preview</button>
      </div>

      {preview && (
        <div className="PreviewContainer">
          <h2>Preview:</h2>
          <p>Title: {preview.title}</p>
          <p>Description: {preview.description}</p>
          <p>Image: <img src={preview.image} alt="Preview" /></p>
          <p>URL: {preview.url}</p>
        </div>
      )}
    </div>
  );
}

export default App;

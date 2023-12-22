const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

app.get('/getLinkPreview', async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Googlebot', 
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

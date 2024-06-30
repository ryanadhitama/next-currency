import axios from 'axios';

export default async function handler(req, res) {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY; // Store your API key in environment variables
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  try {
    const response = await axios.get(url);

    if (response?.data?.result === 'success') {
      res.status(200).json(response?.data);
    } else {
      res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
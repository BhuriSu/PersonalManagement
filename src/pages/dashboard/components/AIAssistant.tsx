import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import type { SxProps } from '@mui/material/styles';

export interface LatestConnectionsProps {
  sx?: SxProps;
}

export function YourAIAssistant({ sx }: LatestConnectionsProps): React.JSX.Element {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Replace 'your-api-endpoint' with your actual Django API endpoint for PrivateGPT
    axios.get('/api/private-gpt-endpoint')
      .then(response => {
        setAiResponse(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching data from AI');
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Your A.I Assistant for tracking and providing insightful information about your connection (Coming Soon)" />
      <Divider />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
          {error}
        </div>
      )}
      {aiResponse && (
        <div style={{ padding: '20px', fontSize: '18px', lineHeight: '1.6' }}>
          {aiResponse}
        </div>
      )}
    </Card>
  );
}

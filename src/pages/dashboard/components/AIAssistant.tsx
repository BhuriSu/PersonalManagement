import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';

export interface YourAIAssistantProps {
  sx?: SxProps;
}

interface ChatMessage {
  message: string;
  isUser: boolean;
}

export function YourAIAssistant({ sx }: YourAIAssistantProps): React.JSX.Element {
  const [question, setQuestion] = useState<string>(''); // Question input by the user
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // Array of chat messages
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionSubmit = async () => {
    if (question.trim() === '') return; // Don't allow empty questions

    // Add user question to chat
    setChatMessages(prevMessages => [...prevMessages, { message: question, isUser: true }]);
    setLoading(true);
    setError(null);

    try {
      // Call the backend scrape endpoint
      const response = await axios.post('/scrape/', { question }); // Send the question to the backend

      // Add AI response to chat
      setChatMessages(prevMessages => [...prevMessages, { message: response.data.answer, isUser: false }]);
    } catch (error) {
      setError('Error fetching data from AI');
    } finally {
      setLoading(false);
    }

    setQuestion(''); // Clear the question input field
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Ask Your AI Assistant" />
      <Divider />

      {/* Chat window */}
      <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.isUser ? 'right' : 'left',
              margin: '10px 0',
              display: 'flex',
              justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                backgroundColor: msg.isUser ? '#3f51b5' : '#f1f1f1',
                color: msg.isUser ? '#fff' : '#000',
                padding: '10px 15px',
                borderRadius: '20px',
                maxWidth: '70%',
                wordWrap: 'break-word',
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress size={24} />
          </div>
        )}

        {/* Error message */}
        {error && (
          <div style={{ textAlign: 'center', color: 'red', marginTop: '20px' }}>
            {error}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', padding: '20px' }}>
        <TextField
          fullWidth
          label="Ask a question..."
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleQuestionSubmit();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleQuestionSubmit}
          style={{ marginLeft: '10px' }}
        >
          Send
        </Button>
      </div>
    </Card>
  );
}

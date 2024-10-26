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
  const [question, setQuestion] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const initializeChat = async () => {
    if (!websiteUrl) {
      setError('Please enter a website URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/chat/initialize/', {
        website_url: websiteUrl
      });

      setSessionId(response.data.session_id);
      setIsInitialized(true);
      setChatMessages([{ message: 'Hello! How can I help you today?', isUser: false }]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.data.error || error.response.statusText}`);
      } else {
        setError('Failed to initialize chat');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (question.trim() === '' || !sessionId) return;

    setChatMessages(prevMessages => [...prevMessages, { message: question, isUser: true }]);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/chat/message/', {
        message: question,
        session_id: sessionId
      });

      setChatMessages(prevMessages => [...prevMessages, { message: response.data.response, isUser: false }]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.data.error || error.response.statusText}`);
      } else {
        setError('Error fetching response from AI');
      }
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Ask Your AI Assistant" />
      <Divider />

      {!isInitialized ? (
        <div style={{ padding: '20px' }}>
          <TextField
            fullWidth
            label="Ask Something..."
            variant="outlined"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={initializeChat}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </div>
      ) : (
        <>
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

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size={24} />
              </div>
            )}

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
              onKeyDown={(e) => {
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
              disabled={loading}
            >
              Send
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

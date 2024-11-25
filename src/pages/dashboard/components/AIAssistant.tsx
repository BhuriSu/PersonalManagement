import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';

export interface RAGAssistantProps {
  sx?: SxProps;
}

interface ChatMessage {
  message: string;
  isUser: boolean;
}

export function AIAssistant({ sx }: RAGAssistantProps): React.JSX.Element {
  const [question, setQuestion] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<'connecting' | 'ready' | 'error'>('ready');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleQuestionSubmit = async () => {
    if (question.trim() === '' || systemStatus !== 'ready') return;

    try {
      // Add user message to chat
      setChatMessages(prev => [...prev, { message: question, isUser: true }]);
      setLoading(true);
      setError(null);

      // Make API call
      const response = await axios.post('http://localhost:8000/chat/', 
        { message: question },
        { 
          headers: { 
            'Content-Type': 'application/json' 
          },
          timeout: 10000 // 10 second timeout
        }
      );

      // Add AI response to chat
      setChatMessages(prev => [...prev, { message: response.data.message, isUser: false }]);
    } catch (error) {
      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.error || 
                         error.message || 
                         'Failed to send message';
        setError(errorMsg);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const renderContent = () => {
    switch (systemStatus) {
      case 'error':
        return (
          <Box sx={{ p: 4 }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={() => setSystemStatus('ready')}>
                  Retry
                </Button>
              }
            >
              {error || 'Failed to connect to chat service. Please try again.'}
            </Alert>
          </Box>
        );

      case 'ready':
        return (
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
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div style={{ display: 'flex', padding: '20px' }}>
              <TextField
                fullWidth
                label="Ask about your data..."
                variant="outlined"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleQuestionSubmit();
                  }
                }}
                disabled={loading}
                multiline
                maxRows={3}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleQuestionSubmit}
                style={{ marginLeft: '10px' }}
                disabled={loading || question.trim() === ''}
              >
                Send
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <Card sx={sx}>
      <CardHeader 
        title="Ask About Your Data" 
        subheader={`System Status: ${systemStatus === 'ready' ? 'Ready' : 'Error'}`}
      />
      <Divider />
      {renderContent()}
    </Card>
  );
}
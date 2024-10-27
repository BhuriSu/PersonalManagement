import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
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
  const [systemStatus, setSystemStatus] = useState<'connecting' | 'ready' | 'error'>('connecting');
  const websocket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize WebSocket connection
    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    setSystemStatus('connecting');
    setError(null);

    try {
      websocket.current = new WebSocket('ws://localhost:8000/ws/chat/');

      websocket.current.onopen = () => {
        setSystemStatus('ready');
      };

      websocket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.error) {
          setError(data.error);
        } else if (data.message) {
          setChatMessages(prev => [...prev, { message: data.message, isUser: false }]);
        }
        setLoading(false);
      };

      websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setSystemStatus('error');
        setError('Failed to connect to chat service');
        setLoading(false);
      };

      websocket.current.onclose = () => {
        // Attempt to reconnect after a delay if the connection was established before
        if (systemStatus === 'ready') {
          setTimeout(connectWebSocket, 3000);
        }
      };

    } catch (error) {
      console.error('WebSocket connection error:', error);
      setSystemStatus('error');
      setError('Failed to establish WebSocket connection');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleQuestionSubmit = () => {
    if (question.trim() === '' || systemStatus !== 'ready' || !websocket.current) return;

    setChatMessages(prev => [...prev, { message: question, isUser: true }]);
    setLoading(true);
    setError(null);

    try {
      websocket.current.send(JSON.stringify({ message: question }));
      setQuestion('');
    } catch (error) {
      setError('Failed to send message');
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (systemStatus) {
      case 'connecting':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <CircularProgress />
            <Box sx={{ ml: 2 }}>Connecting to chat service...</Box>
          </Box>
        );

      case 'error':
        return (
          <Box sx={{ p: 4 }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={connectWebSocket}>
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
        subheader={`System Status: ${systemStatus === 'ready' ? 'Ready' : 
                    systemStatus === 'connecting' ? 'Connecting...' : 'Error'}`}
      />
      <Divider />
      {renderContent()}
    </Card>
  );
}
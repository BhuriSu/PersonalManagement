import * as React from 'react';
import { useState, useEffect } from 'react';
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

interface InitializeResponse {
  status: string;
  message: string;
}

interface QueryResponse {
  status: string;
  response: string;
}

export function RAGAssistant({ sx }: RAGAssistantProps): React.JSX.Element {
  const [question, setQuestion] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<'initializing' | 'ready' | 'error'>('initializing');

  useEffect(() => {
    initializeRAG();
  }, []);

  const initializeRAG = async () => {
    setSystemStatus('initializing');
    setError(null);

    try {
      const { data } = await axios.post<InitializeResponse>('http://localhost:8000/api/rag/initialize/');
      
      if (data.status === 'success') {
        setSystemStatus('ready');
        setChatMessages([{ 
          message: 'Hello! I can help you find information about your goals and other data. What would you like to know?', 
          isUser: false 
        }]);
      } else {
        throw new Error(data.message || 'Initialization failed');
      }
    } catch (error) {
      setSystemStatus('error');
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error.response.data.message || 'Failed to initialize RAG system');
      } else {
        setError('Failed to initialize RAG system');
      }
    }
  };

  const handleQuestionSubmit = async () => {
    if (question.trim() === '' || systemStatus !== 'ready') return;

    setChatMessages(prev => [...prev, { message: question, isUser: true }]);
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<QueryResponse>('http://localhost:8000/api/rag/query/', {
        question: question
      });

      if (data.status === 'success' && data.response) {
        setChatMessages(prev => [...prev, { message: data.response, isUser: false }]);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        setError(error.response.data.message || 'Error getting response');
      } else {
        setError('Error getting response from RAG system');
      }
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const renderContent = () => {
    switch (systemStatus) {
      case 'initializing':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
            <CircularProgress />
            <Box sx={{ ml: 2 }}>Initializing RAG system...</Box>
          </Box>
        );

      case 'error':
        return (
          <Box sx={{ p: 4 }}>
            <Alert 
              severity="error" 
              action={
                <Button color="inherit" size="small" onClick={initializeRAG}>
                  Retry
                </Button>
              }
            >
              {error || 'Failed to initialize RAG system. Please try again.'}
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
            </div>

            <div style={{ display: 'flex', padding: '20px' }}>
              <TextField
                fullWidth
                label="Ask about your goals, mistakes, or other data..."
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
                    systemStatus === 'initializing' ? 'Initializing...' : 'Error'}`}
      />
      <Divider />
      {renderContent()}
    </Card>
  );
}
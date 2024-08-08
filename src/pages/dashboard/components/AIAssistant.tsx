import * as React from 'react';
import neural from '../../../assets/neural.png'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';


export interface LatestConnectionsProps {
  sx?: SxProps;
}

export function YourAIAssistant({sx }: LatestConnectionsProps): React.JSX.Element {

  return (
    <Card sx={sx}>
      <CardHeader title="Your A.I Assistant for tracking and providing insightful information about your connection (Coming Soon)" />
      <Divider />
      <img src={neural} alt="neural" style={{ width: '1000px', height: '500px' }} />
    </Card>
  );
}

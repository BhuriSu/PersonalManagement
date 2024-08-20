import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface TotalProfitProps {
  sx?: SxProps;
  value: number;
}

export function TotalProfit({  sx, value }: TotalProfitProps): React.JSX.Element {
  const formattedValue = new Intl.NumberFormat().format(value);
  
  return (
    <Card sx={sx}>
      <CardContent>
      <Stack spacing={3}>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Total Profit From Dealing
            </Typography>
            <Typography variant="h4">{formattedValue}</Typography>
          </Stack>
        </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

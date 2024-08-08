import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../constants/routes';
import MainThreeDimensionGraph  from './MainThreeDimensionGraph '
export interface LatestConnectionsProps {
  sx?: SxProps;
}

export function ThreeDimensionGraph({sx }: LatestConnectionsProps): React.JSX.Element {
  const navigate = useNavigate();
  return (
    <Card sx={sx}>
      <CardHeader title="Your entire connection graph" />
      <Divider />
      <MainThreeDimensionGraph />
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          onClick={() => { navigate(routes.userProfile) }}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}

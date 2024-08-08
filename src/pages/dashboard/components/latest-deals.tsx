import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThreeVertical as DotsThreeVerticalIcon } from '@phosphor-icons/react/dist/ssr/DotsThreeVertical';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../constants/routes';

export interface Deal {
  id: string;
  name: string;
  updatedAt: Date;
}

export interface LatestDealsProps {
  deals?: Deal[];
  sx?: SxProps;
}

export function LatestDeals({ deals = [], sx }: LatestDealsProps): React.JSX.Element {
  const navigate = useNavigate();
  
  return (
    <Card sx={sx}>
      <CardHeader title="Latest deals" />
      <Divider />
      <List>
        {deals.map((deal, index) => (
          <ListItem divider={index < deals.length - 1} key={deal.id}>
            <ListItemAvatar>
              {(
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: 'var(--mui-palette-neutral-200)',
                    height: '48px',
                    width: '48px',
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={deal.name}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={`Updated ${dayjs(deal.updatedAt).format('MMM D, YYYY')}`}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
            <IconButton edge="end">
              <DotsThreeVerticalIcon weight="bold" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
          onClick={() => { navigate(routes.dealList) }}
          >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}

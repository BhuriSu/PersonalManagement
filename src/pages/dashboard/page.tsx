import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TotalTransactions } from './components/total-transaction';
import { LatestConnections } from './components/latest-connections';
import { LatestDeals } from './components/latest-deals';
import { Deals } from './components/sales';
import { GoalsProgress } from './components/goal-progress';
import { TotalConnections } from './components/total-connections';
import { TotalProfit } from './components/total-profit';
import { Traffic } from './components/traffic';

interface Transaction {
  id: string;
  money: number;
}
interface Profit {
  id: string;
  profit: number;
}

export default function DashBoardPage(): React.JSX.Element {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const profits = useSelector((state: RootState) => state.profits.profits);


  const totalTransactions = transactions.reduce((total: number, transaction: Transaction) => total + transaction.money, 0);
  const totalProfits = profits.reduce((total: number, profit: Profit) => total + profit.profit, 0);
  const totalConnections = useSelector((state: RootState) => state.connections.totalConnections);



  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalTransactions diff={12} trend="up" sx={{ height: '100%' }} value={totalTransactions} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalConnections diff={16} trend="down" sx={{ height: '100%' }} value={totalConnections} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <GoalsProgress sx={{ height: '100%' }} value={1} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit diff={7} trend="up" sx={{ height: '100%' }} value={totalProfits} />
      </Grid>
      <Grid lg={8} xs={12}>
        <Deals
          chartSeries={[
            { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
            { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid> 
      <Grid lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Total Transactions', 'Total Connections', 'Total Profit From Dealing']} sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestDeals
          deals={[
            {
              id: 'PRD-005',
              name: 'Soja & Co. Eucalyptus',
            
              updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
            },
            {
              id: 'PRD-004',
              name: 'Necessaire Body Lotion',
             
              updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-003',
              name: 'Ritual of Sakura',
              
              updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
            },
            {
              id: 'PRD-002',
              name: 'Lancome Rouge',
             
              updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
            },
            {
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
            
              updatedAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LatestConnections
          orders={[
            {
              id: 'ORD-007',
              customer: { name: 'Ekaterina Tankova' },
              amount: 30.5,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-006',
              customer: { name: 'Cao Yu' },
              amount: 25.1,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-004',
              customer: { name: 'Alexa Richardson' },
              amount: 10.99,
              status: 'refunded',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-003',
              customer: { name: 'Anje Keizer' },
              amount: 96.43,
              status: 'pending',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-002',
              customer: { name: 'Clarke Gillebert' },
              amount: 32.54,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: 'ORD-001',
              customer: { name: 'Adam Denisov' },
              amount: 16.76,
              status: 'delivered',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}

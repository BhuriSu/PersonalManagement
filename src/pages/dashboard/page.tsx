import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { TotalTransactions } from './components/total-transaction';
import { YourAIAssistant } from './components/AIAssistant';
import { HighestStat } from './components/highest-stat';
import { HighestProfit } from './components/highest-profit';
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
  const highestProfit = useSelector((state: RootState) => state.highestProfit.value);

  const totalTransactions = transactions.reduce((total: number, transaction: Transaction) => total + transaction.money, 0);
  const totalProfits = profits.reduce((total: number, profit: Profit) => total + profit.profit, 0);
  const totalConnections = useSelector((state: RootState) => state.connections.totalConnections);

  const highestProfitData = profits.map(profit => profit.profit).slice(-10);

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalTransactions sx={{ height: '100%' }} value={totalTransactions} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalConnections sx={{ height: '100%' }} value={totalConnections} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <HighestProfit sx={{ height: '100%' }} value={highestProfit} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value={totalProfits} />
      </Grid>
      <Grid lg={8} xs={12}>
        <HighestStat
          sx={{ height: '100%' }}
          chartSeries={[
            {
              name: 'Highest Profits',
              data: highestProfitData
            }
          ]}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic 
          chartSeries={[totalTransactions, totalProfits]} 
          labels={['Total Transactions', 'Total Profit From Dealing']} 
          sx={{ height: '100%' }} 
        />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <YourAIAssistant />
      </Grid>
    </Grid>
  );
}

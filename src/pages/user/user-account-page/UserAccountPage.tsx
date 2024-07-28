import { Box, Container, Tab, TabProps, Tabs } from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader';
import React from 'react';
import MistakeList from '../components/mistake-list/MistakeList';
import { AccountSettingsForm } from '../components/account-settings-form/AccountSettingsForm';
import GoalListPage from '../components/goal-list/goal';
import { useCurrentUser } from '../../../hooks/api/use-current-user/useCurrentUser';
import { Loader } from '../../../components/loader/Loader';

// Import the images
import goal from '../../../assets/goal.png';
import mistakes from '../../../assets/mistakes.png';
import settings from '../../../assets/settings.png';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box marginTop={4}>{children}</Box>}
    </div>
  );
}

export default function UserAccountPage() {
  const [value, setValue] = React.useState(0);
  const { data: user, isLoading } = useCurrentUser();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabProps: TabProps = {
    sx: { minHeight: 42, textTransform: 'capitalize' },
    iconPosition: 'start',
  };

  console.log(user);

  if (isLoading || !user) return <Loader />;

  return (
    <Container maxWidth='lg'>
      <PageHeader title={'User account'} breadcrumbs={['User', 'Account']} />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab {...tabProps} icon={<img src={goal} alt="Goal" style={{ width: '24px', height: '24px' }} />} label='Goal' {...a11yProps(0)} />
            <Tab {...tabProps} icon={<img src={mistakes} alt="Lesson of Mistakes" style={{ width: '24px', height: '24px' }} />} label='Lesson of Mistakes' {...a11yProps(1)} />
            <Tab {...tabProps} icon={<img src={settings} alt="Settings" style={{ width: '24px', height: '24px' }} />} label='Settings' {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GoalListPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MistakeList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AccountSettingsForm />
        </TabPanel>
      </Box>
    </Container>
  );
}

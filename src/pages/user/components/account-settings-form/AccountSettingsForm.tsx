import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

const leftColumnSx = { maxWidth: '200px', width: '100%' };

const CheckboxWithForm = ({ control, name, label }: { control: any; name: string; label: string }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FormControlLabel
          control={<Checkbox onBlur={onBlur} onChange={onChange} checked={value} inputRef={ref} />}
          label={label}
        />
      )}
    />
  );
};

// Mock function to simulate sending email
const sendEmail = (to: string, subject: string, body: string) => {
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
};

export const AccountSettingsForm = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      enableNewsletter: false,
      feedback: '', // Add a field for feedback
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const enableNewsletter = watch('enableNewsletter');
  const feedback = watch('feedback');

  const handleSave = useCallback((data: any) => {
    console.log(data);

    let message = '';
    if (enableNewsletter) {
      sendEmail('shonuvy@gmail.com', 'Newsletter Update', 'test newsletter');
      message += 'Newsletter update sent. ';
    }

    if (feedback) {
      sendEmail('shonuvy@gmail.com', 'User Feedback', `test feedback: ${feedback}`);
      message += 'Feedback sent.';
    }

    // Show notification
    enqueueSnackbar(message || 'No changes detected', { variant: 'success' });
  }, [enableNewsletter, feedback, enqueueSnackbar]);

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Card elevation={2} sx={{ padding: 2 }}>
        <CardContent>
          <Stack spacing={6}>
            <Stack direction={'row'} spacing={2}>
              <Stack spacing={2} paddingY={1} sx={leftColumnSx}>
                <Typography fontWeight={'fontWeightMedium'}>Newsletter to your email</Typography>
              </Stack>
              <Stack spacing={2}>
                <FormGroup>
                  <CheckboxWithForm
                    control={control}
                    name={'enableNewsletter'}
                    label='Enable Newsletter'
                  />
                  <CheckboxWithForm
                    control={control}
                    name={'unableNewsletter'}
                    label='Unable Newsletter'
                  />
                </FormGroup>
              </Stack>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Stack spacing={2} paddingY={1} sx={leftColumnSx}>
                <Typography fontWeight={'fontWeightMedium'}>Send feedback to us</Typography>
              </Stack>
              <Stack spacing={2}>
                <TextField
                  sx={{ m: 1, width: '80ch' }}
                  label="Your Feedback"
                  multiline
                  rows={7}
                  variant="outlined"
                  fullWidth
                  {...control.register('feedback')}
                />
              </Stack>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Stack spacing={2} paddingY={1} sx={leftColumnSx}>
                <Typography fontWeight={'fontWeightMedium'}>Delete account</Typography>
              </Stack>
              <Stack spacing={2}>
                <Button variant={'contained'} color={'error'}>
                  Delete account
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type={'submit'} variant={'contained'}>
            Save changes
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

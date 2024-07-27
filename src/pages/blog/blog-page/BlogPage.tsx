import {
  Button,
  ButtonGroup,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PageHeader } from '../../../components/page-header/PageHeader';
import { BlogList } from './components/blog-list/BlogList';
import { Loader } from '../../../components/loader/Loader';
import { useCallback, useState } from 'react';
import { Add, GridView, Search, Splitscreen } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../contants/routes';
import { BlogView } from './types/blogView';
import { useBlogPosts } from '../../../hooks/api/use-blog-posts';

export default function BlogPage() {
  const { isLoading, data } = useBlogPosts();
  const [view, setView] = useState<BlogView>(BlogView.GRID);
  const navigate = useNavigate();

  const handleViewChange = useCallback((view: BlogView) => {
    setView(view);
  }, []);

  return (
    <Container maxWidth={'lg'}>
      <PageHeader
        title={'Blog'}
        breadcrumbs={['Blog', 'List']}
        renderRight={
          <Button onClick={() => navigate(routes.blogCreatePost)} startIcon={<Add />} variant={'contained'}>
            Add post
          </Button>
        }
      />

      <Stack direction={'row'} marginBottom={2} justifyContent={'space-between'} alignItems={'flex-start'}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search color={'inherit'} />
              </InputAdornment>
            ),
          }}
          fullWidth={false}
          size={'small'}
          variant={'outlined'}
          placeholder={'Search posts...'}
        />
        <Stack direction={'row'} spacing={2}>

          <ButtonGroup variant={'outlined'} color={'primary'}>
            <Button
              onClick={() => handleViewChange(BlogView.GRID)}
              variant={view === BlogView.GRID ? 'contained' : 'outlined'}
              size={'small'}
            >
              <GridView />
            </Button>
            <Button
              onClick={() => handleViewChange(BlogView.LIST)}
              variant={view === BlogView.LIST ? 'contained' : 'outlined'}
              size={'small'}
            >
              <Splitscreen />
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
      <Stack mt={4} mb={4} spacing={2}>
        <Typography variant={'h4'}>Social Media Blog</Typography>
        <Typography variant={'body1'} color={'text.secondary'}>
          When You have a lot of social media or article to read, you can use our service to manage simultaneously in
          realtime. 
        </Typography>
      </Stack>
      {isLoading && <Loader />}
      {!isLoading && data && <BlogList posts={data} view={view} />}
    </Container>
  );
}

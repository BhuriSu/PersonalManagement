import { BlogWidgetContainer, BlogWidgetContent } from './styled';
import { Button, Typography } from '@mui/material';

export const BlogWidget = () => {

  return (
    <BlogWidgetContainer>
      <BlogWidgetContent>
        <Typography variant={'body2'} textTransform={'uppercase'}>
          Latest blog post
        </Typography>
        <Button color={'primary'} variant={'outlined'} size={'small'}>
          Read more
        </Button>
      </BlogWidgetContent>
    </BlogWidgetContainer>
  );
};

import './ArticlePage.scss';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { theme } from '../../components/Blank/Blank';
import { Button, CardActions, Paper, ThemeProvider } from '@mui/material';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getArticlesSelector } from '../../store/selectors';
import { useSelector } from 'react-redux';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const articles = useSelector(getArticlesSelector);
  let curArticle;
  if (id) {
    curArticle = articles.find(article => article.id === +id);
    if (!curArticle) {
      navigate('/');
    }
  }

  return (
    <Card 
      sx={{ maxWidth: 1440, m: '75px auto' }}
    >
      <CardMedia
        component='img'
        height='245'
        image={curArticle?.imageUrl}
        alt={curArticle?.title}
      />
      <CardContent sx={{ p: '0 75px 0' }}>
        <Paper
          sx={{
            m: '0 auto',
            maxWidth: 1290,
            border: '1px solid #eaeaea',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
            borderRadius: '5px',
          }}
          className='text-block'>
          <ThemeProvider theme={theme}>
            <Typography 
              sx={{
                textAlign: 'center',
                fontSize: '24px',
                lineHeight: '29px',
                fontWeight: '400',
                p: '35px 0 50px',
                display: 'block'
              }} 
              variant='body2' 
              component='div'
            >
              {curArticle?.title}
            </Typography>

            <Typography 
              sx={{
                textAlign: 'left',
                fontSize: '18px',
                lineHeight: '27px',
                fontWeight: '400',
                p: '0 75px 50px 75px',
              }} 
              variant='body2' 
              component='div'
            >
              {curArticle?.summary}
            </Typography>
          </ThemeProvider>
        </Paper>
        <NavLink to={'/'}>
          <CardActions sx = {{ p: 0 }}>
            <Button 
              sx = {{ p: 0, position: 'relative', top: '-55px', left: '75px' }}
              size='small'
              color='primary'>
              <img src='images/backToHomepage.svg' alt='Back to Homepage' />
            </Button>
          </CardActions>
        </NavLink>
      </CardContent>
    </Card>
  );
}
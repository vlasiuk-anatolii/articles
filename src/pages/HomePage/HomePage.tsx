import { Blank } from '../../components/Blank/Blank';
import './HomePage.scss';
import Box from '@mui/material/Box';
import { theme } from '../../components/Blank/Blank';
import { Card, Checkbox, ThemeProvider, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loadArticles, setCurrentQuery, setKeyWords } from '../../store';
import { getArticlesSelector, getStateLoadSelector, getKeyWordsSelector, getCurrentQuerySelector } from '../../store/selectors';
import { Loader } from '../../components/Loader/Loader';
import { useQuery } from '../../customHooks/useQuery';
import React, { useEffect } from 'react';

export const HomePage: React.FC = () => {
  const [checkedTitle, setCheckedTitle] = React.useState(true);
  const [checkedSummary, setCheckedSummary] = React.useState(false);
  const dispatch:AppDispatch = useDispatch();
  const isLoad = useSelector(getStateLoadSelector);
  const keyWords = useSelector(getKeyWordsSelector);
  const queryTitle = useQuery(keyWords, 'title');
  const querySummary = useQuery(keyWords, 'summary');
  const articles = useSelector(getArticlesSelector);
  const currentQuery = useSelector(getCurrentQuerySelector);

  const handleChangeCheckboxTitle = () => {
    setCheckedTitle(!checkedTitle);
  };

  const handleChangeCheckboxSummary = () => {
    setCheckedSummary(!checkedSummary);
  };

  const handleClickButton = () => {
    dispatch(loadArticles(currentQuery));
  }

  const handleChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    dispatch(setKeyWords(value.trimEnd().split(' ')));
  }

  const handleClickEnter = (event: { preventDefault: () => void; key: string; }) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      dispatch(loadArticles(currentQuery));
    }
  }

  useEffect(() => {
    if(checkedTitle && !checkedSummary) {
      dispatch(setCurrentQuery(queryTitle));
    }

    if(!checkedTitle && checkedSummary) {
      dispatch(setCurrentQuery(querySummary));
    }

    if(checkedTitle && checkedSummary) {
      dispatch(setCurrentQuery(`${queryTitle}${querySummary.replace(/^\?/, '&')}`));
    }
    
    if(!checkedTitle && !checkedSummary) {
      dispatch(setCurrentQuery(''));
    }
  }, [checkedTitle, checkedSummary, dispatch, queryTitle, querySummary]);

  return (
    <>
      <Card 
        sx={{ maxWidth: 1448, m: '75px auto' }}
      >
        <ThemeProvider theme={theme}>
          <Typography 
            sx={{
              textAlign: 'left',
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: '600',
              p: '50px 0 10px 75px',
            }} 
            variant="body2" 
            component="div"
          >
            Filter by keywords
          </Typography>
  
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: 600,
              m: '0 75px',
              border: '1px solid #eaeaea',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
              borderRadius: '5px',
            }}
          >
            <IconButton 
              type="button" 
              sx={{ p: '10px' }} 
              aria-label="search"
              onClick={handleClickButton}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="You should enter searching word and then press 'Enter'"
              inputProps={{ 'aria-label': 'Searchig words' }}
              onChange={handleChange}
              onKeyUp={handleClickEnter}
            />
          </Paper>
          <Typography 
            sx={{
              textAlign: 'left',
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: '600',
              p: '50px 0 10px 75px',
            }} 
            variant="body2"
            component="div"
          >
            {`Results: ${articles.length}`}
          </Typography>
          <Divider sx={{ m: '0 75px 45px', maxWidth: 1290 }} orientation="horizontal" variant='inset' />
          <Box className='label-checkbox'>
            <label htmlFor='title-checkbox'>
              <Checkbox
                checked={checkedTitle}
                onChange={handleChangeCheckboxTitle}
                inputProps={{ 'aria-label': 'controlled' }}
                id='title-checkbox'
              /> Find in a title
            </label>
            <label htmlFor='summary-checkbox'>
              <Checkbox
                checked={checkedSummary}
                onChange={handleChangeCheckboxSummary}
                inputProps={{ 'aria-label': 'controlled' }}
                id='summary-checkbox'
              /> Find in an article
            </label>
          </Box>
        </ThemeProvider>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '45px',
            p: '0 75px 75px',
          }}
        >
          {isLoad && <Loader />}
          {articles && articles.map(article => {
            return (
            <Blank 
              id={article.id}
              title={article.title}
              imageUrl={article.imageUrl}
              summary={article.summary}
              publishedAt={article.publishedAt}
              key={article.id}
            />
            )
          })}
        </Box>
      </Card>
    </>
  );
};

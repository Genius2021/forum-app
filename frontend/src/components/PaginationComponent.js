import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getPosts } from '../Redux/actions/postActions';
import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';

export default function PaginationComponent({ numOfPages }) {
    const dispatch = useDispatch();
    // let { search } = useLocation();
 

    const [ page, setPage ] = useState(1);
    
    const handleChange = (event, value)=>{
        event.preventDefault();
        setPage(value);
        dispatch(getPosts(`?page=${value}`));
    }

  return (
    <Stack spacing={3}>
      <Pagination count={numOfPages} page={page} onChange={handleChange} color="primary" variant="outlined" shape="rounded" sx={{mx: "auto"}} />
    </Stack>
  );
}

import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { changeCommentPaginationValue, changeCommunityPaginationValue, changeHomePaginationValue } from '../../Redux/Users/actions/generalActions';
import { useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';

export default function PaginationComponent({ numOfPages, size, page, home, community, comments }) {
    const dispatch = useDispatch();
    // let { search } = useLocation();
 

    // const [ page, setPage ] = useState(1);
    
    const handleChange = (event, value)=>{
        event.preventDefault();
        if(home){
          dispatch(changeHomePaginationValue(value))
        }
        
        if(community){
          dispatch(changeCommunityPaginationValue(value))
        }

        if(comments){
          dispatch(changeCommentPaginationValue(value))
        }
    }

  return (
    <Stack spacing={3}>
      <Pagination count={numOfPages} size={size && size} page={page} onChange={handleChange} color="primary" variant="outlined" shape="rounded" sx={{mx: "auto"}} />
    </Stack>
  );
}

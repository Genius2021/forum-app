import { useDispatch, useSelector } from 'react-redux';
import { viewACommunityPost } from '../../Redux/Users/actions/communityActions';
import { useEffect } from "react"

function SinglePost(props) {
    const community = props.location.pathname.split("/")[2]
    const id = props.match.params.id;
    const dispatch = useDispatch();

useEffect(() => {
    dispatch(viewACommunityPost(id, community));
}, [dispatch, id, community]);

  return (
    <div>SinglePost </div>
  )
}

export default SinglePost
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';


export default function Breadcrumb() {

    const location = useLocation();
    const splitArray = location.pathname.split("/");
    const pathsArray = splitArray.slice(1, splitArray.length - 1);
    
  return (
    <div role="presentation">
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        {
          pathsArray.map((path, index) =>{
              return <Link key={index} underline="hover" color="inherit" to={`/${path}`}>
                        { path }
                     </Link>
          })
        }
        <Typography color="text.primary">{ splitArray[ splitArray.length - 1 ] }</Typography>
      </Breadcrumbs>
    </div>
  );
}

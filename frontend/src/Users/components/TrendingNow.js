import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";




function TrendingNow() {
  return (
    <>
        <Paper elevation={0} sx={{ maxWidth: 350, height:210, mx:"auto", zIndex:"50", border:"1px solid rgba(0,0,0,0.12)"}}>
            <List
                component="div"
                disablePadding
                sx={{
                    width: "100%",
                    // Width: 350,
                    bgcolor: "background.paper",
                    py: 0,
                }}
                // key={post.post_id}
                >
                <Divider />
                <ListItem
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: "0.7rem",
                    }}
                >
                    <div style={{ display: "flex" }}>
                    <span
                        style={{
                        alignSelf: "center",
                        fontSize: "1rem",
                        color: "#555555",
                        marginRight: "0.5rem",
                        }}
                    >
                        {/* {index + 1} */}
                    </span>
                    <Link
                        // to={`/communities/${post.community_name}/${post.post_id}`}
                    >
                        <ListItemText
                        primary={
                            <Typography sx={{ color: "#3b5998" }}>
                            {/* {`${post.title.substr(0, 25)}...`} */}
                            A random title
                            </Typography>
                        }
                        // secondary={monthAndDay(post.created_on)}
                        secondary="may 23"
                        />
                    </Link>
                    </div>
                    <ListItemText
                    sx={{ flex: "none" }}
                    primary={
                        <Typography sx={{ color: "#555555" }}>
                        {/* {post.community_name.substr(0, 10)} */}
                        Politics
                        </Typography>
                    }
                    />
                </ListItem>
                <Divider />
                </List>
        </Paper>
    </>
  )
}

export default TrendingNow
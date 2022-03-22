import { Box, Divider, Typography } from "@mui/material";
import Button from "../components/Button";

function PageNotFound(props) {
  
    const goHome =()=>{
        props.history.push("/");
    }
  return (
    <Box sx={{ maxWidth: 350, mx: "auto" }}>
      <Typography
        component="h2"
        variant="h2"
        sx={{
          color: "#555555",
          padding: "1rem",
          paddingBottom: 0,
          mb: "1.5rem",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Page Not Found
      </Typography>
      <Divider />
      <div style={{ marginTop: "1rem" }}>
        <Typography variant="body2" sx={{ fontSize: "1rem", mr:"0.3rem" }}>
          Oops! The page you requested for does not exist.
        </Typography>
        <Button smallContainedButton onClick={goHome}>Go to Home</Button>
      </div>
    </Box>
  );
}

export default PageNotFound;

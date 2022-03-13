import FeaturedInfo from "../components/FeaturedInfo";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import ListComponent from "../components/ListComponent";
import { capitalize } from "../../commonFunctions";
import PushPin from "@mui/icons-material/PushPin";

function UserDashboard() {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sm={10} md={10} lg={10} sx={{ color: "#555555" }}>
          <Box>
            <Typography
              sx={{
                fontSize: "1.5rem",
                marginTop: "2rem",
                padding: "1rem",
                marginLeft: "1rem",
              }}
            >
              Your dashboard{" "}
              <span style={{ fontSize: "1.8rem", fontWeight: 500 }}>
                {capitalize(userInfo.username)}
              </span>{" "}
            </Typography>
            <Divider variant="middle" sx={{ marginBottom: "2rem" }} />
            <FeaturedInfo />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              alignItems: "flex-start",
              marginTop: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Card
              variant="outlined"
              sx={{ maxWidth: 350, mb: 1, width: "35vw", mx: "0.5rem" }}
            >
              <CardContent
                sx={{
                  display: "flex !important",
                  flexWrap: "wrap",
                  padding: "0 !important",
                }}
              >
                <ListComponent
                  title="Pinned posts"
                  icon={
                    <PushPin
                      sx={{ fontSize: "1rem", my: "auto", display: "flex" }}
                    />
                  }
                />
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{ maxWidth: 350, mb: 1, width: "35vw", mx: "0.5rem" }}
            >
              <CardContent
                sx={{
                  display: "flex !important",
                  flexWrap: "wrap",
                  padding: "0 !important",
                }}
              >
                <ListComponent
                  title="Viewed posts"
                  icon={<i className="fas fa-eye"></i>}
                />
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{ maxWidth: 350, mb: 1, width: "35vw", mx: "0.5rem" }}
            >
              <CardContent
                sx={{
                  display: "flex !important",
                  flexWrap: "wrap",
                  padding: "0 !important",
                }}
              >
                <ListComponent
                  title="Trending topics"
                  icon={<i className="fas fa-chart-line"></i>}
                />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default UserDashboard;

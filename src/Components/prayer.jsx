import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CardActionArea from "@mui/material/CardActionArea";
export function Prayer({ name, time, image }) {
  return (
    <Card sx={{ Width: 345 }} style={{ marginLeft: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="240"

          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="h3" sx={{ color: "text.secondary" }}>
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

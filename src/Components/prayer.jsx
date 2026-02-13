import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function Prayer({ name, time }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        width: isMobile ? "100%" : 160,
        minWidth: isMobile ? "100%" : 160,
        maxWidth: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CardActionArea>
        {/* الصورة مع Overlay */}
        <Box sx={{ position: "relative", overflow: "hidden", height: 160 }}>
          <CardMedia
            component="img"
            height="160"
            image="src/assets/bg.jpg"
            alt={name}
            sx={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          {/* Overlay Gradient */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* المحتوى */}
        <CardContent
          sx={{
            padding: isMobile ? "16px" : "12px",
            textAlign: "center",
            "&:last-child": {
              paddingBottom: isMobile ? "16px" : "12px",
            },
          }}
        >
          {/* اسم الصلاة */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: isMobile ? "1rem" : "0.95rem",
              fontWeight: 700,
              marginBottom: "8px",
              color: theme.palette.mode === "dark" ? "#f0c27f" : "#4b1248",
            }}
          >
            {name}
          </Typography>

          {/* الوقت */}
          <Typography
            variant="body1"
            sx={{
              fontSize: isMobile ? "1.3rem" : "1.1rem",
              fontWeight: 800,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(26, 26, 26, 0.9)",
              letterSpacing: "0.5px",
            }}
          >
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

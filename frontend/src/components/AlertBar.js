import React from "react";
import { Alert, Box, Typography } from "@mui/material";

const AlertBar = ({ spike={spike}, mentions }) => {
  if (!mentions?.length) return null;
  const recent = mentions.slice(0, 10);
  const negCount = recent.filter(m => m.sentiment === "negative").length;
  const showSpike = negCount >= 5;

  if (!spike || !spike.isSpike) return null;

  return (
    <Box sx={{ mb: 2, animation: "fadeIn 0.4s ease", "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translateY(-5px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    }}}>
      <Alert severity="error" sx={{
        borderRadius: 3,
        px: 3,
        py: 2,
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(90deg, rgba(255,50,50,0.15), rgba(255,0,0,0.05))",
        backdropFilter: "blur(6px)",
        borderLeft: "6px solid #ff3b3b",
        boxShadow: "0 4px 20px rgba(255,0,0,0.1)",
      }}>
        <Typography sx={{ fontWeight: "bold", mr: 1 }}>
          ⚠ Negative Spike Detected!
        </Typography>
        Spike Count: {spike.lastWindowCount}, Average: {spike.avgWindow.toFixed(2)}
      </Alert>
    </Box>
  );
}

export default AlertBar;

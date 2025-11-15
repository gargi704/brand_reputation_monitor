import React from 'react';
import { Chip, Box, Typography } from '@mui/material';

function TrendingKeywords({ mentions }) {
  const counter = {};
  (mentions || []).forEach(m =>
    (m.keywords || []).forEach(k =>
      counter[k] = (counter[k] || 0) + 1
    )
  );
  const sorted = Object.entries(counter).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null; 
  return (
    <Box sx={{
      mb: 3, px: 2, py: 2, borderRadius: 3,
      background: "linear-gradient(90deg,#e3f0ff 60%,#e8f6ff 100%)",
      boxShadow: "0 4px 24px rgba(44,132,255,0.09)",
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap',
      border: '1.5px solid #b3e0ff'
    }}>
      <Typography component="span" sx={{
        fontWeight: 800, letterSpacing: 0.5,
        marginRight: 2, fontSize:"1.08rem",
        background: "linear-gradient(90deg,#056df3,#28e3eb)",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>
        Trending Now:
      </Typography>
      {sorted.slice(0, 8).map(([k, c]) => (
        <Chip key={k} label={`${k} (${c})`} sx={{
          mx: 0.3, mb: 0.4, fontWeight: 700,
          fontSize: "0.98rem", background: "#f3f9ff",
          color: "#097fd9", border: "1.2px solid #cce5ff"
        }} />
      ))}
    </Box>
  );
}
export default TrendingKeywords;

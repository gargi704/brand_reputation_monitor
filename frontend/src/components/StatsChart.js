import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const StatsChart = ({ mentions }) => {
  const data = [
    { name: "Positive", value: mentions.filter(m => m.sentiment === "positive").length },
    { name: "Neutral", value: mentions.filter(m => m.sentiment === "neutral").length },
    { name: "Negative", value: mentions.filter(m => m.sentiment === "negative").length },
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#1976d2", textAlign: "center" }}>
          Sentiment Analysis Overview
        </Typography>
        <Box sx={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <defs>
                <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00c853" />
                  <stop offset="100%" stopColor="#009624" />
                </linearGradient>
                <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffd740" />
                  <stop offset="100%" stopColor="#ffab00" />
                </linearGradient>
                <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff5252" />
                  <stop offset="100%" stopColor="#d50000" />
                </linearGradient>
              </defs>
              <Bar dataKey="value" name="Mentions Count" fill={(entry) =>
                entry.name === "Positive" ? "url(#positiveGrad)" :
                entry.name === "Neutral" ? "url(#neutralGrad)" : "url(#negativeGrad)"
              } radius={[12, 12, 0, 0]} animationDuration={1200} isAnimationActive />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default StatsChart;

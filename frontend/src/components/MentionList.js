import React from "react";
import { List, ListItem, ListItemText, Chip, Typography, CircularProgress, Box, Divider, } from "@mui/material";
import { motion } from "framer-motion";

const MentionList = ({ mentions, loading }) => {
  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );

  if (!mentions.length)
    return (
      <Typography
        align="center"
        sx={{ color: "#6c7a89", fontStyle: "italic", py: 3 }}
      >
        No mentions found.
      </Typography>
    );

  return (
    <List>
      {mentions.map((m, index) => (
        <motion.div
          key={m._id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <ListItem
            sx={{
              p: 2,
              borderRadius: "12px",
              mb: 1.5,
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              "&:hover": {
                background: "rgba(255,255,255,0.85)",
                transform: "scale(1.01)",
                transition: "0.2s",
              },
            }}
          >

            <Chip
              label={m.source}
              sx={{
                mr: 2,
                background: "linear-gradient(45deg, #007bff, #00d4ff)",
                color: "white",
                fontWeight: "bold",
              }}
            />

            <Chip
              label={m.sentiment}
              color={
                m.sentiment === "positive"
                  ? "success"
                  : m.sentiment === "negative"
                    ? "error"
                    : "warning"
              }
              sx={{ mr: 2, fontWeight: "bold", textTransform: "capitalize" }}
            />

            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600, color: "#2d3a4b" }}>
                  {m.content}
                </Typography>
              }
              secondary={
                <Typography sx={{ color: "#4e5d6c", mt: 0.5 }}>
                  #{m.topic}
                </Typography>
              }
            />
          </ListItem>

          <Divider sx={{ mb: 1, opacity: 0.3 }} />
        </motion.div>
      ))}
    </List>
  );
};

export default MentionList;

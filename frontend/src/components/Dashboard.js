import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Stack, Box, Chip, Modal, IconButton, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import MentionList from './MentionList';
import StatsChart from './StatsChart';
import AlertBar from './AlertBar';
import TrendingKeywords from './TrendingKeywords';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = ({ spike, mentions = [], setMentions, loading }) => {
  const [sentiment, setSentiment] = useState('all');
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredMentions = sentiment === "all"
    ? mentions
    : mentions.filter(m => m.sentiment === sentiment);

  const searchedMentions = filteredMentions.filter(m =>
    !search ||
    (m.content?.toLowerCase().includes(search.toLowerCase())) ||
    (m.source && m.source.toLowerCase().includes(search.toLowerCase())) ||
    (m.topic && m.topic.toLowerCase().includes(search.toLowerCase()))
  );

  const positive = mentions.filter(m => m?.sentiment === "positive").length;
  const neutral = mentions.filter(m => m?.sentiment === "neutral").length;
  const negative = mentions.filter(m => m?.sentiment === "negative").length;

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 2, position: "sticky", top: 10, zIndex: 11 }}>
        <AlertBar spike={spike} mentions={mentions} />
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        alignItems="flex-start"
      >

        <Grid item xs={12} md={8} lg={8}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography
              variant="h4"
              fontWeight={900}
              sx={{
                background: "linear-gradient(90deg,#007bff,#00d4ff)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: { xs: 1, sm: 2 }
              }}
            >
              Live Brand Mentions
            </Typography>
            <Paper
              elevation={1}
              sx={{
                mb: { xs: 1.5, sm: 2 },
                p: 1,
                bgcolor: "#f6faff",
                borderRadius: 3,
                maxWidth: { xs: "100%", sm: 430 }
              }}
            >
              <InputBase
                placeholder="Search brand, topic, news..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{
                  ml: 1, flex: 1, width: "97%",
                  fontSize: 18, fontWeight: 600,
                  py: 1.2, px: 2
                }}
              />
            </Paper>
            <TrendingKeywords mentions={mentions} />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 2,
                flexWrap: "wrap",
                justifyContent: { xs: "flex-start", sm: "flex-start", md: "flex-start" }
              }}
            >
              <Chip label="All" color={sentiment === "all" ? "primary" : "default"} onClick={() => setSentiment("all")} icon={<FilterListIcon />} />
              <Chip label="Positive" color={sentiment === "positive" ? "success" : "default"} onClick={() => setSentiment("positive")} />
              <Chip label="Neutral" color={sentiment === "neutral" ? "warning" : "default"} onClick={() => setSentiment("neutral")} />
              <Chip label="Negative" color={sentiment === "negative" ? "error" : "default"} onClick={() => setSentiment("negative")} />
            </Stack>
            <Paper elevation={3} sx={{
              p: { xs: 1.2, sm: 2.5 },
              borderRadius: "18px",
              minHeight: { xs: 180, sm: 390 }
            }}>
              <MentionList mentions={searchedMentions.slice(0, 10)} loading={loading} />
              <Box textAlign="right" mt={1}>
                <Typography
                  sx={{
                    color: "#8fa4bc",
                    fontSize: "0.97rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-block"
                  }}
                  onClick={() => setViewAllOpen(true)}
                >
                  View all mentions...
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        <Grid
          item xs={12} md={4} lg={4}
          sx={{
            position: { md: "sticky", xs: "static" },
            top: { md: 30, xs: "auto" },
            alignSelf: { md: "flex-start", xs: "initial" },
            mt: { xs: 3, md: 0 }
          }}
        >
          <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Paper elevation={4} sx={{ p: { xs: 1.5, sm: 3 }, borderRadius: "16px", mb: 2, background: "rgba(255,255,255,0.95)" }}>
              <StatsChart mentions={mentions} />
            </Paper>
            <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, borderRadius: "16px" }}>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
                Brand Summary
              </Typography>
              <Typography sx={{ color: "#4e5966" }}>
                📊 Total Mentions: <strong>{mentions.length}</strong><br />
                😊 Positive: <strong>{positive}</strong><br />
                😐 Neutral: <strong>{neutral}</strong><br />
                😡 Negative: <strong>{negative}</strong>
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <Modal
        open={viewAllOpen}
        onClose={() => setViewAllOpen(false)}
        sx={{ zIndex: 1300 }}
      >
        <Paper sx={{
          maxWidth: 750, mx: "auto", my: 4, p: 3, maxHeight: "90vh", overflow: "auto", borderRadius: 3, position: "relative"
        }}>
          <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={() => setViewAllOpen(false)}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 2, color: "#007bff" }}>All Brand Mentions</Typography>
          <InputBase
            placeholder="Search news, topic, platform..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ my: 1, px: 2, py: 1, width: "100%", bgcolor: "#f3fafe", borderRadius: 2, fontSize: 18, fontWeight: 600 }}
          />
          <MentionList mentions={searchedMentions} loading={loading} />
        </Paper>
      </Modal>
    </Container>
  );
};

export default Dashboard;

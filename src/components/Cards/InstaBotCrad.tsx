import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BotData } from '@/lib/slices/InstaBot/BotApiSlice';

interface BotCardProps {
  bot: BotData;
}

const BotCard: React.FC<BotCardProps> = ({bot}) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{bot.alias}</Typography>
        <Box sx={{ marginBottom: 1 }}>
          <Typography variant="body2">
            <strong>Status:</strong> {bot.status}
          </Typography>
          <Typography variant="body2">
            <strong>Location:</strong> {bot.location}
          </Typography>
          <Typography variant="body2">
            <strong>Episode:</strong> {bot.episode} - <strong>Video Number:</strong> {bot.videoNumber}
          </Typography>
          <Typography variant="body2">
            <strong>Duration:</strong> {bot.videoDuration} seconds
          </Typography>
          <Typography variant="body2">
            <strong>Hashtags:</strong> {bot.hashtags}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BotCard;

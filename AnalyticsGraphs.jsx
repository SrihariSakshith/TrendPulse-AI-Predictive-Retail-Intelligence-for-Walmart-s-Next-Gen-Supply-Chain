// src/components/AnalyticsGraphs.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ backgroundColor: 'rgba(30, 30, 30, 0.9)', p: 2, border: '1px solid #555', borderRadius: 2}}>
        <Typography sx={{fontWeight: 'bold'}}>{label}</Typography>
        <Typography sx={{color: payload[0].stroke}}>
          {`${payload[0].name}: ${payload[0].value}`}
        </Typography>
        <Typography sx={{color: payload[1].stroke}}>
          {`${payload[1].name}: ${payload[1].value}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const AnalyticsGraphs = ({ salesHistory, trendHistory }) => {
  const data = salesHistory.map((sales, i) => ({
    day: `Day ${i - 6}`,
    'Units Sold': sales,
    'Trend Score': trendHistory ? (trendHistory[i] || 0) : 0,
  }));

  const salesColor = "#3879E8";
  const trendColor = "#34C38F";

  return (
    <Box sx={{ height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="day" strokeOpacity={0.7} />
          <YAxis yAxisId="left" label={{ value: 'Units Sold', angle: -90, position: 'insideLeft', fill: salesColor }} stroke={salesColor} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Trend Score', angle: -90, position: 'insideRight', fill: trendColor }} stroke={trendColor} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="Units Sold" stroke={salesColor} strokeWidth={3} dot={{r: 4}} activeDot={{ r: 8 }}/>
          <Line yAxisId="right" type="monotone" dataKey="Trend Score" stroke={trendColor} strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default AnalyticsGraphs;
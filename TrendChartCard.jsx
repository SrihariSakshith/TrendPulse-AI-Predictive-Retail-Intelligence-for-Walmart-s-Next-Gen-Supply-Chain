import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrendChartCard = ({ trend }) => {
  return (
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={7}>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend.data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }} />
              <Line type="monotone" dataKey="interest" name="Trend Score" stroke="#00AEEF" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }}/>
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={5}>
        <Card elevation={0} sx={{backgroundColor: 'background.default'}}>
          <CardMedia
            component="img"
            height="250"
            image={trend.image_url}
            alt={trend.product_name}
            sx={{ borderRadius: 2, objectFit: 'contain' }}
          />
          <CardContent sx={{textAlign: 'center'}}>
            <Typography variant="body1" color="text.secondary">
              SKU: {trend.sku} | Price: ₹{trend.price.toLocaleString('en-IN')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TrendChartCard;
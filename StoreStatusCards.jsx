import React from 'react';
import { Box, Grid, Typography, LinearProgress } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StoreCard = ({ store, color }) => (
  <Box sx={{ borderLeft: 4, borderColor: color, p: 2, height: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 1 }}>
    <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
      {store.status === 'deficit' ? <WarningIcon sx={{ mr: 1, color }} /> : <CheckCircleIcon sx={{ mr: 1, color }} />}
      {store.name}
    </Typography>
    <Typography>Current Inventory: <strong>{store.inventory} units</strong></Typography>
    {store.status === 'deficit' ? (
      <>
        <Typography>Predicted Demand Lift: <strong>+{store.forecast_lift} units</strong></Typography>
        <Typography color={color}>Projected Deficit: <strong>{store.predicted_deficit} units</strong></Typography>
      </>
    ) : (
       <>
        <Typography color="text.secondary">Shelf Status: Healthy</Typography>
        <Typography color={color}>Available Surplus for Transfer: <strong>{store.available_surplus} units</strong></Typography>
       </>
    )}
  </Box>
);

const StoreStatusCards = ({ stores }) => {
  const deficitStore = stores.find(s => s.status === 'deficit');
  const surplusStore = stores.find(s => s.status === 'surplus');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {deficitStore && <StoreCard store={deficitStore} color="error.main" />}
      </Grid>
      <Grid item xs={12} md={6}>
        {surplusStore && <StoreCard store={surplusStore} color="success.main" />}
      </Grid>
    </Grid>
  );
};

export default StoreStatusCards;
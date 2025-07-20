// src/components/ActionCard.jsx
import React from 'react';
import { Box, Button, Typography, Divider, Alert, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { STORES } from '../data_catalog_fe';

const ActionCard = ({ alert }) => {
  // --- Data derived from the alert object ---
  const recommendation = alert.recommendation;
  const deficitStore = STORES[alert.store_id];
  const quantityNeeded = alert.predicted_stock_need - alert.current_stock;

  // --- RENDER LOGIC BASED ON RECOMMENDATION ---

  // RENDER: Inter-Store Transfer
  if (recommendation === 'INTER_STORE_TRANSFER' && alert.source_store) {
    const surplusStore = STORES[alert.source_store.id];
    return (
      <Box sx={{ p: 2.5, backgroundColor: 'rgba(0, 174, 239, 0.1)', borderRadius: 3 }}>
        <Chip 
          icon={<LocalShippingIcon />} 
          label="Inter-Store Transfer" 
          color="primary" 
          sx={{ mb: 2, fontWeight: 'bold' }}
        />
        <Divider sx={{ my: 1, mb: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" color="text.secondary">FROM (SURPLUS)</Typography>
            <Typography variant="h6">{surplusStore.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {alert.source_store.available_stock} Units Available
            </Typography>
          </Box>
          <ArrowForwardIcon color="primary" sx={{ mx: 2 }} />
          <Box textAlign="right">
            <Typography variant="caption" color="text.secondary">TO (DEFICIT)</Typography>
            <Typography variant="h6">{deficitStore.name}</Typography>
             <Typography variant="body2" color="error.main">
              {alert.current_stock} Units Remaining
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">Product: <strong>{alert.product_name}</strong></Typography>
        <Typography variant="body1">Recommended Transfer Quantity: <strong>{quantityNeeded} Units</strong></Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<CheckIcon />}
          sx={{ mt: 3, p: 1.5, fontWeight: 'bold' }}
        >
          Authorize Transfer
        </Button>
      </Box>
    );
  }

  // RENDER: Replenish from Distribution Center
  if (recommendation === 'REPLENISH_FROM_DC') {
    return (
      <Box sx={{ p: 2.5, backgroundColor: 'rgba(255, 171, 0, 0.1)', borderRadius: 3 }}>
        <Chip 
          icon={<WarehouseIcon />} 
          label="Central Replenishment"
          color="warning" 
          sx={{ mb: 2, fontWeight: 'bold' }}
        />
        <Divider sx={{ my: 1, mb: 2 }} />

        <Alert severity="warning" variant="outlined" sx={{ mb: 2 }}>
          No suitable surplus stock found in nearby stores.
        </Alert>

        <Typography variant="body1">Store in Need: <strong>{deficitStore.name}</strong></Typography>
        <Typography variant="body1">Product: <strong>{alert.product_name}</strong></Typography>
        <Typography variant="body1">
          Recommended Order Quantity: <strong>{quantityNeeded} Units</strong>
        </Typography>

        <Button
          variant="contained"
          color="warning"
          fullWidth
          startIcon={<CheckIcon />}
          sx={{ mt: 3, p: 1.5, fontWeight: 'bold' }}
        >
          Create Purchase Order
        </Button>
      </Box>
    );
  }

  // Fallback / Loading state
  return (
    <Alert severity="info">
        Analyzing recommendations...
    </Alert>
  );
};

export default ActionCard;
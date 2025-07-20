// src/components/AlertDashboard.jsx
import React from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box, Chip, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion } from 'framer-motion';
import { STORES } from '../data_catalog_fe'; // <-- IMPORT a data catalog
import HeroGeometric from './hero-geometric'; // Import the HeroGeometric component
// Card for Critical Stock Alerts
const TrendingProductCard = ({ alert, onSelect }) => {
  // FIX: Look up the full store name from the catalog
  const storeName = STORES[alert.store_id]?.name || alert.store_id;

  return (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)' }}>
      <CardActionArea onClick={onSelect} sx={{ p: 2.5, height: '100%' }}>
        <CardContent>
          <Chip 
            icon={<WarningAmberIcon />} 
            label="Critical Stock" 
            color="error" 
            size="small" 
            sx={{ mb: 1.5, fontWeight: 'bold' }} 
          />
          <Typography variant="h5" component="div" gutterBottom>
            {alert.product_name}
          </Typography>
          <Box display="flex" alignItems="center" my={1} color="text.secondary">
            <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            <Typography variant="body1">{storeName}</Typography> {/* <-- USE the full store name */}
          </Box>
          <Box display="flex" alignItems="center" color="primary.main" mt={2}>
              <TrendingUpIcon sx={{mr: 1}}/>
              <Typography variant="h6">
                  Viral Score: {alert.viral_score}
              </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// Card for New Product Opportunities
const OpportunityCard = ({ alert, onSelect }) => (
    <Card sx={{ height: '100%', borderRadius: 3, border: '1px dashed', borderColor: 'primary.main', backgroundColor: 'transparent', boxShadow: 'none' }}>
        <CardActionArea onClick={onSelect} sx={{ p: 2.5, height: '100%' }}>
            <CardContent>
                <Chip icon={<NewReleasesIcon />} label="New Opportunity" color="primary" size="small" sx={{ mb: 1.5, fontWeight: 'bold' }} />
                <Typography variant="h5" component="div" gutterBottom>
                    {alert.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Emerging trend detected. Click for a live AI-powered market analysis.
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);

const AlertDashboard = ({ alerts, onSelectAlert }) => {
  if (!alerts || alerts.length === 0) {
    return (
    < HeroGeometric/>
    );
  }

  // Filter and sort alerts by type and score
  const criticalStockAlerts = alerts
    .filter(alert => alert.type === 'CRITICAL_STOCK' && alert.viral_score > 10)
    .sort((a, b) => b.viral_score - a.viral_score);

  const opportunityAlerts = alerts.filter(alert => alert.type === 'NEW_PRODUCT_OPPORTUNITY');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {criticalStockAlerts.length > 0 && (
        <Box mb={6}>
            <Typography variant="h4" gutterBottom component="h2" sx={{ fontWeight: 700 }}>Ranked Critical Stock Alerts</Typography>
            <Grid container spacing={3}>
                {criticalStockAlerts.map((alert, index) => (
                <Grid item xs={12} md={6} lg={4} key={`critical-${alert.store_id}-${alert.sku}`}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.03, y: -5 }}>
                       <TrendingProductCard alert={alert} onSelect={() => onSelectAlert(alert)} />
                    </motion.div>
                </Grid>
                ))}
            </Grid>
        </Box>
      )}

      {opportunityAlerts.length > 0 && (
         <Box>
            <Typography variant="h4" gutterBottom component="h2" sx={{ fontWeight: 700 }}>New Market Opportunities</Typography>
            <Grid container spacing={3}>
                {opportunityAlerts.map((alert, index) => (
                    <Grid item xs={12} md={6} lg={4} key={`opportunity-${index}`}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (criticalStockAlerts.length + index) * 0.1 }} whileHover={{ scale: 1.03, y: -5 }}>
                           <OpportunityCard alert={alert} onSelect={() => onSelectAlert(alert)} />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
         </Box>
      )}
    </Container>
  );
};

export default AlertDashboard;
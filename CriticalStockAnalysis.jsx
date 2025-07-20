// src/components/CriticalStockAnalysis.jsx
import React from 'react';
import { Grid, Typography, Alert, Box } from '@mui/material';
import Section from './Section';
import AnalyticsGraphs from './AnalyticsGraphs';
import SolutionMap from './SolutionMap';
import ActionCard from './ActionCard';
import { STORES } from '../data_catalog_fe';

const CriticalStockAnalysis = ({ alert }) => {
  // --- Look up store data from the catalog ---
  const deficitStoreInfo = STORES[alert.store_id];

  // Look up surplus store info ONLY if the recommendation is a transfer
  let surplusStoreInfo = null;
  if (alert.recommendation === 'INTER_STORE_TRANSFER' && alert.source_store) {
    surplusStoreInfo = STORES[alert.source_store.id];
  }

  // Graceful exit if store data is somehow missing
  if (!deficitStoreInfo) {
    return <Alert severity="error">Error: Store data for ID '{alert.store_id}' not found.</Alert>;
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
            {alert.product_name}
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary">
            Critical Stock Analysis for {deficitStoreInfo.name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column: The "Why" */}
        <Grid item xs={12} lg={8}>
          <Section title={`Predictive Analytics (Viral Score: ${alert.viral_score})`}>
            <AnalyticsGraphs 
                salesHistory={alert.sales_history}
                trendHistory={alert.trend_history}
            />
          </Section>

          <Section title="Recommended Solution">
            {/* Conditionally render the map ONLY if it's a transfer */}
            {alert.recommendation === 'INTER_STORE_TRANSFER' && surplusStoreInfo ? (
              <SolutionMap 
                deficitStore={deficitStoreInfo}
                surplusStore={surplusStoreInfo}
              />
            ) : (
              // Otherwise, show a clear text-based alert for replenishment
              <Alert severity="info" variant="outlined">
                No suitable surplus stock was found at nearby stores. Direct replenishment from the Distribution Center is recommended.
              </Alert>
            )}
          </Section>
        </Grid>

        {/* Right Column: The "What to do" */}
        <Grid item xs={12} lg={4}>
          <Section title="Execute Action">
             {/* The ActionCard now only needs the full alert object */}
             <ActionCard alert={alert} />
          </Section>
        </Grid>
      </Grid>
    </>
  );
};

export default CriticalStockAnalysis;
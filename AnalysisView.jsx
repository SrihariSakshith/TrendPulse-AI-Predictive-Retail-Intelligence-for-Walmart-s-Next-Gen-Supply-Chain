import React from 'react';
import { Container, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CriticalStockAnalysis from './CriticalStockAnalysis';
import OpportunityAnalysis from './OpportunityAnalysis'; // <-- FIX: Import correct name

const AnalysisView = ({ alert, onBack }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 3 }}>
        Back to Dashboard
      </Button>

      {alert.type === 'CRITICAL_STOCK' && <CriticalStockAnalysis alert={alert} />}
      {alert.type === 'NEW_PRODUCT_OPPORTUNITY' && <OpportunityAnalysis alert={alert} />}
    </Container>
  );
};
export default AnalysisView;
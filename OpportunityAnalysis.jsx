// src/components/OpportunityAnalysis.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Paper, Grid, Chip, Divider } from '@mui/material'; // <-- IMPORT CHIP
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Section from './Section';

const OpportunityAnalysis = ({ alert }) => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetAnalysis = async () => {
    setIsLoading(true);
    setError('');
    setAnalysis(null);
    try {
      const response = await fetch('http://localhost:8000/api/gemini_analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_name: alert.product_name, keywords: alert.keywords })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail?.error || "An unknown error occurred.");
      }
      const data = await response.json();
      if (data.error) { // Handle structured errors from our own API
        throw new Error(data.error);
      }
      setAnalysis(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getClassificationChip = (classification) => {
      switch (classification) {
          case 'High Potential': return <Chip label={classification} color="success" sx={{fontWeight: 'bold'}}/>;
          case 'Moderate Potential': return <Chip label={classification} color="warning" sx={{fontWeight: 'bold'}}/>;
          case 'Niche/Risky': return <Chip label={classification} color="info" sx={{fontWeight: 'bold'}}/>;
          default: return <Chip label="Analysis Received" />;
      }
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>New Opportunity: {alert.product_name}</Typography>
      
      <Section title="AI Market Assessment">
        <Typography sx={{mb: 3}}>An external trend has been detected for a product not in our catalog. Use our integrated AI to perform a real-time market analysis based on Google Trends and market knowledge.</Typography>
        
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleGetAnalysis}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} color="inherit"/> : <AutoAwesomeIcon />}
          >
            {isLoading ? "Analyzing with Gemini..." : "Get Live Gemini Analysis"}
          </Button>
        </Box>
      </Section>

      {error && <Alert severity="error" sx={{mt: 2}}>Analysis Failed: {error}</Alert>}

      {analysis && (
        <Section title="Gemini™ Live Analysis">
           <Paper variant="outlined" sx={{ p: 3, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {getClassificationChip(analysis.classification)}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{mt: 1}}>Reasoning</Typography>
                        <Typography sx={{mb: 1, fontStyle: 'italic'}} color="text.secondary">"{analysis.reasoning}"</Typography>
                    </Grid>
                    <Divider variant="middle" sx={{width: '100%', my: 2}}/>
                    <Grid item xs={12} md={6}>
                       <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Target Demographic</Typography>
                       <Typography>{analysis.target_demographic}</Typography>
                    </Grid>
                     <Grid item xs={12} md={6}>
                       <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>Suggested Action</Typography>
                       <Typography>{analysis.suggested_action}</Typography>
                    </Grid>
                </Grid>
           </Paper>
        </Section>
      )}
    </>
  );
};
export default OpportunityAnalysis;
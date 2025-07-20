import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { motion, AnimatePresence } from 'framer-motion';
import AlertDashboard from './components/AlertDashboard';
import AnalysisView from './components/AnalysisView';

function App() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isLoadingSim, setIsLoadingSim] = useState(false);
  const [error, setError] = useState("");

  const handleSimulate = async () => {
    setIsLoadingSim(true);
    setSelectedAlert(null); // Go back to dashboard on new simulation
    setError("");
    try {
      const res = await fetch('http://localhost:8000/api/simulate', { method: 'POST' });
      if (!res.ok) {
        throw new Error(`Simulation failed with status: ${res.status}`);
      }
      const data = await res.json();
      setAlerts(data.alerts);
    } catch (err) {
      console.error("Simulation failed:", err);
      setError(err.message);
    } finally {
      setIsLoadingSim(false);
    }
  };

  const handleSelectAlert = (alert) => setSelectedAlert(alert);
  const handleBackToDashboard = () => setSelectedAlert(null);
  const handleCloseError = () => setError("");

  return (
    <Box>
      <AppBar position="sticky" elevation={2} sx={{ backgroundColor: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <InsightsIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: '2rem' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            TrendPulse AI: Predictive Retail for Walmart
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            startIcon={isLoadingSim ? <CircularProgress size={24} color="inherit" /> : <PlayArrowIcon />} 
            onClick={handleSimulate}
            disabled={isLoadingSim}
          >
            {isLoadingSim ? 'Simulating...' : 'Simulate Next Day'}
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <AnimatePresence mode="wait">
          {selectedAlert ? (
            <motion.div key="analysis" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <AnalysisView alert={selectedAlert} onBack={handleBackToDashboard} />
            </motion.div>
          ) : (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <AlertDashboard alerts={alerts} onSelectAlert={handleSelectAlert} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default App;
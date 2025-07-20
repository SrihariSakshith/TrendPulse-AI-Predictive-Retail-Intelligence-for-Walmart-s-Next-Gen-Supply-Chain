import React from 'react';
import { Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Paper elevation={0} sx={{ p: {xs: 2, md: 3}, mb: 4, backgroundColor: 'rgba(255,255,255, 0.05)', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{fontWeight: '600'}}>{title}</Typography>
        {children}
      </Paper>
    </motion.div>
  );
};
export default Section;
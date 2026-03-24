'use client'
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, ReferenceLine } from 'recharts';
import { Card, Box, Typography, Chip, Stack } from '@mui/material';

const formatCompactCurrency = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
}).format(value || 0);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0]?.payload;

  return (
    <Box sx={{ bgcolor: 'white', border: '1px solid #e2e8f0', borderRadius: 3, boxShadow: '0 18px 40px rgba(15,23,42,0.12)', p: 2, minWidth: 190 }}>
      <Typography sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>{label}</Typography>
      <Typography sx={{ color: '#64748b', fontSize: '0.82rem' }}>Min: {formatCompactCurrency(row.minSalaryUSD)}</Typography>
      <Typography sx={{ color: '#0ea5e9', fontSize: '0.82rem', fontWeight: 900 }}>Median: {formatCompactCurrency(row.medianSalaryUSD)}</Typography>
      <Typography sx={{ color: '#64748b', fontSize: '0.82rem' }}>Max: {formatCompactCurrency(row.maxSalaryUSD)}</Typography>
    </Box>
  );
};

const SalaryDistributionCard = ({ salaries, headline, averageMedian }) => (
  <Card sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', height: '100%' }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1.2fr 220px' }, gap: 2.5, mb: 3 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 900, color: '#0f172a' }}>Salary Range and Median</Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.75, maxWidth: 640 }}>
          Bars show the salary ceiling while the line tracks the median. The dotted guide marks the average median across the current page.
        </Typography>
      </Box>
      <Box sx={{ p: 2.25, borderRadius: 3, bgcolor: '#eff6ff', border: '1px solid #bfdbfe' }}>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em' }}>AVERAGE MEDIAN</Typography>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0ea5e9', mt: 0.5 }}>{formatCompactCurrency(averageMedian)}</Typography>
        <Typography sx={{ color: '#475569', fontSize: '0.78rem', mt: 0.8 }}>
          Quick benchmark for this result set
        </Typography>
      </Box>
    </Box>

    <Box sx={{ height: 360, width: '100%' }}>
      <ResponsiveContainer>
        <ComposedChart data={salaries} margin={{ top: 18, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tickFormatter={formatCompactCurrency} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <ReferenceLine
            y={averageMedian}
            stroke="#0f172a"
            strokeDasharray="4 4"
            label={{ value: 'Avg median', position: 'insideTopRight', fill: '#0f172a', fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
          />
          <Bar dataKey="maxSalaryUSD" radius={[10, 10, 0, 0]} fill="#cbd5e1" barSize={34} />
          <Bar dataKey="minSalaryUSD" radius={[10, 10, 0, 0]} fill="#94a3b8" barSize={18} />
          <Line type="monotone" dataKey="medianSalaryUSD" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>

    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={1.5} sx={{ mt: 3 }}>
      <Chip label={headline} sx={{ bgcolor: '#e0f2fe', color: '#0369a1', fontWeight: 700 }} />
      <Chip label={`${salaries.length} items on chart`} sx={{ bgcolor: '#f1f5f9', color: '#334155' }} />
      <Chip label="Dark bar = minimum, light bar = maximum, line = median" sx={{ bgcolor: '#f8fafc', color: '#475569' }} />
    </Stack>
  </Card>
);

export default SalaryDistributionCard;

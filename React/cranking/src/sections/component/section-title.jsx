import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



// 섹션 제목
// ----------------------------------------------------------------------

export function SectionTitle({ sx, title, description, ...other }) {
    return (
        <Box
            sx={[
                {
                    mb: 5,
                    gap: 1.5,
                    display: 'flex',
                    textAlign: 'start',
                    whiteSpace: 'pre-line',
                    flexDirection: 'column',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Typography variant="h4">{title}</Typography>

            {description && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            )}
        </Box>
    );
}

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });


export default function SmallImagedCardButton({ photoUrl, title, subTitle, link }) {
    return (
        <Paper
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                pl: { xs: 2, md: 4 },
                py: { xs: 1, md: 4 },
                '&:hover': {
                    '&': { transform: 'scale(1.01)', transition: transition },
                    '& img': { opacity: 0.8, transform: 'scale(1.06)', transition: transition },
                },
            }}
            elevation={5}
            href={link}
        >
            <Box
                component="img"
                alt={photoUrl}
                src={photoUrl}
                sx={{ width: '25%', minWidth: '80px', aspectRatio: '1/1', objectFit: 'contain' }}
            />
            <Typography variant="h6" sx={{ ml: 2, color: 'text.primary' }}>
                {title}
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {subTitle}
                </Typography>
            </Typography>
        </Paper>
    )
}

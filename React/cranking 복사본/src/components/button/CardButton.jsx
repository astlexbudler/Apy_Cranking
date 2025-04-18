import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });


export default function CardButton({ children, link }) {
    return (
        <Paper
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                p: 3,
                mb: 3,
                '&:hover': {
                    '&': { transform: 'scale(1.01)', transition: transition },
                    '& img': { opacity: 0.8, transform: 'scale(1.06)', transition: transition },
                },
            }}
            elevation={5}
            href={link}
        >
            {children}
        </Paper>
    )
}
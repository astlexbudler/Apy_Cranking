import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

const transition = (theme) =>
    theme.transitions.create(['opacity', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
    });


export function ButtonCard({ sx, children, link, onClick }) {
    return (
        <Paper
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                p: 3,
                mb: 3,
                '&:hover': {
                    '&': { transform: 'scale(1.01)', transition },
                    '& img': { opacity: 0.8, transform: 'scale(1.06)', transition },
                },
                ...sx,
            }}
            elevation={5}
        >
            <Link
                href={link}
                onClick={onClick}
                color="text.primary"
                underline="none"
            >
                {children}
            </Link>

        </Paper>
    )
}
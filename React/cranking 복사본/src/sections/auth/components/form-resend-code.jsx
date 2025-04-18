import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

export function FormResendCode({ sx, value, disabled, onResendCode, ...other }) {
  return (
    <Box
      sx={[{ mt: 3, typography: 'body2', alignSelf: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {`인증코드를 받지 못하셨나요? `}
      <Link
        variant="subtitle2"
        onClick={onResendCode}
        sx={{
          cursor: 'pointer',
          ...(disabled && { color: 'text.disabled', pointerEvents: 'none' }),
        }}
      >
        다시 발송하기 {disabled && value && value > 0 && `(${value}s)`}
      </Link>
    </Box>
  );
}

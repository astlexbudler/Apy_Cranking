import Typography from '@mui/material/Typography';



// 이메일 확인 텍스트
// ----------------------------------------------------------------------

export function ConfirmTextEmail({ ok }) {
    return (
        <Typography
            variant="caption"
            color={
                ok == true
                    ? 'success.main'
                    : ok == false
                        ? 'error.main'
                        : 'text.secondary'
            }
        >
            {
                ok == true
                    ? '사용 가능한 이메일입니다.'
                    : ok == false
                        ? '이미 사용중이거나 사용할 수 없는 이메일입니다.'
                        : '사용하실 이메일을 입력해주세요.'
            }
        </Typography>
    )
}
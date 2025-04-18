import Typography from '@mui/material/Typography';



// 비밀번호 재입력 확인 텍스트
// ----------------------------------------------------------------------

export function ConfirmTextPasswordCheck({ ok }) {
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
                    ? '비밀번호가 일치합니다.'
                    : ok == false
                        ? '비밀번호가 일치하지 않습니다.'
                        : '비밀번호를 다시 입력해주세요.'
            }
        </Typography>
    )
}
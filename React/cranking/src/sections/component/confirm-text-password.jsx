import Typography from '@mui/material/Typography';



// 비밀번호 확인 텍스트
// ----------------------------------------------------------------------

export function ConfirmTextPassword({ ok }) {
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
                    ? '사용 가능한 비밀번호입니다.'
                    : '비밀번호는 영문, 숫자 포함 6자 이상으로 입력해주세요.'
            }
        </Typography>
    )
}
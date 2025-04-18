import Typography from '@mui/material/Typography';



// 닉네임 확인 텍스트
// ----------------------------------------------------------------------

export function ConfirmTextNickname({ ok }) {
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
                    ? '사용 가능한 닉네임입니다.'
                    : ok == false
                        ? '닉네임은 2자 이상 입력해주세요.'
                        : '사용하실 닉네임을 입력해주세요.'
            }
        </Typography>
    )
}
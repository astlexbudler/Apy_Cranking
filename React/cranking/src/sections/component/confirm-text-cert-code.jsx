import Typography from '@mui/material/Typography';



// 인증 코드 확인 텍스트
// ----------------------------------------------------------------------

export function ConfirmTextCertCode({ ok }) {
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
                    ? '인증코드가 확인되었습니다.'
                    : ok == false
                        ? '인증번호를 확인해주세요.'
                        : '인증번호를 입력해주세요.'
            }
        </Typography>
    )
}
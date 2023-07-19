import { Spin, notification } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignUpVerifyHook } from '../../hooks/useSignUpVerifyHook';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const SignUpVerifyPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { mutate: verifySignUp, } = useSignUpVerifyHook();

    useEffect(() => {
        let verifyToken = searchParams.get('token')?.toString()
        console.log(verifyToken)
        debugger;
        if (verifyToken) {
            // verifySignUp(verifyToken || '',
            //     {
            //         onSuccess() {
            //             notification.success({
            //                 message: 'Account activated!',
            //                 description: 'You can now signin and enjoy the service'
            //             })
            //             navigate("/auth");
            //         },
            //         onError() {
            //             notification.error({
            //                 message: 'Verify failed',
            //                 description: 'Please sign in for another activation link'
            //             })
            //             // navigate("/");
            //         }
            //     }
            // )
        } else {
            notification.error({
                message: 'Verify failed',
                description: 'Please sign in for another activation link'
            })
            navigate("/");
        }
    }, []);

    return (
        <>
            <div style={{ margin: 0, position: 'absolute', top: '50%', left: '50%', width: '100px' }}>
                <Spin tip="Verification in progress..." size="large">
                    <div className="content" />
                </Spin>
            </div>
        </>
    )
}

export default SignUpVerifyPage;
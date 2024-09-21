import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/utils/constants';

const clientId = GOOGLE_CLIENT_ID
const GoogleAuth: React.FC = () => {
    const handleSuccess = (credentialResponse: unknown) => {
        console.log('Login Success:', credentialResponse);
    };

    const handleFailure = () => {
        console.error('Login failed:');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleFailure}
                theme='outline'
                text='signup_with'
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;

import BrowseHeader from '../../components/BrowseHeader'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { fieldValidation } from '../../utils/validation';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { Icons } from '@/components/ui/Icons';
import user from '@/api/services/user.service';

const SignUp = () => {
    // const [countryCode, setCountryCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        companyName: '',
        industry: '',
        phone: '',
        email: '',
        password: '',
        otp: ''
    });
    const [error, setError] = useState({
        companyNameError: '',
        industryError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        otpError: ''
    })
    const [otpInput, setOtpInput] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(30);
    const [isOtpResendAllowed, setIsOtpResendAllowed] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (otpTimer > 0)
            timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
        else
            setIsOtpResendAllowed(true)
        return () => { if (timer) clearTimeout(timer) };
    }, [otpTimer])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    // Send OTP
    const handleVerify = async (e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
        e.preventDefault();
        const isValid = fieldValidation.email(userInfo.email)
        if (!isValid) {
            toast.error('Enter a valid email')
            return
        }
        try {
            toast.success('Please wait...')
            await user.verifyEmail({ email: userInfo.email })
            toast.success('OTP sent to your email')
            setOtpInput(true)
            setOtpTimer(30)
            if (isOtpResendAllowed)
                setIsOtpResendAllowed(false)
        } catch (error) {
            toast.error('Something went wrong. Try again..')
            console.log(error);

        }
    }
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Validate input and set error messages
        let errorMessage = '';
        switch (name) {
            case 'companyName':
                errorMessage = fieldValidation.companyName(value) ? '' : 'Invalid company name format';
                setError(prevState => ({ ...prevState, companyNameError: errorMessage }));
                break;
            case 'phone':
                errorMessage = fieldValidation.phone(Number(value)) ? '' : 'Invalid phone number';
                setError(prevState => ({ ...prevState, phoneError: errorMessage }));
                break;
            case 'email':
                errorMessage = fieldValidation.email(value) ? '' : 'Invalid email format';
                setError(prevState => ({ ...prevState, emailError: errorMessage }));
                setOtpInput(false);
                break;
            case 'password':
                errorMessage = fieldValidation.password(value) ? '' : 'Password like: Example@123';
                setError(prevState => ({ ...prevState, passwordError: errorMessage }));
                break;
            default:
                break;
        }
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const isValid = !error.companyNameError && !error.phoneError && userInfo.industry !== '' && !error.emailError && !error.passwordError;
        if (!isValid) return
        const data = { ...userInfo }
        try {
            await user.signUp(data)
            setIsSignedUp(true)

        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errors = err.response?.data.errors;
                if (errors) {
                    Object.keys(errors).forEach((key) => {
                        setError((prevError) => ({
                            ...prevError,
                            [`${key}`]: errors[key]
                        }));
                    });
                    console.log(error);

                }
            } else {
                console.error('Unexpected error', error);
            }
        }

    }
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (tokenResponse) {
                const data = { ...userInfo, tokenResponse }
                try {
                    await user.googleAuth(data)
                    setIsSignedUp(true)

                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        const errors = err.response?.data.errors;
                        if (errors) {
                            Object.keys(errors).forEach((key) => {
                                setError((prevError) => ({
                                    ...prevError,
                                    [`${key}`]: errors[key]
                                }));
                            });
                            console.log(error);

                        }
                    } else {
                        console.error('Unexpected error', error);
                    }
                }
            }
        },
        onError: (errorResponse) => {
            console.log('Google login failed:', errorResponse);
            toast.error('Google login failed');
        },
    });

    const handleGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let isValid = true;

        const fieldNames = ['companyName', 'phone', 'industry'];
        const newErrorState = { companyNameError: '', phoneError: '', industryError: '' };

        fieldNames.forEach(name => {
            switch (name) {
                case 'companyName':
                    if (!fieldValidation.companyName(userInfo.companyName)) {
                        newErrorState.companyNameError = 'Invalid company name format';
                        isValid = false;
                    }
                    break;

                case 'phone':
                    if (!fieldValidation.phone(Number(userInfo.phone))) {
                        newErrorState.phoneError = 'Invalid phone number';
                        isValid = false;
                    }
                    break;

                case 'industry':
                    if (userInfo.industry === "") {
                        newErrorState.industryError = 'Select industry type';
                        isValid = false;
                    }
                    break;

                default:
                    break;
            }
        });

        setError(prevState => ({ ...prevState, ...newErrorState }));
        if (!isValid) return;
        googleLogin()
    };



    return (
        <div className='h-screen flex flex-col'>
            <BrowseHeader />
            <div className="flex flex-col md:flex-row justify-around items-center bg-gradient-to-r flex-grow from-gray-700 via-gray-900 to-black text-white py-10 bg-gray-600">
                <div className="p-6 md:p-10 max-w-lg text-center md:text-left">
                    <h1 className="font-extrabold text-3xl md:text-4xl mb-4">
                        Lead with data, manage with ease, and <br /> inspire your team with FlowLabs.
                    </h1>
                    <div className="pl-3 mt-6">
                        <ul className="list-disc space-y-3">
                            <li className="text-lg font-semibold">Transform Your Operations with Automation</li>
                            <li className="text-lg font-semibold">Robust Security and Reliable Performance</li>
                            <li className="text-lg font-semibold">Innovative Features for the Modern Workplace</li>
                            <li className="text-lg font-semibold">Dedicated Support and Comprehensive Training</li>
                            <li className="text-lg font-semibold">Scalable Solutions for Growing Businesses</li>
                            <li className="text-lg font-semibold">Intuitive Interface for Effortless Navigation</li>
                        </ul>
                    </div>
                </div>


                {!isSignedUp ? (<div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full mt-10 md:mt-0 border-spacing-36">
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight mb-6">
                        Get Started with FlowLabs
                    </h2>
                    <form className="space-y-6">

                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium leading-6">Company Name</label>
                            <div className="flex items-center flex-wrap">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={userInfo.companyName}
                                    onInput={handleInput}
                                    placeholder='Flow Labs'
                                    className="block flex-1 rounded-l-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {error.companyNameError && <span className='text-red-600 font-bold text-sm'>{error.companyNameError}</span>}
                        </div>
                        <div>
                            <label htmlFor="industry" className="block text-sm font-medium leading-6">Industry Name</label>
                            <select
                                id="industry"
                                name="industry"
                                value={userInfo.industry}
                                onChange={(e) => {
                                    setUserInfo((prevState) => ({ ...prevState, industry: e.target.value }));
                                    setError(prevState => ({ ...prevState, industryError: '' }))
                                }}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">Select Industry</option>
                                <option value="IT"> Information Technology</option>
                            </select>
                            {error.industryError && <span className='text-red-600 font-bold text-sm'>{error.industryError}</span>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium leading-6">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                autoComplete="tel"
                                placeholder='1234567890'
                                value={userInfo.phone}
                                onInput={handleInput}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error.phoneError && <span className='text-red-600 font-bold text-sm'>{error.phoneError}</span>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder='example@gmail.com'
                                value={userInfo.email}
                                onInput={handleInput}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error.emailError && <span className='text-red-600 font-bold text-sm'>{error.emailError}</span>}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-medium leading-6">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={userInfo.password}
                                    placeholder='XXXXXXXXXXXXXXX'
                                    onInput={handleInput}
                                    className="block w-full rounded-md border-0 py-2 px-4 pr-10 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-900 text-xl"
                                >
                                    {showPassword ? <Icons.eye /> : <Icons.eyeOff />}
                                </button>
                            </div>
                            {error.passwordError && <span className='text-red-600 font-bold text-sm'>{error.passwordError}</span>}
                        </div>

                        {otpInput && (
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium leading-6">Enter OTP</label>
                                <input
                                    id="otp"
                                    name="otp"
                                    type="number"
                                    value={userInfo.otp}
                                    onInput={handleInput}
                                    className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {error.otpError && <span className='text-red-600 font-bold text-sm pl-3'>{error.otpError}</span>}
                                <span className='align-middle flex justify-end m-2'>
                                    {otpTimer > 0 ? (
                                        <p>Resend OTP in {otpTimer} seconds</p>
                                    ) : (
                                        <p
                                            className='ml-1 cursor-pointer text-blue-300'
                                            onClick={handleVerify}
                                        >
                                            Resend OTP
                                        </p>
                                    )}
                                </span>
                            </div>

                        )}

                        <div className='mt-6'>
                            {otpInput ? (
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign Up
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleVerify}
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Verify Email
                                </button>
                            )}
                        </div>

                        <Button
                            variant="outline"
                            className="w-full bg-white text-black hover:bg-gray-100 border-gray-300"
                            onClick={handleGoogleAuth}
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign up with Google
                        </Button>

                    </form>
                </div>) : (
                    <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg w-80 mx-auto bg-gray-600">
                        <div className='p-4'><Icons.checkCircle className="text-green-500 w-16 h-16 " />
                        </div>
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Your Flow Labs account has been successfully created!
                        </h2>
                        <p className="text-center mb-2">
                            Please check your <strong>email</strong> to continue.
                        </p>
                        <p className="text-center mb-4">
                            Login details have been sent to: <strong>Your registerd email.</strong>
                        </p>
                    </div>
                )}
            </div>
            <Toaster position='top-center' />
        </div>
    )
}

export default SignUp;

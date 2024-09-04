import BrowseHeader from '../../components/BrowseHeader'
import React, { useState } from 'react'
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { BROWSE_URL } from '../../utils/constants';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { fieldValidation } from '../../utils/validation';
const SignUp = () => {
    // const [countryCode, setCountryCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        companyName: '',
        email: '',
        password: '',
        otp: ''
    });
    const [error, setError] = useState({
        firstNameError: '',
        lastNameError: '',
        phoneError: '',
        companyNameError: '',
        emailError: '',
        passwordError: ''
    })
    const [otpInput, setOtpInput] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selectedCountryCode = event.target.value;
    //     setCountryCode(selectedCountryCode);
    // }

    const handleVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const isValid =error.emailError===''        
        if (!isValid){
            toast.error('Enter a valid email')
            return
        } 
        const data = {
            email: userInfo.email
        }
        const url = BROWSE_URL + 'otp'
        const response = await axios.post(url, data)
        console.log(response);
        if (response.statusText === 'OK') {
            toast.success('OTP sent to your email')
            setOtpInput(true)
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
            case 'firstName':
                errorMessage = fieldValidation.firstName(value) ? '' : 'Invalid name format';
                setError(prevState => ({ ...prevState, firstNameError: errorMessage }));
                break;
                case 'lastName':
                    errorMessage = fieldValidation.lastName(value) ? '' : 'Invalid name format';
                    setError(prevState => ({ ...prevState, lastNameError: errorMessage }));
                    break;
            case 'phone':
                errorMessage = fieldValidation.phone(Number(value)) ? '' : 'Invalid phone number';
                setError(prevState => ({ ...prevState, phoneError: errorMessage }));
                break;
            case 'companyName':
                errorMessage = fieldValidation.companyName(value) ? '' : 'Invalid Domain length';
                setError(prevState => ({ ...prevState, companyNameError: errorMessage }));
                break;
            case 'email':
                errorMessage = fieldValidation.email(value) ? '' : 'Invalid email format';
                setError(prevState => ({ ...prevState, emailError: errorMessage }));
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
        const isValid = !error.firstNameError && !error.phoneError && !error.companyNameError && !error.emailError && !error.passwordError;
        if (!isValid) return
        const url = BROWSE_URL + 'signUp'
        const data = { ...userInfo }
        const response = await axios.post(url, data)
        if (response.statusText === 'OK') {
            console.log('success');

        } else {
            console.log(response);

        }
    }

    return (
        <>
            <BrowseHeader />
            <div className="flex flex-col md:flex-row justify-around items-center bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white py-10 bg-gray-600">
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

                <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full mt-10 md:mt-0 border-spacing-36">
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight mb-6">
                        Get Started with FlowLabs
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="firstName"
                                placeholder='Flow'
                                value={userInfo.firstName}
                                onInput={handleInput}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error.firstNameError && <span className='text-red-600 font-bold text-sm'>{error.firstNameError}</span>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="lastName"
                                placeholder='Labs'
                                value={userInfo.lastName}
                                onInput={handleInput}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {error.lastNameError && <span className='text-red-600 font-bold text-sm'>{error.lastNameError}</span>}
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
                                    {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
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
                    </form>
                </div>
            </div>

            <Toaster position='top-center' />
        </>
    )
}

export default SignUp;

export const adminEndpoints={
    login:'admin/login',
    logout:'admin/logout',
    userRequests:'admin/userRequests',
    approvelRequests:'admin/approvelRequest'
}

export const userEndPoints={
    verifyEmail:'/otp',
    signUp:'signUp',
    googleAuth:'googleAuth'

}
export  const companyEndPoints={
    login:(domain:string)=>`/${domain}/login`,
    resetPassword:(domain:string)=>`/${domain}/resetPassword`,
}
export const tokenEndPoits={
refreshToken:'/refreshToken',
}
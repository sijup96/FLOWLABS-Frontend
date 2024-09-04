export const fieldValidation = {
    firstName: (firstName: string) => {
        const firstNameRegex = /^[A-Za-z]{3,15}$/;
        return firstNameRegex.test(firstName.trim()) ? true : false;
    },
    lastName: (lastName: string) => {
        const lastNameRegex = /^[A-Za-z]{1,15}$/;
        return lastNameRegex.test(lastName.trim()) ? true : false;
    },
    phone: (phone: number) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone.toString()) ? true : false;
    },
    companyName: (companyName: string) => {
        const companyNameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9\s.\-#&]{3,30}$)/;
        return companyNameRegex.test(companyName) ? true : false;
    },
    email: (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email) ? true : false;
    },
    password:(password:string)=>{
         const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9]{8,15}$/;
        return passwordRegex.test(password)
    }
}
export const fieldValidation = {
  name: (name: string) => {
    const nameRegex = /^[A-Za-z]{3,15}$/;
    return nameRegex.test(name.trim())
  },
  firstName: (firstName: string) => {
    const firstNameRegex = /^[A-Za-z]{3,15}$/;
    return firstNameRegex.test(firstName.trim())
  },
  lastName: (lastName: string) => {
    const lastNameRegex = /^[A-Za-z]{1,15}$/;
    return lastNameRegex.test(lastName.trim()) ? true : false;
  },
  industry: (industry: string) => {
    const industryRegex = /^[A-Za-z]{3,15}$/;
    return industryRegex.test(industry.trim()) ? true : false;
  },
  phone: (phone: string| number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.toString()) 
  },
  companyName: (companyName: string) => {
    const companyNameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9\s.\-#&]{3,30}$)/;
    return companyNameRegex.test(companyName)
  },
  email: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? true : false;
  },
  password: (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9]{8,15}$/;
    return passwordRegex.test(password);
  },
  description: (description: string) => {
    const countWords = (str: string) => {
      return str.trim().split(/\s+/).length;
    };
    const wordCount = countWords(description);
    if (wordCount < 3 || wordCount > 10) return false;
    return true
  },
  foundedDate:(date:string)=>{
    const foundedDate=new Date(date)
    const currentDate=new Date()
    return currentDate>foundedDate
  }
};

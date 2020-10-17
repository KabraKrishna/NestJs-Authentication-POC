export interface User {
    userId: string,
    password: string,
    role?: string,
    isLoggedIn? : boolean
    token?: string 
}
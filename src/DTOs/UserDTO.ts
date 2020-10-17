export class UserDTO {
    userId: string;
    password: string;
    role?: string;
    isLoggedIn? : boolean;
    token?: string;

    constructor(userId: string, password: string){
        this.userId = userId;
        this.password = password;
    }

    getUserId(){
        return this.userId
    }

    getPassword(){
        return this.password
    }

}
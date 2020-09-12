export class AddCompanyDTO {
    companyName : string;
    companyDescription : string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;

    constructor(companyName: string, companyDescription: string,username: string,password: string,firstName: string,lastName: string,age: number){
        this.companyName = companyName;
        this.companyDescription = companyDescription;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
  }
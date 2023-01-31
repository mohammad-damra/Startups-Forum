export default interface IUser {
  userId?: string;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  profession: string;
  age: number;
  phoneNumber: string;
  isAdmin: boolean;
}

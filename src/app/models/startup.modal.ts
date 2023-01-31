export default interface IStartup {
  key?: string;
  startupName: string;
  startupCity: string;
  sectorName: [];
  founderName: string;
  numberOfEmployee: number | null;
  yearOfEstablishment: number | null;
  websiteURL: string;
  emailAddress: string;
  startupLogo?: string;
  isApproved: boolean;
  description: string;
  coverImg?: string;
}

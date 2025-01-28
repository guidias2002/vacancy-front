import { AboutCompany } from "./AboutCompany";

export interface EnterpriseData {
    id: number;
    name: string;
    cnpj: string;
    login: string;
    email: string;
    password: string;
    accountType: "ENTERPRISE";
    aboutCompany: AboutCompany | null;
}
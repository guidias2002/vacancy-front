export interface ProfessionalExperience {
    id: number;
    enterprise: string;
    position: string;
    monthStart: string;
    yearStart: number;
    monthEnd: string | null;
    yearEnd: number | null;
    isCurrentJob: boolean;
    description: string;
}
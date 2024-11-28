import { ProfessionalExperience } from "../types/ProfessionalExperience";

export interface ValidationError {
    field: string;
    message: string;
}

export const validateProfessionalExperience = (
    data: ProfessionalExperience,
    months: { value: string }[]
): ValidationError[] => {
    const errors: ValidationError[] = [];

    const {
        enterprise,
        position,
        monthStart,
        yearStart,
        monthEnd,
        yearEnd,
        isCurrentJob,
        description
    } = data;

    if (!enterprise) {
        errors.push({ field: "enterprise", message: "O campo 'Empresa' é obrigatório." });
    }
    if (!position) {
        errors.push({ field: "position", message: "O campo 'Cargo' é obrigatório." });
    }
    if (!monthStart) {
        errors.push({ field: "monthStart", message: "O campo 'Mês de início' é obrigatório." });
    }
    if (!yearStart) {
        errors.push({ field: "yearStart", message: "O campo 'Ano de início' é obrigatório." });
    }
    if (!description) {
        errors.push({ field: "description", message: "O campo 'Descrição' é obrigatório." });
    }

    if (!isCurrentJob) {
        if (!monthEnd) {
            errors.push({ field: "monthEnd", message: "O campo 'Mês de término' é obrigatório." });
        }
        if (!yearEnd) {
            errors.push({ field: "yearEnd", message: "O campo 'Ano de término' é obrigatório." });
        }
    }

    if (yearStart && yearEnd && yearStart > yearEnd) {
        errors.push({ field: "yearStart", message: "O ano de início não pode ser superior ao ano de término." });
    } else if (yearStart === yearEnd && monthStart && monthEnd) {
        const monthStartIndex = months.findIndex((m) => m.value === monthStart);
        const monthEndIndex = months.findIndex((m) => m.value === monthEnd);

        if (monthStartIndex > monthEndIndex) {
            errors.push({ field: "monthStart", message: "O mês de início não pode ser superior ao mês de término no mesmo ano." });
        }
    }

    return errors;
};

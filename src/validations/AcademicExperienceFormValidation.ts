export interface ValidationError {
    field: string;
    message: string;
}

interface AcademicExperience {
    course: string;
    institution: string;
    level: string;
    status: string;
    monthStart: string;
    yearStart: number;
    monthEnd: string;
    yearEnd: number;
}

export const validateAcademicExperience = (
    data: AcademicExperience,
    months: { label: string; value: number }[],
    courseLevels: string[],
    statusOptions: string[]
): ValidationError[] => {
    const errors: ValidationError[] = [];

    const {
        course,
        institution,
        level,
        status,
        monthStart,
        yearStart,
        monthEnd,
        yearEnd,
    } = data;

    if (!data.course) {
        errors.push({ field: "course", message: "O campo 'Curso' é obrigatório." });
    }
    if (!data.institution) {
        errors.push({ field: "institution", message: "O campo 'Instituição de ensino' é obrigatório." });
    }
    if (!data.level) {
        errors.push({ field: "level", message: "O campo 'Nível' é obrigatório." });
    }
    if (!data.status) {
        errors.push({ field: "status", message: "O campo 'Status' é obrigatório." });
    }
    if (!data.monthStart) {
        errors.push({ field: "monthStart", message: "O campo 'Mês de início' é obrigatório." });
    }
    if (!data.yearStart) {
        errors.push({ field: "yearStart", message: "O campo 'Ano de início' é obrigatório." });
    }
    if (!data.monthEnd) {
        errors.push({ field: "monthEnd", message: "O campo 'Mês de término' é obrigatório." });
    }
    if (!data.yearEnd) {
        errors.push({ field: "yearEnd", message: "O campo 'Ano de término' é obrigatório." });
    }


    if (yearStart > yearEnd) {
        errors.push({ field: "yearStart", message: "O ano de início não pode ser superior ao ano de término." });
    } else if (yearStart === yearEnd) {
        const monthStartValue = months.find((m) => m.label === monthStart)?.value || 0;
        const monthEndValue = months.find((m) => m.label === monthEnd)?.value || 0;
        if (monthStartValue > monthEndValue) {
            errors.push({ field: "monthStart", message: "O mês de início não pode ser superior ao mês de término no mesmo ano." });
        }
    }


    if (level && !courseLevels.includes(level)) {
        errors.push({ field: "level", message: "O nível selecionado não é válido." });
    }
    if (status && !statusOptions.includes(status)) {
        errors.push({ field: "status", message: "O status selecionado não é válido." });
    }

    return errors;
};

import React, { useState } from 'react';
import { FormControl, Select, MenuItem, OutlinedInput, SelectChangeEvent } from '@mui/material';

interface FilterVacancyByStatusProps {
    onFilterChange: (status: string) => void;
}

const FilterVacancyByStatus: React.FC<FilterVacancyByStatusProps> = ({ onFilterChange }) => {
    const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        const status = event.target.value;
        setSelectedStatus(status);
        onFilterChange(status);
    };

    return (
        <div className="flex justify-end">
            <FormControl sx={{ width: 200, mt: 1 }}>
                <Select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    input={<OutlinedInput />}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#87aa68', // Cor da borda ao focar
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#87aa68', // Cor da borda ao passar o mouse
                        }
                    }}
                >
                    <MenuItem value="ALL"
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#f1f8e8', 
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#f1f8e8', 
                            },
                        }}
                    >Todas</MenuItem>
                    <MenuItem value="ACTIVE"
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#f1f8e8',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#f1f8e8', 
                            },
                        }}
                    >Ativas</MenuItem>
                    <MenuItem value="FROZEN"
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: '#f1f8e8', 
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: '#f1f8e8', 
                            },
                        }}
                    >Congeladas</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default FilterVacancyByStatus;
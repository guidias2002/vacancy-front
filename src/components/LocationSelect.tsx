import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import useLocationOptions from '../hooks/useLocationOptions';

interface LocationSelectProps {
  value: string;
  onChange: (newValue: string) => void;
  error?: boolean;
  helperText?: string;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange, error, helperText }) => {
  const locationOptions = useLocationOptions();

  return (
    <Autocomplete
      options={locationOptions}
      getOptionLabel={(option) => option.label}
      value={{ label: value }}
      onChange={(event, newValue) => {
        onChange(newValue ? newValue.label : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Localização"
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default LocationSelect;

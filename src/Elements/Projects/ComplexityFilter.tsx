import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Box,
  FormControl,
  Grid, IconButton, InputAdornment, InputLabel, makeStyles, MenuItem, Select,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Project } from '../../Utils/models';

interface OwnProps {
    setFilterByComplexity: Dispatch<SetStateAction<string>>,
    filterByComplexity: string,
    projects: Project[],
    setProjects: Dispatch<SetStateAction<Project[]>>,
}

const complexityOptions = [
  {
      label: 'Simple',
      value: 'Simple'
  },
  {
      label: 'Moderate',
      value: 'Moderate'
  },
  {
      label: 'Hazardous',
      value: 'Hazardous'
  },
];

const useStyles = makeStyles((theme) => ({
  selectAdornment: {
    '& .MuiButtonBase-root': {
      position: 'absolute',
      padding: 0,
      right: '25px',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    '& .MuiSelect-select.MuiSelect-select': {
      paddingRight: '34px',
    },
  },
  menuPaper: {
    maxHeight: '50vh'
  }
}));

export default function ComplexityFilter({
  setFilterByComplexity,
  filterByComplexity,
  projects,
  setProjects,
}: OwnProps) {
  const [val, setVal] = useState(filterByComplexity);
  const classes = useStyles();
  
  const handleChange = (value: string) => {       
      const option = complexityOptions.find((e) => e.value === value);
      setVal(option ? option.value : '');
      setFilterByComplexity(option ? option.value : '');
      const filteredProjectList = projects.filter((e) => e.complexity === value);
      setProjects(filteredProjectList);      
  };

  const handleClearSelection = () => {
    setVal('');
    setFilterByComplexity('');
    setProjects(projects);
  };

  return (
    <Box minWidth={120}>
      <Grid container item spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid item md={12}>
          <FormControl className={classes.formControl}> 
            <InputLabel id="filter-label">Complexity</InputLabel>
            <Select
                labelId="filter-label"
                fullWidth
                className={classes.select}
                value={val}
                onChange={(event: any) => {
                    handleChange(event.target.value);
                }}
                endAdornment={(
                    <InputAdornment position="end" className={classes.selectAdornment}>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={handleClearSelection}
                        style={{ right: 18 }}
                      >
                        {val
                      && <ClearIcon fontSize="inherit" />}
                      </IconButton>
                    </InputAdornment>
                )}
                MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
                {complexityOptions.map(({ label, value: v }, key) => (
                    <MenuItem key={label + key} value={v}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
          </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

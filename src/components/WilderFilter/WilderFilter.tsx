import { Autocomplete, Chip, TextField } from "@mui/material";
import { ChangeEvent, SyntheticEvent } from "react";
import { IFilter } from "../Wilders/Wilders";

interface WilderFilterComponentProps {
    filter : IFilter,
    handleFilterChange(filter : IFilter) : void
}

export default function WilderFilterComponent(props : WilderFilterComponentProps){
    const {filter} = props;

    const handleNameCityChange = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        filter[event.target.name] = event.target.value;
        props.handleFilterChange(filter);
    };

    const handleSkillChange = (event : SyntheticEvent, newValue : string[]) => {
        filter.skills = newValue;
        props.handleFilterChange(filter);
    }

    return (
        <div className='search_container'>
            <TextField name="name" label="Name" variant="standard" onChange={(event) => handleNameCityChange(event)} InputLabelProps={{ shrink: true }}/>
            <TextField name="city" label="City" variant="standard" onChange={(event) => handleNameCityChange(event)} InputLabelProps={{ shrink: true }}/>
            <Autocomplete
                multiple
                id="tags-filled"
                options={[]}
                freeSolo
                renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    />
                ))
                }
                onChange={(event, newValue) => handleSkillChange(event, newValue)}
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Skills"
                    placeholder="Skills"
                />
                )}
            />
        </div>
    );
}
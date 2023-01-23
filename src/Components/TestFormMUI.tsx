import {
    Autocomplete,
    Box,
    Button, Checkbox,
    Chip,
    FormControl, FormControlLabel, FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput, Radio, RadioGroup,
    Select, Switch,
    TextField
} from "@mui/material";
import {
    Controller,
    useForm,
    ControllerRenderProps,
    FieldPath,
    FieldValues
} from "react-hook-form";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useAppSelector} from "../redux/store";

interface FormInput {
    name: string
    dateOfBirth: string
    gender: string
    hobby: string[]
    accept: boolean
    socialState: string
    subscribe: boolean
    favoredHobby: string
}

type CustomDatePickerProps = {
    field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>>
}

export default function CustomDatePicker({field}: CustomDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                {...field}
                label="Data di nascita"
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
export const TestFormMUI = () => {
    const {hobby, socialState} = useAppSelector(state => state.formData)
    const {handleSubmit, register, control} = useForm<FormInput>({
        defaultValues: {
            name: "",
            dateOfBirth: "",
            gender: "",
            hobby: [],
            accept: false,
            socialState: socialState[0],
            subscribe: false,
            favoredHobby: ""
        }
    })
    const handleSubmit2 = (data: FormInput) => {
        console.log(data)
    }
    return (
        <Box sx={{margin: " 2rem auto", p: "2rem", border: "1px solid grey", maxWidth: "900px"}}
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={handleSubmit(handleSubmit2)}>
            <Box>
                <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item xs={2}>

                        <Controller control={control} render={({field}) =>
                            <Checkbox {...field} inputProps={{'aria-label': 'Accept Condition'}}/>
                        } name={"accept"}/>

                    </Grid>

                    <Grid item xs={2}>
                        <Controller control={control} render={({field}) =>
                            <FormControl>
                                <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    {...field}
                                    aria-labelledby="radio-buttons-group-label"
                                    defaultValue={socialState[0]}
                                    name="radio-buttons-group"
                                >
                                    {socialState.map((item, index) => <FormControlLabel key={item + index} value={item}
                                                                                        control={<Radio/>}
                                                                                        label={item}/>)}

                                </RadioGroup>
                            </FormControl>
                        } name={"socialState"}/>
                    </Grid>

                    <Grid item xs={2}>
                        <TextField {...register("name")}/>
                    </Grid>

                    <Grid item xs={2}>
                        <Controller control={control}
                                    name="dateOfBirth"
                                    render={(controllerProps) =>
                                        <CustomDatePicker field={controllerProps.field as any}/>
                                    }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{minWidth: 120}}>
                            <Controller control={control} render={({field}) =>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sesso</InputLabel>
                                    <Select
                                        labelId="gender-select-label"
                                        id="gender-select"
                                        value={field.value}
                                        label="Sesso"
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value={"M"}>Maschio</MenuItem>
                                        <MenuItem value={"F"}>Femmina</MenuItem>
                                    </Select>
                                </FormControl>} name={"gender"}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Controller control={control} render={({field}) =>
                            <FormControlLabel control={
                                <Switch {...field} inputProps={{'aria-label': 'Subscribe to newsletter'}}/>
                            } label="Wanna Subscribe?"/>
                        } name={"subscribe"}/>
                    </Grid>
                    <Controller name="favoredHobby" control={control} render={({field}) =>
                    {
                        console.log(field)
                        return (<Autocomplete
                            //@ts-ignore
                            field={field}
                            disablePortal
                            onChange={(event, values) => field.onChange(values)}
                            options={hobby}
                            getOptionLabel={(option: { name: string, id: number }) => option.name}
                            renderInput={(params) =>
                                <TextField {...params}
                                           label="Hobby preferito"/>
                            }
                        />)}
                    }/>

                    <Controller render={({field: {onChange, value}}) =>
                        <FormControl sx={{m: 1, width: 300}}>
                            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                            <Select
                                labelId="select-chip-label"
                                id="select-multiple-chip"
                                multiple
                                value={value}
                                onChange={onChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((item) => (
                                            <Chip key={item} label={item}/>
                                        ))}
                                    </Box>
                                )}
                                // MenuProps={MenuProps}
                            >
                                {hobby.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                    } name={"hobby"} control={control}/>
                    <Grid item xs={2}>
                        <Button style={{marginTop: "1rem"}} type="submit" variant="contained">Registra</Button>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}
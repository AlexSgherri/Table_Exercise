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
    TextField, Typography
} from "@mui/material";
import {
    Controller,
    useForm,
    ControllerRenderProps,
    FieldPath,
    FieldValues
} from "react-hook-form";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React, {useEffect, useState} from "react";
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
    const [data, setData] = useState({})
    const {handleSubmit, register, setError, watch, control, formState: {errors, isSubmitted}} = useForm<FormInput>({
        mode: "onChange",
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

    const watchForm = watch()

    console.log("errors =>>", errors.name)
    console.log("WATCH =>", watchForm)
    const handleSubmit2 = (dataSubmitted: FormInput) => {
        setData(dataSubmitted)
    }


    return (
        <Box sx={{margin: " 2rem auto", p: "2rem", border: "1px solid grey", maxWidth: "900px"}}
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={handleSubmit(handleSubmit2)}>


            <Box>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <Box sx={{display: "flex",flexDirection:"column", gap:"1rem"}}>
                            <TextField label="Nome completo"{...register("name", {
                                required: {
                                    value:true,
                                    message: "Campo obbligatorio"
                                },
                                minLength: {
                                    value: 4,
                                    message: "Almeno 4 caratteri"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Massimo 12 caratteri"
                                },
                            })}/>
                            {(errors.name?.type && isSubmitted) && <p style={{color: "red"}}>{errors.name.message}</p>}
                            <Controller control={control}
                                        name="dateOfBirth"
                                        render={(controllerProps) =>
                                            <CustomDatePicker field={controllerProps.field as any}/>
                                        }
                            />
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
                    <Grid item xs={4}>
                        <Box>

                            <Controller name="favoredHobby" control={control} render={({field}) => <Autocomplete
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
                            />
                            }/>

                            <Controller render={({field: {onChange, value}}) =>
                                <FormControl sx={{marginTop: "1rem"}}>
                                    <InputLabel id="demo-multiple-chip-label">Hobbies</InputLabel>
                                    <Select
                                        labelId="select-chip-label"
                                        id="select-multiple-chip"
                                        multiple
                                        value={value}
                                        onChange={onChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Hobbies"/>}
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
                        </Box>

                    </Grid>
                    <Grid item xs={4}>
                        <Box>

                            <Controller control={control} render={({field}) =>
                                <FormControl>
                                    <FormLabel id="radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        {...field}
                                        aria-labelledby="radio-buttons-group-label"
                                        defaultValue={socialState[0]}
                                        name="radio-buttons-group"
                                    >
                                        {socialState.map((item, index) => <FormControlLabel key={item + index}
                                                                                            value={item}
                                                                                            control={<Radio/>}
                                                                                            label={item}/>)}

                                    </RadioGroup>
                                </FormControl>
                            } name={"socialState"}/>
                            <Controller control={control} render={({field}) =>
                                <FormControlLabel control={
                                    <Switch {...field} inputProps={{'aria-label': 'Subscribe to newsletter'}}/>
                                } label="Wanna Subscribe?"/>
                            } name={"subscribe"}/>
                            <Controller control={control} render={({field}) =>
                                <FormControlLabel control={
                                    <Checkbox {...field} inputProps={{'aria-label': 'Accept Condition'}}/>
                                } label="Accetta condizioni"/>
                            } name={"accept"}/>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button style={{marginTop: "1rem"}} type="submit" variant="contained">Registra</Button>
            </Box>

            <Typography>
                {Object.keys(data).length !== 0 && "Result: " + JSON.stringify(data)}
            </Typography>
        </Box>
    )
}
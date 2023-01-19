import {
    Box,
    Button,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {
    Controller,
    useForm,
    Field,
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldName, FieldValues
} from "react-hook-form";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {useAppDispatch, useAppSelector} from "../redux/store";

interface FormInput {
    name: string
    dateOfBirth: string
    gender: string
    hobby: string[]
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
    const {hobby} = useAppSelector(state=> state.formData)
    const dispatch = useAppDispatch();
    const {handleSubmit, register, control} = useForm<FormInput>({
        defaultValues: {
            name: "",
            dateOfBirth: "",
            gender: "",
            hobby:[]
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

                    <Grid item xs={4}>
                        <TextField {...register("name")}/>
                    </Grid>

                    <Grid item xs={4}>
                        <Controller control={control}
                                    name="dateOfBirth"
                                    render={(controllerProps) =>
                                        <CustomDatePicker field={controllerProps.field as any}/>
                                    }
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <Box sx={{minWidth: 120}}>
                            <Controller control={control} render={({field}) =>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
                    <Grid item xs={6}>
                        <Controller render={({field: {onChange,value}}) =>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={value}
                                    onChange={onChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    // MenuProps={MenuProps}
                                >
                                    {hobby.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        } name={"hobby"} control={control} />

                    </Grid>
                    <Grid item xs={2}>
                        <Button style={{marginTop: "1rem"}} type="submit" variant="contained">Registra</Button>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}
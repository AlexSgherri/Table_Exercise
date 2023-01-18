import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {filter} from "../redux/itemSlice";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchPosts} from "../redux/postSlice";
import {SubmitHandler, useForm, Controller} from "react-hook-form";

interface FormInput {
    codice: string
    descrizione: string
    categoria: string
}

export function Form() {
    const [focusState, setFocusState] = useState({
        codice: false,
        descrizione: false,
        categoria:false,
    })
    const {register, handleSubmit, setFocus, control, watch, reset} = useForm<FormInput>({
        defaultValues: {
            codice: "",
            descrizione: "",
            categoria: "",
        }
    })
    const [labelDescrizione, labelCodice] = watch(["descrizione", "codice"])
    console.log(labelDescrizione)
    const {categoryInfo} = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();

    // handle form Reset
    const handleReset = () => {
        reset()
    }

    // Set the focus on Mount
    useEffect(() => {
        setFocus("codice");
    }, [setFocus])

    // Submit and dispatch of data
    const handleSubmit2: SubmitHandler<FormInput> = ({codice, descrizione, categoria}, e) => {
        e?.preventDefault();
        dispatch(filter({codice, descrizione, categoria}));
        dispatch(fetchPosts())
    }

    return <>

        <Box sx={{margin: " 2rem auto", p: "2rem", border: "1px solid grey", maxWidth: "900px"}}
             component="form"
             noValidate
             autoComplete="off"
             onSubmit={handleSubmit(handleSubmit2)}>
            <Box>
                <Grid container justifyContent="flex-end" spacing={1}>

                    <Grid item xs={4}>
                        <TextField {...register("codice")}
                                   InputLabelProps={{shrink: (labelCodice==="" && !focusState.codice )  ? false : true}}
                                   onFocus={()=> setFocusState(prev => {return{...prev, codice: true}})}
                                   onBlur={()=> setFocusState(prev => {return{...prev, codice: false}})}
                                   sx={{maxWidth: "250px"}} id="code-label" label="codice"
                                   variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField {...register("descrizione")}
                            InputLabelProps={{shrink: (labelDescrizione==="" && !focusState.descrizione )  ? false : true}}
                                   sx={{maxWidth: "250px"}}
                                   onFocus={()=> setFocusState(prev => {return{...prev, descrizione: true}})}
                                   onBlur={()=> setFocusState(prev => {return{...prev, descrizione: false}})}
                                   id="description-label"
                                   label="descrizione" variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <Controller name="categoria"
                                    control={control}
                                    render={({field}) =>
                                        <FormControl>
                                            <InputLabel id="category-label">Categoria</InputLabel>
                                            <Select {...field}
                                                    sx={{maxWidth: "250px", minWidth: "200px"}}
                                                    name="categoria"
                                                    labelId="category-label"
                                                    label="NON LIBRERIA"
                                                    variant="outlined">
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {Object.keys(categoryInfo).map((item) => <MenuItem value={item}
                                                                                                   key={item}>{categoryInfo[item]}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    }/>
                    </Grid>

                    <Grid item xs={2}>
                        <Button style={{marginTop: "1rem"}} onClick={handleReset} variant="contained">Reset</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={{marginTop: "1rem"}} type="submit" variant="contained">Cerca</Button>
                        {/*<Button style={{marginTop:"1rem"}}type="submit" variant="contained" onClick={handleSubmit2} >Cerca</Button>*/}
                    </Grid>

                </Grid>
            </Box>
        </Box>
    </>
}
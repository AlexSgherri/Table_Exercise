import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filter} from "../redux/itemSlice";
import {RootState} from "../redux/store";

export function Form() {
    const [codice, setCodice] = useState<string>('');
    const [descrizione, setDescrizione] = useState<string>('');
    const [categoria, setCategory] = useState<string>('');
    const {categoryInfo} = useSelector((state:RootState) => state.items);
    const dispatch = useDispatch();
    const handleSelectChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const handleTextfieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.currentTarget.attributes[1].value ==='code-label') setCodice(event.currentTarget.value as string)
        if (event.currentTarget.attributes[1].value ==='description-label') setDescrizione(event.currentTarget.value as string)

    }

    return <>

        <Box
            sx={{margin: " 2rem auto", p: "2rem", border: "1px solid grey", maxWidth: "900px"}}
            component="form"
            noValidate
            autoComplete="off"
        >
            <Box>
                <Grid container justifyContent="flex-end" spacing={1}>

                    <Grid item xs={4}>
                        <TextField onChange={handleTextfieldChange} sx={{maxWidth: "250px"}} id="code-label" label="codice" value={codice} variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={handleTextfieldChange} sx={{maxWidth: "250px"}} id="description-label" value={descrizione} label="descrizione" variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">category</InputLabel>
                            <Select sx={{maxWidth: "250px"}} value={categoria}
                                    labelId="category-label"
                                    label="categoria"
                                    variant="outlined" onChange={handleSelectChange}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Object.keys(categoryInfo).map((item) => <MenuItem value={item}
                                                                                   key={item}>{categoryInfo[item]}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <Button style={{marginTop:"1rem"}}type="submit" variant="contained" onClick={(e:React.FormEvent<EventTarget>)=> {
                            e.preventDefault();
                            dispatch(filter({codice, descrizione, categoria}));
                            setCodice('');
                            setDescrizione('');
                            setCategory('');
                        }}>Cerca</Button>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    </>
}
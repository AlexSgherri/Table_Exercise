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
import {CategoryData} from "../App";

type Props = {
    categoryData: CategoryData,
    handleClick: (codice: string , descrizione: string, categoria:string )=> void,
}
export function Form({categoryData, handleClick}: Props) {
    const [codice, setCodice] = useState<string>('');
    const [descrizione, setDescrizione] = useState<string>('');
    const [category, setCategory] = useState<string>('');
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
                <Grid container justifyContent="flex-end" spacing={10}>

                    <Grid item xs={4}>
                        <TextField onChange={handleTextfieldChange} sx={{width: "250px"}} id="code-label" label="codice" value={codice} variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={handleTextfieldChange} sx={{width: "250px"}} id="description-label" value={descrizione} label="descrizione" variant="outlined"/>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">category</InputLabel>
                            <Select sx={{width: "250px"}} value={category}
                                    labelId="category-label"
                                    label="categoria"
                                    variant="outlined" onChange={handleSelectChange}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {Object.keys(categoryData).map((item) => <MenuItem value={categoryData[item]}
                                                                                   key={categoryData[item]}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <Button variant="contained" onClick={()=> {
                            handleClick(codice, descrizione, category);
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
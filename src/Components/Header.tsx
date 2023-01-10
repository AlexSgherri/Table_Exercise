import {Box, Typography} from "@mui/material";

export function Header() {
    return (
        <Box sx={{width: "100%", borderBottom:"1px solid grey" }}>
            <Typography variant="h4" style={{padding:"1rem 0 1rem 2rem"}} component="h2">
              LA MIA APPLICAZIONE
            </Typography>
        </Box>
    )
}
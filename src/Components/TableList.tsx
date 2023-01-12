import mock_data from '../MOCK_DATA.json';
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const itemList = mock_data.body;

export function TableList() {
    const {visualizedItems} = useSelector((state:RootState)=> state.items)

    return <>
        <Box sx={{p: "2rem", m: "0 2rem", border: "1px solid grey"}}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{backgroundColor:"hsl(200,60%, 55%)"}}>
                            {Object.keys(visualizedItems).length !== 0 && Object.keys(visualizedItems[0]).map(item => <TableCell key={item}>{item}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visualizedItems.map((row,i) => <TableRow style={{backgroundColor: i!&1 ?"hsl(200,60%, 75%)" : "hsl(200,60%, 70%)"}} key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.codice}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.descrizione}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.categoria}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.idCategoria}
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    </>
}
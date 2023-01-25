import * as React from 'react';
import Box from '@mui/material/Box';
import Rating, {RatingProps} from '@mui/material/Rating';
import mockData from "./../MOCK_DATA.json"
import {
    GridFilterInputValueProps,
    DataGrid,
    GridFilterItem,
    GridFilterOperator, DataGridProps, GridRowProps, GridColDef, GridColumnHeaderParams, GridRowSpacingParams,
} from '@mui/x-data-grid';
import {useDemoData} from '@mui/x-data-grid-generator';
import {useCallback} from "react";

// COLUMN TYPES
/*
'string' (default)
'number'
'date'
'dateTime'
'boolean'
'singleSelect'
'actions'
*/

const rows = [
    ...mockData.body
]

const columns: GridColDef[] = [{field: 'categoria', headerName: "Categoria", type: 'string', width: 150, headerAlign: "center"},
    {field: 'id', headerName: "ID", type: 'number', width: 150, headerAlign: "center"},
    {
        field: 'descrizione', type: 'string', minWidth: 250, headerAlign: "center", resizable: true,
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>
                {'Descrizione '}
                <span role="img" aria-label="enjoy">
                    🎂
                </span>
            </strong>
        ),
    },
    {field: 'idCategoria', headerName: "ID Categoria", type: 'number', width: 150, headerAlign: "center"},
    {field: 'codice', headerName: "Codice", type: 'string', width: 150, headerAlign: "center"},
]

/*const exampleRow = [
    {id: 1, col1: 'Hello', col2: 'World'},
    {id: 2, col1: 'DataGridPro', col2: 'is Awesome'},
    {id: 3, col1: 'MUI', col2: 'is Amazing'},
];*/

/*const exampleColumns: GridColDef[] = [
    {field: 'col1', headerName: 'Column 1', width: 150},
    {field: 'col2', headerName: 'Column 2', width: 150},
];*/

export const TestDataGrid = () => {
    const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
        return {
            top: 5,
            bottom: 0,
        };
    }, []);

    return (
        <div style={{display: "flex", flexGrow: 1, padding: "2rem"}}>
            <DataGrid
                getRowSpacing={getRowSpacing}
                autoHeight
                rowHeight={30}
                columns={columns}
                rows={rows}
                pageSize={10}
            />
        </div>
    )
}
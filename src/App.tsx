import React, {useState} from 'react';
import './App.css';
import {Header} from "./Components/Header";
import {Form} from "./Components/Form";
import {TableList} from "./Components/TableList";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store";
import {MockData} from "./redux/itemSlice";



type CategoryData = {
    [key: string]: string | number,
}


// Reduce per isolare le coppie con idCategoria univoco nell'array di oggetti



/*{
    // "idCategoria": "categoria"
    1: "VITA2"
    1
}*/

/*const categorieEntities = itemList.reduce((agg, item, index) => {
    return {
        ...agg,
        [item.idCategoria]: item.categoria
    }
}, {})

const categorieEntities2 = itemList.reduce((agg, item, index) => ({...agg, [item.idCategoria]: item.categoria}), {})
console.log(categorieEntities)*/

function App() {

    return (<>
            <Header/>
            <main>
                <Form/>
                <TableList/>
            </main>
        </>
    );
}

export default App;

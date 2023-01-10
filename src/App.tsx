import React, {useState} from 'react';
import './App.css';
import {Header} from "./Components/Header";
import {Form} from "./Components/Form";
import {TableList} from "./Components/TableList";
import mock_data from './MOCK_DATA.json';

export type MockData = {
    categoria: string,
    codice: string,
    descrizione: string,
    id: number,
    idCategoria: number,
}

export type CategoryData = {
    [key: string]: string | number,
}

const itemList: MockData[] = mock_data.body;

const categoryData: CategoryData = {};
const uniqueCategoryList: string[] = [];
const uniqueIdCategoryList: number[] = [];
itemList.map(item => {
    if (!uniqueCategoryList.includes(item.categoria)) {
        uniqueCategoryList.push(item.categoria);
        uniqueIdCategoryList.push(item.idCategoria);
    }
    if (!Object.keys(categoryData).includes(item.categoria)) categoryData[item.categoria] = item.idCategoria
});

function App() {
    const [itemsList, setItemsList] = useState<MockData[]>(itemList)
    const handleFilterList = (codice: string = '', descrizione: string = '', categoria: string = '') => {
        const newItemsList: MockData[] = itemList.filter(item => codice === item.codice || codice === '')
            .filter(item => item.descrizione.toLowerCase().includes(descrizione.toLowerCase()) || descrizione === '')
            .filter(item => parseInt(categoria) === item.idCategoria || categoria === '')
        setItemsList(newItemsList)
    }

    return (<>
            <Header/>
            <main>
                <Form categoryData={categoryData} handleClick={handleFilterList}/>

                <TableList visualizedList={itemsList}/>
            </main>
        </>
    );
}

export default App;

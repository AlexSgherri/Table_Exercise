import React from 'react';
import './App.css';
import {Header} from "./Components/Header";
import {Form} from "./Components/Form";
import {TableList} from "./Components/TableList";
import MockForm from "./Components/MockForm";

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
                {/*<MockForm/>*/}
            </main>
        </>
    );
}

export default App;

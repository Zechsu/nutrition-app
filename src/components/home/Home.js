import { useEffect, useState } from "react";
import Product from "./Product";
import Selected from "./Selected";
import Field from "../field/Field";
import ProductsTable from "./ProductsTable";

function Home() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState("");

    let selectProduct = (id) => {
        const newSelected = [
            ...selected,
            products[id]
        ];

        setSelected(newSelected);
    };

    let clearSelection = () => {
        const newSelected = [];

        setSelected(newSelected);
    }

    let removeSelection = (id) => {
        const newSelected = [
            ...selected
        ];

        newSelected.splice(id, 1);

        setSelected(newSelected);
    }

    let onInputChange = (e) => {
        if (e.value.length >= 3) {
            fetch("http://localhost:3001/api/products/" + e.value, {
                    method: "GET",
                })
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {

    }, []);

    return (
        <div>
            {selected.length > 0? <Selected products={selected} clearFunction={clearSelection} removeFunction={removeSelection} /> : ""}
            <div className="ui search">
                <Field placeholder="Search" name="search" onChange={onInputChange}/>
            </div>
            <ProductsTable products={products} selectFunction={selectProduct}/>
        </div>
    )
}

export default Home;
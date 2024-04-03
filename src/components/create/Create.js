import { useEffect, useState } from "react";
import Field from "../field/Field";
import { useNavigate } from "react-router-dom";

function Create() {
    const [product, setProduct] = useState({
        name: "",
        kcal: 0,
        protein: 0,
        fats: 0,
        carbs: 0,
    });

    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({})
    const [products, setProducts] = useState([])
    const [valid, setValid] = useState(false);

    let validate = () => {
        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!product.name) return false;

        if (errors.length) return false;

        return true;
    };

    useEffect(() => {
        setValid(validate());
    })

    let onInputChange = (e) => {
        setFieldErrors({
            ...fieldErrors,
            [e.name]: e.error
        });
        setProduct({
            ...product,
            [e.name]: e.value
        });
    };

    let onFormSubmit = (evt) => {
        evt.preventDefault();

        if (!validate()) return;

        console.log(JSON.stringify([product]));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        };

        fetch("http://localhost:3001/api/products", options)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((e) => console.error(e));

        setProduct({
            name: "",
            kcal: 0,
            protein: 0,
            fats: 0,
            carbs: 0,
        });

        navigate("/");
    };

    return (
        <div>
            <h1 className="ui header">Add new product</h1>
            <form onSubmit={onFormSubmit}>
                <h1 className="ui divider">Product</h1>
                <Field
                    placeholder="Product"
                    name="name"
                    value={product.name}
                    onChange={onInputChange}
                    validate={(val) => val.toString().trim().length >= 1? false : "Invalid product name"}
                />
                <h1 className="ui divider">Kcal</h1>
                <Field 
                    placeholder="Kcal"
                    name="kcal"
                    value={product.kcal.toString()}
                    onChange={onInputChange}
                    validate={(val) => (val.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/) !== null? false : "Invalid kcal")}
                />
                <h1 className="ui divider">Protein (g)</h1>
                <Field 
                    placeholder="Protein (g)"
                    name="protein"
                    value={product.protein.toString()}
                    onChange={onInputChange}
                    validate={(val) => (val.toString().match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/) !== null? false : "Invalid protein")}
                />
                <h1 className="ui divider">Fats (g)</h1>
                <Field 
                    placeholder="Fats (g)"
                    name="fats"
                    value={product.fats.toString()}
                    onChange={onInputChange}
                    validate={(val) => (val.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/) !== null? false : "Invalid fats")}
                />
                <h1 className="ui divider">Carbs (g)</h1>
                <Field 
                    placeholder="Carbs (g)"
                    name="carbs"
                    value={product.carbs.toString()}
                    onChange={onInputChange}
                    validate={(val) => (val.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/) !== null? false : "Invalid carbs")}
                />

                <input className={"ui button ".concat(valid? "positive" : "negative disabled")} type="submit" value="Create"/>
            </form>
        </div>
    )
}

export default Create;
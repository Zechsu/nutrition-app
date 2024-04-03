function Table({products, selectFunction}) {
    return (
        <div>
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Kcal</th>
                        <th>Protein (g)</th>
                        <th>Fats (g)</th>
                        <th>Carbs (g)</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(({name, kcal, protein, fats, carbs}, i) => (
                        <tr onClick={() => selectFunction(i)}>
                            <td data-label="name">{name}</td>
                            <td data-label="kcal">{kcal}</td>
                            <td data-label="protein">{protein}</td>
                            <td data-label="fats">{fats}</td>
                            <td data-label="carbs">{carbs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
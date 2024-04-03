function Selected({products, clearFunction, removeFunction}) {

    let totalKcal = 0;
    let totalProtein = 0;
    let totalFats = 0;
    let totalCarbs = 0;

    return (
        <div>
            <h1 className="ui">Selected Product</h1>
            <button className="ui negative button" onClick={clearFunction}>
                Clear Selection
            </button>
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
                {products.map(({name, kcal, protein, fats, carbs}, i) => {
                    totalKcal += parseFloat(kcal);
                    totalProtein += parseFloat(protein);
                    totalFats += parseFloat(fats);
                    totalCarbs += parseFloat(carbs);

                    return (
                        <tr onClick={() => removeFunction(i)}>
                            <td data-label="name">{name}</td>
                            <td data-label="kcal">{kcal}</td>
                            <td data-label="protein">{protein}</td>
                            <td data-label="fats">{fats}</td>
                            <td data-label="carbs">{carbs}</td>
                        </tr>
                    )
                })}
                    {/* {products.map(({p}, i) => {
                        totalKcal += parseFloat(p.kcal);
                        totalProtein += parseFloat(p.protein);
                        totalFats += parseFloat(p.fats);
                        totalCarbs += parseFloat(p.carbs);

                        return (
                            <tr>
                                <td data-label="name">{p.name}</td>
                                <td data-label="kcal">{p.kcal}</td>
                                <td data-label="protein">{p.protein}</td>
                                <td data-label="fats">{p.fats}</td>
                                <td data-label="carbs">{p.carbs}</td>
                            </tr>
                        );
                    })} */}
                </tbody>
                <tfoot className="full-width">
                    <th>Total</th>
                    <th>{totalKcal}</th>
                    <th>{totalProtein}</th>
                    <th>{totalFats}</th>
                    <th>{totalCarbs}</th>
                </tfoot>
            </table>
        </div>
    );
}

export default Selected;
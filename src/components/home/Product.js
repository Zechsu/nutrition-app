function Product(props) {

    return (
        <div className="item">
            <div>
                {props.name}
            </div>
            <div>
                {props.kcal}
            </div>
            <div>
                {props.protein}
            </div>
            <div>
                {props.fats}
            </div>
            <div>
                {props.carbs}
            </div>
        </div>
    );
}


export default Product;
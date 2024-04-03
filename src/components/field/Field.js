import PropTypes from "prop-types";
import { useState } from "react";

function Field(props) {
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState(false);

    if (props.value !== value) {
        setValue(props.value);
    }

    let onChange = (evt) => {
        const name = props.name;
        const value = evt.target.value;
        const error = props.validate ? props.validate(value) : false;

        setValue(value);
        setError(error);

        props.onChange({ name, value, error});
    }

    return (
        <div className={"ui fluid input field ".concat(error? "error" : "")}>
            <input placeholder={props.placeholder} value={props.value} onChange={onChange} />
            {
                error && <div className="ui red basic label">{error}</div>
            }
            
        </div>
    )
}

Field.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
};

export default Field;
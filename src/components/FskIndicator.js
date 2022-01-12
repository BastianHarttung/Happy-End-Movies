import classes from "./FskIndicator.module.css";

function ColorIndicator(props) {

    return (
        <div className={classes.colorIndicatorContainer + 'd-flex-center'}>

            <label htmlFor="arrow">Filme bis FSK:</label>
            <div className={classes.colorContainer}>
                {props.colors.map(colorToTableEntry)}
            </div>

            <input className={classes.slider}
                   id="arrow"
                   name="arrow"
                   min="0" max="4"
                   type="range"
                   value={props.arrowPos}
                   onChange={(e) => props.setArrow(e.target.value)}/>

        </div>
    )

    function colorToTableEntry(color, index) {
        return <div key={index}
                    className={classes.color}
                    style={{
                        backgroundColor: color.color,
                        flexGrow: color.factor
                    }}>{color.fsk}</div>
    }

}

export default ColorIndicator
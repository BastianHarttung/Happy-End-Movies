import classes from "./FskIndicator.module.scss";
import {useState} from "react";

function ColorIndicator(props) {

    const fskColors = [
        {
            fsk: 0,
            color: 'white',
            factor: 1
        },
        {
            fsk: 6,
            color: '#F7E140',
            factor: 1
        },
        {
            fsk: 12,
            color: '#32AF3D',
            factor: 1
        },
        {
            fsk: 16,
            color: '#5588fc',
            factor: 1
        },
        {
            fsk: 18,
            color: '#E61B23',
            factor: 1
        },]
    const [fskPos, setFskPos] = useState(4)

    return (
        <div className={classes.colorIndicatorContainer + 'd-flex-center'}>

            <label htmlFor="arrow">Filme bis FSK:</label>
            <div className={classes.colorContainer}>
                {fskColors.map(colorToTableEntry)}
            </div>

            <input className={classes.slider}
                   id="arrow"
                   name="arrow"
                   min="0" max="4"
                   type="range"
                   value={fskPos}
                   onChange={(e) => {
                       setFskPos(e.target.value);
                       props.setFskPos(fskColors[e.target.value].fsk)
                   }}/>

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
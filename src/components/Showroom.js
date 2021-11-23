import classes from "./Showroom.module.css";

const Showroom = (props) => {
    return (
        <section className={classes.showroomSection}>
            <div className={classes.sidebar}>
                <div className={classes.filterContainer}>
                    <div className={classes.filter} >Filme mit Happy End</div> {/*TODO*/}
                    <div className={classes.filter} >Filme ohne Happy End</div> {/*TODO*/}
                </div>
            </div>
        </section>
    )
}

export default Showroom
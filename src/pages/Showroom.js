import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";


const Showroom = (props) => {


    // Scrolling Sidebar
    const [scrollPosition, setScrollPosition] = useState(80);
    const handleScroll = ( )=> {
        const position = window.pageYOffset;
        setScrollPosition( Math.max(0, 80 - position) )
    }
    useEffect( () => {
        window.addEventListener('scroll', handleScroll, {passive:true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <section className={classes.showroomSection}>
            <div className={classes.sidebar} style={{top: scrollPosition +'px'}}>
                <div className={classes.filterContainer}>
                    <div className={classes.filter} >Alle Filme</div>
                    <div className={classes.filter} >Filme mit Happy End</div>
                    <div className={classes.filter} >Filme ohne Happy End</div>
                </div>
            </div>

            <div className={classes.filteredMoviesContainer}>
                { props.moviesDB.map((movie)=>
                    <SearchResultBox
                        key={movie.id}
                        movie={movie} />) }
            </div>
        </section>
    )
}

export default Showroom
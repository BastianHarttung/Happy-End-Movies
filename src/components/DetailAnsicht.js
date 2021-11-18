import classes from "./DetailAnsicht.module.css";

const DetailAnsicht = (props) => {
    const imageUrl = "https://image.tmdb.org/t/p/w500"+ props.movie.poster_path;
    const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=d2aa68fbfa10f4f356fe29718bfa3508&language=de"

    /*const genre = async () =>{
        const genre = await getGenre(props.movie.genre_ids[0])
        return genre.name
    }

    async function getGenre(genreId) {
        const response = await fetch(genreUrl);
        let data = await response.json();
        const genre = data.genres.find(genre => genre.id === genreId)
        return genre
    }*/


    return (
        <section className={classes.detailsSection}>
            <div className={classes.movieBox}>
                <img className={classes.detailsImage} src={imageUrl} alt="Poster"/>
                <div className={classes.detailsContainer}>
                    <h4>{props.movie.title}</h4>
                    <div></div>
                </div>
            </div>
        </section>
    )

}

export default DetailAnsicht;
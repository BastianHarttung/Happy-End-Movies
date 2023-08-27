import classes from "./Hauptmenue.module.scss";
import { ROUTES } from "../models/routes";
import { ButtonStart } from "../styleComponents";
//Images
import ImageFilmsuche from "../assets/icons/filmsuche_web_search.svg";
import ImageShowroom from "../assets/icons/showroom_home_cinema.svg";
import ImageEinstellungen from "../assets/icons/einstellungen_designer.svg";


const Hauptmenue = () => {
  const buttons = [
    {
      order: 1,
      label: "Filmsuche",
      description: "Suche einen Film aus einer Internet-Datenbank.",
      linkTo: ROUTES.FILMSUCHE,
      image: ImageFilmsuche,
    },
    {
      order: 2,
      label: "Showroom",
      description: "Eine Watchlist mit Filmen nach Happy-End bewertet.",
      linkTo: ROUTES.SHOWROOM,
      image: ImageShowroom,
    },
    {
      order: 3,
      label: "Einstellungen",
      description: "Dark-Mode und Color-Themes",
      linkTo: ROUTES.START,
      image: ImageEinstellungen,
    },
  ];

  return (
    <main className={classes.hauptmenueSection}>
      <div className={classes.buttonContainer}>
        {buttons.map((button) => (
          <ButtonStart
            key={button.order}
            label={button.label}
            description={button.description}
            linkTo={button.linkTo}
            image={button.image}
          />
        ))}
      </div>
    </main>
  );
};

export default Hauptmenue;

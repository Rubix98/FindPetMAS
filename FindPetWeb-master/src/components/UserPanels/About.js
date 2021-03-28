import React, { useContext } from "react";
import { Container } from "../../styles/AboutContainerStyle";
import { NewAppInfo } from "../../context/AppInfo";
const About = () => {
  const userInfo = useContext(NewAppInfo);
  return (
    <Container mobile={userInfo.mobileMenu} user={userInfo.user}>
      {console.log(userInfo.mobileMenu)}
      <p>
        Aplikacja stworzona jako część praktyczna pracy licencjackiej
        ,,Technologie JavaScript na przykładzie aplikacji do odnajdywania
        zagubionych zwierząt."Celem pracy jest stworzenie aplikacji webowej oraz
        mobilnej. Za pomocą aplikacji webowej użytkownik może przeglądać
        zgłoszenia zauważonych oraz zagubionych zwierząt. Użytkownik może
        również zgłosić zaginięcie zwierzęcia podając dane zwierzęcia,
        przybliżoną lokalizację oraz przesyłając zdjęcie. Aplikacja mobilna
        będzie ułatwiała dokonywanie zgłoszeń odnalezienia zwierząt. W części
        teoretycznej zostaną opisane m.in. użyte technologie, przygotowanie
        narzędzi do pracy z tymi technologiami oraz poruszanie się po
        stworzonych aplikacjach.
      </p>
      <p>LINK</p>
      <p>Autor:Mateusz Klimek</p>
    </Container>
  );
};
export default About;

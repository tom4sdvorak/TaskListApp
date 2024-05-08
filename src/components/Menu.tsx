import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonNote,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import {
  bookmarkOutline,
  homeOutline,
  homeSharp,
  informationOutline,
  listOutline,
  listSharp,
  trashOutline,
  trashSharp,
} from "ionicons/icons";
import "./Menu.css";
import { signUserOut } from "../firebaseCfg";
import { useState } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Deleted",
    url: "/deleted",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
];

const labels = ["About"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(true);

  async function signOut(){
    await signUserOut();
    setIsLogged(false);
    history.push('/login');
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonItem>
            <IonButtons>
              <IonMenuButton />
            </IonButtons>
            <IonListHeader>Menu</IonListHeader>
          </IonItem>

          <IonNote></IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonList id="labels-list">
          <IonListHeader>Other</IonListHeader>
          <IonMenuToggle key={0} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === "/about" ? "selected" : ""
                  }
                  routerLink="/about"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={informationOutline}
                    md={informationOutline}
                  />
                  <IonLabel>About</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                {isLogged &&
                  <IonItem button onClick={signOut} lines="none">
                    <IonIcon
                        aria-hidden="true"
                        slot="start"
                        icon={informationOutline}
                    />
                    <IonLabel>Sign Out</IonLabel>
                  </IonItem>
                }
              </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

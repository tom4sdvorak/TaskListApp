import {
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
} from "@ionic/react";

import { useHistory, useLocation } from "react-router-dom";
import {
  homeOutline,
  homeSharp,
  informationOutline,
  logOutOutline,
  trashOutline,
  trashSharp,
} from "ionicons/icons";
import "./Menu.css";
import { signUserOut } from "../firebaseCfg";

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

// Interface of imports from App.tsx
interface MenuProps {
  userLogged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ userLogged, setLogged }) => {
  const location = useLocation();
  const history = useHistory();

  async function signOut() {
    await signUserOut();
    setLogged(false);
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
              className={location.pathname === "/about" ? "selected" : ""}
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
            {userLogged && (
              <IonItem button onClick={signOut} lines="none">
                <IonIcon aria-hidden="true" slot="start" icon={logOutOutline} />
                <IonLabel>Sign Out</IonLabel>
              </IonItem>
            )}
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

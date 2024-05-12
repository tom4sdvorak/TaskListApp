import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  useIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonCard,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";

import React, { useState } from "react";
import { trashOutline, reloadOutline } from "ionicons/icons";
import { format } from "timeago.js";
import { useStorage } from "../helpers/LocalStore";
import "../theme/variables.css";

const Deleted: React.FC = () => {
  const { getAllDeletedLists, changeState, deleteList } = useStorage();

  // Initialize array of task lists
  const [allLists, setAllLists] = useState([]);

  // Update view of tasks when entering the page
  useIonViewWillEnter(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const resolvedData: any = await getAllDeletedLists();
      setAllLists(resolvedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Sets delete status of a list to false making it move from deleted page to Home
  const restoreList = async (listID: string) => {
    try {
      console.log("Trying to mark list undeleted " + listID);
      await changeState(listID);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Permamently removes list from the app and storage
  const removeList = async (listID: string) => {
    try {
      console.log("Trying to permamently delete list " + listID);
      await deleteList(listID);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <IonPage id="deleted">
      <IonHeader>
        <IonToolbar id="deleted-toolbar">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deleted</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="deleted" className="ion-padding">
        <IonGrid>
          <IonRow>
            {allLists.length > 0 &&
              allLists.map((list) => (
                <IonCol
                  size="6"
                  size-sm="4"
                  size-md="3"
                  size-xl="2"
                  key={list.id}
                >
                  <IonCard id="deleted-card" key={list.id}>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        Deleted {format(list.edited)}
                      </IonCardSubtitle>
                      <IonCardTitle>{list.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonButton
                      id="deleted-home-button"
                      fill="clear"
                      onClick={() => removeList(list.id)}
                    >
                      <IonIcon icon={trashOutline}></IonIcon>
                    </IonButton>
                    <IonButton
                      id="deleted-home-button"
                      fill="clear"
                      onClick={() => restoreList(list.id)}
                    >
                      <IonIcon icon={reloadOutline}></IonIcon>
                    </IonButton>
                  </IonCard>
                </IonCol>
              ))}
            {allLists.length < 1 && (
              <IonCol size="12">
                <h1 className="ion-text-center">
                  You have no deleted task lists.
                </h1>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Deleted;

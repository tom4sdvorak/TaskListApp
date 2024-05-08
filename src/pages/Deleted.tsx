import {
  IonButtons,
  IonContent,
  IonHeader,
  IonFab,
  IonFabButton,
  IonMenuButton,
  IonPage,
  IonTitle, useIonViewWillEnter, IonGrid, IonRow, IonCol, 
  IonToolbar,  IonCardHeader, IonCardSubtitle, IonButton, IonRouterLink, IonCard, IonCardTitle, useIonAlert, IonIcon, 
} from "@ionic/react";
import { addCircle, addOutline, ellipseSharp, list } from "ionicons/icons";
import React, { useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import { trashOutline, reloadOutline } from 'ionicons/icons';
import { format } from 'timeago.js';
import { useStorage} from '../helpers/LocalStore';

const Deleted: React.FC = () => {
  const { getAllDeletedLists, changeState, deleteList } = useStorage();

  // Initialize array of task lists
  const [allLists, setAllLists] = useState([]);
  /*useEffect(() => {
    fetchData();
  }, []);*/

  // Update view of tasks when entering the page
  useIonViewWillEnter(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const resolvedData : any = await getAllDeletedLists();
      setAllLists(resolvedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const restoreList = async (listID: string) => {
    try {
      console.log("Trying to mark list undeleted " + listID);
      await changeState(listID);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const removeList = async (listID: string) => {
    try {
      console.log("Trying to permamently delete list " + listID);
      await deleteList(listID);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deleted</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="deleted" className="ion-padding">
        <IonGrid>
          <IonRow>
            {allLists.length > 0 && allLists.map((list) => (
              <IonCol size="6" size-sm="4" size-md="3" size-xl="2" key={list.id}>
                <IonCard key={list.id}>
                  <IonCardHeader>
                    <IonCardSubtitle>Deleted {format(list.edited)}</IonCardSubtitle>
                    <IonCardTitle>{list.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonButton fill="clear" onClick={() => removeList(list.id)}><IonIcon icon={trashOutline}></IonIcon></IonButton>
                  <IonButton fill="clear" onClick={() => restoreList(list.id)}><IonIcon icon={reloadOutline}></IonIcon></IonButton>
                </IonCard>
              </IonCol>
            ))}
            {allLists.length < 1 && <IonCol size="12"><h1 className="ion-text-center">You have no deleted task lists.</h1></IonCol>}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Deleted;

import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  useIonViewWillEnter,
  IonToolbar, IonCardHeader, IonCardSubtitle, IonButton, IonRouterLink, IonCard, IonCardTitle, useIonAlert, 
} from "@ionic/react";
import { addCircle, addOutline, ellipseSharp, list } from "ionicons/icons";
import React, { useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import { trashOutline, add } from 'ionicons/icons';
import { format } from 'timeago.js';
import { useStorage, List} from '../helpers/LocalStore';
import "./Home.css";

const Home: React.FC = () => {
  const { getAllLists, saveList, changeState } = useStorage();
  // Initialize alert popup
  const [presentAlert] = useIonAlert();

  // Initialize array of task lists
  const [allLists, setAllLists] = useState([]);
  /*useEffect(() => {
    console.log("User arrived Home");
    fetchData();
  }, []);*/

  // Update view of tasks when entering the page
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
    fetchData();
  });

  const fetchData = async () => {
    try {
      const resolvedData : any = await getAllLists();
      setAllLists(resolvedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTaskList = async (listName: string) => {
    // Don't add anything if name is empty
    if (listName.length < 1){
      return false;
    }
    else{
      try {
        console.log("Adding list " + listName);
        const created = Date.now();
        const uniqID = created - 1714827780379;
        const newList: List = {
        title: listName,
        edited: created,
        deleted: false, 
        tasks: []
        }
        await saveList(uniqID.toString(), newList);
        await fetchData();
        return true;
      } catch (error) {
        console.error('Error updating data:', error);
        return false;
      }
    }
  }

  const deleteList = async (listID: string) => {
    try {
      console.log("Trying to mark list deleted " + listID);
      await changeState(listID);
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
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="home" className="ion-padding">
        Click plus button to add a list
        {allLists.map((list) => (
          <IonCard key={list.id}>
            <IonCardHeader>
              <IonCardSubtitle>Edited {format(list.edited)}</IonCardSubtitle>
              <IonCardTitle><IonRouterLink routerLink={"/tasks/" + list.id} routerDirection="forward">{list.title}</IonRouterLink></IonCardTitle>
            </IonCardHeader>
            <IonButton fill="clear" onClick={() => deleteList(list.id)}><IonIcon icon={trashOutline}></IonIcon></IonButton>
          </IonCard>
        ))}
        <IonFab id="add-list" slot="fixed" vertical="bottom" horizontal="end" onClick={() =>
        presentAlert({
          header: 'CREATE NEW TASK LIST',
          buttons: ['Cancel', {
            text: 'Add',
            handler: (data) => {
              return addTaskList(data.taskInput);
            }
          }],
          inputs: [{
            name: 'taskInput',
            placeholder: 'Name',
          }]
        })
        }>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;

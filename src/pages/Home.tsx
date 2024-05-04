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
  IonToolbar, IonCardHeader, IonCardSubtitle, IonButton, IonRouterLink, IonCard, IonCardTitle, useIonAlert, 
} from "@ionic/react";
import { addCircle, addOutline, ellipseSharp } from "ionicons/icons";
import React, { useState, useEffect } from 'react';
import { Storage } from '@ionic/storage';
import { trashOutline, add } from 'ionicons/icons';
import { format } from 'timeago.js';
import { useStorage, List} from '../helpers/LocalStore';
import "./Home.css";

const Home: React.FC = () => {
  const { getAllLists, saveList } = useStorage();
  // Initialize alert popup
  const [presentAlert] = useIonAlert();
  const [lists, setList] = useState([{
    id: 0,
    title: "Test",
    edited: 1714826035412
  }]);

  // Initialize array of task lists
  const [allLists, setAllLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedData : any = await getAllLists();
        setAllLists(resolvedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  console.log(allLists);
  
  

  function addTaskList(listName: string){
    // Don't add anything if name is empty
    if (listName.length < 1){
      return false;
    }
    else{
      const created = Date.now();
      const uniqID = created - 1714827780379;
      const newList: List = {
        title: listName,
        edited: created,
        tasks: []
      };
      saveList(uniqID.toString(), newList)
      //setList([...lists, {id: uniqID, title: listName, edited: created}]);
      return true;
    }
  }


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
            <IonButton fill="clear"><IonIcon icon={trashOutline}></IonIcon></IonButton>
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

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
import { addCircle, addOutline } from "ionicons/icons";
import React from "react";
import { trashOutline, add } from 'ionicons/icons';
import "./Home.css";

const Home: React.FC = () => {
  // Initialize alert popup
  const [presentAlert] = useIonAlert();

  function addTaskList(listName: string){
    // Don't add anything if name is empty
    if (listName.length < 1){
      return false;
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
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Edited x min ago</IonCardSubtitle>
            <IonCardTitle><IonRouterLink routerLink="/tasks/1" routerDirection="forward">Task Name</IonRouterLink></IonCardTitle>
          </IonCardHeader>
          <IonButton fill="clear"><IonIcon icon={trashOutline}></IonIcon></IonButton>
        </IonCard>
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

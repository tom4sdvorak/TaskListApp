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
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonCardHeader,
  IonCardSubtitle,
  IonButton,
  IonRouterLink,
  IonCard,
  IonCardTitle,
  useIonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { trashOutline, add } from "ionicons/icons";
import { format } from "timeago.js";
import { useStorage, List } from "../helpers/LocalStore";
import "../theme/variables.css";

const Home: React.FC = () => {
  const { getAllLists, saveList, changeState } = useStorage();
  const [presentAlert] = useIonAlert();
  const [allLists, setAllLists] = useState([]);

  // Update view of tasks when entering the page
  useIonViewWillEnter(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const resolvedData: any = await getAllLists();
      setAllLists(resolvedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Adds a new task list with a name chosen by user
  const addTaskList = async (listName: string) => {
    // Don't add anything if name is empty
    if (listName.length < 1) {
      return false;
    } else {
      try {
        const created = Date.now();
        const uniqID = created - 1714827780379;
        const newList: List = {
          title: listName,
          edited: created,
          deleted: false,
          tasks: [],
        };
        await saveList(uniqID.toString(), newList);
        await fetchData();
        return true;
      } catch (error) {
        console.error("Error updating data:", error);
        return false;
      }
    }
  };

  // Marks list for deletion
  const deleteList = async (listID: string) => {
    try {
      await changeState(listID);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
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
                  <IonCard>
                    <IonCardHeader>
                      <IonCardSubtitle>
                        Edited {format(list.edited)}
                      </IonCardSubtitle>
                      <IonCardTitle>
                        <IonRouterLink
                          routerLink={"/tasks/" + list.id}
                          routerDirection="forward"
                        >
                          {list.title}
                        </IonRouterLink>
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonButton
                      id="home-button"
                      fill="clear"
                      onClick={() => deleteList(list.id)}
                    >
                      <IonIcon icon={trashOutline}></IonIcon>
                    </IonButton>
                  </IonCard>
                </IonCol>
              ))}
            {allLists.length < 1 && (
              <IonCol size="12">
                <h1 className="ion-text-center">You have no task lists.</h1>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <IonFab
          id="add-list"
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          onClick={() =>
            presentAlert({
              header: "CREATE NEW TASK LIST",
              buttons: [
                "Cancel",
                {
                  text: "Add",
                  handler: (data) => {
                    return addTaskList(data.taskInput);
                  },
                },
              ],
              inputs: [
                {
                  name: "taskInput",
                  placeholder: "Name",
                },
              ],
            })
          }
        >
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonList,
  IonItem,
  IonCheckbox,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert,
  useIonAlert,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { add } from "ionicons/icons";
import { useStorage, List, Task } from "../helpers/LocalStore";
import "../theme/variables.css";

//Create interface for URL parameter
interface RouteParams {
  id: string;
}

const TaskList: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  // match.params.id will hold ID of task list
  const { getList, saveList } = useStorage();
  const [presentAlert] = useIonAlert();
  const [list, setList] = useState<List>({
    title: "Default",
    edited: Date.now(),
    deleted: false,
    tasks: [],
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resolvedData: List = await getList(match.params.id);
      setList(resolvedData);
      setTasks(resolvedData.tasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Change checkbox state in copy of list of tasks and replace old
  function changeCheckbox(taskIndex: number) {
    if (taskIndex !== -1) {
      const changedList = { ...list };
      changedList.tasks[taskIndex].done = !changedList.tasks[taskIndex].done;
      changedList.edited = Date.now();
      setTasks(changedList.tasks);
      setList(changedList);
      saveList(match.params.id, changedList);
    }
  }

  // Add task to the list
  function addTask(taskText: string) {
    // Don't add anything if task is empty
    if (taskText.length < 1) {
      return false;
    } else {
      const changedList = { ...list };
      changedList.tasks = [...tasks, { task: taskText, done: false }];
      changedList.edited = Date.now();
      setTasks(changedList.tasks);
      setList(changedList);
      saveList(match.params.id, changedList);
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
          <IonTitle>My tasks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset={true}>
          <IonListHeader lines="full">
            <IonLabel>TO DO</IonLabel>
          </IonListHeader>
          {tasks.map((task, index) =>
            !task.done ? (
              <IonItem key={index}>
                <IonCheckbox
                  checked={task.done}
                  onIonChange={() => changeCheckbox(index)}
                >
                  {task.task}
                </IonCheckbox>
              </IonItem>
            ) : null
          )}
        </IonList>
        <IonList inset={true}>
          <IonListHeader lines="full">
            <IonLabel>COMPLETED</IonLabel>
          </IonListHeader>
          {tasks.map((task, index) =>
            task.done ? (
              <IonItem key={index}>
                <IonCheckbox
                  class="doneTasks"
                  checked={task.done}
                  onIonChange={() => changeCheckbox(index)}
                >
                  {task.task}
                </IonCheckbox>
              </IonItem>
            ) : null
          )}
        </IonList>
        <IonFab
          id="add-task"
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          onClick={() =>
            presentAlert({
              header: "ADD TASK",
              buttons: [
                "Cancel",
                {
                  text: "Add",
                  handler: (data) => {
                    return addTask(data.taskInput);
                  },
                },
              ],
              inputs: [
                {
                  name: "taskInput",
                  placeholder: "Task",
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

export default TaskList;

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
  IonFab, IonFabButton, IonIcon, IonAlert, useIonAlert, IonListHeader, IonLabel,  
} from "@ionic/react";
import React, { useState } from 'react';
import { RouteComponentProps} from 'react-router-dom';
import { add } from 'ionicons/icons';
import './TaskList.css';

//Create interface for URL parameter
interface RouteParams {
  id: string;
}

const TaskList: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => { // match.params.id will hold ID of task list

  // TODO read task list based on ID from storage / database

  // Initialize list of tasks
  const [tasks, setTasks] = useState([{ id: 1, task: 'Task 1', done: false },
  { id: 2, task: 'Task 2', done: false },
  { id: 3, task: 'Task 3', done: false },]);
  // Initialize alert popup
  const [presentAlert] = useIonAlert();
  
  // Change checkbox state in copy of list of tasks and replace old
  function changeCheckbox(taskId: number){
    const newTaskList = [...tasks];
    const index = newTaskList.findIndex(obj => obj.id === taskId);
    if (index !== -1){
      newTaskList[index].done = !newTaskList[index].done;
      setTasks(newTaskList);
    }
  }

  // Add task to the list
  function addTask(taskText: string){
    // Don't add anything if task is empty
    if (taskText.length < 1){
      return false;
    }
    else{
      // Set ID of new task to 0 if list is empty otherwise set it to one more than last task in the list
      if (tasks.length === 0){
        setTasks([...tasks, {id: 0, task: taskText, done: false}]);
      }
      else{
        setTasks([...tasks, {id: tasks.at(-1)!.id+1, task: taskText, done: false}]);
      }
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
          {tasks.map((task) => (
            !task.done ? (
            <IonItem key={task.id}>
              <IonCheckbox checked={task.done} onIonChange={() => changeCheckbox(task.id)}>{task.task}</IonCheckbox>
            </IonItem>) : null
          ))}
        </IonList>
        <IonList inset={true}>
          <IonListHeader lines="full">
            <IonLabel>COMPLETED</IonLabel>
          </IonListHeader>
          {tasks.map((task) => (
            task.done ? (
            <IonItem key={task.id}>
              <IonCheckbox class="doneTasks" checked={task.done} onIonChange={() => changeCheckbox(task.id)}>{task.task}</IonCheckbox>
            </IonItem>) : null
          ))}
        </IonList>
        <IonFab id="add-task" slot="fixed" vertical="bottom" horizontal="end" onClick={() =>
        presentAlert({
          header: 'ADD TASK',
          buttons: ['Cancel', {
            text: 'Add',
            handler: (data) => {
              return addTask(data.taskInput);
            }
          }],
          inputs: [{
            name: 'taskInput',
            placeholder: 'Task',
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

export default TaskList;

import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardTitle className="ion-padding">About the app</IonCardTitle>
          <IonCardContent>
            Welcome to our task app, your ultimate organizer for a more
            efficient and productive life. With our intuitive interface and
            powerful features, you can effortlessly manage your tasks,
            deadlines, and priorities, ensuring nothing falls through the
            cracks. Whether you're juggling work projects, personal goals, or
            household chores, our app is designed to streamline your workflow
            and help you stay on top of your responsibilities. Say goodbye to
            forgotten tasks and hello to newfound productivity with our task
            app.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle className="ion-padding">Contact us</IonCardTitle>
          <IonCardContent>
            <p>Website: www.taskapp.fi</p>
            <a>Email:contact@taskapp.fi</a>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default About;

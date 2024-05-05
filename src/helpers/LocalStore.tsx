import React, { useState } from "react";
import { Storage } from "@ionic/storage";

export interface Task {
  task: string;
  done: boolean;
}

export interface List {
  title: string;
  edited: number;
  tasks: Task[];
}

export function useStorage() {
  const store = new Storage();
  //const [list, setList] = useState();
  store.create();

  const getList = async (id: string) => {
    store
      .get(id)
      .then((value) => {
        console.log("Data from local storage: ", value);
        //setList(value.tasks);
        return value;
      })
      .catch((error) => {
        console.error("Error reading data from local storage:", error);
      });
  };

  const saveList = async (id: string, newList: List) => {
    store
      .set(id, newList)
      .then(() => {
        console.log("Data saved to local storage " + newList.title);
      })
      .catch((error) => {
        console.error("Error saving data to local storage:", error);
      });
  };

  const getAllLists = async () => {
    console.log("All keys of lists " + (await store.keys()));
    let allLists: { id: string; title: any; edited: any }[] = [];
    await store.forEach((value, key) => {
      allLists.push({ id: key, title: value.title, edited: value.edited });
    });
    console.log("Returning array[0] " + allLists[0].title);
    return allLists;
  };

  return { getList, saveList, getAllLists };
}

export default useStorage;

import { Storage } from "@ionic/storage";

export interface Task {
  task: string;
  done: boolean;
}

export interface List {
  title: string;
  edited: number;
  deleted: boolean;
  tasks: Task[];
}

export function useStorage() {
  const store = new Storage();
  store.create();

  const getList = async (id: string) => {
    try {
      const value = await store.get(id);
      return value;
    } catch (error) {
      console.error("Error reading data from local storage:", error);
      return null;
    }
  };

  // Function to save list to local storage
  const saveList = async (id: string, newList: List) => {
    try {
      await store.set(id, newList);
      return true;
    } catch (error) {
      console.error("Error saving data to local storage:", error);
      return null;
    }
  };

  // Function to mark task list deleted and other way around
  const changeState = async (id: string) => {
    const listToChange = await getList(id);
    listToChange.deleted = !listToChange.deleted;
    listToChange.edited = Date.now();
    await saveList(id, listToChange);
    return true;
  };

  // Deletes list from storage
  const deleteList = async (id: string) => {
    await store.remove(id);
    return true;
  };

  // Returns array of all existing (not marked deleted) lists (not of List type)
  const getAllLists = async () => {
    let allLists: { id: string; title: any; edited: any }[] = [];
    await store.forEach((value, key) => {
      if (!value.deleted) {
        allLists.push({ id: key, title: value.title, edited: value.edited });
      }
    });
    return allLists;
  };

  // Returns array of all deleted (not permamently) lists (not of List type)
  const getAllDeletedLists = async () => {
    let allDelLists: { id: string; title: any; edited: any }[] = [];
    await store.forEach((value, key) => {
      if (value.deleted) {
        allDelLists.push({ id: key, title: value.title, edited: value.edited });
      }
    });
    return allDelLists;
  };

  return {
    getList,
    saveList,
    changeState,
    deleteList,
    getAllLists,
    getAllDeletedLists,
  };
}

export default useStorage;

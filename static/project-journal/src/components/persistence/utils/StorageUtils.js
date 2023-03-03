import { invoke } from "@forge/bridge";

//createJournal (instance of Journal object to store data)  -> (setStorage)
//updateJournal (instance of Journal object to store data) -> (setStorage)
//getJournals (list all journals for a project) -> (getStorage)
//getJournalById (accept jounral id and return journal object) -> (getStorage)
//deleteJournalById (delete journal by id) -> (deleteStorage)

export const createJournal = async (name,projectId,id,journals) => {
  await invoke("setStorage", {
    key: projectId,
    // journals:[...journals,{ name, id: id }]
    journals: journals && journals.length
        ? [...journals, { name:name, id: id }]
        : [{ name, id: id }],
  })
};
export const updateJournal = async (name,projectId,id,journals) => {
  const updatedJournals = journals.map((journal) => journal.id === id ? { ...journal, name: name } : journal)
  await invoke("setStorage", {
    key: projectId,
    journals: updatedJournals,
  })
}

export const getJournals = async (projectKey) => {
  const journals = await invoke("getStorage", { key: `${projectKey}` });
  if(journals){
    return journals
  }
  ("No journals",journals)
  return null;
};

export const getJournalById = async (id,projectKey) => {
  const journals = await invoke("getStorage", { key: projectKey });
  const journal = await journals.find((item) => item.id === id);
  return  journal;
};

export const deleteJournalById = async (id,projectKey) => {
  const journals = await invoke("getStorage", { key: projectKey });
  const journal = journals.filter((item) => item.id !== id);
  await invoke("setStorage", { key: projectKey, journals: journal });
};


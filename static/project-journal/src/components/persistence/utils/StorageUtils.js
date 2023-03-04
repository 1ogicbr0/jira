import { invoke } from "@forge/bridge";

export const createJournal = async (name, projectKey, id, journals) => {
  await invoke("setStorage", {
    key: `${projectKey}`,
    // journals:[...journals,{ name, id: id }]
    journals:
      journals && journals.length
        ? [...journals, { name: name, id: id, projectKey: projectKey }]
        : [{ name, id: id }],
  });
};
export const updateJournal = async (name, projectKey, id, journals) => {
  const updatedJournals = journals.map((journal) =>
    journal.id === id ? { ...journal, name: name } : journal
  );
  await invoke("setStorage", {
    key: projectKey,
    journals: updatedJournals,
  });
};

export const getJournals =  (projectKey) => invoke("getStorage", { key: `${projectKey}` }).then((journals) => journals)

export const getJournalById = async (id, projectKey) => {
  const journals = await invoke("getStorage", { key: projectKey });
  const journal = await journals.find((item) => item.id === id);
  return journal;
};

export const deleteJournalById = async (id, projectKey) => {
  const journals = await invoke("getStorage", { key: projectKey });
  const journal = journals.filter((item) => item.id !== id);
  await invoke("setStorage", { key: projectKey, journals: journal });
};

import { createJournal, getJournals, updateJournal } from "../utils/StorageUtils";

const ProjectJournal = async(name, id, projectKey,update) => {
//get all journals for a project

let journals = await getJournals(projectKey)

if(update){
  updateJournal(name,projectKey,id,journals)
}else{
  createJournal(name,projectKey,id,journals)
}

}

export default ProjectJournal;
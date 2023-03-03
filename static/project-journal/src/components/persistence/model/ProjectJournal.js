import { createJournal, getJournals, updateJournal } from "../utils/StorageUtils";

const ProjectJournal = async(name, id, projectId,update) => {
//get all journals for a project
console.log("KEY",projectId)

let journals = await getJournals(projectId)

if(update){
  updateJournal(name,projectId,id,journals).then(() => console.log("Journal updated"))
}else{
  createJournal(name,projectId,id,journals).then(() => console.log("Journal created"))

}
// if(journals){
// console.log("JOURNALS", journals)
  // createJournal(name,projectId,id,journals)
// }else{
  // createJournal(name,projectId,id)
// }
 journals = await getJournals(projectId)
 console.log("New", journals)
}

export default ProjectJournal;
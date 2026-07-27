// hello smit
const theme = document.querySelector("#Theme");
const createTask = document.querySelector("#create-task");
const closeForm = document.querySelector("#closeForm");
const form = document.querySelector(".form");
const formDoc = document.querySelector("form");
const rightDiv = document.querySelector("#right");

const taskARR = [];
let updateInd = null;
theme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
createTask.addEventListener("click", () => {
  form.style.display = "flex";
});
closeForm.addEventListener("click", () => {
  form.style.display = "none";
});
formDoc.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target[1].value;
  const description = e.target[2].value;
  const categery = e.target[3].value;
  const status = e.target[4].value;

  let obj = {
    title,
    description,
    categery,
    status,
  };
  if (updateInd !== null) {
    taskARR[updateInd] = obj;
    updateInd =null
  } else {
    taskARR.push(obj);
  }

  renderUI();
  formDoc.reset();
  form.style.display = "none";
});

const renderUI = () => {
  rightDiv.innerHTML = "";
  taskARR.forEach((elem, ind) => {
    rightDiv.innerHTML += `<div class="notes">
          <h3>${elem.title}</h3>
          <p>${elem.description}</p>
          <div class="button">
            <div<button>${elem.categery}</button> <button>${elem.status}</button></div>
            <div><button onclick = "updateNote(${ind})">Edit</button> <button onclick="deleteNote(${ind})">Delete</button></div>
          </div>
        </div>`;
  });
};

const updateNote = (ind) => {
  form.style.display = "flex";
  const updateNOTE = taskARR[ind];
  updateInd = ind;
  formDoc[1].value = updateNOTE.title;
  formDoc[2].value = updateNOTE.description;
  formDoc[3].value = updateNOTE.categery;
  formDoc[4].value = updateNOTE.status;
  //  taskARR[updateInd] =  updateNOTE
};

const deleteNote = (ind)=>{
taskARR.splice(ind,1)
renderUI()
}
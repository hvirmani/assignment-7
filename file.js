let user = {};
let form = document.getElementById("form");
let getName = document.getElementById("getName");
let getEmail = document.getElementById("getEmail");
let getNumber = document.getElementById("getNumber");
let resume = document.getElementById("resume");

let submit = document.getElementById("submit");
let course = document.getElementById("course");
let stream = document.getElementById("stream");
let begYear = document.getElementById("begYear");
let endYear = document.getElementById("endYear");

let projectTitle = document.getElementById("title");
let projectDescription = document.getElementById("description");
let skill = document.getElementById("skill");

let addQualification = document.getElementById("addQualification");
let qualificationList = document.getElementById("qualification");

let addProject = document.getElementById("addProject");
let projectList = document.getElementById("projects");

let setName = document.getElementById("setName");
let setQualification = document.getElementById("setQualification");
let setProjects = document.getElementById("setProjects");
let setEmail = document.getElementById("setEmail");
let setPhone = document.getElementById("setPhone");

let current = 0;
let k = 0;
let c = 0;
let arr1 = [];
let arr2 = [];

let deleteElement = (arr, key) => {
  arr.forEach((element, index) => {
    if (element.key == key) {
      arr.splice(index, 1);
    }
  });
};

let deleteNode = (node) => {
  node.parentElement.removeChild(node);
};

let validate = (element) => {
  if (element.length < 4) {
    return true;
  }
  return false;
};

addQualification.addEventListener("click", () => {
  if (
    validate(course.value) ||
    validate(stream.value) ||
    validate(begYear.value) ||
    validate(endYear.value)
  ) {
    alert("Check filled data again");
    return;
  }
  let data = {
    course: course.value,
    stream: stream.value,
    begYear: begYear.value,
    endYear: endYear.value,
    key: k++,
  };
  let text = `${data.course} in ${data.stream} from ${data.begYear}-${data.endYear}`;
  let td = document.createElement("td");
  let tr = document.createElement("tr");

  let edit = document.createElement("button");
  edit.className = "btn btn-warning";
  edit.innerHTML = "edit";
  edit.addEventListener("click", (event) => {
    course.value = data.course;
    stream.value = data.stream;
    begYear.value = data.begYear;
    endYear.value = data.endYear;
    deleteNode(event.target.parentElement.parentElement);
    deleteElement(arr1, data.key);
  });

  let remove = document.createElement("button");
  remove.className = "btn btn-danger";
  remove.innerHTML = "delete";
  remove.addEventListener("click", (event) => {
    deleteNode(event.target.parentElement.parentElement);
    deleteElement(arr1, data.key);
  });

  td.innerHTML = text;
  td.appendChild(edit);
  td.appendChild(remove);
  tr.appendChild(td);
  qualificationList.appendChild(tr);
  arr1.push(data);
  course.value = "";
  stream.value = "";
  begYear.value = "";
  endYear.value = "";
});

addProject.addEventListener("click", () => {
  if (validate(projectTitle.value) || validate(projectDescription.value)) {
    alert("Check filled data again!");
    return;
  }
  let td = document.createElement("td");
  let tr = document.createElement("tr");

  let data = {
    title: projectTitle.value,
    description: projectDescription.value,
    key: c++,
  };
  let text = `${data.title}: ${data.description}`;

  let edit = document.createElement("button");
  edit.className = "btn btn-warning";
  edit.innerHTML = "edit";
  edit.addEventListener("click", (event) => {
    console.log(data);
    projectTitle.value = data.title;
    projectDescription.value = data.description;
    deleteNode(event.target.parentElement.parentElement);
    deleteElement(arr2, data.key);
  });

  let remove = document.createElement("button");
  remove.className = "btn btn-danger";
  remove.innerHTML = "delete";
  remove.addEventListener("click", (event) => {
    deleteNode(event.target.parentElement.parentElement);
    deleteElement(arr2, data.key);
  });

  td.innerHTML = text;
  td.appendChild(edit);
  td.appendChild(remove);
  tr.appendChild(td);
  projectList.appendChild(tr);
  arr2.push(data);
  projectTitle.value = "";
  projectDescription.value = "";
  skill.value = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    validate(getName.value) ||
    validate(getEmail.value) ||
    validate(getNumber.value)
  ) {
    alert("Check filled data again!");
  }
  user = {
    name: getName.value,
    email: getEmail.value,
    phone: getNumber.value,
    qualification: arr1,
    projects: arr2,
  };

  setName.innerHTML = user.name;
  setEmail.innerHTML = user.email;
  setPhone.innerHTML = `Phone: ${user.phone}`;

  user.qualification.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = `${element.course} in ${element.stream} from ${element.begYear}-${element.endYear}`;
    let remove = document.createElement("a");
    remove.innerHTML = "X";
    remove.addEventListener("click", (event) => {
      deleteNode(event.target.parentElement);
    });

    li.appendChild(remove);
    setQualification.appendChild(li);
  });

  user.projects.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = `${element.title}: ${element.description}`;

    let remove = document.createElement("a");
    remove.innerHTML = "X";
    remove.addEventListener("click", (event) => {
      deleteNode(event.target.parentElement);
    });

    li.appendChild(remove);
    setProjects.appendChild(li);
  });

  getName.value = "";
  getEmail.value = "";
  getNumber.value = "";
  qualificationList.innerHTML = "";
  projectList.innerHTML = "";
  course.value = "";
  stream.value = "";
  begYear.value = "";
  endYear.value = "";
  projectTitle.value = "";
  projectDescription.value = "";
  skill.value = "";

  resume.style.display = "flex";
  console.log(user);
  user = {};
  arr1 = [];
  arr2 = [];
});

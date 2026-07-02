const API_URL = "http://localhost:3000/api/allworkers";
const workergrid = document.getElementById("workersGrid");

async function loadworkers() {
  try {
    const response = await fetch(API_URL);
    const workers = await response.json();
    console.log(workers);
    renderWorkers(workers);
  } catch (error) {
    console.log("error");
  }
}

function renderWorkers(worker) {
  if (worker.length === 0) {
    `<P>workergrid.innerHTML = No valid data in DB</P>`;
  }
  workergrid.innerHTML = worker
    .map(
      (worker) =>
        `
        <tr>
          <td><input type="checkbox" class="checkbox-col" /></td>
          <td>
            <div class="worker-cell">
              <div class="worker-info">
                <span class="W-name">${worker.name}</span>
                <span class="W-email">${worker.email}</span>
              </div>
            </div>
          </td>
          <td>${worker.department}</td>
          <td>${worker.role}</td>
          <td>0${worker.phone}</td>
          <td>
            <div class="action-buttons">
              <button class="delbtn" onclick="deleteWorker('${worker._id}')">
                <span class="btnspan del">Delete</span>
              </button>
            </div>
          </td>
        </tr>
        `,
    )
    .join("");
}

async function deleteWorker(id) {
  try {
    const response = await fetch(`${API_URL}/deleteworker/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Worker deleted successfully");
      await loadworkers();
    }
  } catch (error) {
    console.log("error deleting worker!", error);
  }
}

async function initworkerform() {

  const formcont = document.getElementById("form-container");
  const openformbtn = document.getElementById("showFormBtn");
  const closeformbtn = document.getElementById("closeformbtn");
  const newworkerform = document.getElementById("newworkerform");
    newworkerform.addEventListener("submit", formsubmit);

  if (!formcont || !openformbtn || !closeformbtn || !newworkerform) {
    console.error("Form DOM elements missing. Check your HTML layout IDs.");
    return;
  }

  // Open pop-up view modal
  openformbtn.addEventListener("click", () => {
    if (formcont.classList.contains("hidden")) {
        
        formcont.classList.remove("hidden");
    } else {
        formcont.classList.add("hidden");
        newworkerform.reset();
    }    
  });

  // Close Form Modal (Add the hidden class back)
  closeformbtn.addEventListener("click", () => {
    formcont.classList.add("hidden");
    newworkerform.reset(); // Clear input data fields safely
  });


}

async function formsubmit(event) {
  event.preventDefault();

  const formcont = document.getElementById("form-container");
  const newworkerform = document.getElementById("newworkerform");

  const newWorkerData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone number").value,
    department: document.getElementById("department").value,
    role: document.getElementById("worker role").value,
  };

  try {
    const response = await fetch(`${API_URL}/createworker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkerData),
    });

    if (response.ok) {
      formcont.classList.add("hidden");
      newworkerform.reset();
      await loadworkers();
    } else {
      const errdata = await response.json();
      console.error("Failed to save worker entry");
    }
  } catch (error) {
    console.error("Error adding worker:", error);
  }
}

loadworkers();
initworkerform();

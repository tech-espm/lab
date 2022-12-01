class FetchService {
  constructor() {}

  async performGetHttpRequest(fetchLink, headers, query = null) {
    if (!fetchLink || !headers) {
      throw new Error("One or more GET request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "GET",
        headers: headers,
        query: query != null ? query : "",
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      console.error(`Error at fetch GET: ${err}`);
      throw err;
    }
  }

  async performPostHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
      throw new Error("One or more POST request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "POST",
        headers: headers,
        body: body,
      });
      return JSON.stringify(rawResponse);
    } catch (err) {
      console.error(`Error at fetch POST: ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async performDeleteHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers) {
      throw new Error("One or more DELETE request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(`${fetchLink}/${body.personId}`, {
        method: "DELETE",
      });
      return JSON.stringify(rawResponse);
    } catch (err) {
      console.error(`Error at fetch DELETE: ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async performPutHttpRequest(fetchLink, headers, body) {
    if (!fetchLink || !headers || !body) {
      throw new Error("One or more POST request parameters was not passed.");
    }
    try {
      const rawResponse = await fetch(fetchLink, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      console.error(`Error at fetch PUT: ${err}`);
      throw err;
    }
  }
}

const fetchService = new FetchService();

const getUrl = (hasFile = false) => {
  const baseUrl = `https://687c-191-205-217-33.ngrok.io/person`;
  return hasFile ? `${baseUrl}/batch` : baseUrl;
};

async function submitForm(e, form) {
  e.preventDefault();
  const btnSubmit = document.getElementById("btnSubmit");
  btnSubmit.disabled = true;
  setTimeout(() => (btnSubmit.disabled = false), 2000);
  console.log(new FormData(form).get("file").size);
  const hasFile = Boolean(new FormData(form).get("file").size);
  const { request, headers } = buildRequest(
    form,
    hasFile ? "MultiPart" : "Json"
  );

  const response = await fetchService.performPostHttpRequest(
    getUrl(hasFile),
    headers,
    request
  );

  if (response) window.location = `/front/peoples.html`;
  else alert(`An error occurred.`);
}

function buildHeaders(type) {
  return type === "Json" ? { "Content-Type": "application/json" } : {};
}

function buildMultiPartFormData(form) {
  let formDataReq = new FormData(form);
  console.log(formDataReq.get("file"));
  return formDataReq;
}

function buildJsonFormData(form) {
  const jsonFormData = {};
  for (const pair of new FormData(form)) {
    jsonFormData[pair[0]] = pair[1];
  }
  return JSON.stringify(jsonFormData);
}

const buildRequest = (form, type) => {
  if (type === "MultiPart") {
    const request = buildMultiPartFormData(form);
    const headers = buildHeaders("MultiPart");
    return { request, headers };
  } else {
    const headers = buildHeaders("Json");
    const request = buildJsonFormData(form);
    return { request, headers };
  }
};

const sampleForm = document.querySelector("#student-form");
if (sampleForm) {
  sampleForm.addEventListener("submit", function (e) {
    submitForm(e, this);
  });
}

const uploadFile = document.querySelector("#file");
if (uploadFile) {
  uploadFile.addEventListener("change", function (e) {
    console.log("change");
    const studentForm = document.querySelector("#student-info");
    if (e.target.value) {
      studentForm.classList.add("hide");
    } else {
      studentForm.classList.remove("hide");
    }
  });
}

const handleDeleteClick = async (id) => {
  console.log(id);
  await fetchService.performDeleteHttpRequest(getUrl(), {}, { personId: id });
  console.log("acabou");
  window.location.reload();
};

window.onload = async (event) => {
  console.log("page is fully loaded");
  if (!window.location.pathname.includes("peoples")) return;
  const peopleRes = await fetchService.performGetHttpRequest(getUrl(), {});
  htmlString = "";
  peopleRes.forEach((p, idx) => {
    htmlString += `<div class="item">
    <div class="full-name">${p.name}</div>
    <div class="birthday">${new Date(p.birthDate).getDate()}/${new Date(
      p.birthDate
    ).getMonth()}/${new Date(p.birthDate).getFullYear()}</div>
    <div class="email">${p.email}</div>
    <div class="semester">${p.grade}</div>
    <div class="ra">RA ${p.studentId}</div>
    <div class="salary">R$ ${p.salary}</div>
    <div class="del-btn" id=del-btn-${idx} >X</div>
  </div>`;
  });
  document.getElementById("people-list").innerHTML = htmlString;

  peopleRes.forEach(
    (p, idx) =>
      (document.getElementById(`del-btn-${idx}`).onclick = (e) =>
        handleDeleteClick(p.personId))
  );
};

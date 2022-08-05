// handle register/login button events
document.querySelector("#regForm button").addEventListener("click", doRegister);

document.querySelector("#logForm button").addEventListener("click", doLogin);

// create user object from regForm data
function doRegister(event) {
    // event.preventDefault();
    let em = document.querySelector("#regForm .email").value;
    let pass = document.querySelector("#regForm .pass").value;
    // TODO: add form validation
    let user = { email: em, password: pass };
    let endpoint = "register";
    sendData(user, endpoint, registerSuccess);
}

// create user object from logForm data
function doLogin(event) {
    let em = document.querySelector("#logForm .email").value;
    event.preventDefault();
    let pass = document.querySelector("#logForm .pass").value;
    // TODO: add form validation
    let user = { email: em, password: pass };
    let endpoint = "login";
    sendData(user, endpoint, loginSuccess);
}

// fetch post request to server
function sendData(user, endpoint, callback) {
    // TODO: switch to mongodb
    let url = `http://localhost:3333/${endpoint}`;
    let h = new Headers();
    h.append("Content-Type", "application/json");
    let req = new Request(url, {
        method: "post",
        headers: h,
        body: JSON.stringify(user),
    });
    fetch(req)
        .then((res) => res.json())
        .then((content) => {
            // response
            if ("error" in content) {
                // failed attempt
                failure(content.error);
            }
            if ("data" in content) {
                // successful attempt
                callback(content.data);
            }
        })
        .catch(failure);
}

function registerSuccess(data) {
    console.log("register success", data);
}

function loginSuccess(data) {
    console.log("login token", data.token);
    // TODO: store token in local/session storage
}

function failure(err) {
    if (err.code) {
        console.warn(err.code, err.message);
    }
}

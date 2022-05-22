var arr = [];
arr.push("C1001", "C1002", "P4301");
var memoryLimits = {};
memoryLimits["C1001"] = 1048576;
memoryLimits["C1002"] = 131072000;
memoryLimits["P4301"] = 131072000;


var timeLimits = {};
timeLimits["C1001"] = 10;
timeLimits["C1002"] = 1000;
timeLimits["p4301"] = 500;

function toPage(x) {
    var a = document.getElementById("page");
    switch (x) {
        case 0:
            {
                a.style.left = "0";
                a.style.top = "0";
                break;
            }
        case 1:
            {
                a.style.left = "-1400px";
                a.style.top = "0";
                break;
            }
        case 2:
            {
                a.style.left = "0";
                a.style.top = "-750px";
                break;
            }
        case 3:
            {
                a.style.left = "-1400px";
                a.style.top = "-750px";
                break;
            }
    }
}


function jump() {
    var jmp = document.getElementById("jump").value;
    var str = "./cakes/" + jmp + "/" + jmp + ".html";
    for (var i in arr)
        if (arr[i] == jmp) {
            window.location.assign(str);
            return;
        }
    window.alert("invalid number of the question");
}

function ranJump() {
    var number = Math.floor(Math.random() * arr.length);
    window.location.assign("./cakes/" + arr[number] + "/" + arr[number] + ".html");
}

function displayQuestions(x) {
    var questionArray = [];
    questionArray.push(document.getElementById("easy"), document.getElementById("normal"), document.getElementById("hard"), document.getElementById("sets"));
    if (questionArray[x].style.display == "none") {
        questionArray[x].style.display = "block";
    } else {
        questionArray[x].style.display = "none";
    }
}

function displayLogInAndRegister() {
    var m = document.getElementById("log-in-form");
    var n = document.getElementById("register-form");
    var p = document.getElementById("log-in-button");
    var q = document.getElementById("register-button");
    if (m.style.display == "none") {
        m.style.display = "block";
        n.style.display = "none";
        p.style.color = "#66f";
        q.style.color = "rgb(185, 223, 255)";
    } else {
        m.style.display = "none";
        n.style.display = "block";
        p.style.color = "rgb(185, 223, 255)";
        q.style.color = "#66f";
    }
}


function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function validateForm(formName) {
    var name = document.forms[formName]["username"].value;
    var password = document.forms[formName]["password"].value;
    if (name == null || name == "") {
        alert("required username");
        return false;
    }
    if (name[0] < "A" || name[0] > "Z" && name[0] < "a" || name[0] > "z") {
        alert("user name must begin with a letter");
        return false;
    }
    if (name.length > 16) {
        alert("user name is too long");
        return false;
    }
    if (password == null || password.length < 8) {
        alert("password is too short");
        return false;
    }
    if (password.length > 16) {
        alert("password is too long");
        return false;
    }
    for (var i = 0; i < password.length; i++) {
        if (!(password[i] >= '0' && password[i] <= '9' || password[i] >= 'A' && password[i] <= 'Z' || password[i] >= 'a' && password[i] <= 'z')) {
            alert("The password can only contain letters and numbers");
            return false;
        }
    }
    if (formName == "registerForm") {
        var passwordCopy = document.forms[formName]["password"].value;
        if (passwordCopy != password) {
            alert("The passwords entered twice are inconsistent!");
            return false;
        }
    }
    return true;
}

function submit(x) {
    if (!localStorage.getItem("codebakerOJUserName")) {
        alert("please log in!");
        return;
    }
    var token = localStorage.getItem("codebakerOJUserName") + "&&" + generateUUID();
    var dataAddress = "/cakes/" + x + "/" + x + "data.zip";
    var language = document.getElementById("language").value;
    var userCode = document.getElementById("usercode").value;
    var args = "";
    var meta = {
        memory: memoryLimits[x],
        time: timeLimits[x]
    };
    userCode = BASE64.encode(userCode);
    var submitJson = {
        token: token,
        dataAddress: dataAddress,
        language: language,
        userCode: userCode,
        args: args,
        meta: meta
    }
    var submitJSON = JSON.stringify(submitJson);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                var parent = document.getElementById("testPoint");
                var obj = JSON.parse(xmlHttp.responseText);
                for (var i in obj.testPoint) {
                    var child = document.createElement("div");
                    var status = document.createElement("p");
                    status.innerHTML = obj.testPoint[i].status;
                    status.style.padding = "10px auto";
                    status.style.fontSize = "32px";
                    status.style.color = "#fff";
                    status.appendChild(child);
                }
            }
        }
    }
    xmlHttp.open("POST", "", true);
    xmlHttp.setRequestHeader('Content-Type', 'text/plain;charset=utf-8');
    xmlHttp.send(submitJSON);
    document.getElementById("test").innerHTML = submitJSON;
}
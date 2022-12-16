export function formatNumber(num) {

    let formated = "";

    let splited = num.toString().split(".", 2);

    formated += String(splited[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (!!splited[1]) {

        formated += "," + splited[1];

        if (splited[1].length === 1) {
            formated += "0";
        }

    }

    return formated;

}

export function formatDate(date) {
    var splitted = date.split("/");
    return splitted[2] + "/" + splitted[0] + "/" + splitted[1];
}
export function calculateReward(reward, amount) {
    reward = reward + amount * 0.0004;
    return reward;
}

export function getCardBrand(number) {
    let prefix = number.slice(0, 2)
    let visa = 'visa'
    let amex = 'amex'
    let mastercard = 'mastercard'
    if (prefix > 39 && prefix < 50) {
        return visa;
    } else if (prefix > 50 && prefix < 56) {
        return mastercard;
    } else if (prefix === "34" || prefix === "37") {
        return amex;
    }
}

export function getPositionX(e) {
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        return touch.pageX;
    } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
        return e.clientX;
    }
}

export function removeSeveralSpace(value) {
    return value.toString().replace(/ +(?= )/g, '');
}

export function generateCompleteVersion(brand, model, version) {
    if (!!brand && !!model && !!version) {
        return version.indexOf(model) >= 0 ? brand + " " + version : brand + " " + model + " " + version;
    }
}

export function randomColor() {

    let number = Math.floor(Math.random() * 4);

    let value = "bg-pink text-pink";

    switch (number) {
        case 0:
            value = "bg-pink text-pink";
            break;

        case 1:
            value = "bg-red text-red1";
            break;
        case 2:
            value = "bg-yellow text-yellow1";
            break;
        case 3:
            value = "bg-orange text-orange";
            break;
    }

    return value;

}

export function insurerLogo(id) {

    return "https://poolpo.in/images/brands/" + id + ".png"

}

export function checkDNI(dni) {
    return dni.match(/^\d+$/) && (dni.length === 7 || dni.length === 8);
}

export function checkEmail(email) {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function checkPatent(patent) {
    return patent.match((/[a-z]{3}[\d]{3}/i)) || patent.match((/[a-z]{2}[\d]{3}[a-z]{2}/i));
}

export function checkAge(age) {
    return Number(age) >= 17 && Number(age) <= 99;
}

export function checkName(name) {
    return !!name && name.length !== 0;
}
export function checkBlank(cell) {
    return Number(cell) >= 5 && Number(cell);
}

export function setUserData(leadID, VehicleID, GroupID, name) {
    localStorage.setItem('LeadID', leadID);
    localStorage.setItem('VehicleID', VehicleID);
    localStorage.setItem('GroupID', GroupID);
    localStorage.setItem('Name', name);
}

export function getHash() {
    var originalData = localStorage.getItem("LeadID");
    if (!!originalData) {
        return originalData;
    } else {
        let randomString = Date.now().toString(36) + Math.random().toString(36).substring(2);
        let newHash = randomString.slice(0, 16);
        localStorage.setItem("LeadID", newHash);
        return newHash;
    }
}

export function checkPatentMoto(patent) {
    return patent.match((/[a-z]{1}[\d]{3}[a-z]{3}/i));
}

export function splitInput(input) {

    var input_modified = removeSeveralSpace(input.trim());

    var input_array = input_modified.split(" ");

    var brand_ = input_array[0];
    var group_ = "";

    if(input_array.length >= 2) {

        var index;
        for(index = 1 ; index <= input_array.length - 1 ; index ++) {
            group_ += " " + input_array[index];
        }

    }

    brand_ = brand_.toUpperCase();
    group_ = group_.trim().toUpperCase();

    return { brand: brand_, group: group_ };

}

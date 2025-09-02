
const usersProfiles = [];
const PREFIX = 'bm:';
const withPrefix = (key) => PREFIX + key;


function saveToStorage(key, data) {
    localStorage.setItem(withPrefix(key), JSON.stringify(data));
    usersProfiles.push(data)
    // console.log(usersProfiles);
}

function getFromStorage(key) {
    const data = localStorage.getItem(withPrefix(key));
    return data ? JSON.parse(data) : null;
};

function removeFromStorage(key) {

};

export {saveToStorage, getFromStorage, removeFromStorage, usersProfiles};
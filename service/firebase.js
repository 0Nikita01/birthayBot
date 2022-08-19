const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue} = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDIbA0GX81Y-4f7kK_mgcoT1PpltKWvz1A",
    authDomain: "birthdaybot-57be3.firebaseapp.com",
    projectId: "birthdaybot-57be3",
    storageBucket: "birthdaybot-57be3.appspot.com",
    messagingSenderId: "98097526794",
    appId: "1:98097526794:web:76bc027aaff7bb026187f3"
};

module.exports = class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
    }

    getDataSocket = (path, cb) => {
        const reference = ref(this.database, path);
        
        onValue(reference, (snapshot) => {
            cb(snapshot.val());
        })
    }

    postData = (path, data) => {
        set(ref(this.database, path), data);
	}

    getDataOnce = async (key) => {
        return await this.database.ref(`data/${key}/usersdata/`).once('value').then(snapshot => snapshot.val());
    }
}

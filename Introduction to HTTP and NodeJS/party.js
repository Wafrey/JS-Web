class Party {
    constructor(name, details) {
        this.parties = {};

        this.parties[name] = {
            details,
        };
    }

    signUp(name, cb) {
        this.parties[name].people.push(cb);
    }

    notify() {
        for (const party in this.parties) {
            this.parties[party].people[0](new Date());
        }
    }
}

const birthdayParty = new Party('birthday', '8 pm');

birthdayParty.signUp('birthday', (details) => {
    console.log(details);
});

birthdayParty.signUp('birthday', (details) => {
    console.log(details);
});

birthdayParty.notify();
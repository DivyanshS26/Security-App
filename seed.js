const Secutrity = require('./models/Security')

const person = [
    {
        name: 'Divyansh',
        phone: '9283112478',
        email: 'div@abc.com'
    },
    {
        name: 'David',
        phone: '9234122798',
        email: 'dav@abc.com'
    },
    {
        name: 'Matthew',
        phone: '9286542478',
        email: 'mat@abc.com'
    }
]

const seedDB = async () => {
    await Secutrity.deleteMany({});
    await Secutrity.insertMany(person);
    console.log('Db seeded');
}

module.exports = seedDB;
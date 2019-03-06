(function () {

    const getRandom = (num,min=0) => Math.floor(Math.random()*num) + min;

    const getFirtsName = () => {
        const names = ['Andre','Ronald','Lauren','Liana','Jaelyn','Lexie','Felicia','Carla','Deshaun'];
        return names[getRandom(names.length)];
    };

    const getLastName = () => {
        const lastNames = ['Ziegler','Black','OKeefe','Doyle','Gibbs','Wagner','Meredith','Anderson'];
        return lastNames[getRandom(lastNames.length)];
    };

    const getPhone = () => {
        let number  = getRandom(90000000000,10000000000);
        number +='';
        let [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11] = number;
        return `+${a1} (${a2}${a3}${a4}) ${a5}${a6}${a7} - ${a8}${a9}${a10}${a11}` ;
    };

    const getZip = () => getRandom(900000,100000);


    function Person (firstName,lastName,phoneNumber,zipCode) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.zipCode = zipCode;
        }
    const countPerson = 30;
    const phoneBook = [];
    for (let i  = 0; i<countPerson;i++) {
        phoneBook.push(new Person(getFirtsName(),getLastName(),getPhone(),getZip()))
    }

    const templateRow= document.getElementById('table-row');
    const table = document.querySelector('.phone-book__table');

    phoneBook.forEach( (person) => {
        let newRow = templateRow.content.cloneNode(true);
        let allFields = newRow.querySelectorAll('.phone-book__cell');
        allFields[0].textContent = person.firstName;
        allFields[1].textContent = person.lastName;
        allFields[2].textContent = person.phoneNumber;
        allFields[3].textContent = person.zipCode;

        table.appendChild(newRow);

    });
})();
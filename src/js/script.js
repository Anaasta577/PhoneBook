function getRandom(num, min) {
    return typeof min === "undefined" ? Math.floor(Math.random() * num)
        : Math.floor(Math.random() * num) + min;
}

function getFirtsName() {
    var names = ['Andre', 'Ronald', 'Lauren', 'Liana', 'Jaelyn', 'Lexie', 'Felicia', 'Carla', 'Deshaun'];
    return names[getRandom(names.length)];
};

function getLastName() {
    var lastNames = ['Ziegler', 'Black', 'OKeefe', 'Doyle', 'Gibbs', 'Wagner', 'Meredith', 'Anderson'];
    return lastNames[getRandom(lastNames.length)];
};

function getPhone() {
    return '+ ' + getRandom(999,1) + '(' + getRandom(900, 100) + ')' + ' ' +getRandom(900,100) +'-'+ getRandom(9000,1000);
};

function getZip() {
   return getRandom(900000, 100000);
}


function Person(firstName, lastName, phoneNumber, zipCode) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.zipCode = zipCode;
}

var countPerson = 100;
var phoneBook = [];
for (var i = 0; i < countPerson; i++) {
    phoneBook.push(new Person(getFirtsName(), getLastName(), getPhone(), getZip()))
}

var table = document.querySelector('.phone-book');
var tableContent = document.createDocumentFragment();
phoneBook.forEach(function (person) {
    var templateRow = document.createElement("tr");
    templateRow.className = "phone-book__row";
    templateRow.innerHTML =
        '<td class="phone-book__cell">' + person.firstName + '</td>' +
        '<td class="phone-book__cell">' + person.lastName + '</td>' +
        '<td class="phone-book__cell">' + person.phoneNumber + '</td>' +
        '<td class="phone-book__cell">' + person.zipCode + '</td>';
    console.log(templateRow);
    tableContent.appendChild(templateRow);
});

table.appendChild(tableContent);

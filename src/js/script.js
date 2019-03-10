(function () {
    function getRandom(num, min) {
        return min ? Math.floor(Math.random() * num) + min
            : Math.floor(Math.random() * num);
    };

    function getFirtsName() {
        var names = ['Andre', 'Ronald', 'Lauren', 'Liana', 'Jaelyn', 'Lexie', 'Felicia', 'Carla', 'Deshaun'];
        return names[getRandom(names.length)];
    };

    function getLastName() {
        var lastNames = ['Ziegler', 'Black', 'OKeefe', 'Doyle', 'Gibbs', 'Wagner', 'Meredith', 'Anderson'];
        return lastNames[getRandom(lastNames.length)];
    };

    function getPhone() {
        return '+ ' + getRandom(999, 1) + '(' + getRandom(900, 100) + ')' + ' ' + getRandom(900, 100) + '-' + getRandom(9000, 1000);
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

    var pageControl = {
        countPerson: 100,
        tempPage: 1,
        phoneBook: [],
        createPhoneBook: function () {
            for (var i = 0; i < pageControl.countPerson; i++) {
                this.phoneBook.push(new Person(getFirtsName(), getLastName(), getPhone(), getZip()))
            }
        },

        getCountRowsOnPage: function () {
            var clientHeight = document.documentElement.clientHeight;
            var rowHeight = document.querySelector('.phone-book__cell').clientHeight;
            return Math.floor((clientHeight - 82 - 53 - 37 - 30) / rowHeight);
        },

        getCountPages: function () {
            return Math.ceil(this.countPerson / this.getCountRowsOnPage());
        },

        getContentForPage: function () {
            return this.phoneBook.slice((this.tempPage - 1) * this.getCountRowsOnPage(), (this.tempPage - 1) * this.getCountRowsOnPage() + this.getCountRowsOnPage());
        },

        setTempPage:function (num) {
            this.tempPage = num;
        }
    };

    pageControl.createPhoneBook();

    var buttonsContent =  [1, 2, 3, 4];
    var tempButton = 1;
    var buttons = document.querySelectorAll('.navigation__link');

    var  updateButtonsContent = function () {
        for (var i = 0; i < buttonsContent.length; i++) {
            if (buttonsContent[i] === tempButton) {
                buttons.forEach(function (button) {
                    button.classList.remove('navigation__link--active');
                });
                buttons[i + 1].classList.add('navigation__link--active');
            }
        }

        buttonsContent.forEach(function (item, index) {
            buttons[index + 1].textContent = item;
        });
    };
    var showContent = function () {
        var table = document.querySelector('.phone-book');
        var tableContent = document.createDocumentFragment();
        pageControl.getContentForPage().forEach(function (person) {
            var templateRow = document.createElement("tr");
            templateRow.className = "phone-book__row";
            templateRow.innerHTML =
                '<td class="phone-book__cell">' + person.firstName + '</td>' +
                '<td class="phone-book__cell">' + person.lastName + '</td>' +
                '<td class="phone-book__cell">' + person.phoneNumber + '</td>' +
                '<td class="phone-book__cell">' + person.zipCode + '</td>';
            tableContent.appendChild(templateRow);
        });
        table.innerHTML = '<tr class="phone-book__row--title">\n' +
            '                <th class="phone-book__cell phone-book__cell--title">First name</th>\n' +
            '                <th class="phone-book__cell phone-book__cell--title">Last name</th>\n' +
            '                <th class="phone-book__cell phone-book__cell--title">Phone number</th>\n' +
            '                <th class="phone-book__cell phone-book__cell--title">ZIP-code</th>\n' +
            '            </tr>';
        table.appendChild(tableContent);
    };



    var onClickButtonHandler = function (evt) {

        if ((evt.target.id === 'button_previous') || (evt.target.id === 'button_next')) {
            var shiftDirection = 0;
            switch (evt.target.id) {
                case 'button_previous' :
                    shiftDirection = -1;
                    if (tempButton > 1) {
                        tempButton += shiftDirection;
                    }
                    break;
                case 'button_next' :
                    shiftDirection = 1;
                    if (tempButton < pageControl.getCountPages()) {
                        tempButton += shiftDirection;
                    }
                    break;
            }

            if (buttonsContent.indexOf(tempButton) === -1) {
                for (var i = 0; i < buttonsContent.length; i++) {
                    buttonsContent[i] += shiftDirection;
                }
            }

        }
        else {
            tempButton = +evt.target.textContent;
        }

        pageControl.setTempPage(tempButton);
        updateButtonsContent();
        showContent();
    };



    showContent();
    buttons.forEach(function (button) {
        button.addEventListener('click', onClickButtonHandler);
    });

})();


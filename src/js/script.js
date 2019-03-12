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
    };



    function Person(firstName, lastName, phoneNumber, zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.zipCode = zipCode;
    }

    var pageControl = new function PageControl() {
        var self = this;
        var countPerson = 100;
        var tempPage = 1;
        var phoneBook = [];
        var phoneBookResult = [];
        var pageContent = [];
        this.createPhoneBook = function () {
            for (var i = 0; i < countPerson; i++) {
                phoneBook.push(new Person(getFirtsName(), getLastName(), getPhone(), getZip()))
            }
            setPhoneBookResult(phoneBook);
            self.setTempPage(1);
            showContent();
        };

        var setPhoneBookResult = function (result) {
            phoneBookResult = result;
            self.setTempPage(1);
            showContent();
        };

        var getCountRowsOnPage = function () {
            var clientHeight = document.documentElement.clientHeight;
            var rowHeight = document.querySelector('.phone-book__cell').clientHeight;
            return Math.floor((clientHeight - 230) / rowHeight);
        };

        this.getCountPages = function () {
            return Math.ceil(phoneBookResult.length / getCountRowsOnPage());
        };
        var setPageContent = function () {
            pageContent = phoneBookResult.slice((tempPage - 1) * getCountRowsOnPage(), (tempPage - 1) * getCountRowsOnPage() + getCountRowsOnPage());
        };

        this.getPageContent = function () {
            return pageContent;
        };
        //change Page and redraw table
        this.setTempPage = function (num) {
            tempPage = num ? num : 1;
            setPageContent();
            showContent();
        };

        this.search = function (searchWord) {

            var itsFound = function (text) {
                text = text.toLowerCase();
                searchWord = searchWord.toLowerCase();
                return text.indexOf(searchWord) !== -1;
            };

            var result = phoneBook.filter(
                function (person) {
                    return itsFound(person.firstName + ' ' + person.lastName);
                }
            );
            setPhoneBookResult(result);
        };

        var showContent = function () {
            var table = document.querySelector('.phone-book');
            var tableContent = document.createDocumentFragment();
            pageControl.getPageContent().forEach(function (person) {
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
    };

    pageControl.createPhoneBook();


    var buttonsControl = new function (){
        var self = this;
        var buttonsContent =  [];
        var tempButton = 1;
        var buttons = [];
        this.createButtons =  function () {
            buttonsContent = [];
            var countButton = pageControl.getCountPages() > 4 ? 4 : pageControl.getCountPages();
            for (var i = 1; i <= countButton; i++) {
                buttonsContent.push(i);
            };
            tempButton = 1;
            var parentButtons = document.querySelector('.navigation');
            parentButtons.innerHTML = '';
            for (var i = 0; i <= countButton+1; i++) {
                var newButton = document.createElement('li');
                newButton.className = 'navigation__item';
                newButton.innerHTML = '<a href="#!" class="navigation__link">' + i + '</a>';
                parentButtons.appendChild(newButton);
            }
            buttons = parentButtons.querySelectorAll('.navigation__link');
            buttons[0].id = 'button_previous';
            buttons[0].textContent = '<';
            buttons[buttons.length-1].id = 'button_next';
            buttons[buttons.length-1].textContent = '>';

            buttons.forEach(function (button) {
                button.addEventListener('click', onClickButtonHandler);
            });
            self.updateButtonsContent();
        };

        this.updateButtonsContent =  function () {
            for (var i = 0; i < buttonsContent.length; i++) {
                if (buttonsContent[i] === tempButton) {
                    buttons.forEach(function (button) {
                        button.classList.remove('navigation__link--active');
                    });
                    buttons[i + 1].classList.add('navigation__link--active');
                }
            };
            buttonsContent.forEach(function (item, index,) {
                buttons[index + 1].textContent = item;
            });
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
            self.updateButtonsContent();
        };
    };
    buttonsControl.createButtons();

    var searchField = document.querySelector('.search__field');

    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                func.apply(context);
            }, wait);
        };
    };
    var onKeyUpHandler = debounce(function () {
        pageControl.search(searchField.value);
        buttonsControl.createButtons();
    },300);

    searchField.onkeyup =  onKeyUpHandler;

})();


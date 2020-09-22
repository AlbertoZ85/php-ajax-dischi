let $ = require('jquery');

$(document).ready(init);

function init() {
    getData();
    $(document).on('change', '#filter', function () {
        var thisAuthor = $(this).val();
        filterData(thisAuthor);
    });
}

function getData() {
    $.ajax({
        url: 'http://localhost:8888/Esercizi/php-ajax-dischi/server.php',
        method: 'GET',
        success: function (obj) {
            printData(obj);
            printSelect(obj);
        },
        error: function () {
            alert('Errore');
        }
    });
}

function printData(data) {
    var source = $('#cd-template').html();
    var template = Handlebars.compile(source);

    data.forEach(element => {
        var html = template(element);
        $('main').append(html);
    });
}

function printSelect(data) {
    var source = $('#select-template').html();
    var template = Handlebars.compile(source);

    var arrAuthor = [];

    data.forEach(element => {
        if (!arrAuthor.includes(element.author)) {
            arrAuthor.push(element.author);
            var context = {
                author: element.author
            }
            var html = template(context);
            $('#filter').append(html);
        }
    })
}

function filterData(author) {
    $.ajax({
        // window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
        url: 'http://localhost:8888/Esercizi/php-ajax-dischi/server.php',
        method: 'GET',
        data: {
            author: author
        },
        success: function (obj) {
            $('main').empty();
            printData(obj);
        },
        error: function () {
            alert('Errore');
        }
    });
}

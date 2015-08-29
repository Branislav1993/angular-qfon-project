/**
 * Created by Branislav Vidojevic on 29/8/2015.
 */
$('.navbar li').click(function (e) {
    $('.navbar li.active').removeClass('active');
    var $this = $(this);
    if (!$this.hasClass('active')) {
        $this.addClass('active');
    }
});


var pomocniRedIspis = function (a) {
    var pom = [];
    for (var i = 0; i < a.length; i++) {
        pom.push(' ' + a[i].index);
    }
    return pom.join();
};

var modalUspesnoStani = function (data) {
    $('#poruka1').text('SALTER: ' + data.odgovor.brojSalter);
    $('#poruka2').text('REDNI BROJ: ' + data.odgovor.brojStudent);
    $('#poruka3').text('');
    $('#myModalLabel').text('USPEH');
    $('#myModal').modal('show');
};

var modalNevalidnaForma = function () {
    $('#myModalLabel').text('GRESKA');
    $('#poruka1').text('Unesite indeks u odgovarajucem formatu.');
    $('#poruka2').text('');
    $('#poruka3').text('');
    $('#myModal').modal('show');
};

var dataFormat = function (data) {
    var prviG = data.glavniRedovi[0];
    var drugiG = data.glavniRedovi[1];
    var treciG = data.glavniRedovi[2];
    var prviP = pomocniRedIspis(data.pomocniRedovi[0].pomocniRed);
    var drugiP = pomocniRedIspis(data.pomocniRedovi[1].pomocniRed);
    var treciP = pomocniRedIspis(data.pomocniRedovi[2].pomocniRed);

    return salteri = [{ime: 'PRVI', trenutni: prviG.tekuciBroj, ceka: prviG.brojLjudi, pomocni: prviP},
        {ime: 'DRUGI', trenutni: drugiG.tekuciBroj, ceka: drugiG.brojLjudi, pomocni: drugiP},
        {ime: 'TRECI', trenutni: treciG.tekuciBroj, ceka: treciG.brojLjudi, pomocni: treciP}
    ];
};

var modalProvera = function (data) {
    for (var i = 0; i < data.provera.length; i++) {
        $('#poruka' + (i + 1)).text('SALTER: ' + data.provera[i].brojSalter + " BROJ: " + data.provera[i].brojStudent);
    }
    $('#myModalLabel').text('TVOJE STANJE');
    $('#myModal').modal('show');
};
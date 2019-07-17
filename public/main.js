var pers = $(".per");
//get data
function getData() {
    console.log('getting data');
    $.ajax({
        url: '/api/getdata',
        method: 'GET',
        contentType: 'application/json',
        success: function (result) {
            pers[0].innerHTML = result.trash1 + "%";
            pers[1].innerHTML = result.trash2 + "%";
            pers[2].innerHTML = result.trash3 + "%";
            stat();
            setTimeout(getData, 60000);
        }
    });
}

setTimeout(getData, 60000);

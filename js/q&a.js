    $.ajax({
        method: "GET",
        url: "http://localhost:3000",
        dataType: "json"
    })
        .always(function(data) {
            console.log('in always');
            console.log(data);
        });

    // stop click of the preview opening/closing a row
    $('button.page-preview').click(function(e) {
        e.stopPropagation();
    });

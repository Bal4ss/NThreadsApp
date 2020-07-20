function fileChange(input) {
    if (input.files[0] == null) return;
    var filesBlock = $('#files');
    let reader = new FileReader();
    $.each(input.files, function(index, item) {
        reader.readAsText(item);
        reader.onload = function () {
            filesBlock.append(`
            <div id="${item.name.replace('.', '_')}${filesBlock.children().length+index}" class="file-block flex-row files-input-wrapper">
                <p class="file-name" title="${item.name}">${item.name}</p>
                <input type="hidden" name="content" value="${reader.result}" />
                <p class="result"></p>
            </div>
            `);
        };
    })
    $('#files-input').val('');
}

function Submit() {
    var mass = $('#files').children();
    var a = new Date();
    $.each(mass, function (index, item) {
        var str = item.children[1].value.trim();
        if (str == "") str = null;
        $.ajax({
            type: "post",
            url: "/Home/Check?str=" + str,
            contentType: "html",
            success: function (result) {
                var res = "";
                item.children[2].style.color = "red";
                if (typeof (result) == typeof (true)) {
                    res = result ? "Палиндром" : "Не палиндром";
                    if (result) item.children[2].style.color = "green";
                }
                else res = result;
                item.children[2].textContent = res;
                console.log(new Date() - a);
            }
        })
    })
    console.log(new Date() - a);
}
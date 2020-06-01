$('#nav-adduser-tab').click(function () {
    $('#add-all-roles').empty();
    getAllRolesForAdd();
});

$('#btnAddUser').click(function () {

    if ($('#inputAddUsername').val().length < 3) {
        $('#warningAddUsername').text("Username not valid").show().fadeOut(2000);
    } else if ($('#inputAddPassword').val().length < 3) {
        $('#warningAddPassword').text("Password not valid").show().fadeOut(2000);
    } else if ($('input[type="checkbox"]:checked').length < 1) {
        $('#warningAddRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        let addUser = {};
        addUser.username = $('#inputAddUsername').val();
        addUser.password = $('#inputAddPassword').val();
        addUser.roles = getCheckedRoles();
        $.ajax({
            url: 'http://localhost:8080/rest/admin/addUser',
            headers: {
                'Authorization':token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(addUser),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                let table = $('#users-table');
                table.empty();
                $('#nav-allUsers-tab').tab('show');
                getAllUsers();
                $('#inputAddUsername').val('');
                $('#inputAddPassword').val('');
                $('#add-all-roles').empty();
            },
            error: function (error) {
                alert("error Add: " + error);
            }
        });
    }
});
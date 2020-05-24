function editUser(id) {
    $.ajax({
        url: 'http://localhost:8080/rest/admin/editUser/' + id,
        headers: {
            'Authorization':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        data: 'JSON',
        contentType: 'application/json; charset=utf-8',

        success: function (editData) {
            $('#modal-title').text('Edit user: ' + editData.username);
            $('#modalEditId').val(editData.id);
            $('#modalEditUsername').val(editData.username);
            var emptyPassword = '';
            $('#modalEditNewPassword').val(emptyPassword);
            var editUserString = JSON.stringify(editData);
            $('#edit-all-roles').empty();
            getAllRolesForModal(editUserString);
            console.log("editUser")
        },
        error: function (error) {
            alert(error);
        }
    });
}

$('#btnSaveEdit').click(function () {
    if ($('#modalEditUsername').val().length < 3) {
        $('#warningEditUsername').text("Username not valid").show().fadeOut(2000);
    } else if (($('input[type="checkbox"]:checked')).length < 1) {
        $('#warningEditRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        var editUser = {};
        editUser.id = $('#modalEditId').val();
        editUser.username = $('#modalEditUsername').val();
        editUser.password = $('#modalEditNewPassword').val();
        editUser.roles = getCheckedRoles();
        $.ajax({
            url: 'http://localhost:8080/rest/admin/editUser',
            headers: {
                'Authorization':token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            data: JSON.stringify(editUser),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                var table = $('#users-table');
                table.empty();
                $('#exampleModal').modal('hide');
                $('#nav-allusers-tab').tab('show');
                getAllUsers();
                $('#edit-all-roles').empty();
            },
            error: function (error) {
                alert("error edit");
            }
        });
    }
});
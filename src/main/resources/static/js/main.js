$(document).ready(function () {    let inputs = document.getElementsByTagName("input"), len = inputs.length, i;
    for (i = 0; i < len; i++) {
        if (inputs[i].name === "token") {
            token = inputs[i].value;
            break;
        }
    } console.log(token);
    getAllUsers();
});
// getAllUsers();

function getAllUsers() {
    // $.getJSON("http://localhost:8080/rest/admin/users", function (data) {
    $.ajax({
        url: 'http://localhost:8080/rest/admin/users',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        data: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var userRow = '';
            var userId = '';
            $.each(data, function (key, value) {
                if (key = "id") {
                    userRow += '<tr>';
                    userRow += '<td>' + value.id + '</td>';
                    userId = value.id;
                }
                if (key = "username") {
                    userRow += '<td>' + value.username + '</td>';
                }
                if (key = "roles") {
                    var rolesObj = value.roles;
                    var rolesName = '';
                    $.each(rolesObj, function (key2, value2) {
                        if (key2 = "name") {
                            rolesName += value2.role + ';' + '&nbsp;&nbsp;&nbsp;';
                        }
                    });
                    userRow += '<td>' + rolesName + '</td>';
                }
                userRow += '<td><a class="btn btn-primary" id="btnEditUser' + value.id + '" data-toggle="modal" data-target=".bd-example-modal-md" onclick="editUser(' + value.id + ')" role="button">Edit</a></td>';
                userRow += '<td><a class="btn btn-danger" id="btnDeleteUser" onclick="deleteUser(' + value.id + ')" role="button">Delete</a>' + '</td>';
                userRow += '</tr>';
            });
            $('#users-table').append(userRow);
        },
    });
}

$('#nav-adduser-tab').click(function () {
    $('#add-all-roles').empty();
    getAllRolesForAdd();
    console.log("роли");
});

$('#btnAddUser').click(function () {

    if ($('#inputAddUsername').val().length < 3) {
        $('#warningAddUsername').text("Username not valid").show().fadeOut(2000);
    } else if ($('#inputAddPassword').val().length < 3) {
        $('#warningAddPassword').text("Password not valid").show().fadeOut(2000);
    } else if ($('input[type="checkbox"]:checked').length < 1) {
        $('#warningAddRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        var addUser = {};
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
                var table = $('#users-table');
                table.empty();
                $('#nav-allusers-tab').tab('show');
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
        alert("else");
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
            // dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function () {
                // getAllUsers()
                var table = $('#users-table');
                table.empty();
                $('#exampleModal').modal('hide');
                $('#nav-allusers-tab').tab('show');
                getAllUsers();
                $('#edit-all-roles').empty();
                console.log("edit157");
            },
            error: function (error) {
                alert("error163");
            }
        });
    }
});

function deleteUser(id) {
    $.ajax({
        url: 'http://localhost:8080/rest/admin/deleteUser/' + id,
        headers: {
            'Authorization':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            var table = $('#users-table');
            table.empty();
            getAllUsers();
        },
        error: function (error) {
            alert(error);
        },
    });
}

function getAllRolesForAdd() {
    // var roleRow = '';
    // $.getJSON("http://localhost:8080/rest/admin/roles", function (data) {
    $.ajax({
        url: 'http://localhost:8080/rest/admin/roles',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        data: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var roleRow = '';
            $.each(data, function (key, value) {
                roleRow += '<div class="form-check-inline">';
                roleRow += '<label class="form-check-label">';
                roleRow += '<input type="checkbox" ';
                roleRow += 'id="' + value.id + '" value="' + value.role + '" class="form-check-input">' + value.role + ''; //убрал chbRole у id
                roleRow += '</label>';
                roleRow += '</div>';
            });
            $('#add-all-roles').append(roleRow);
        },
    });
}

function getAllRolesForModal(editUserString) {
    // var roleRow = '';
    // $.getJSON("http://localhost:8080/rest/admin/roles", function (data) {
    $.ajax({
        url: 'http://localhost:8080/rest/admin/roles',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
        data: 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var roleRow = '';
            $.each(data, function (key, value) {
                roleRow += '<div class="form-check-inline">';
                roleRow += '<label class="form-check-label">';
                roleRow += '<input type="checkbox" ';
                if (editUserString.includes(value.role)) {
                    roleRow += 'checked';
                }
                roleRow += ' id="' + value.id + '" value="' + value.role + '" class="form-check-input">' + value.role + ''; //убрал chbRole у id
                roleRow += '</label>';
                roleRow += '</div>';
            });
            $('#edit-all-roles').append(roleRow);
        },
    });
}

function getCheckedRoles() {
    var roles = [];
    $.each($('input[type="checkbox"]:checked'), function () {
        var role = {};
        role.id = $(this).attr('id');
        role.role = $(this).attr('value');
        roles.push(role);
    });
    alert(JSON.stringify(roles));
    return roles;
}



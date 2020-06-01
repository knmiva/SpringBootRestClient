$(document).ready(function () {
    let inputs = document.getElementsByTagName("input"), len = inputs.length, i;
    for (i = 0; i < len; i++) {
        if (inputs[i].name === "token") {
            token = inputs[i].value;
            break;
        }
    }
    getAllUsers();
});

function getAllUsers() {
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
            let userRow = '';
            $.each(data, function (key, value) {
                userRow += `<tr>
                                <td>${value.id}</td>
                                <td>${value.username}</td>`
                if (key = "roles") {
                    let rolesObj = value.roles;
                    let rolesName = '';
                    $.each(rolesObj, function (key2, value2) {
                        if (key2 = "role") {
                            rolesName += `${value2.role.replace(/^.{5}/, '')}; `
                        }
                    });
                    userRow += `<td>${rolesName}</td>`
                }
                userRow += `<td>
                                    <a class="btn btn-primary" id="btnEditUser${value.id}" data-toggle="modal" 
                                       data-target=".bd-example-modal-md" onclick="editUser(${value.id})" 
                                       role="button">Edit
                                    </a>
                                </td>
                                <td>
                                    <a class="btn btn-danger" id="btnDeleteUser" onclick="deleteUser(${value.id})" 
                                       role="button">Delete
                                    </a>
                                </td>
                            </tr>`
            });
            $('#users-table').append(userRow);
        },
    });
}



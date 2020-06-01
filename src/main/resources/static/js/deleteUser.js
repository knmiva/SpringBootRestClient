function deleteUser(id) {
    $.ajax({
        url: `http://localhost:8080/rest/admin/deleteUser/${id}`,
        headers: {
            'Authorization':token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        success: function () {
            let table = $('#users-table');
            table.empty();
            getAllUsers();
        },
        error: function (error) {
            alert(error);
        },
    });
}
function getAllRolesForAdd() {
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
            let roleRow = '';
            $.each(data, function (key, value) {
                roleRow += `<div class=form-check-inline>
                                <label class=form-check-label>
                                    <input type=checkbox 
                                        id=${value.id} value=${value.role}
                                        class=form-check-input>
                                    ${value.role}
                                </label>
                            </div>`
            });
            $('#add-all-roles').append(roleRow);
        },
    });
}
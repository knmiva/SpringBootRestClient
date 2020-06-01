function getCheckedRoles() {
    let roles = [];
    $.each($('input[type="checkbox"]:checked'), function () {
        let role = {};
        role.id = $(this).attr('id');
        role.role = $(this).attr('value');
        roles.push(role);
    });
    alert(JSON.stringify(roles));
    return roles;
}
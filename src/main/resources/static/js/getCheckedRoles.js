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
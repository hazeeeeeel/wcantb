
var profile_csp;
var profile_sso;

window.onload = function () {

    profile_csp = document.getElementById("profile_csp");
    profile_sso = document.getElementById("profile_sso");


    var src1 = localStorage.getItem("profile_csp");
    var src2 = localStorage.getItem("profile_sso");
    if (src1 != null) {
        profile_csp.src = src1;
    } else {
        profile_csp.src = "../assets/default-profile-csp.png";
    }
    if (src2 != null) {
        profile_sso.src = src2;
    } else {
        profile_sso.src = "../assets/default-profile-sso.png";
    }

}

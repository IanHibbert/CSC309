$(document).ready(function () {

    $('#app-by-status').click(function (e) {
        if (e.target == this) {
            $('#dropdown-status').animate({
                height: 'toggle'
            });
        }
    });

    $('#search-family-name').click(function (e) {
        if (e.target == this) {
            $('#search-fname').animate({
                height: 'toggle'
            });
        }
    });

    $('#remove-applicant').click(function (e) {
        if (e.target == this) {
            $('#del-fname').animate({
                height: 'toggle'
            });

            $('#del-stunum').animate({
                height: 'toggle'
            });
        }
    });

    $('#display-course').click(function (e) {
        if (e.target == this) {
            $('#search-course').animate({
                height: 'toggle'
            });
        }
    });

    /*
     Assigns onclick that closes the Modal
     */
    $('#close-modal').click(function () {
        closeModal();
    });

    /*
     Closes modal if user clicks outside of the box
     */
    window.onclick = function (event) {
        var modal = document.getElementById("applicant-modal");
        if (event.target == modal) {
            closeModal();
        }
    };

});

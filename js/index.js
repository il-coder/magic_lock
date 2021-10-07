$(document).ready(function() {
    let attempts = 0;
    let isLocked = true;


    $("#password").on("keydown", function(e) {
        let x = e.which || e.keyCode;
        if((x >= 48 && x <= 57) || (x >= 96 && x <= 105) || (x >= 37 && x<=40) || x == 8 || x == 46) {
        } else if (x == 13) {
            $("#magic").click();
        } else {
            e.preventDefault();
        }
    });

    $("#show_hide").on('click', function() {
        if($("#show_hide").is(":checked")) {
            document.getElementById("password").type = "text";
        }
        else {
            document.getElementById("password").type = "password";
        }
    });

    function shake(id) {
        let elem = $("#"+id);
        let intShakes = 5;
        let intDistance = 20;
        let intDuration = 20;
        $(elem).css("position","relative"); 
        for (var x=1; x<=intShakes; x++) {
            $(elem).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
            .animate({left:intDistance}, ((intDuration/intShakes)/2))
            .animate({left:0}, (((intDuration/intShakes)/4)));
        }
    }

    $("#magic").click(function(){
        let password = $("#password").val();
        if(isLocked == false) {
            isLocked = true;
            $("#lock_img").attr("src","images/locked_lock.png");
            $("#magic").text("Unlock");
            $("#text").html('Enter 6-digit password to unlock');
            $("#password").show();
            $("#show_hide").show();
            return;
        }
        if(password.length != 6) {
            shake("password");
            return;
        } else if(password == "689245" || attempts == 4) {
            //unlock
            $("#lock_img").attr("src","images/unlocked_lock.png");
            $("#password").val("");
            $("#magic").text("Lock");
            $("#text").html('Unlocked!<br><br>Press "Lock" to lock Again');
            $("#password").hide();
            $("#show_hide").hide();
            isLocked = false;
        } else {
            $("#password").val("");
            shake("lock_img");
        }
        attempts = (attempts + 1) % 5;
    }); 
});
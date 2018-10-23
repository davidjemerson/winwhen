function loadScheduler() {
    $("#loadingBay1").empty();
    $("#loadingBay1").html(
        "<div class='container'>" +
        "<form>" +
            "<div class='form-group'>" +
                "<label for='schedulerName'>What's the name they all call you?</label>" +
                "<input type='text' class='form-control' id='schedulerName' placeholder='Jim Darkmagic'>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label for='schedulerEmail'>Where can we email you at?</label>" +
                "<input type='email' class='form-control' id='schedulerEmail' placeholder='Enter email'>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label for='eventName'>What're we calling this get-together?</label>" +
                "<input type='text' class='form-control' id='eventName' placeholder='Name your event'>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label for='eventLocation'>Where's it going down?</label>" +
                "<input type='text' class='form-control' id='eventLocation' placeholder='33 Cherry Tree Lane'>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label for='eventLocation'>What're the email addresses of the folks you'd like to be there?</label>" +
                "<div id='addAttendee' class='btn btn-primary'>Add Another Field</div>" +
                "<div id='invitees' class='row'>" +
                    "<input type='text' class='invitee form-control col-4 m-1' placeholder='Email Address'>" +
                "</div>" +
            "</div>" +
            "<div class='form-group'>" +
                "<label for='potentialDates'>Pick some dates you're available</label>" +
                "<div id='potentialDates' class='row'>" +
                    "<div class='col-1'>" +
                        "<a id='prevMonth' href=''><h4>Prev</h4></a>" +
                    "</div>" +
                    "<div class='col-4 text-center'>" +
                        "<h2 id='monthName'></h2>" +
                    "</div>" +
                    "<div class='col-1 text-right'>" +
                        "<a id='nextMonth' href=''><h4>Next</h4></a>" +
                    "</div>" +
                "</div>" +
                "<div class='row'>" +
                    "<table id='calendar' class='table table-bordered text-center col-6'>" +
                    "</table>" +
                    "<div class='col-6'>" +
                        "<ul id='dateList'></ul>" +
                    "</div>" +
                "</div>" +
            "</div>" +
            "<div class='form-group'></div>" +
            "<button id='create' type='submit' class='btn btn-primary'>Submit</button>" +
        "</form>" +
    "</div>"
    )

    var thisMonth = moment();
    var selectedDates = [];
    var eventObjects = [];
    var invitees = [];

    function buildCalendar(m) {
        let rowCount = 1;
        let dayCount = 1;
        let days = m.daysInMonth();
        let start = m.date(1).day();
        $("#monthName").text(m.format("MMMM YYYY"));
        $("#calendar").empty();
        $("#calendar").append("<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>")
        for (var x = 1 ; x <= days ; x++) {
            if (x === 1) {
                $("#calendar").append("<tr id='calRow1'>");
                for (var y = 0 ; y < start ; y++) {
                    $("#calRow1").append("<td>");
                    dayCount++;
                }
                $("#calRow1").append("<td id='" + m.date(x).format('MM-DD-YYYY') + "' class='date'>" + x + "</td>");
                dayCount++;
            }
            else {
                if (dayCount === 8) {
                    rowCount++;
                    dayCount = 1;
                    $("#calendar").append("<tr id='calRow" + rowCount + "'>");
                }
                $("#calRow" + rowCount).append("<td id='" + m.date(x).format('MM-DD-YYYY') + "' class='date'>" + x + "</td>");
                dayCount++;
            }
        }
        for (var z = dayCount ; z <= 7 ; z++) {
            $("#calRow" + rowCount).append("<td>");
        }
    
        function toggle() {
            switch ($(this).attr("class")) {
                case "date bg-primary":
                    $(this).attr("class", "date");
                    var v = selectedDates.indexOf($(this).attr("id"));
                    selectedDates.splice(v, 1);
                    console.log(selectedDates);
                    $("#dateList").empty();
                    for (var i = 0 ; i < selectedDates.length ; i++) {
                        $("#dateList").append("<li>" + selectedDates[i] + "</li>");
                    }
                    break;
                case "date":
                    $(this).attr("class", "date bg-primary");
                    selectedDates.push($(this).attr("id"));
                    console.log(selectedDates);
                    $("#dateList").empty();
                    for (var i = 0 ; i < selectedDates.length ; i++) {
                        $("#dateList").append("<li>" + selectedDates[i] + "</li>");
                    }
                    break;
            }
        }
        $(".date").click(toggle);
    }
    
    buildCalendar(thisMonth);

    $("#addAttendee").on("click", function(e) {
        e.preventDefault();
        $("#invitees").append("<input type='text' class='invitee form-control col-4 m-1' placeholder='Email Address'>");
    })
    
    $("#prevMonth").on("click", function(e) {
        e.preventDefault();
        thisMonth.subtract(1, "months");
        buildCalendar(thisMonth);
    })
    
    $("#nextMonth").on("click", function(e) {
        e.preventDefault();
        thisMonth.add(1, "months");
        buildCalendar(thisMonth);
    })

    $("#create").on("click", function(e) {
        e.preventDefault();
        $(".invitee").each(function() {
            invitees.push($(this).val().trim());
        })
        var eventObject = {
            organizer: $("#schedulerName").val().trim(),
            orgainzerEmail: $("#schedulerEmail").val().trim(),
            eventName: $("#eventName").val().trim(),
            location: $("#eventLocation").val().trim(),
            inviteEmails: invitees,
            potentialDates: selectedDates
        }
        eventObjects.push(eventObject);
        console.log(eventObjects);
        $("#loadingBay1").html("<h1 class='text-center'>Event Created!</h1>");
    })

}

$("#scheduleBtn").on('click', loadScheduler);
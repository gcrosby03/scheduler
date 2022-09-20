var data = JSON.parse(localStorage.getItem('dataStuff')) || [];

var today = moment();
$('#currentDay').text(today.format("dddd, MMM Do, YYYY"));

var timelineLabels = (desiredStartTime, interval, period) => {
    const periodsInADay = moment.duration(8, 'hours').as(period);

    const timeLabels = [];
    const startTimeMoment = moment(desiredStartTime, 'hh:mm');
    for (let i = 0; i <= periodsInADay; i += interval) {
        startTimeMoment.add(i === 0 ? 0 : interval, period);
        timeLabels.push(startTimeMoment.format('h A'));
    }

    return timeLabels;
};

function buildTimeTable() {
    var timeLabels = timelineLabels(9, 1, 'hours');
    
    if (data.length === 0) {

        for (let i = 0; i < timeLabels.length; i++) {
            var cssClass = "";

            if (parseInt(moment(timeLabels[i], "h A").format("H")) === parseInt(today.format("H"))) {
                cssClass = "present";
            }
            else if (parseInt(moment(timeLabels[i], "h A").format("H")) > parseInt(today.format("H"))) {
                cssClass = "future";
            }
            else {
                cssClass = "past";
            }
            data.push({ time: timeLabels[i], textfield: '', class: cssClass })

        }
    }
    for (let i = 0; i < data.length; i++) {
        $('#timeField').append(`<div class="row">
        <div class="col-sm-1 hour d-flex align-items-center justify-content-end" id="${data[i].time}">${data[i].time}</div>
        <div class="col-sm-10" id="nineLine"><input value = "${data[i].textfield}" type = "text" class = "${data[i].class} form-control form-control-sm h-100" id = "inputField" data-number=${i} /></div>
        <div class="col-sm-1 saveBtn d-flex align-items-center justify-content-center" data-number=${i}><i class="far fa-save fa-3x"></i></div>
        </div>`);
    }

}

buildTimeTable();
var saveBtns = Array.from(document.querySelectorAll('.saveBtn'));


saveBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        var inputFields = Array.from(document.querySelectorAll('#inputField'));
        data[e.currentTarget.dataset['number']].textfield = inputFields[e.currentTarget.dataset['number']].value;
        localStorage.setItem('dataStuff', JSON.stringify(data))
        $('.saveConfirmation').removeClass('d-none');
    })
});
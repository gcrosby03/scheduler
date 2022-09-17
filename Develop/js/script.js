var data = []

var today = moment();
$('#currentDay').text(today.format("dddd, MMM Do, YYYY"));
console.log(today);

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
    for (let i = 0; i < timeLabels.length; i++) {
        data.push({ time: timeLabels[i], textfield: '' });
    }
    for (let i = 0; i < data.length; i++) {
        $('#timeField').append(`<div class="row">
        <div class="col-1 hour d-flex align-items-center justify-content-end" id="${data[i].time}">${data[i].time}</div>
        <div class="col-10" id="nineLine">${data[i].textfield}</div>
        <div class="col-1 saveBtn d-flex align-items-center justify-content-center"><i class="far fa-save fa-3x"></i></div>
      </div>`);
    }

}
buildTimeTable();


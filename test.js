function getStudents(data) {
    var studentRecords = [];
    for (let record of data.records) {
        let id = `student-${record.id}`;
        studentRecords.push({
            id,
            record.name
        });
    }
    return studentRecords;
}
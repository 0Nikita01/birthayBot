

module.exports.socetConnection = (database) => {

    database.getDataSocket("botDatabase/", (data) => {
        console.log("Изменение в базе");
    })
}

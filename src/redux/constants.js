export const weekDays = Object.freeze([
    {key: 'Mo', name: 'Montag', isWorkDay: true},
    {key: 'Di', name: 'Dienstag', isWorkDay: true},
    {key: 'Mi', name: 'Mittwoch', isWorkDay: true},
    {key: 'Do', name: 'Donnerstag', isWorkDay: true},
    {key: 'Fr', name: 'Freitag', isWorkDay: true},
    {key: 'Sa', name: 'Samstag', isWorkDay: false},
    {key: 'So', name: 'Sonntag', isWorkDay: false}
])

export const workDayNames = Object.freeze(weekDays.filter((day) => day.isWorkDay).map((day) => day.name))
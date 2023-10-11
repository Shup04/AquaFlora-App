export const ReminderSchema = {
  name: 'Reminder',
  properties: {
    id: 'int',
    title: 'string',
    date: 'date',
    time: 'string',
  },
  primaryKey: 'id',
};

export const ReminderSchema = {
  name: 'Reminder',
  properties: {
    id: 'int',
    name: 'string',
    startDate: 'date',
    endDate: 'date',
  },
  primaryKey: 'id',
};

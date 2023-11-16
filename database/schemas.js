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

export const TankSchema = {
  name: 'Tank',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    size: 'string',
    desc: 'string',
  },
};

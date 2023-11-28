export const TankSchema = {
  name: 'Tank',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    size: 'string',
    desc: 'string',
    URI: 'string',
  },
};

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


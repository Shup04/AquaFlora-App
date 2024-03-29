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
    repeatingReminderId: 'string?',
    name: 'string',
    desc: 'string',
    dateTime: 'date',
    tankId: 'int',
    notificationId: 'string',
    repeating: 'bool',
    frequency: 'string?', // Optional, for repeating reminders
    nextTrigger: 'date?',
    missed: 'bool',
    acknowledged: 'bool',
  },
  primaryKey: 'id',
};

export const WaterParameterSchema = {
  name: 'WaterParameter',
  primaryKey: 'id',
  properties: {
    id: 'string',
    parameterName: 'string',
    value: 'int',
    date: 'date',
    tankId: 'int',
  },
}

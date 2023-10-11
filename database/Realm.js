import Realm from 'realm'
import { ReminderSchema } from './schemas'

class Tank extends Realm.Object {}
Tank.schema = {
  name: 'Tank',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    size: 'string',
    desc: 'string',
  },
};

const realm = new Realm({ 
  schema: [Tank, ReminderSchema], 
  deleteRealmIfMigrationNeeded: true, 
});

export default realm;
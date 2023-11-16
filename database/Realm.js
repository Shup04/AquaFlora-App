import Realm from 'realm'
import { ReminderSchema, TankSchema } from './schemas'

const realm = new Realm({ 
  schema: [TankSchema, ReminderSchema], 
  deleteRealmIfMigrationNeeded: true, 
});

export default realm;
import Realm from 'realm'

class Person extends Realm.Object {}
Person.schema = {
  name: 'Person',
  properties: {
    name: 'string',
    age: 'int',
  },
};

const realm = new Realm({ schema: [Person] });

export default realm;
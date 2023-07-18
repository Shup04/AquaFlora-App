import Realm from 'realm'

class Tank extends Realm.Object {}
Tank.schema = {
  name: 'Tank',
  properties: {
    name: 'string',
    size: 'int',
    desc: 'string',
  },
};

const realm = new Realm({ schema: [Tank] });

export default realm;
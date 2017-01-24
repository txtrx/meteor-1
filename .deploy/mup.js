module.exports = {
  servers: {
    one: {
      host: '54.173.113.55',//<-----
      username: 'ubuntu',
      pem: '/Users/sir austen/OneDrive/code/textprescription/TextMeteor/meteor-default.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'TextMeteor',
    path: '/Users/sir austen/OneDrive/code/textprescription/TextMeteor',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
     docker: {
     // image: 'kadirahq/meteord', // (optional)
      image: 'abernix/meteord:base' // use this image if using Meteor 1.4+
    },
    env: {
      ROOT_URL: 'http://ec2-54-173-113-55.compute-1.amazonaws.com', //<-----
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 180
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  }
};
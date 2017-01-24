module.exports = {
  servers: {
    staging: {
      host: '54.91.226.100',
      username: 'ubuntu',
      pem: '/Users/sir austen/OneDrive/code/textprescription/TextMeteor/meteor-default.pem'
    }
  },

  meteor: {
    name: 'TextMeteor',
    path: '/Users/sir austen/OneDrive/code/textprescription/TextMeteor',
    servers: {
      staging: {}
    },
    env: {
      ROOT_URL: 'http://ec2-54-91-226-100.compute-1.amazonaws.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 2500,
    enableUploadProgressBar: true
  }
};
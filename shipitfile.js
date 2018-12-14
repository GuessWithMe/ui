// shipitfile.js
module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: './dist',
      deployTo: '/var/www/shipit',
      repositoryUrl: 'https://github.com/GuessWithMe/ui.git',
      ignores: ['.git', 'node_modules'],
      key: '~/.ssh/guesswithme-aws.pem'
    },
    // Set custom Variables
    production: {
      servers: 'ubuntu@ec2-18-191-188-37.us-east-2.compute.amazonaws.com',
      build : 'ng build'
    }
  });

  shipit.task('default', () => {
    return shipit.local(shipit.config.build)
  });

  // shipit.task('sync',['default'], () => {
  //   shipit.log('Build:Finished')
  //   return shipit.local('rsync -azP ' + shipit.config.workspace + ' ' + shipit.config.servers + ':'  + shipit.config.deployTo + '/' + releaseId)
  // });

  shipit.start('default')
}

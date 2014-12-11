module.exports = function(grunt) {

    // Initialise configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gitcheckout: {
            branch: {
                options: {
                    branch: '<%= branch %>',
                    create: false,
                    overwrite: false
                }
            }
        },
        gitfetch: {
            origin: {
                options: {
                    repository: 'origin',
                    all: false
                }
            }
        },
        gitrebase: {
            branch: {
                options: {
                    branch: '<%= branch %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('rebase', 'Rebase a branch with its remote branch, default development', function(branch) {
        branch = branch || "development";
        grunt.config.set('branch', branch);
        grunt.task.run('gitfetch:origin', 'gitcheckout:branch', 'gitrebase:branch');
    });
};
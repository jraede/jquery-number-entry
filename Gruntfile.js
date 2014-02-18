module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.initConfig({
		version: grunt.file.readJSON('package.json').version,
		watch: {
			coffee:{
				files:['*.coffee'],
				tasks:['coffee']
			}
		},
		coffee: {
			source:{
				options:{
					preserve_dirs:true,
					bare:true
				},
				files:[
					{
						expand:true,
						flatten:false,
						cwd:'',
						src:['*.coffee'],
						dest:'',
						ext:'.js'
					}
				]
			}
		}
	});
};

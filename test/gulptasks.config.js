module.exports = {

	'workDir' : '.',

	// --- [tasks/webpack.js] ---

	'webpack' : {
		'config' : './webpack.config.js'
	},

	// --- [tasks/tsc.js] ---

	'tsc' : {
		'config' : {
			'declarationFiles' : true,
			'removeComments'   : true,
			'target'           : 'ES5',
			'module'           : 'commonjs'
		},
		'targetDir' : {
			'srcDir'   : './src/js',
			'excludes' : []
		},
		'target' : [
			{
				'options' : {
					'src' : './src/js/app.ts',
					'outputDir' : "./bin/js"
				},
				'watchWith' : ['./src/js/**/*.js']
			}
		]
	},

    // --- [tasks/uglify.js] ---

    'uglifyjs' : {
        'config' : {},
        'dest' : "./bin/js",
        'target' : [
            {
                'options' : {
                    'src' : './bin/js/app.js'
                },
                //'watchWith' : []
            }
        ]
    },

	// --- [tasks/sass.js] ---

	'compass' : {
		'config' : {
			'css'           : './bin/css',
			'sass'          : './src/css',
			'line_comments' : false,
			'style'         : 'compressed'
		},
		'target' : [
			{
				'options' : {
					'src' : ['./src/css/app.scss']
				},
				'watchWith' : ['./src/css/**/*.scss']
			}
		]
	},

	// --- [tasks/sass.js] ---

    'rsync' : {
    	'config' : {
			'ssh'        : true,
			'recursive'  : true,
			'syncDest'   : false,
			'delete'     : false,
			'deleteAll'  : false,
			'privateKey' : "path/to/key.pem",
			'src'        : '../public/',
			'dest'       : "user@host:/path/to/dest/",
		}
    }

};
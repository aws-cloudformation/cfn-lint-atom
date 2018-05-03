'use babel';
/*
Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

    http://www.apache.org/licenses/LICENSE-2.0

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

export default {
  config: {
    cfnLintExecutablePath: {
      title: 'Cfn-Lint Executable Path',
      type: 'string',
      description: 'Path to Cfn-Lint executable (e.g. /usr/bin/cfn-lint) if not in shell env path.',
      default: 'cfn-lint',
    },
    ignoreRules: {
      title: 'Ignore Rules',
      type: 'array',
      default: [],
      items: {
        type: 'string'
      },
      description: 'Ignore Rules (space deliminated)'
    },
    appendRules: {
      title: 'Append Rules Directory',
      type: 'array',
      default: [],
      items: {
        type: 'string'
      },
      description: 'Append Rules Directory (space deliminated)'
    }
  },

  // activate linter
  activate() {
    const helpers = require('atom-linter');
  },

  provideLinter() {
    return {
      name: 'Cfn-Lint',
      grammarScopes: ['source.yaml', 'source.json'],
      scope: 'file',
      lintsOnChange: false,
      lint: (activeEditor) => {
        // setup variables

        const helpers = require('atom-linter');
        const file = activeEditor.getPath();
        const is_cfn_regex = new RegExp('"?AWSTemplateFormatVersion"?\s*')
        const correct_file = new RegExp(file);

        var is_cfn = false;
        activeEditor.buffer.buffer.getLines().forEach(function (line) {
          if (is_cfn_regex.exec(line)) {
            is_cfn = true;
          }
        });

        // initialize variable for linter return here for either linter output or errors
        var toReturn = [];

        if (!(is_cfn)) {
          function emptyArray() {
            return new Promise((resolve, reject) => {
              resolve([])
            });
          };

          return emptyArray().then(output => {
            return []
          });
        }

        // parseable output is required
        var args = ['--format', 'json']

        // add file to check
        args = args.concat(['--template', file]);
        args = args.concat(['--ignore-bad-template']);

        if (atom.config.getAll('atom-cfn-lint.ignoreRules').length > 0) {
          args = args.concat(['--ignore-checks']);
          for (i = 0; i < atom.config.get('atom-cfn-lint.ignoreRules').length; i++) {
            args = args.concat([atom.config.get('atom-cfn-lint.ignoreRules')[i]]);
          }
        }

        if (atom.config.getAll('atom-cfn-lint.appendRules').length > 0) {
          args = args.concat(['--append-rules']);
          for (i = 0; i < atom.config.get('atom-cfn-lint.appendRules').length; i++) {
            args = args.concat([atom.config.get('atom-cfn-lint.appendRules')[i]]);
          }
        }

        return helpers.exec(atom.config.get('atom-cfn-lint.cfnLintExecutablePath'), args, {cwd: require('path').dirname(file), ignoreExitCode: true}).then(output => {
          JSON.parse(output).forEach(function (match) {
            linenumber = parseInt(match.Location.Start.LineNumber) - 1;
            columnnumber = parseInt(match.Location.Start.ColumnNumber) - 1;
            linenumberend = parseInt(match.Location.End.LineNumber) - 1;
            columnnumberend = parseInt(match.Location.End.ColumnNumber) - 1;

            toReturn.push({
              severity: match.Level.toLowerCase(),
              excerpt: match.Message,
              location: {
                file: file,
                position: [[linenumber, columnnumber], [linenumberend, columnnumberend]],
              },
            });
          });

          return toReturn;
        })
        .catch(error => {
          console.log(error.message)
          atom.notifications.addError(
            'An unexpected error with cloudformation, cfn-lint, atom-cfn-lint, atom, linter, and/or your playbook, has occurred.',
            {
              detail: error.message
            }
          );
          return toReturn;
        });
      }
    };
  }
};

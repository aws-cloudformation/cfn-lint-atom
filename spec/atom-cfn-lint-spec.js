'use babel'

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


// eslint-disable-next-line no-unused-vars
import { it, fit, wait, beforeEach, afterEach } from 'jasmine-fix'

import * as path from 'path'

const fixturesDir = path.join(__dirname, 'fixtures')

const fixtures = {
  goodJson: ['templates', 'good.json'],
  goodYaml: ['templates', 'good.yaml'],
  nonCfnYaml: ['templates', 'not_cloudformation.yaml'],
  nonCfnJson: ['templates', 'not_cloudformation.json'],
  badJson: ['templates', 'bad.json'],
  badYaml: ['templates', 'bad.yaml'],
  overrideYaml: ['templates', 'override.yaml'],
  overrideSpec: ['override_spec', 'required.json'],
  appendYaml: ['templates', 'append.yaml'],
  appendRules: ['append_rules'],
}

const paths = Object.keys(fixtures)
  .reduce((accumulator, fixture) => {
    const acc = accumulator
    acc[fixture] = path.join(fixturesDir, ...(fixtures[fixture]))
    return acc
  }, {})

describe('The CFN Lint provider for Linter', () => {
  const { lint } = require('../lib/atom-cfn-lint.js').provideLinter()

  beforeEach(async () => {
    atom.workspace.destroyActivePaneItem()
    waitsForPromise(() =>
      Promise.all([
        atom.packages.activatePackage('atom-cfn-lint'),
        atom.packages.activatePackage('language-json'),
        atom.packages.activatePackage('language-yaml'),
      ]))
  })

  describe('returns results when lint issues are found', () => {
    it('finds something wrong with bad.yaml', async () => {
      const editor = await atom.workspace.open(paths.badYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(16)
      expect(messages[0].severity).toBeDefined()
      expect(messages[0].severity).toEqual('error')
      expect(messages[0].excerpt).toBeDefined()
      expect(messages[0].location.file).toBeDefined()
      expect(messages[0].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[0].location.position).toBeDefined()
      expect(messages[1].severity).toBeDefined()
      expect(messages[1].severity).toEqual('warning')
      expect(messages[1].excerpt).toBeDefined()
      expect(messages[1].location.file).toBeDefined()
      expect(messages[1].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[1].location.position).toBeDefined()
      expect(messages[2].severity).toBeDefined()
      expect(messages[2].severity).toEqual('error')
      expect(messages[2].excerpt).toBeDefined()
      expect(messages[2].location.file).toBeDefined()
      expect(messages[2].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[2].location.position).toBeDefined()
      expect(messages[3].severity).toBeDefined()
      expect(messages[3].severity).toEqual('error')
      expect(messages[3].excerpt).toBeDefined()
      expect(messages[3].location.file).toBeDefined()
      expect(messages[3].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[3].location.position).toBeDefined()
      expect(messages[4].severity).toBeDefined()
      expect(messages[4].severity).toEqual('error')
      expect(messages[4].excerpt).toBeDefined()
      expect(messages[4].location.file).toBeDefined()
      expect(messages[4].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[4].location.position).toBeDefined()
      expect(messages[5].severity).toBeDefined()
      expect(messages[5].severity).toEqual('error')
      expect(messages[5].excerpt).toBeDefined()
      expect(messages[5].location.file).toBeDefined()
      expect(messages[5].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[5].location.position).toBeDefined()
      expect(messages[6].severity).toBeDefined()
      expect(messages[6].severity).toEqual('error')
      expect(messages[6].excerpt).toBeDefined()
      expect(messages[6].location.file).toBeDefined()
      expect(messages[6].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[6].location.position).toBeDefined()
      expect(messages[7].severity).toBeDefined()
      expect(messages[7].severity).toEqual('error')
      expect(messages[7].excerpt).toBeDefined()
      expect(messages[7].location.file).toBeDefined()
      expect(messages[7].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[7].location.position).toBeDefined()
      expect(messages[8].severity).toBeDefined()
      expect(messages[8].severity).toEqual('error')
      expect(messages[8].excerpt).toBeDefined()
      expect(messages[8].location.file).toBeDefined()
      expect(messages[8].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[8].location.position).toBeDefined()
      expect(messages[9].severity).toBeDefined()
      expect(messages[9].severity).toEqual('error')
      expect(messages[9].excerpt).toBeDefined()
      expect(messages[9].location.file).toBeDefined()
      expect(messages[9].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[9].location.position).toBeDefined()
      expect(messages[10].severity).toBeDefined()
      expect(messages[10].severity).toEqual('error')
      expect(messages[10].excerpt).toBeDefined()
      expect(messages[10].location.file).toBeDefined()
      expect(messages[10].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[10].location.position).toBeDefined()
      expect(messages[11].severity).toBeDefined()
      expect(messages[11].severity).toEqual('error')
      expect(messages[11].excerpt).toBeDefined()
      expect(messages[11].location.file).toBeDefined()
      expect(messages[11].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[11].location.position).toBeDefined()
      expect(messages[12].severity).toBeDefined()
      expect(messages[12].severity).toEqual('error')
      expect(messages[12].excerpt).toBeDefined()
      expect(messages[12].location.file).toBeDefined()
      expect(messages[12].location.file).toMatch(/.+bad\.yaml$/)
      expect(messages[12].location.position).toBeDefined()
    })

    it('finds something wrong with bad.json', async () => {
      const editor = await atom.workspace.open(paths.badJson)
      const messages = await lint(editor)

      expect(messages.length).toBe(23)
      expect(messages[0].severity).toBeDefined()
      expect(messages[0].severity).toEqual('error')
      expect(messages[0].excerpt).toBeDefined()
      expect(messages[0].location.file).toBeDefined()
      expect(messages[0].location.file).toMatch(/.+bad\.json/)
      expect(messages[0].location.position).toBeDefined()
    })
  })

  describe('doesnt return failures on good files', () => {
    it('it doesn\'t return results for disabled rule for good.yaml', async () => {
      const editor = await atom.workspace.open(paths.goodYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(0)
    })

    it('it doesn\'t return results for disabled rule for good.json', async () => {
      const editor = await atom.workspace.open(paths.goodYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(0)
    })
  })

  describe('doesnt check Non CloudFormation Templates', () => {
    it('it doesnt find something wrong with not_cloudformation.yaml', async () => {
      const editor = await atom.workspace.open(paths.nonCfnYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(0)
    })

    it('it doesnt find something wrong with not_cloudformation.json', async () => {
      const editor = await atom.workspace.open(paths.nonCfnJson)
      const messages = await lint(editor)

      expect(messages.length).toBe(0)
    })
  })

  describe('disable rule', () => {
    beforeEach(async () => {
      atom.config.set('atom-cfn-lint.ignoreRules', ['E3012'])
    })

    it('it doesn\'t return results for disabled rule for bad.yaml', async () => {
      const editor = await atom.workspace.open(paths.badYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(13)
    })

    it('it doesn\'t return results for disabled rule for bad.json', async () => {
      const editor = await atom.workspace.open(paths.badJson)
      const messages = await lint(editor)

      expect(messages.length).toBe(1)
    })
  })

  describe('override spec', () => {
    beforeEach(async () => {
      atom.config.set('atom-cfn-lint.overrideSpecPath', paths.overrideSpec)
    })

    it('it returns errors when overriding the spec for override.yaml', async () => {
      const editor = await atom.workspace.open(paths.overrideYaml)
      const messages = await lint(editor)

      expect(messages.length).toBe(1)
    })
  })

  describe('append rules', () => {
    beforeEach(async () => {
      atom.config.set('atom-cfn-lint.appendRules', [paths.appendRules])
    })

    it('it returns errors when appending rules to append.yaml', async () => {
      const editor = await atom.workspace.open(paths.appendYaml)
      const messages = await lint(editor)
      console.log(messages)

      expect(messages.length).toBe(2)
    })
  })
})

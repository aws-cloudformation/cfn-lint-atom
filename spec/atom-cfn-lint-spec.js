'use babel';

import * as path from 'path';

const badYamlPath = path.join(__dirname, 'fixtures', 'bad.yaml');
const goodYamlPath = path.join(__dirname, 'fixtures', 'good.yaml');
const nonCloudFormationYamlPath = path.join(__dirname, 'fixtures', 'not_cloudformation.yaml');
const badJsonPath = path.join(__dirname, 'fixtures', 'bad.json');
const goodJsonPath = path.join(__dirname, 'fixtures', 'good.json');
const nonCloudFormationJsonPath = path.join(__dirname, 'fixtures', 'not_cloudformation.json');

describe('The CFN Lint provider for Linter', () => {
  const { lint } = require(path.join('..', 'lib', 'atom-cfn-lint.js')).provideLinter();

  beforeEach(() => {
    atom.workspace.destroyActivePaneItem();
    waitsForPromise(() =>
      Promise.all([
        atom.packages.activatePackage('atom-cfn-lint'),
        atom.packages.activatePackage('language-json'),
        atom.packages.activatePackage('language-yaml'),
      ]));
  });

  describe('checks bad.yaml', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(badYamlPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('finds something wrong with bad.yaml', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(13);
          expect(messages[0].severity).toBeDefined();
          expect(messages[0].severity).toEqual('error');
          expect(messages[0].excerpt).toBeDefined();
          expect(messages[0].location.file).toBeDefined();
          expect(messages[0].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[0].location.position).toBeDefined();
          expect(messages[1].severity).toBeDefined();
          expect(messages[1].severity).toEqual('warning');
          expect(messages[1].excerpt).toBeDefined();
          expect(messages[1].location.file).toBeDefined();
          expect(messages[1].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[1].location.position).toBeDefined();
          expect(messages[2].severity).toBeDefined();
          expect(messages[2].severity).toEqual('error');
          expect(messages[2].excerpt).toBeDefined();
          expect(messages[2].location.file).toBeDefined();
          expect(messages[2].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[2].location.position).toBeDefined();
          expect(messages[3].severity).toBeDefined();
          expect(messages[3].severity).toEqual('error');
          expect(messages[3].excerpt).toBeDefined();
          expect(messages[3].location.file).toBeDefined();
          expect(messages[3].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[3].location.position).toBeDefined();
          expect(messages[4].severity).toBeDefined();
          expect(messages[4].severity).toEqual('error');
          expect(messages[4].excerpt).toBeDefined();
          expect(messages[4].location.file).toBeDefined();
          expect(messages[4].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[4].location.position).toBeDefined();
          expect(messages[5].severity).toBeDefined();
          expect(messages[5].severity).toEqual('error');
          expect(messages[5].excerpt).toBeDefined();
          expect(messages[5].location.file).toBeDefined();
          expect(messages[5].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[5].location.position).toBeDefined();
          expect(messages[6].severity).toBeDefined();
          expect(messages[6].severity).toEqual('error');
          expect(messages[6].excerpt).toBeDefined();
          expect(messages[6].location.file).toBeDefined();
          expect(messages[6].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[6].location.position).toBeDefined();
          expect(messages[7].severity).toBeDefined();
          expect(messages[7].severity).toEqual('error');
          expect(messages[7].excerpt).toBeDefined();
          expect(messages[7].location.file).toBeDefined();
          expect(messages[7].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[7].location.position).toBeDefined();
          expect(messages[8].severity).toBeDefined();
          expect(messages[8].severity).toEqual('error');
          expect(messages[8].excerpt).toBeDefined();
          expect(messages[8].location.file).toBeDefined();
          expect(messages[8].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[8].location.position).toBeDefined();
          expect(messages[9].severity).toBeDefined();
          expect(messages[9].severity).toEqual('error');
          expect(messages[9].excerpt).toBeDefined();
          expect(messages[9].location.file).toBeDefined();
          expect(messages[9].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[9].location.position).toBeDefined();
          expect(messages[10].severity).toBeDefined();
          expect(messages[10].severity).toEqual('error');
          expect(messages[10].excerpt).toBeDefined();
          expect(messages[10].location.file).toBeDefined();
          expect(messages[10].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[10].location.position).toBeDefined();
          expect(messages[11].severity).toBeDefined();
          expect(messages[11].severity).toEqual('error');
          expect(messages[11].excerpt).toBeDefined();
          expect(messages[11].location.file).toBeDefined();
          expect(messages[11].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[11].location.position).toBeDefined();
          expect(messages[12].severity).toBeDefined();
          expect(messages[12].severity).toEqual('error');
          expect(messages[12].excerpt).toBeDefined();
          expect(messages[12].location.file).toBeDefined();
          expect(messages[12].location.file).toMatch(/.+bad\.yaml$/);
          expect(messages[12].location.position).toBeDefined();
        }));
    });
  });

  describe('checks bad.yaml', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(badJsonPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('finds something wrong with bad.json', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(1);
          expect(messages[0].severity).toBeDefined();
          expect(messages[0].severity).toEqual('error');
          expect(messages[0].excerpt).toBeDefined();
          expect(messages[0].location.file).toBeDefined();
          expect(messages[0].location.file).toMatch(/.+bad\.json/);
          expect(messages[0].location.position).toBeDefined();
        }));
    });
  });

  describe('checks good.yaml', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(goodYamlPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('it doesnt find something wrong with good.yaml', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(0);
        }));
    });
  });

  describe('checks good.json', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(goodYamlPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('it doesnt find something wrong with good.json', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(0);
        }));
    });
  });

  describe('doesnt check not_cloudformation.yaml', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(nonCloudFormationYamlPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('it doesnt find something wrong with not_cloudformation.yaml', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          expect(messages.length).toBe(0);
        }));
    });
  });

  describe('doesnt check not_cloudformation.json', () => {
    let editor = null;
    beforeEach(() => {
      waitsForPromise(() =>
        atom.workspace.open(nonCloudFormationJsonPath).then((openEditor) => {
          editor = openEditor;
        }));
    });

    it('it doesnt find something wrong with not_cloudformation.json', async () => {
      waitsForPromise(() =>
        lint(editor).then((messages) => {
          console.log(messages)
          expect(messages.length).toBe(0);
        }));
    });
  });
});

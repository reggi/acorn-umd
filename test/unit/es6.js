import {parse} from 'acorn';
import umd from '../../src/acorn-umd';
import _ from 'lodash';

describe('Parsing ES6 import nodes', function() {
    let code = `
        import {a, b, c as d} from 'library';
        import foo from 'library';
        import * as foo from 'lib';

        export default function a() {}
    `;

    let ast = parse(code, {ecmaVersion: 6, sourceType: 'module'});
    let imports = umd(ast, {
        es6: true, amd: false, cjs: false
    });

    it('should find ES6 import nodes in the AST', function() {
        expect(imports).to.have.length(3);
        expect(_.all(imports, {
            type: 'ImportDeclaration'
        })).to.be.ok;
        imports.forEach(node => {
            expect(node).to.have.property('source');
            expect(node).to.have.property('specifiers');
        });
    });
});

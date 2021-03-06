import test from 'ava';
import unescapeJs from '../dist/index.js';

test('usual escape sequences', t => {
    t.is(unescapeJs('---\\0---'), '---\0---');
    t.is(unescapeJs('---\\b---'), '---\b---');
    t.is(unescapeJs('---\\f---'), '---\f---');
    t.is(unescapeJs('---\\n---'), '---\n---');
    t.is(unescapeJs('---\\r---'), '---\r---');
    t.is(unescapeJs('---\\t---'), '---\t---');
    t.is(unescapeJs('---\\v---'), '---\v---');
    t.is(unescapeJs("---\\'---"), '---\'---');
    t.is(unescapeJs('---\\"---'), '---\"---');
    t.is(unescapeJs('---\\\\---'), '---\\---');
});

test('octal escape sequences', t => {
    // '---S---' instead of '---\123---' because octal literals are prohibited in strict mode
    t.is(unescapeJs('---\\123---'), '---S---');
});

test('short hex escape sequences', t => {
    t.is(unescapeJs('---\\xAC---'), '---\xAC---');
});

test('long hex escape sequences', t => {
    t.is(unescapeJs('---\\u00A9---'), '---\u00A9---');
});

test('variable hex escape sequences', t => {
    t.is(unescapeJs('---\\u{A9}---'), '---\u{A9}---');
    t.is(unescapeJs('---\\u{2F804}---'), '---\u{2F804}---');
});
// Run: node --test src/lib/blog.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { parse } from "./blog.ts";

test("parse splits frontmatter and body, unquotes values, handles CRLF", () => {
  const [meta, body] = parse('---\r\ntitle: "A: B"\r\ndate: 2026-10-09\r\n---\r\n\r\nHello');
  assert.deepEqual(meta, { title: "A: B", date: "2026-10-09" });
  assert.equal(body.trim(), "Hello");
});

test("parse without frontmatter returns the whole file as body", () => {
  assert.deepEqual(parse("# Hi"), [{}, "# Hi"]);
});

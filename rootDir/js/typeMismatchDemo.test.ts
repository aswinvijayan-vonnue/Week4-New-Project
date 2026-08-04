import { findLength } from './typeMismatchDemo';
test('Testing with array of numbers-valid', () => {
  expect(findLength([3, 6, 10])).toBe(3);
});
// test('Testing with array of string-invalid', () => {
//   expect(findLength['a']).toBe(1);
// }); compile time error: Show TypeScript catches type mismatches in tests - passing wrong types to a helper is a
//compile error

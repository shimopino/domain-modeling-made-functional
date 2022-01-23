const areEqual = <T>(x: T, y: T) => x === y;

// 同じ型での等価性検証を行なっている
console.log(areEqual(1, 1));
// 以下はコンパイルエラーが発生する。
// コードを実行するためにとりあえずエラーを無視している
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(areEqual(1, '1'));

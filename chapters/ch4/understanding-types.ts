/**
 * Understanding Functions
 */

const areEqual = <T>(x: T, y: T) => x === y;

// 同じ型での等価性検証を行なっている
console.log(areEqual(1, 1));
// 以下はコンパイルエラーが発生する。
// コードを実行するためにとりあえずエラーを無視している
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(areEqual(1, '1'));

/**
 * Composition of Types
 */

type AppleVariety = 'GOldenDelicious' | 'GrannySmith' | 'Fuji';
type BananaVariaty = 'Cavendish' | 'GrosMichel' | 'Manzano';
type CherryVariaty = 'Montmorency' | 'Bing';

// AND
type FruitSalad = {
  apple: AppleVariety;
  banana: BananaVariaty;
  cherries: CherryVariaty;
};

const sampleFruitSalad: FruitSalad = {
  apple: 'Fuji',
  banana: 'Cavendish',
  cherries: 'Bing',
};

console.log(sampleFruitSalad);

// OR
type FruitSnack =
  | { apple: AppleVariety }
  | { banana: BananaVariaty }
  | { cherries: CherryVariaty };

const sampleFruitSnack1: FruitSnack = {
  apple: 'Fuji',
};

console.log(sampleFruitSnack1.apple);

const sampleFruitSnack: FruitSnack = {
  apple: 'Fuji',
  banana: 'GrosMichel',
};

// これはコンパイルエラーが発生する
// オブジェクトの生成時に複数のプロパティを指定しているため、怒られている
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(sampleFruitSnack.banana);

// Simple Types
type Phantomic<T, U extends string> = T & { [key in U]: never };

type ProductCode = Phantomic<string, 'ProductCode'>;
type Address = Phantomic<string, 'Address'>;

const productCode = 'product-code-value' as ProductCode;
const address = 'address-value' as Address;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
console.log(productCode === address);

const checkProductCodeExists = (
  unvalidatedProductCode: string,
): ProductCode => {
  return unvalidatedProductCode as ProductCode;
};

const checkPrice = (productCode: ProductCode) => {
  return productCode;
};

const validatedProductCode = checkProductCodeExists('44-1234');
checkPrice(validatedProductCode);

export default function stringProduct(amount) {
  if (Number(amount.toString()
    .slice(-1)) === 1) {
    return 'товар';
  }
  if (Number(amount.toString() >= 11 && Number(amount.toString() <= 20))) {
    return 'товаров';
  } if (Number(amount.toString()
    .slice(-1)) >= 2 && Number(amount.toString()
    .slice(-1)) <= 4) {
    return 'товара';
  }
  return 'товаров';
}

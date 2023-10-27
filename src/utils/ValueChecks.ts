const isNumeric = (data: string) => {
  if (isNaN(Number(data.toString()))) {
    return false;
  }

  return true;
};

//public methods

/**
 * checks if is numeric AND greater than 0
 */
const isCcValid = (data: string) => {
  const aux = isNumeric(data);
  if (Number(data) < 0) return false;

  return aux;
};

const isPriceValid = (data: number) => {
  if (data < 0) return false;
  return true;
};

const isPlateValid = (data: string) => {
  if (data.length !== 6) return false;
  return true;
};

const isValidDiscount = (data: number) => {
  if (data >= 0 && data <= 100) return true;
  return false;
};
export { isCcValid, isPriceValid, isPlateValid, isValidDiscount };

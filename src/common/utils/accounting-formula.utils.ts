import { Decimal } from 'decimal.js';

export const GSTCollectedOnSalesAmountFormula = (
  receiptAmount: number,
  totalTaxRate: number,
  gstRate: number,
): number => {
  if (gstRate <= 0) return 0;

  const base = new Decimal(receiptAmount).div(new Decimal(1).add(totalTaxRate));
  const gstAmount = base.mul(gstRate);

  return gstAmount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const PSTCollectedOnSalesAmountFormula = (
  receiptAmount: number,
  totalTaxRate: number,
  pstRate: number,
): number => {
  if (pstRate <= 0) return 0;

  const base = new Decimal(receiptAmount).div(new Decimal(1).add(totalTaxRate));
  const pstAmount = base.mul(pstRate);

  return pstAmount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const GSTOnPaintersQualityAmountFormula = (
  fee: number,
  gstRate: number,
): number => {
  if (fee === 0 || gstRate <= 0) return 0;

  const gstAmount = new Decimal(fee).mul(gstRate);

  return gstAmount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const WarrantyHoldbackAmountFormula = (
  warrantyHoldbackRate: number,
  paymentNetSales: number,
): number => {
  return new Decimal(warrantyHoldbackRate)
    .mul(paymentNetSales)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toNumber();
};

export const PaymentNetSalesFormula = (
  grossPaymentAmount: number,
  totalTaxRate: number,
): number => {
  const base = new Decimal(grossPaymentAmount).div(
    new Decimal(1).add(totalTaxRate),
  );
  return base.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const CreditToManagerAmountFormula = ({
  apManagerFinancialAmount,
  gstCollectedAmount,
  gstOnPaintersQualityAmount,
  paintersQualityFees,
  pstCollectedAmount,
  receiptAmount,
  warrantyHoldbackAmount,
}: {
  apManagerFinancialAmount: number;
  gstCollectedAmount: number;
  gstOnPaintersQualityAmount: number;
  paintersQualityFees: number;
  pstCollectedAmount: number;
  receiptAmount: number;
  warrantyHoldbackAmount: number;
}): number => {
  const creditAmount = new Decimal(receiptAmount)
    .minus(gstCollectedAmount)
    .minus(pstCollectedAmount)
    .minus(paintersQualityFees)
    .minus(gstOnPaintersQualityAmount)
    .minus(apManagerFinancialAmount)
    .minus(warrantyHoldbackAmount);

  return creditAmount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const ApManagerFinancialAmountFormula = (
  receiptAmount: number,
  apmServiceFeeChargeOutRate: number,
) => {
  return Decimal(receiptAmount)
    .mul(apmServiceFeeChargeOutRate)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toNumber();
};

export const ExpenseAmountFormula = (
  subTotal: number,
  gstRate: number,
  pstRate: number,
) => {
  return new Decimal(subTotal)
    .add(Decimal(subTotal).mul(gstRate))
    .add(Decimal(subTotal).mul(pstRate))
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toNumber();
};

export const NewPriceFromTaxFormula = (
  total: number,
  discount: number,
  newTax: number,
): number => {
  // Reverse formula: price = total / (1 + tax / 100) + discount
  const totalDec = new Decimal(total);
  const discountDec = new Decimal(discount);
  const taxRate = new Decimal(newTax).div(100);

  const price = totalDec.div(taxRate.add(1)).add(discountDec);

  return price.toNumber();
};

export const NewTaxFromPriceFormula = (
  total: number,
  newPrice: number,
  discount: number,
): number => {
  const totalDec = new Decimal(total);
  const priceDec = new Decimal(newPrice);
  const discountDec = new Decimal(discount);

  const base = priceDec.sub(discountDec);
  if (base.isZero()) return 0;
  // Reverse formula: tax% = [(total / base) - 1] × 100

  const tax = totalDec.div(base).sub(1).mul(100);

  return tax.toNumber();
};

// @ts-check

// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'purchase.payment-customization.run' extension target
/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
    // Check if any item in the cart has a specific tag
    const hasSpecificTag = input.cart.lines.some(item => {
      const product = item.merchandise.product
      return product.hasAnyTag
    });

  // Find the Afterpay method to hide
  const hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("AfterPay"))

  if (!hidePaymentMethod || !hasSpecificTag) {
    return NO_CHANGES;
  }

  return {
    operations: [{
      hide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  };
};

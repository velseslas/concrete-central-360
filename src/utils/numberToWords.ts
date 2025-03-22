
/**
 * Converts a number to French words
 * @param n Number to convert to words
 * @returns String representation of the number in French
 */
export const numberToWords = (n: number): string => {
  const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
  const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
  
  const convertLessThanThousand = (num: number): string => {
    if (num === 0) return "";
    
    let result = "";
    
    // Hundreds
    if (num >= 100) {
      if (Math.floor(num / 100) === 1) {
        result += "cent ";
      } else {
        result += units[Math.floor(num / 100)] + " cent ";
      }
      num %= 100;
    }
    
    // Tens and units
    if (num >= 10) {
      if (num < 20) {
        result += teens[num - 10];
        return result.trim();
      } else {
        const ten = Math.floor(num / 10);
        const unit = num % 10;
        
        if (ten === 7 || ten === 9) {
          result += tens[ten - 1] + "-";
          result += teens[unit];
        } else {
          result += tens[ten];
          if (unit > 0) {
            result += "-" + units[unit];
          }
        }
      }
    } else if (num > 0) {
      result += units[num];
    }
    
    return result.trim();
  };

  if (n === 0) return "zéro";
  
  let result = "";
  
  // Millions
  if (n >= 1000000) {
    const millions = Math.floor(n / 1000000);
    if (millions === 1) {
      result += "un million ";
    } else {
      result += convertLessThanThousand(millions) + " millions ";
    }
    n %= 1000000;
  }
  
  // Thousands
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    if (thousands === 1) {
      result += "mille ";
    } else {
      result += convertLessThanThousand(thousands) + " mille ";
    }
    n %= 1000;
  }
  
  // Rest
  result += convertLessThanThousand(n);
  
  return result.trim();
};

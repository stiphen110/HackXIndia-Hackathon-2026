import type { EligibilityResult, Rule, Scheme, UserAnswers } from './types';

function checkCondition(userValue: any, condition: Rule['condition'], ruleValue: Rule['value']): boolean {
  if (userValue === undefined || userValue === null) return false;
  switch (condition) {
    case '===':
      return userValue === ruleValue;
    case '>=':
      return userValue >= ruleValue;
    case '<=':
      return userValue <= ruleValue;
    case 'in':
      return Array.isArray(ruleValue) && ruleValue.includes(userValue);
    default:
      return false;
  }
}

export function calculateEligibility(answers: UserAnswers, schemes: Scheme[]): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  for (const scheme of schemes) {
    const metCriteria: Rule[] = [];
    const unmetCriteria: Rule[] = [];
    
    scheme.eligibility.forEach(rule => {
      const userAnswer = answers[rule.key];
      if (checkCondition(userAnswer, rule.condition, rule.value)) {
        metCriteria.push(rule);
      } else {
        unmetCriteria.push(rule);
      }
    });

    const score = scheme.eligibility.length > 0 
      ? (metCriteria.length / scheme.eligibility.length) * 100
      : 100;

    results.push({
      scheme,
      isEligible: unmetCriteria.length === 0,
      score,
      metCriteria,
      unmetCriteria,
    });
  }
  
  return results.sort((a, b) => b.score - a.score);
}

import { Injectable } from '@angular/core';
import { Investment } from '../models/investment.model';
import { AnnualData } from '../models/annual-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  private annualData!: AnnualData[];
  dataChange = new Subject<AnnualData[]>();

  constructor() {}

  get investmentResults() {
    return this.annualData;
  }

  calculateInvestment(investment: Investment) {
    this.calculateInvestmentResults(investment);
    this.dataChange.next(this.annualData);
  }

  private calculateInvestmentResults(investment: Investment) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      investment;
    const annualData: AnnualData[] = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.annualData = annualData;
  }
}

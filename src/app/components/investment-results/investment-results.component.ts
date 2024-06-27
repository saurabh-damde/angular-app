import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnualData } from '../../models/annual-data.model';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent implements OnInit, OnDestroy {
  annualData!: AnnualData[];
  dataSub!: Subscription;

  constructor(private invService: InvestmentService) {}
  ngOnInit(): void {
    this.dataSub = this.invService.dataChange.subscribe(
      (data) => (this.annualData = data)
    );
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}

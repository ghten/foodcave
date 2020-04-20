import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { TraceabilityService } from './../../services/traceability.service';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
      dateInput: 'YYYY-MM-DD',
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'YYYY/MM/DD',
      monthYearA11yLabel: 'MM YYYY',
  },
};

import * as AppConfig from '../../config';

@Component({
  selector: 'app-traceability',
  templateUrl: './traceability.component.html',
  styleUrls: ['./traceability.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})

export class TraceabilityComponent implements OnInit {

  date = new FormControl(moment());
  public results: any;
  public photoUrl: string;

  constructor(private traceabilityservice: TraceabilityService) {
    const cfg = AppConfig.cfg;

    this.photoUrl = cfg.photo_url;
   }

  ngOnInit(): void { }

  selectChanged(data){
    const date = moment(data.value).format('YYYY-MM-DD');

    this.traceabilityservice.getTraceabilities(date).subscribe(data => {
      this.results = data;
    })
  }
}

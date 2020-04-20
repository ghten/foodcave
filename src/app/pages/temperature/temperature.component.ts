
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

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

import { TemperatureService } from './../../services/temperature.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class TemperatureComponent implements OnInit {

  date = new FormControl(moment());
  public isHidden: boolean;
  public temperatureForm: FormGroup;
  public result: string;
  public resultExist: boolean;

  constructor(private formBuilder: FormBuilder, private temperatureservice: TemperatureService) {
    this.isHidden = false;
    this.resultExist = false;

   }

  ngOnInit(): void {
    this.temperatureForm = this.formBuilder.group({
      temperature: ['', Validators.required],
    });

  }

  selectChanged(data) {
    const date = moment(data.value).format('YYYY-MM-DD');

    this.temperatureservice.getTemperature(date).subscribe(res => {
      if (res != null) {
        this.result = res.temperature;
        this.resultExist = true;
      } else {
        this.resultExist = false;
      }
    });
  }

  setTemperature() {

    if (this.isHidden) {
      this.isHidden = false;
    } else {
      this.isHidden = true;
    }
  }

  public onSubmit(values: any): void {
    this.temperatureservice.setTemperature(values.temperature).subscribe();
    this.isHidden = false;
    this.result = null;
    this.resultExist = false;
    this.temperatureForm.reset();
  }
}

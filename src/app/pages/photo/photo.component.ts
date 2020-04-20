import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

import { TraceabilityService } from './../../services/traceability.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {

  constructor(private traceabilityservice: TraceabilityService, public router: Router ) { }

    // latest snapshot
    public webcamImage: WebcamImage = null;

    handleImage(webcamImage: WebcamImage) {
      this.webcamImage = webcamImage;
    }

    save() {
      this.traceabilityservice.savePhoto(this.webcamImage.imageAsDataUrl).subscribe(data => {
        this.router.navigate(['/home']);
      });
    }
}

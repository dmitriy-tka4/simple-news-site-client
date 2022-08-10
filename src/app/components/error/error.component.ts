import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  errorMessage$: Observable<string | null>

  constructor(
    public errorService: ErrorService
  ) {

  }

  ngOnInit(): void {

  }

}

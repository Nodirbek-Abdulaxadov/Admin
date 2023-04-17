import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit{
  constructor (private router: ActivatedRoute,
              private route: Router,
              private toastr: ToastrService){}

  barcode: string = '000000000000';
  src: string = "https://barcodeapi.org/api/128/";

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.barcode = routeParams.get('barcode')??"";
    if (this.barcode.length > 10) {
      this.src += this.barcode;
    }
    else {
      this.toastr.error('Barcode yaratib bo\'lmadi', '', {
        timeOut: 2000,
      }).onHidden.subscribe(() => {
        this.route.navigate(['/product/add']);
      });
    }
  }

  back() {
    this.route.navigate(['/product/add']);
  }

  print() {
    const divToPrint = document.getElementById("printBody") as HTMLDivElement;
    if (divToPrint) {
      const printContents = divToPrint.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      window.location.reload();
      document.body.innerHTML = originalContents;
    }
  }
}

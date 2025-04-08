import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterService {
	constructor(private router: Router) {}

	navigateTo(url: string): void {
		this.router.navigateByUrl(url);
	}

	navigateToWithParams(url: string,  params: any): void {
		this.router.navigate([url], {queryParams: params});
	}

	navigateBack() {
		this.router.navigateByUrl('../');
	}
}
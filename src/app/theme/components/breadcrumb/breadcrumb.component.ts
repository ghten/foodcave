import { Component } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

    public pageTitle: string;
    public breadcrumbs: {
        name: string;
        url: string
    }[] = [];
    private trans: string;

    public settings: Settings;
    constructor(public appSettings: AppSettings, public router: Router, public activatedRoute: ActivatedRoute,
                public title: Title) {
            this.settings = this.appSettings.settings;
            this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = [];
                this.parseRoute(this.router.routerState.snapshot.root);
                this.pageTitle = '';
                this.breadcrumbs.forEach(breadcrumb => {
                    this.pageTitle += ' > ' + breadcrumb.name;
                });
                this.title.setTitle(this.settings.name + this.pageTitle);
            }
        });
    }

    private parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data.breadcrumb) {
            if (node.url.length) {
                let urlSegments: UrlSegment[] = [];
                node.pathFromRoot.forEach(routerState => {
                    urlSegments = urlSegments.concat(routerState.url);
                });
                const url = urlSegments.map(urlSegment => {
                    return urlSegment.path;
                }).join('/');
             }
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    public closeSubMenus() {
        const menu = document.querySelector('.sidenav-menu-outer');
        if (menu) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < menu.children[0].children.length; i++) {
                const child = menu.children[0].children[i];
                if (child) {
                    if (child.children[0].classList.contains('expanded')) {
                        child.children[0].classList.remove('expanded');
                        child.children[1].classList.remove('show');
                    }
                }
            }
        }
    }

    private nextBreadcrumd(): void {
        this.pageTitle = '';
        this.breadcrumbs.forEach(breadcrumb => {
            this.pageTitle += ' > ' + breadcrumb.name;
        });
        this.title.setTitle(this.settings.name + this.pageTitle);
    }

}

export class MenuItem {
    constructor(
       public label: string,
       public showOnMobile: boolean,
       public showOnTablet: boolean,
       public showOnDesktop: boolean,
       public route: string
    ) {}
}
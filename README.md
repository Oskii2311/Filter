# Usage

## Add service to component for exapmle:

constructor(private \_FilterService: FilterService) {}

## for specyfic key serach

ngOnInit() {

    myData = this.\_FilterService.filter(defaultdata, value, target)

}

## for global search

ngOnInit() {

    myData = this.\_FilterService.filter(defaultdata, value)

}

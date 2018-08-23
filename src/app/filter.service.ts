import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private previousFilter = [];
  constructor() {}

  filter(data: any[], value?: string, target?: string) {
    if (value) {
      if (!target) {
        target = 'global';
      }
      this.previousFilter = this.addNewFilters(value, target);
    }

    if (
      (value === '' && !target) ||
      (value === '' && target) ||
      (value === undefined && target)
    ) {
      this.previousFilter = this.removeFilter(target);

      if (this.previousFilter.length === 0) {
        return data;
      }
    }

    this.previousFilter.forEach(currentFilter => {
      if (currentFilter.target === 'global') {
        data = this.globalFilter(data, currentFilter.value);
      } else {
        data = this.specyficKeyFilter(data, currentFilter);
      }
    });

    return data;
  }

  private specyficKeyFilter(data: any[], currentFilter: any) {
    return data.filter(el => {
      if (this.isIncludeValue(el, currentFilter)) {
        return el;
      }
    });
  }

  private globalFilter(data: any[], currentFilterValue: string) {
    return data.filter(el => this.returnFilteredData(el, currentFilterValue));
  }

  private returnFilteredData(el: any, currentFilterValue: string) {
    const keys = Object.keys(el);

    return keys.find(key => this.findValue(key, currentFilterValue, el));
  }

  private findValue(key: string, currentFilterValue: string, el: any) {
    if (typeof el[key] === 'string') {
      if (el[key].toLowerCase().includes(currentFilterValue.toLowerCase())) {
        return el;
      }
    }
  }

  private isIncludeValue(el, filter) {
    if (el[filter.target].toLowerCase().includes(filter.value.toLowerCase())) {
      return true;
    }

    return false;
  }

  private addNewFilters(value: string, target: string) {
    this.previousFilter = this.previousFilter.filter(el => {
      if (el.target !== target) {
        return el;
      }
    });

    this.previousFilter.push({ value, target });

    return this.previousFilter;
  }

  private removeFilter(target: string) {
    if (!target) {
      target = 'global';
    }

    return this.previousFilter.filter(el => {
      if (el.target !== target) {
        return el;
      }
    });
  }
}

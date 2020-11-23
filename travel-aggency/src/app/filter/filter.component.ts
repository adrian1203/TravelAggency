import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Tour, TourFilter} from '../model/app-models';
import {LabelType, Options} from 'ng5-slider';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  @Input() tours: Array<Tour>;
  @Output() categoryEvent = new EventEmitter<TourFilter>()

  myFormCategory: FormGroup;
  disabledCategory = false;
  showFilterCategory = false;
  selectedCategory: Array<string> = new Array<string>()
  dropdownSettingsCategory: any = {};
  category: Array<string> = new Array<string>();


  minPrice = 0;
  maxPrice = 0;
  minValue = 0;
  maxValue = 0;
  minOpinion = 10;
  maxOpinion = 50;
  optionsPrice: Options;
  optionsOpinion: Options;
  isAllSelected = true;


  ngOnInit() {

    this.getMinAndMaxPrice();
    this.getCategory();

    this.dropdownSettingsCategory = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: this.showFilterCategory
    };
    this.myFormCategory = this.fb.group({
      category: [this.selectedCategory]
    });

    this.minValue = this.minPrice;
    this.maxValue = this.maxPrice;
    this.optionsPrice = {
      floor: this.minPrice,
      ceil: this.maxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min price:</b>  ' + value + '&#8364;';
          case LabelType.High:
            return '<b>Max price:</b>  ' + value + '&#8364;';
          default:
            return 'Price ' + value + '&#8364;';
        }
      }
    };

    this.optionsOpinion = {
      floor: 10,
      ceil: 50,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '<b>Min opinion:</b>  ' + value / 10;
          case LabelType.High:
            return '<b>Max opinion:</b>  ' + value / 10;
          default:
            return 'Opinion ' + value / 10 + ';';
        }
      }
    };
  }

  onItemSelectCategory(item: any) {
    if (this.isAllSelected) {
      this.isAllSelected = false;
      this.selectedCategory = new Array<string>();
    }
    this.selectedCategory.push(item);
    this.executeFilter();
  }

  onSelectAllCategory() {
    this.selectedCategory = this.category;
    this.executeFilter();
    this.isAllSelected = true;
  }

  onDeSelectCategory(item: any) {
    this.selectedCategory = this.selectedCategory.filter(e => e !== item);
    console.log('onDeSelect')
    if (this.selectedCategory.length === 0) {
      this.onSelectAllCategory();
    } else {
      this.executeFilter();
    }

  }

  // toogleShowFilter() {
  //   this.ShowFilter = !this.ShowFilter;
  //   this.dropdownSettings = Object.assign({}, this.dropdownSettings, {allowSearchFilter: this.ShowFilter});
  // }
  //
  // handleLimitSelection() {
  //   if (this.limitSelection) {
  //     this.dropdownSettings = Object.assign({}, this.dropdownSettings, {limitSelection: 2});
  //   } else {
  //     this.dropdownSettings = Object.assign({}, this.dropdownSettings, {limitSelection: null});
  //   }
  // }


  getCategory() {
    const tmp: Set<string> = new Set<string>();
    this.tours.forEach(e => {
      tmp.add(e.category);
    });
    this.category = Array.from(tmp);
  }

  getMinAndMaxPrice() {
    this.maxPrice = this.tours.reduce((p, c) => p.price > c.price ? p : c).price;
    this.minPrice = this.tours.reduce((p, c) => p.price < c.price ? p : c).price;
  }

  executeFilter() {
    if (this.selectedCategory.length === 0) {
      this.onSelectAllCategory();
    }
    console.log('emit');
    console.log(this.selectedCategory);
    const filter: TourFilter = new TourFilter();
    filter.category = this.selectedCategory;
    filter.minPrice = this.minValue;
    filter.maxPrice = this.maxValue;
    filter.minOpinion = this.minOpinion / 10;
    filter.maxOpinion = this.maxOpinion / 10;
    this.categoryEvent.emit(filter);
  }


}

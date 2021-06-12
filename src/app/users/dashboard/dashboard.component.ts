import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { OnpassiveService } from 'src/app/onpassive.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  doughnutChartLabels: Label[] = [];
  doughnutChartData: SingleDataSet = [0, 0, 0, 0];
  doughnutChartType: ChartType = 'doughnut';
  counts: any = {};
  employees: any[] = [];
  departments: any[] = [];
  locations: any[] = [];
  sel_loc: string = '';
  sel_dept: string = '';
  sel_age: number = 0;
  search_str: string = '';
  age_arr = Array;
  rec_per_page: number = 10;
  current_page: number = 0;
  total_rec: number = 0;
  cols: any[] = [];
  f_query: string = '';
  s_query: string = '';
  selcted_id:string='';
  constructor(
    public ops: OnpassiveService,
    public router:Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDepartmentCounts();
    this.getMasters();
    this.getEmployeesData();
    this.cols = [
      {field: '', header: 'S.No'},
      { field: 'full_name', header: 'Full Name' },
      { field: 'job_title', header: 'Job Title' },
      { field: 'department', header: 'Department' },
      { field: 'location', header: 'Location' },
      { field: 'age', header: 'Age' },
      { field: 'salary', header: 'Salary' },
      {field: '', header: 'Actions'},
    ];
  }
  getMasters() {
    this.ops.getMasters().subscribe(res => {
      let resp: any = res;
      this.departments = resp.departments;
      this.locations = resp.locations;
    }, (err) => {
      alert(err);
    })
  }
  getDepartmentCounts() {
    this.ops.departmentCounts().subscribe(res => {
      let resp: any = res;
      this.counts = resp;
      let vals: any = Object.values(resp);
      let keys: any = Object.keys(resp);
      this.doughnutChartData = vals;
      this.doughnutChartLabels = keys;
    })
  }

  getEmployeesData() {
    let limit = this.rec_per_page;
    let skip = limit * this.current_page;
    let query = this.f_query ? this.f_query : this.s_query ? this.s_query : '';
    this.ops.getEmployees(limit, skip, query).subscribe(res => {
      console.log(res);
      let resp: any = res;
      this.employees = resp.data;
      this.total_rec = resp.rec_count;
    })
  }



  onFilter() {
    this.current_page=0;
    this.s_query = '';
    this.search_str = '';
    this.f_query = '';
    // this.sel_loc?this.f_query+=`location=${this.sel_loc}&`:'';
    // this.sel_dept?this.f_query+=`department=${this.sel_dept}&`:'';
    // this.sel_age?this.f_query+=`age=${this.sel_age}&`:'';
    let q: any = {};
    this.sel_loc ? q.location = this.sel_loc : '';
    this.sel_dept ? q.department = this.sel_dept : '';
    this.sel_age ? q.age = this.sel_age : '';
    Object.keys(q).length > 0 ? this.f_query = `?filter=${JSON.stringify(q)}` : '';
    this.getEmployeesData();
  }
  onSearch() {
    if(this.search_str){
      this.current_page=0;
      this.f_query = '';
      this.sel_age = 0;
      this.sel_loc = '';
      this.sel_dept = '';
      this.s_query = `?search=${this.search_str}`;
      this.getEmployeesData();
    }
  }
  onCLearFilters(){
    this.current_page=0;
    this.f_query = '';
    this.sel_age = 0;
    this.sel_loc = '';
    this.sel_dept = '';
    this.s_query = '';
    this.search_str = '';
    this.f_query = '';
    this.getEmployeesData();
  }
onEdit(id:string){
this.router.navigate([`users/edit-employee/${id}`])
}

showConfirm(id:string) {
  this.selcted_id = id;
  this.messageService.clear();
  this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'You want to delete?'});
}

onConfirm() {
  this.messageService.clear('c');
  this.onDelete();
}

onReject() {
  this.messageService.clear('c');
  this.selcted_id = '';
}

onDelete(){
  this.ops.deleteEmployee(this.selcted_id).subscribe(res => {
    console.log(res);
    this.ops.showtoast(1,"Employee Deleted");
    this.selcted_id = '';
    this.getEmployeesData();
    this.getDepartmentCounts();
  }, (err) => {
    this.ops.showtoast(0,err);
  })
}

  paginate(e: any) {
    this.current_page = e.page;
    this.rec_per_page = e.rows;
    this.getEmployeesData();
  }
}

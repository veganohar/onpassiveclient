import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnpassiveService } from '../../onpassive.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  emp_form: any = FormGroup;
  departments:any[] = [];
  locations:any[] = [];
  eid: string = '';
  isEdit:boolean = false;
  isSubmit:boolean=false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ops: OnpassiveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initiateForm();
    this.getMasters();
    this.eid = this.activatedRoute.snapshot.params.eid;
    if (this.eid) {
      this.getEmployeeById();
    }
  }
  initiateForm(data?: any) {
    this.emp_form = this.fb.group({
      full_name: [data ? data.full_name : '', [Validators.required]],
      department: [data ? data.department : '', [Validators.required]],
      job_title: [data ? data.job_title : '', [Validators.required]],
      location: [data ? data.location : '', [Validators.required]],
      age: [data ? data.age : '', [Validators.required]],
      salary: [data ? data.salary : '', [Validators.required,Validators.max(1500000)]]
    })
  }
  get f(){
    return this.emp_form.controls;
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

  getEmployeeById() {
    this.ops.getEmployeeById(this.eid).subscribe(res => {
      let resp: any = res;
      this.initiateForm(resp.data);
    }, (err) => {
      console.log(err);
    })
  }

  onSubmit() {
    this.isSubmit=true;
    let fd = this.emp_form.value;
    this.eid ? this.updateEmployee(fd) : this.saveEmployee(fd);
  }

  saveEmployee(fd: any) {
    this.ops.createEmployee(fd).subscribe(res => {
      this.ops.showtoast(1,"Employee Created Successfully");
      this.router.navigate(['users/dashboard']);
    }, (err) => {
      this.isSubmit=false;
      this.ops.showtoast(0,err);
    })
  }

  updateEmployee(fd: any) {
    fd.id = this.eid;
    this.ops.updateEmployee(fd).subscribe(res => {
      this.ops.showtoast(1,"Employee Updated Successfully");
      this.router.navigate(['users/dashboard']);
    }, (err) => {
      this.isSubmit=false;
      this.ops.showtoast(0,err);
    })
  }
}

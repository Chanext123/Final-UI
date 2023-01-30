import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  employeeObj: EmployeeObj;
  sortBy: string;
  searchText: string;
  employeeArr : EmployeeObj[] = [];


  constructor(private router: Router) {
     this.employeeObj = new EmployeeObj();
     this.searchText = '';
     this.sortBy = '';
  }

  ngOnInit(): void {
    this.getAllEmpoyee();
  }

  logout(){
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/register']);
  }
  onSave() {
     const isData = localStorage.getItem("EmpData");
     if(isData == null) {
      const newArr = [];
      this.employeeObj.EmployeeId = 0;
      newArr.push(this.employeeObj);
      localStorage.setItem("EmpData", JSON.stringify(newArr));
     } else {
      const oldData = JSON.parse(isData);
      const newId =oldData.length + 1;
      this.employeeObj.EmployeeId = newId;
      oldData.push(this.employeeObj);
      localStorage.setItem("EmpData", JSON.stringify(oldData));
     }
     this.employeeObj = new EmployeeObj();
     this.getAllEmpoyee();
  }
  getAllEmpoyee() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      this.employeeArr = localData;
     }
  }

  onEdit(item: EmployeeObj) {
    this.employeeObj = item;
  }
  onDelete(item: EmployeeObj) {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      for (let index = 0; index < localData.length; index++) {
         if (localData[index].EmployeeId == item.EmployeeId) {
          localData.splice(0,1);
         }
      }
      localStorage.setItem("EmpData", JSON.stringify(localData));
      this.getAllEmpoyee();
     }

  }
  onSearch() {
   
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);

      //const filteredData = localData.filter((m:any) => m.FirstName == this.searchText);
     // const filteredData = localData.filter((m:any) => m.FirstName.toLowerCase() == this.searchText.toLowerCase());
      const filteredData = localData.filter((m:EmployeeObj) => m.FirstName.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase()) )
      this.employeeArr = filteredData;
    }
  }
  onSort() {
    const isData = localStorage.getItem("EmpData");
    if(isData != null) {
      const localData = JSON.parse(isData);
      if (this.sortBy == "Name") {
        const filteredData = localData.sort((a:any, b: any) => a.FirstName.localeCompare(b.FirstName))
        this.employeeArr = filteredData;
      }
      if (this.sortBy == "Technology") {
        const filteredData = localData.sort((a:any, b: any) => a.Technology.localeCompare(b.Technology))
        this.employeeArr = filteredData;
      }
    }
  }



}

export class EmployeeObj {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  Technology: string;
  Designation: string;
  Skill: string;
  Core: string;
  IsCertification: string;
  Certification: string;
  Company: string;
  FewDetails: string;
  constructor() {
    this.EmployeeId = 0;
    this.FirstName= "";
    this.LastName="";
    this.Technology= "";
    this.Designation= "";
    this.Skill= "";
    this.Certification = '';
    this.Core= "";
    this.IsCertification= "";
    this.Company= "";
    this.FewDetails= "";
  }
}




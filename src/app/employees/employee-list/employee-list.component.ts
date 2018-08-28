import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { Employee } from "../shared/employee.model";
import { element } from "protractor";

import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-employee-list",
	templateUrl: "./employee-list.component.html",
	styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent implements OnInit {
	employeeList: Employee[];
	constructor(
		private employeeService: EmployeeService,
		private tostr: ToastrService
	) {}

	ngOnInit() {
		let x = this.employeeService.getData();
		x.snapshotChanges().subscribe(item => {
			this.employeeList = [];
			item.forEach(element => {
				let y = element.payload.toJSON();
				y["$key"] = element.key;
				this.employeeList.push(y as Employee);
			});
		});
	}

	onEdit(employee: Employee) {
		this.employeeService.selectedEmployee = Object.assign({}, employee);
	}

	onDelete(key: string) {
		if (confirm("Delete the record?") === true) {
			this.employeeService.deleteEmployee(key);
			this.tostr.warning("Deleted Successfully", "Employee register");
		}
	}
}

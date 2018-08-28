import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-employee",
	templateUrl: "./employee.component.html",
	styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
	constructor(
		public employeeService: EmployeeService,
		public tostr: ToastrService
	) {}

	ngOnInit() {
		this.resetForm();
	}

	onSubmit(employeeForm: NgForm) {
		if (employeeForm.value.$key) {
			this.employeeService.updateEmployee(employeeForm.value);
		} else {
			this.employeeService.insertEmployee(employeeForm.value);
			this.resetForm(employeeForm);
			this.tostr.success("Submitted Successfully", "Employee Register");
		}
	}

	resetForm(employeeForm?: NgForm) {
		if (employeeForm) {
			employeeForm.reset();
		}
		this.employeeService.selectedEmployee = {
			$key: null,
			name: "",
			position: "",
			office: "",
			salary: 0
		};
	}
}

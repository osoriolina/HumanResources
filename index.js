
// GET para traer la info de TODOS los empleados - Employees
// para traer el id de cada empleado y poder ver los detalles de cada uno - ID Employee
let allEmployees = [];

function getEmployees() {
    $.ajax({
        "type": "GET",
        "url": "http://dummy.restapiexample.com/api/v1/employees", 
        "dataType": "json",
        "headers" : {"Content-Type": "application/json", "X-Requested-With" : "XMLHttpRequest"},
        "success" : (data) => {printEmployees(data)}, 
        "error": (error) => {console.log(error)} 

    }) 

}


function deleteEmployee(id) {
    // DELETE - para DELETE un ROW de la tabla - osea un ID Empleado
    $.ajax({
        "type": "DELETE",
        "url": "http://dummy.restapiexample.com/api/v1/delete/" + id, 
        "dataType": "json",
        "headers" : {"Content-Type": "application/json"},
        "success" : (data) => { $(`.row_${id}`).remove()}, 
        "error": (error) => {console.log(error)} 

    })
}

function addEmployee(objEmployee) {
    // POST - para agregar un nuevo empleado
    $.ajax({
        "type": "POST",
        "url": "http://dummy.restapiexample.com/api/v1/create", 
        "dataType": "json",
        "data": JSON.stringify(objEmployee), 
        "headers" : {"Content-Type": "application/json", "X-Requested-With" : "XMLHttpRequest"},
        "success" : (data) => { console.log(data)}, 
        "error": (error) => {console.log(error)} 

    })
}

function updateEmployee(id, objEmployee) { //modal - busco los inputs tengo el objeto y envio una funcion con la info
    // PUT para modificar: Name, Age, Salary de cada ID Employee
    $.ajax({
        "type": "PUT",
        "url": "http://dummy.restapiexample.com/api/v1/update/" + id, 
        "dataType": "json",
        "data": JSON.stringify(objEmployee), 
        "headers" : {"Content-Type": "application/json", "X-Requested-With" : "XMLHttpRequest"},
        "success" : (data) => { console.log(data)}, 
        "error": (error) => {console.log(error)} 

    })
}


function printEmployees(objEmployees) {

    let numPerPage = 20;

    for (let i = 0; i < numPerPage - 1; i++) {
       allEmployees.push(objEmployees[i]);

    }  

    allEmployees.forEach((employee) => {
        let addRowEmployee = `<tr class="row_${employee.id}">
                                <td><img src="">${employee.profile_image}</td>
                                <td>${employee.employee_name}</td>
                                <td>${employee.employee_salary}</td>
                                <td>${employee.employee_age}</td>
                                <td>
                                    <button data-id="${employee.id}" type="button" class="btn btn-primary zoom__properties" data-toggle="modal" data-target="#exampleModal">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button data-id="${employee.id}" type="button" class="btn btn-primary pencil__properties" data-toggle="modal" data-target="#btn_editUser">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button><button data-id="${employee.id}" class="btn btn-primary trash__properties">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>`
        $('.addRowsEmployees').append(addRowEmployee)
    });
    /////////// boton zoom/search
    
    function getEmployee(dataId) {
        let employee = {};
        for (let i = 0; i <  allEmployees.length; i++) {
            if (allEmployees[i].id === dataId){
                employee = allEmployees[i]
            }
        }      
        return employee
    }



    function infoEmployee(dataId) {

        let employee  = getEmployee(dataId)
        let addInfoEmployee = `<div class="row">
            <div class="col-2">
                <p>Name</p>
            </div>
            <div class="col-10">
                <p>${employee.employee_name}</p>
            </div>
            <div class="col-2">
                <p>Age</p>
            </div>
            <div class="col-10">
                <p>${employee.employee_age}</p>
            </div>
            <div class="col-2">
                <p>Salary</p>
            </div>
            <div class="col-10">
                <p>${employee.employee_salary}</p>
            </div>
            </div>`
                
        $('.addInfoEmployee').html(addInfoEmployee)

    }

    $('.zoom__properties').on('click',function () {
        //if (confirm("Are you sure do you want to delete this employee?")) {
            var dataId = $(this).attr("data-id");//
            //alert($(this).attr("data-id"));
            infoEmployee(dataId);
    // }
    }); 

    /////////// END boton zoom/search

    /////////// boton pencil EDIT


    function editInfoEmployee(dataId) {
        let employee = getEmployee(dataId);
        let editInputEmployee = `<div class="row">
            <div class="col-2">
                <p>Name</p>
            </div>
            <div class="col-10">
                <input name="employee_name" type="text" value="${employee.employee_name}">
                <input name="id" type="hidden" value="${employee.id}">
            </div>
            <div class="col-2">
                <p>Age</p>
            </div>
            <div class="col-10">
                <input name="employee_age" type="text" value="${employee.employee_age}">
            </div>
            <div class="col-2">
                <p>Salary</p>
            </div>
            <div class="col-10">
                <input name="employee_salary" type="text" value="${employee.employee_salary}">
            </div>
        </div>`
    $('.editEmployee').html(editInputEmployee)
          

    $('.btn_save_changes').on('click',function () {
        //if (confirm("Are you sure do you want to delete this employee?")) {
            let dataId = $('.editEmployee input[name="id"]').val();//
            let name = $('.editEmployee input[name="employee_name"]').val();//
            let age = $('.editEmployee input[name="employee_age"]').val();//
            let salary = $('.editEmployee input[name="employee_salary"]').val();//
            let objEmployee = {id:dataId, employee_name:name, employee_age:age, employee_salary:salary};
            //alert(dataId)
            
            updateEmployee(dataId, objEmployee);
    // }
    }); 

    }

    $('.pencil__properties').on('click',function () {
        //if (confirm("Are you sure do you want to delete this employee?")) {
            var dataId = $(this).attr("data-id");//
            editInfoEmployee(dataId);
    // }
    }); 

    ///////////// FIN boton  pencil EDIT

    $('.trash__properties').on('click',function () {
        if (confirm("Are you sure do you want to delete this employee?")) {
            var dataId = $(this).attr("data-id");
            //alert($(this).attr("data-id"));
            deleteEmployee(dataId);
        }
    });   

    ///////////// boton ADD EMPLOYEE

    function addNewEmployee() {
      //  let employee = getEmployee();
        let addEmployee = `<div class="row">
            <div class="col-2">
                <p>Name</p>
            </div>
            <div class="col-10">
                <input class="add_name" name="employee_name" type="text">
                <input class="add_id" name="id" type="hidden">
            </div>
            <div class="col-2">
                <p>Age</p>
            </div>
            <div class="col-10">
                <input class="add_age" name="employee_age" type="text">
            </div>
            <div class="col-2">
                <p>Salary</p>
            </div>
            <div class="col-10">
                <input class="add_salary" name="employee_salary" type="text">
            </div>
        </div>`
    $('.addEmployee').html(addEmployee)


    }

    $('.btn_add_employee').on('click',function () {
        //editInfoEmployee();
        addNewEmployee();
      
    
}); 


    $('.btn_save_changes').on('click',function () {
            //editInfoEmployee();
            //let dataId = $('.add_id').val();//
            let name = $('.add_name').val();//
            let age = $('.add_age').val();//
            let salary = $('.add_salary').val();//
            let objEmployee = {name:name, age:age, salary:salary};
            console.log(objEmployee)
            addEmployee(objEmployee);
        
    }); 


    ///////////// END boton ADD EMPLOYEE
     
    console.log(allEmployees)
}



$(window).on('load', () => {
    getEmployees()
})

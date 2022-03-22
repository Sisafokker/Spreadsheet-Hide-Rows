// set GLOBALS
var ss = SpreadsheetApp.getActiveSpreadsheet();  
var sh0 = ss.getSheets()[0];
var sh1 = ss.getSheets()[1];
var contrasena = "" // Defino variable que desp voy a necesitar


function onOpen() {
  var menu = [{name: "Mostrar Filas", functionName: "mostrarRows"},
    {name: "Ocultar Filas", functionName: "ocultarRows"},
    {name: "OJO - RESETEO PLANILLA", functionName: "showPrompt"}];
  ss.addMenu("<<<COLEGIO>>>", menu);
}


/* 
Oculta las celdas que tenga un valor === 0 en la columna F
Graba la demora como valor en la columna I
*/

function onEdit() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();   // get active spreadsheet
  var sheet = ss.getSheets()[0];  // get first sheet
  var data = sheet.getDataRange();  // get data
  var pedidos = sheet.getRange(1,4).getValue();  // Cel (1,3) has the "=count()"  formula, which counts the amount of rows with data
  
  Logger.log(pedidos+5);

  // itterate through columns
  for(var i=3; i<=(pedidos+5); i++) {
     if(data.getCell(i, 11).getValue() === 0) {          // verifies the content of the cell is exactly equal to 0.
        sheet.hideRows(i);
        if(data.getCell(i, 13).getValue() === "") {    // If Column k has no data, then
          var copyDemora = data.getCell(i,9).getValue();      // gets the value of column 8 on row "H"
          var paste = sheet.getRange(i, 13);               // gets the range (i, 11)
          paste.setValue(copyDemora);                         // pastes the value of "Copy" var.
        } 
    }
  }
}

function ocultarRows(){
onEdit()
}

function mostrarRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange();
  var lastRow = data.getLastRow();
  sheet.showRows(1, lastRow);
}

function reseteoPlanilla() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var dataSpecific = sheet.getRange("L3:N")             // Defino rango fijo
  // Logger.log(dataSpecific)
  var clear = dataSpecific.clearContent()                  // Borro el contenido del rango definido
}


function showPrompt() {
  var ss = SpreadsheetApp.openById("17bL6kklu1LCr49654H2rmxbIzWngdmg1bp_QCNqqw14");
  var sheet = ss.getSheetByName("Contraseña");
  var data = sheet.getRange("A2");
  var values = data.getValue();
  var contrasena = values             // Define el valor de la variable borrar con la celda de la planilla arriba mencionada
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
      'RESETEO DE LA PLANILLA - Cuidado!!',
      'INGRESE LA CONTRASEÑA:',
      ui.ButtonSet.OK_CANCEL);
 // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
      if(text === contrasena) {
      Logger.log("Contraseña Correcta");
      reseteoPlanilla();                                    // Activa la funcion que resetea la planilla. 
  }
   else if (text !== contrasena){
    //  Logger.log("Contraseña Incorrecta");
    //  Logger.log("Incorrecta:" + text);
     ui.alert('Contraseña Incorrecta');
   }
   else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('Operacion cancelada. No se realizo ningun cambio.');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('No se realizo ninguna accion.');
  }
 }
}
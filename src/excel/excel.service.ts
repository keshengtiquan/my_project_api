import { Injectable } from '@nestjs/common';
import * as Excel from 'exceljs';

@Injectable()
export class ExcelService {
  async parseExcel(file) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheetNames = [];
    for (const worksheet of workbook.worksheets) {
      worksheetNames.push(worksheet.name);
    }

    const worksheet = workbook.getWorksheet(worksheetNames[0]);
    const rows = []; 

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) {
        return; 
      }
      const rowData = {};
      row.eachCell({ includeEmpty: true }, (cell, col) => {
        const key = this.columnIndexToColumnLetter(col);
        rowData[key] = cell.value;
      });
      rows.push(rowData);
    });

    return rows;
  }

  columnIndexToColumnLetter(index: number): string {
    let columnLetter = '';
    while (index > 0) {
      const remainder = (index - 1) % 26;
      columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
      index = Math.floor((index - 1) / 26);
    }
    return columnLetter;
  }
}

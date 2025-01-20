import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ColumnConfig } from '../../models/components-models/table/column-config';
import { TableConfig } from '../../models/components-models/table/table-config';

/** Table component for show table of data
 *  Inputs: tableConfig (data, columns config...)
 *  Outputs: editClicked and deleteClicked clicked buttons
 */
@Component({
  selector: 'app-system-table',
  templateUrl: './system-table.component.html',
  styleUrls: ['./system-table.component.scss'],
})
export class SystemTableComponents implements OnInit, AfterViewInit, OnChanges {
  /**Table config  */
  @Input() tableConfig!: TableConfig;

  /** Event emitter when click to edit button on row */
  @Output() editClicked: EventEmitter<any> = new EventEmitter<any>();

  /** Event emitter when click to delete button on row */
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter<any>();

  /** Sort reference */
  @ViewChild(MatSort) sort!: MatSort;

  /** Table data source */
  dataSource = new MatTableDataSource<any>();

  /** Columns names array */
  columnsNames: string[] = [];

  /**
   * Constructor
   * @param _liveAnnouncer Service for sort
   */
  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    // Call to prepare data function
    this.prepareData(this.tableConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if table config data has changed and if true update the view
    if (this.tableConfig && changes['tableConfig']) {
      let oldValue =
        changes['tableConfig'].previousValue != undefined
          ? JSON.stringify(changes['tableConfig'].previousValue)
          : JSON.stringify(changes['tableConfig'].previousValue);
      let newValue = JSON.stringify(changes['tableConfig'].currentValue);

      if (oldValue && !oldValue.includes(newValue)) {
        this.prepareData(changes['tableConfig'].currentValue);
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /**
   * Announce the change in sort state for assistive technology
   * @param sortState Sort state
   */
  public announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /**
   * /Prepare data function, for add action column by condition
   *  and init data when there is CRUD operation on table
   * @param data Table config data
   */
  prepareData(data: TableConfig): void {
    // Add action column when table is deletable or editable and if this column not already  exist
    if (
      (this.tableConfig.deletable || this.tableConfig.editable) &&
      !this.tableConfig.columnConfig.find(
        (x: ColumnConfig) => x.columnType == 'actions'
      )
    ) {
      let actionColumn = new ColumnConfig('action', '', 'actions');

      if (!this.tableConfig.columnConfig.includes(actionColumn)) {
        this.tableConfig.columnConfig.push(actionColumn);
      }
    }

    // Init columns names array id not already initialized
    if (this.columnsNames.length <= 0) {
      this.tableConfig.columnConfig.forEach((column) => {
        this.columnsNames.push(column.name);
      });
    }

    // Update view
    this.dataSource = new MatTableDataSource(data.data);
    this.dataSource.sort = this.sort;
  }

  /**
   * Event emitter invoke with selected row when edit button clicked
   * @param row Selected row data
   */
  editButtonClicked(e: any, row: any) {
    this.editClicked.emit({ clickEvent: e, selectedRow: row });
  }

  /**
   *  Event emitter invoke with selected row id when delete button clicked
   * @param row Selected row data for get the primary key value
   */
  deleteButtonClicked(e: any, row: any) {
    this.deleteClicked.emit({ clickEvent: e, selectedRow: row });
  }
}

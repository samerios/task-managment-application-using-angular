import { ColumnConfig } from "./column-config";

/**
 * Table config model use in table component
 */
export class TableConfig {

    /**
     * Constructor
     * @param data Table data (array of objects)
     * @param columnConfig Table columns config array
     * @param primaryKeyColumn Primary key column name, by default is id
     * @param deletable Is table deletable?
     * @param editable Is table editable?
     */
    constructor(data: any[],
        columnConfig: ColumnConfig[],
        primaryKeyColumn?: string/* ,
        deletable?: boolean,
        editable?: boolean */) {
        this.data = data;
        this.columnConfig = columnConfig;
        this.primaryKeyColumn = primaryKeyColumn;
       /*  this.deletable = deletable;
        this.editable = editable; */
    }

    /** Table data */
    data: any[];

    /** Table columns config */
    columnConfig: ColumnConfig[];

    /** Primary key column by default is id */
    primaryKeyColumn?: string = "id";

    /** Is table deletable? */
    deletable?: boolean = false;

    /** Is table editable? */
    editable?: boolean = false;
}
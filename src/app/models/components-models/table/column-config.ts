import { SelectConfig } from "../select-config";

/**
 * Table column config model use in table component
 */
export class ColumnConfig {

    /**
     * Constructor
     * @param name Column name (Name in data)
     * @param displayName Column display name
     * @param sortable Whether user sort feature on the column
     * @param selectConfig Select config, use if column consists of ke and value
     */
    constructor(name: string,
        displayName: string,
        sortable?: boolean,
        selectConfig?: SelectConfig,) {
        this.name = name;
        this.displayName = displayName;
        this.sortable = sortable;
        this.selectConfig = selectConfig;
    }

    /** Column Data Name */
    name: string;

    /** Column display name */
    displayName: string;

    sortable?: boolean;

    /** Select config use when the column Consists of select or autocomplete */
    selectConfig?: SelectConfig;
}
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
        columnType: ColumnType = 'text',
        sortable?: boolean,
        selectConfig?: SelectConfig | null,
        translatedTextKey?: string) {
        this.name = name;
        this.displayName = displayName;
        this.columnType = columnType;
        this.sortable = sortable;
        this.selectConfig = selectConfig;
        this.translatedTextKey = translatedTextKey;
    }

    /** Column Data Name */
    name: string;

    /** Column display name */
    displayName: string;

    /**The display type of the column */
    columnType?: ColumnType;

    sortable?: boolean;

    /** Select config use when the column Consists of select or autocomplete */
    selectConfig?: SelectConfig | null;

    translatedTextKey?: string;
}

export type ColumnType = 'text' | 'DateTime' | 'translatedText' | 'select' | 'multiSelect' | 'textBesideIcon' | 'icon' | 'actions';
export interface HeadRow {
    id: string;
    dataField?: string;
    caption: string;
    index: number;
    datatype?: 'string' | 'number' | 'datetime' | 'boolean' | 'Date';
    renderType?: string;
    render?: (props: any) => React.ReactNode;
    calculateCellValue?: (data: Project) => any
    width?: number;
    allowSorting?: boolean;
    defaultSortOrder?: 'asc' | 'desc';
}

export interface Project {
  project: number,
  description: string,
  'start date': string,
  category: string,
  responsible: string,
  'savings amount': number,
  currency: string,
  complexity: string,
}

export interface option {
    label: string;
    value: string
}